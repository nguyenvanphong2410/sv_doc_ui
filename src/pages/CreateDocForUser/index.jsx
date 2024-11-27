import UserLayout from '@/layouts/UserLayout';
import React, {useEffect, useState} from 'react';
import InlineSVG from 'react-inlinesvg';
import {useDispatch, useSelector} from 'react-redux';
import IconWarning from '@/assets/images/icons/light/warning.svg';
import IconPlus from '@/assets/images/icons/light/plus.svg';
import IconRemove from '@/assets/images/icons/duotone/remove.svg';
import IconStar from '@/assets/images/icons/duotone/star.svg';
import {Button, Col, DatePicker, Input, Row, Select, Tooltip} from 'antd';
import {formatLocalDateTime, TYPE_FILE, TYPE_SUBMIT} from '@/utils/constants';
import './styles.scss';
import styles from './styles.module.scss';
import {DeleteOutlined} from '@ant-design/icons';
import moment from 'moment';
import dayjs from 'dayjs';
import _ from 'lodash';
import {getNotification} from '@/utils/helper';
import {setErrorInfoDocument, setInfoDocument} from '@/states/modules/document';
import {createDocumentSchema} from '../Document/components/DocumentItem/schema';
import {validate} from '@/utils/validates';
import {requestCreateDocumentForUser} from '@/api/document';
import {useNavigate} from 'react-router-dom';
import {getAllCategoriesForUser} from '@/api/category';

const CreateDocForUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [fileName, setFileName] = useState('');
  const [categoryOption, setCategoryOption] = useState([]);

  const errorInfoDocument = useSelector((state) => state.document.errorInfoDocument);
  const isLoadingBtnCreateDocumentForUser = useSelector((state) => state.document.isLoadingBtnCreateDocumentForUser);
  const infoDocument = useSelector((state) => state.document.infoDocument);
  const configModal = useSelector((state) => state.document.configModal);
  const dataListCategory = useSelector((state) => state.category.allCategory);
  const goToPage = useSelector((state) => state.app.goToPage);

  const {TextArea} = Input;

  const handleChangeImage = (file) => {
    let maxImage = infoDocument.images.length;
    let listImage = _.values(file.target.files);
    if (listImage.length > 0) {
      let document = _.cloneDeep(infoDocument);
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
      dispatch(setInfoDocument(document));
    }
  };
  const handleRemoveImage = (imageId) => {
    let newInfoDocument = _.cloneDeep(infoDocument);
    let featured = false;
    newInfoDocument.images = _.filter(infoDocument.images, function (o) {
      if (o.id === imageId && o.is_featured) {
        featured = true;
      }
      return o.id !== imageId;
    });
    dispatch(setInfoDocument(newInfoDocument));
  };

  const handleChangeImageFeatured = (imageId) => {
    let newInfoDocument = _.cloneDeep(infoDocument);
    newInfoDocument.images.forEach((image) => {
      image.is_featured = image.id === imageId;
    });
    dispatch(setInfoDocument(newInfoDocument));
  };

  const handleClickUpload = () => {
    document.getElementById('inputFile').click();
  };

  const handleFocus = (type) => {
    let dataError = _.cloneDeep(errorInfoDocument);
    dataError[type] = '';
    dispatch(setErrorInfoDocument(dataError));
  };

  const handleChangeInputInfo = (value, type) => {
    let data = _.cloneDeep(infoDocument);
    let dataError = _.cloneDeep(errorInfoDocument);
    let nameFile = infoDocument.name_file;
    if (type === 'file_record') {
      if (value.target.files.length > 0) {
        nameFile = value.target.files[0].name;
        setFileName(nameFile);
        dispatch(setInfoDocument({...data, name_file: nameFile}));
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
    dispatch(setInfoDocument({...data, name_file: nameFile}));
    dispatch(setErrorInfoDocument(dataError));
  };

  const handleSubmit = (type, scheme, dataDocument) => {
    if (type === TYPE_SUBMIT.CREATE) {
      validate(scheme, dataDocument, {
        onSuccess: (data) => dispatch(requestCreateDocumentForUser(data)),
        onError: (error) => dispatch(setErrorInfoDocument(error)),
      });
    }
  };

  useEffect(() => {
    setCategoryOption(
      dataListCategory?.map((item) => ({
        value: item._id,
        label: item.name,
      }))
    );
  }, [dataListCategory, goToPage, navigate]);

  useEffect(() => {
    dispatch(getAllCategoriesForUser());
  }, []);

  return (
    <>
      <UserLayout>
        <div className={`${styles.createDocContainer}`}>
          <div className={`${styles.titleCreate}`}>Đóng góp tài liệu</div>
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
                {infoDocument.images.map((file) => {
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
                          className={`${styles.featuredWrap} ${
                            !file.is_featured ? styles.noFeaturedWrap : ''
                          }`}
                        >
                          <InlineSVG src={IconStar} width={14} height={14} />
                        </div>
                      </Tooltip>
                    </div>
                  );
                })}
                {infoDocument.images.length < 3 ? (
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
                    value={infoDocument.name}
                    onFocus={() => handleFocus('name')}
                    onChange={(e) => handleChangeInputInfo(e.target.value, 'name')}
                    className={`main-input ${
                      errorInfoDocument && errorInfoDocument.name ? 'error-input' : ''
                    }`}
                    placeholder={'Nhập tên tài liệu'}
                  />
                  {errorInfoDocument && errorInfoDocument.name && (
                    <span className={`error`}>
                      <div className={`icon`}>
                        <InlineSVG src={IconWarning} width={14} height={14} />
                      </div>
                      {errorInfoDocument.name}
                    </span>
                  )}
                </div>

                <div className={`input-wrap`}>
                  <div className="label-wrap">
                    <label className={`label-input`}>Thể loại</label>
                  </div>
                  <Select
                    className={'main-select w-full'}
                    value={infoDocument?.category_id}
                    mode="multiple"
                    allowClear
                    placeholder="Chọn thể loại"
                    onChange={(value) => handleChangeInputInfo(value, 'category_id')}
                    onFocus={() => handleFocus('category_id')}
                    options={categoryOption}
                    filterOption={(input, option) =>
                      option.label?.toLowerCase().indexOf(input?.toLowerCase()) >= 0
                    }
                  />
                  {errorInfoDocument && errorInfoDocument.category_id && (
                    <span className={`error`}>
                      <div className={`icon`}>
                        <InlineSVG src={IconWarning} width={14} height={14} />
                      </div>
                      {errorInfoDocument.category_id}
                    </span>
                  )}
                </div>

                <div className={`input-wrap`}>
                  <div className="label-wrap">
                    <label className={`label-input`}>Thời gian xuất bản</label>
                  </div>
                  <DatePicker
                    value={infoDocument.publication_time ? dayjs(infoDocument.publication_time) : null}
                    onFocus={() => handleFocus('publication_time')}
                    onChange={(date) =>
                      handleChangeInputInfo(date ? moment(date.toDate()).toDate() : null, 'publication_time')
                    }
                    className={`main-input`}
                    locale={formatLocalDateTime}
                    format="DD/MM/YYYY"
                    placeholder="Nhập thời gian"
                  />
                  {errorInfoDocument && errorInfoDocument.publication_time && (
                    <span className={`error`}>
                      <div className={`icon`}>
                        <InlineSVG src={IconWarning} width={14} height={14} />
                      </div>
                      {errorInfoDocument.publication_time}
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
                      {infoDocument.name_file ? (
                        <div
                          style={{
                            color: 'blue',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            maxWidth: '300px',
                          }}
                        >
                          <Tooltip title={infoDocument.name_file}>
                            <span>{infoDocument.name_file}</span>
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
                        //   style={{color: isHovered ? 'red' : 'gray', cursor: 'pointer'}}
                        //   onClick={handleRemoveFile}
                        //   onMouseEnter={() => setIsHovered(true)}
                        //   onMouseLeave={() => setIsHovered(false)}
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
                    value={infoDocument.author}
                    onFocus={() => handleFocus('author')}
                    onChange={(e) => handleChangeInputInfo(e.target.value, 'author')}
                    className={`main-input ${
                      errorInfoDocument && errorInfoDocument.author ? 'error-input' : ''
                    }`}
                    placeholder={'Nhập tên tác giả'}
                  />
                  {errorInfoDocument && errorInfoDocument.author && (
                    <span className={`error`}>
                      <div className={`icon`}>
                        <InlineSVG src={IconWarning} width={14} height={14} />
                      </div>
                      {errorInfoDocument.author}
                    </span>
                  )}
                </div>

                <div className={`input-wrap`}>
                  <div className="label-wrap">
                    <label className={`required label-input`}>Nhà xuất bản</label>
                  </div>
                  <Input
                    value={infoDocument.publisher}
                    onFocus={() => handleFocus('publisher')}
                    onChange={(e) => handleChangeInputInfo(e.target.value, 'publisher')}
                    className={`main-input ${
                      errorInfoDocument && errorInfoDocument.publisher ? 'error-input' : ''
                    }`}
                    placeholder={'Nhập tên tài liệu'}
                  />
                  {errorInfoDocument && errorInfoDocument.publisher && (
                    <span className={`error`}>
                      <div className={`icon`}>
                        <InlineSVG src={IconWarning} width={14} height={14} />
                      </div>
                      {errorInfoDocument.publisher}
                    </span>
                  )}
                </div>
              </Col>
            </Row>
          </div>
          <div className={`${configModal.type === TYPE_SUBMIT.UPDATE ? 'hidden' : 'input-wrap'}`}>
            <div className="label-wrap">
              <label className={`label-input`}>Mô tả</label>
            </div>
            <TextArea
              value={infoDocument.description}
              onFocus={() => handleFocus('description')}
              onChange={(e) => handleChangeInputInfo(e.target.value, 'description')}
              className={`main-input ${
                errorInfoDocument && errorInfoDocument.description ? 'error-input' : ''
              }`}
              placeholder={'Nhập mô tả tài liệu'}
            />
            {errorInfoDocument && errorInfoDocument.description && (
              <span className={`error`}>
                <div className={`icon`}>
                  <InlineSVG src={IconWarning} width={14} height={14} />
                </div>
                {errorInfoDocument.description}
              </span>
            )}
          </div>

          <div className={`flex justify-center mt-8`}>
            
            <Button
              loading={isLoadingBtnCreateDocumentForUser}
              className={`ant-btn-success mx-[5px]`}
              size={'large'}
              onClick={() => handleSubmit(TYPE_SUBMIT.CREATE, createDocumentSchema, infoDocument)}
            >
              Tạo mới
            </Button>
          </div>
        </div>
      </UserLayout>
    </>
  );
};

export default CreateDocForUser;
