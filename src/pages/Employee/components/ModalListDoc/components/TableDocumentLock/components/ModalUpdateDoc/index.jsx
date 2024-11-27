import React, {useEffect, useState} from 'react';
import InlineSVG from 'react-inlinesvg';
import {useDispatch, useSelector} from 'react-redux';
import IconWarning from '@/assets/images/icons/light/warning.svg';
import IconPlus from '@/assets/images/icons/light/plus.svg';
import IconRemove from '@/assets/images/icons/duotone/remove.svg';
import IconStar from '@/assets/images/icons/duotone/star.svg';
import {Button, Col, DatePicker, Input, Row, Select, Tooltip} from 'antd';
import {formatLocalDateTime, TYPE_FILE, TYPE_SUBMIT} from '@/utils/constants';
import {updateDocumentSchema} from '@/pages/Document/components/DocumentItem/schema';
import './styles.scss';
import styles from './styles.module.scss';
import {DeleteOutlined} from '@ant-design/icons';
import moment from 'moment';
import dayjs from 'dayjs';
import {validate} from '@/utils/validates';
import {
  setErrorInfoDocumentLock,
  setInfoDocumentLock,
  setVisibleModalCreateOrUpdateDocumentLock,
} from '@/states/modules/document';
import {getNotification} from '@/utils/helper';
import _ from 'lodash';
import {getAllCategoriesForUser} from '@/api/category';
import {initErrInfoDocument, initInfoDocument} from '@/states/modules/document/initState';
import {requestUpdateMyDocumentLock, requestUpdateMyDocumentPending} from '@/api/document';

function ModalUpdateDoc() {
  const {TextArea} = Input;

  const dispatch = useDispatch();

  const [fileName, setFileName] = useState('');
  const [categoryOption, setCategoryOption] = useState([]);
  const [isHovered, setIsHovered] = useState(false);

  const errorInfoDocumentLock = useSelector((state) => state.document.errorInfoDocumentLock);
  const infoDocumentLock = useSelector((state) => state.document.infoDocumentLock);
  const dataListCategory = useSelector((state) => state.category.allCategory);
  const isLoadingBtnUpdateDocumentLock = useSelector(
    (state) => state.document.isLoadingBtnUpdateDocumentLock
  );
  const handleRemoveFile = () => {
    setFileName('');
  };

  const handleChangeImage = (file) => {
    let maxImage = infoDocumentLock.images.length;
    let listImage = _.values(file.target.files);
    if (listImage.length > 0) {
      let document = _.cloneDeep(infoDocumentLock);
      listImage.forEach(function (fileItem) {
        if (maxImage === 3) {
          return false;
        }

        let fileUrl = URL.createObjectURL(fileItem);
        let dataError = '';
        if (fileItem.size / 1024 / 1024 > 10) {
          dataError = 'Kích thước ảnh không vượt quá 10MB.';
        } else if (!TYPE_FILE.includes(fileItem.type)) {
          dataError = 'Ảnh sai định dạng, chỉ được hỗ trợ kiểu jpg,jpeg,png,svg,webp.';
        }

        if (dataError) {
          getNotification('error', dataError);
        } else {
          document.images.push({
            id: maxImage + 1,
            name: fileItem.name,
            file: fileItem,
            url: fileUrl,
            is_featured: document.images.length === 0,
          });
          maxImage++;
        }
      });
      dispatch(setInfoDocumentLock(document));
    }
  };
  const handleSubmit = (type, scheme, dataDocument) => {
    if (type === TYPE_SUBMIT.UPDATE) {
      validate(scheme, dataDocument, {
        onSuccess: (data) => dispatch(requestUpdateMyDocumentLock(infoDocumentLock._id, data)),
        onError: (error) => dispatch(setErrorInfoDocumentLock(error)),
      });
    }
  };

  const handleRemoveImage = (imageId) => {
    let newInfoDocument = _.cloneDeep(infoDocumentLock);
    let featured = false;
    console.log("🌈 ~ handleRemoveImage ~ featured:", featured)
    newInfoDocument.images = _.filter(infoDocumentLock.images, function (o) {
      if (o.id === imageId && o.is_featured) {
        featured = true;
      }
      return o.id !== imageId;
    });
    dispatch(setInfoDocumentLock(newInfoDocument));
  };

  const handleChangeImageFeatured = (imageId) => {
    let newInfoDocument = _.cloneDeep(infoDocumentLock);
    newInfoDocument.images.forEach((image) => {
      image.is_featured = image.id === imageId;
    });
    dispatch(setInfoDocumentLock(newInfoDocument));
  };

  const handleClickUpload = () => {
    document.getElementById('inputFile').click();
  };

  const handleFocus = (type) => {
    let dataError = _.cloneDeep(errorInfoDocumentLock);
    dataError[type] = '';
    dispatch(setErrorInfoDocumentLock(dataError));
  };

  const handleChangeInputInfo = (value, type) => {
    let data = _.cloneDeep(infoDocumentLock);
    let dataError = _.cloneDeep(errorInfoDocumentLock);
    let nameFile = infoDocumentLock.name_file;
    if (type === 'file_record') {
      if (value.target.files.length > 0) {
        nameFile = value.target.files[0].name;
        setFileName(nameFile);
        dispatch(setInfoDocumentLock({...data, name_file: nameFile}));
      }
    }

    if (type === 'category_id') {
      data[type] = value;
    } else {
      data[type] = value;
    }
    if (type === 'file_record') {
      data[type] = value.target.files[0];
    }

    dataError[type] = '';
    dispatch(setInfoDocumentLock({...data, name_file: nameFile}));
    dispatch(setErrorInfoDocumentLock(dataError));
  };

  const handleCancelModalUpdateDoc = () => {
    dispatch(setErrorInfoDocumentLock(initErrInfoDocument));
    dispatch(setInfoDocumentLock(initInfoDocument));
    dispatch(setVisibleModalCreateOrUpdateDocumentLock(false));
  };

  useEffect(() => {
    setCategoryOption(
      dataListCategory?.map((item) => ({
        value: item._id,
        label: item.name,
      }))
    );
  }, [dataListCategory]);

  useEffect(() => {
    dispatch(getAllCategoriesForUser());
  }, []);

  return (
    <div>
      <div className={`input-wrap mb-6`}>
        <div className={`label-wrap`}>
          <label htmlFor="" className={`label-input`}>
            Ảnh mô tả tài liệu
          </label>
        </div>
        <div>
          <div className={`flex justify-center gap-2 ${styles.uploadImage}`}>
            <input
              onChange={(file) => handleChangeImage(file)}
              accept="image/*"
              id="inputFile"
              type="file"
              multiple
              hidden
            />
            {infoDocumentLock.images.map((file) => {
              return (
                <div key={file.id} className={`${styles.previewImage}`}>
                  <img src={file.url} alt={file.name} />
                  <Tooltip placement="top" title="Xoá">
                    <div onClick={() => handleRemoveImage(file.id)} className={`${styles.removeWrap}`}>
                      <InlineSVG src={IconRemove} width={14} height={14} />
                    </div>
                  </Tooltip>
                  <Tooltip placement="top" title="Nổi bật">
                    <div
                      onClick={() => handleChangeImageFeatured(file.id)}
                      className={`${styles.featuredWrap} ${!file.is_featured ? styles.noFeaturedWrap : ''}`}
                    >
                      <InlineSVG src={IconStar} width={14} height={14} />
                    </div>
                  </Tooltip>
                </div>
              );
            })}
            {infoDocumentLock.images.length < 3 ? (
              <div onClick={() => handleClickUpload()} className={`${styles.uploadButton}`}>
                <InlineSVG src={IconPlus} width={14} height={14} />
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>

      <div className="layout-info">
        <Row gutter={20}>
          <Col sm={12} xs={24}>
            <div className={`input-wrap`}>
              <div className="label-wrap">
                <label className={`required label-input`}>Tên tài liệu</label>
              </div>
              <Input
                value={infoDocumentLock.name}
                onFocus={() => handleFocus('name')}
                onChange={(e) => handleChangeInputInfo(e.target.value, 'name')}
                className={`main-input ${
                  errorInfoDocumentLock && errorInfoDocumentLock.name ? 'error-input' : ''
                }`}
                placeholder={'Nhập tên tài liệu'}
              />
              {errorInfoDocumentLock && errorInfoDocumentLock.name && (
                <span className={`error`}>
                  <div className={`icon`}>
                    <InlineSVG src={IconWarning} width={14} height={14} />
                  </div>
                  {errorInfoDocumentLock.name}
                </span>
              )}
            </div>

            <div className={`input-wrap`}>
              <div className="label-wrap">
                <label className={`label-input`}>Thể loại</label>
              </div>
              <Select
                className={'main-select w-full'}
                mode="multiple"
                allowClear
                placeholder="Chọn thể loại"
                value={infoDocumentLock?.category_id}
                onChange={(value) => handleChangeInputInfo(value, 'category_id')}
                options={categoryOption}
                filterOption={(input, option) =>
                  option.label?.toLowerCase().indexOf(input?.toLowerCase()) >= 0
                }
                onFocus={() => handleFocus('category_id')}
              />
              {errorInfoDocumentLock && errorInfoDocumentLock.category_id && (
                <span className={`error`}>
                  <div className={`icon`}>
                    <InlineSVG src={IconWarning} width={14} height={14} />
                  </div>
                  {errorInfoDocumentLock.category_id}
                </span>
              )}
            </div>

            <div className={`input-wrap`}>
              <div className="label-wrap">
                <label className={`label-input`}>Thời gian xuất bản</label>
              </div>
              <DatePicker
                value={
                  infoDocumentLock.publication_time ? dayjs(infoDocumentLock.publication_time) : null
                }
                onFocus={() => handleFocus('publication_time')}
                onChange={(date) =>
                  handleChangeInputInfo(date ? moment(date.toDate()).toDate() : null, 'publication_time')
                }
                className={`main-input`}
                locale={formatLocalDateTime}
                format="DD/MM/YYYY"
                placeholder="Nhập thời gian"
              />
              {errorInfoDocumentLock && errorInfoDocumentLock.publication_time && (
                <span className={`error`}>
                  <div className={`icon`}>
                    <InlineSVG src={IconWarning} width={14} height={14} />
                  </div>
                  {errorInfoDocumentLock.publication_time}
                </span>
              )}
            </div>
          </Col>
          <Col sm={12} xs={24}>
            <div className={`input-wrap`}>
              <div className="label-wrap">
                <label className={`label-input required`}>File tài liệu</label>
              </div>
              <input
                id="pdfFile"
                type="file"
                accept="application/pdf"
                required
                onChange={(e) => handleChangeInputInfo(e, 'file_record')}
                style={{display: 'none'}}
              />
              <div
                style={{
                  backgroundColor: '#f9f9f9',
                  fontSize: '13px',
                  color: '#c6c6c6',
                  padding: '10px',
                  borderRadius: '6px',
                  border: '1px dotted #ceced6',
                  height: '44px',
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <label htmlFor="pdfFile">
                  {infoDocumentLock.name_file ? (
                    <div
                      style={{
                        color: 'blue',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        maxWidth: '300px',
                      }}
                    >
                      <Tooltip title={infoDocumentLock.name_file}>
                        <span>{infoDocumentLock.name_file}</span>
                      </Tooltip>
                    </div>
                  ) : fileName ? (
                    <div
                      style={{
                        color: 'blue',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        maxWidth: '300px',
                      }}
                    >
                      <Tooltip title={fileName}>
                        <span>{fileName}</span>
                      </Tooltip>
                    </div>
                  ) : (
                    '+ Tải tệp ở đây'
                  )}
                </label>
                {fileName ? (
                  <Tooltip title={'Xóa tài liệu'}>
                    <span
                      style={{color: isHovered ? 'red' : 'gray', cursor: 'pointer'}}
                      onClick={handleRemoveFile}
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                    >
                      <DeleteOutlined />
                    </span>
                  </Tooltip>
                ) : (
                  ''
                )}
              </div>
            </div>

            <div className={`input-wrap`}>
              <div className="label-wrap">
                <label className={`required label-input`}>Tác giả</label>
              </div>
              <Input
                value={infoDocumentLock.author}
                onFocus={() => handleFocus('author')}
                onChange={(e) => handleChangeInputInfo(e.target.value, 'author')}
                className={`main-input ${
                  errorInfoDocumentLock && errorInfoDocumentLock.author ? 'error-input' : ''
                }`}
                placeholder={'Nhập tên tác giả'}
              />
              {errorInfoDocumentLock && errorInfoDocumentLock.author && (
                <span className={`error`}>
                  <div className={`icon`}>
                    <InlineSVG src={IconWarning} width={14} height={14} />
                  </div>
                  {errorInfoDocumentLock.author}
                </span>
              )}
            </div>

            <div className={`input-wrap`}>
              <div className="label-wrap">
                <label className={`required label-input`}>Nhà xuất bản</label>
              </div>
              <Input
                value={infoDocumentLock.publisher}
                onFocus={() => handleFocus('publisher')}
                onChange={(e) => handleChangeInputInfo(e.target.value, 'publisher')}
                className={`main-input ${
                  errorInfoDocumentLock && errorInfoDocumentLock.publisher ? 'error-input' : ''
                }`}
                placeholder={'Nhập tên tài liệu'}
              />
              {errorInfoDocumentLock && errorInfoDocumentLock.publisher && (
                <span className={`error`}>
                  <div className={`icon`}>
                    <InlineSVG src={IconWarning} width={14} height={14} />
                  </div>
                  {errorInfoDocumentLock.publisher}
                </span>
              )}
            </div>
          </Col>
        </Row>
      </div>
      <div className={`${'input-wrap'}`}>
        <div className="label-wrap">
          <label className={`label-input`}>Mô tả</label>
        </div>
        <TextArea
          value={infoDocumentLock.description}
          onFocus={() => handleFocus('description')}
          onChange={(e) => handleChangeInputInfo(e.target.value, 'description')}
          className={`main-input ${
            errorInfoDocumentLock && errorInfoDocumentLock.description ? 'error-input' : ''
          }`}
          placeholder={'Nhập mô tả tài liệu'}
        />
        {errorInfoDocumentLock && errorInfoDocumentLock.description && (
          <span className={`error`}>
            <div className={`icon`}>
              <InlineSVG src={IconWarning} width={14} height={14} />
            </div>
            {errorInfoDocumentLock.description}
          </span>
        )}
      </div>

      <div className={`flex justify-center mt-8`}>
        <Button className={`ant-btn-close mx-[5px]`} size={'large'} onClick={handleCancelModalUpdateDoc}>
          Đóng
        </Button>

        <Button
          size={'large'}
          className={`ant-btn-primary mx-[5px]`}
          loading={isLoadingBtnUpdateDocumentLock}
          onClick={() => handleSubmit(TYPE_SUBMIT.UPDATE, updateDocumentSchema, infoDocumentLock)}
        >
          Cập nhật
        </Button>
      </div>
    </div>
  );
}

export default ModalUpdateDoc;
