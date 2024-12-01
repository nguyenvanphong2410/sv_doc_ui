import React, {useEffect, useState} from 'react';
import InlineSVG from 'react-inlinesvg';
import {useDispatch, useSelector} from 'react-redux';
import IconWarning from '@/assets/images/icons/light/warning.svg';
import IconPlus from '@/assets/images/icons/light/plus.svg';
import IconRemove from '@/assets/images/icons/duotone/remove.svg';
import IconStar from '@/assets/images/icons/duotone/star.svg';
import {Button, Col, DatePicker, Input, Radio, Row, Select, Tooltip} from 'antd';
import {formatLocalDateTime, TYPE_FILE, TYPE_SAVE, TYPE_SUBMIT} from '@/utils/constants';
import {updateDocumentSchema} from '@/pages/Document/components/DocumentItem/schema';
import './styles.scss';
import styles from './styles.module.scss';
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
import {requestUpdateMyDocumentLock} from '@/api/document';
import Delete from '@/assets/images/icons/duotone/trash-can.svg';
import NoData from '@/pages/Permission/NoData';
import PlusIcon from '@/assets/images/icons/light/plus.svg';

function ModalUpdateDoc() {
  const {TextArea} = Input;

  const dispatch = useDispatch();

  const [fileName, setFileName] = useState('');
  const [categoryOption, setCategoryOption] = useState([]);

  const errorInfoDocumentLock = useSelector((state) => state.document.errorInfoDocumentLock);
  const infoDocumentLock = useSelector((state) => state.document.infoDocumentLock);
  const dataListCategory = useSelector((state) => state.category.allCategory);
  const isLoadingBtnUpdateDocumentLock = useSelector(
    (state) => state.document.isLoadingBtnUpdateDocumentLock
  );

  const options = [
    {
      label: 'File',
      value: TYPE_SAVE.FILE,
    },
    {
      label: 'Chương',
      value: TYPE_SAVE.CHAPTERS,
    },
  ];

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
    console.log('🌈 ~ handleRemoveImage ~ featured:', featured);
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

  const handleChangeTypeUploadFile = (valueTypeUploadFile) => {
    if (valueTypeUploadFile === TYPE_SAVE.FILE) {
      dispatch(setInfoDocumentLock({...infoDocumentLock, type_save: TYPE_SAVE.FILE}));
    }
    if (valueTypeUploadFile === TYPE_SAVE.CHAPTERS) {
      dispatch(setInfoDocumentLock({...infoDocumentLock, type_save: TYPE_SAVE.CHAPTERS}));
    }
  };

  const removeContact = (index) => {
    let newChapter = [...infoDocumentLock.chapters];
    if (index >= 0 && index < newChapter.length) {
      newChapter.splice(index, 1);
    }
    dispatch(
      setInfoDocumentLock({
        ...infoDocumentLock,
        chapters: newChapter,
      })
    );
  };

  const handleChapterChange = (index, field, value) => {
    console.log('🌈 ~ handleChapterChange ~ index:', index);
    // console.log('!!! Dữ liệu:', index, field, value);

    // Tạo bản sao mảng chapters
    const updatedChapters = _.cloneDeep(infoDocumentLock.chapters);

    if (index >= 0 && index < updatedChapters.length) {
      if (field === 'name') {
        // Nếu field là 'name', chỉ thay đổi name tại index
        updatedChapters[index] = {
          ...updatedChapters[index],
          name: value,
        };
      } else if (field === 'file_chapter') {
        // Nếu field là 'file_chapters', chỉ thay đổi file_chapters tại index
        updatedChapters[index] = {
          ...updatedChapters[index],
          file_chapter: value, // value là file đã upload
          name_file_chapter: value ? value.name : '',
        };
      }
    }

    // Cập nhật state với các thay đổi
    dispatch(
      setInfoDocumentLock({
        ...infoDocumentLock,
        chapters: updatedChapters,
      })
    );
  };

  const addContact = () => {
    dispatch(
      setInfoDocumentLock({
        ...infoDocumentLock,
        chapters: [
          ...(infoDocumentLock?.chapters?.length > 0 ? infoDocumentLock.chapters : []),
          {
            name: '',
            number_order: 1,
            name_file_chapter: '',
            file_chapter: null,
          },
        ],
      })
    );
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
        <Row gutter={20}>
          <Col sm={12} xs={24}>
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
                value={infoDocumentLock.publication_time ? dayjs(infoDocumentLock.publication_time) : null}
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

      <Row gutter={20}>
        <Col sm={5} xs={24}>
          <div className={`input-wrap`}>
            <div className="label-wrap">
              <label className={`label-input required`}>Loại lưu trữ</label>
            </div>
            <Radio.Group
              block
              options={options}
              optionType="button"
              buttonStyle="solid"
              className="mt-[6px]"
              value={infoDocumentLock.type_save}
              onChange={(e) => handleChangeTypeUploadFile(e.target.value)}
            />
          </div>
        </Col>
        <Col sm={19} xs={24}>
          {infoDocumentLock?.type_save === TYPE_SAVE.FILE ? (
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
                <label htmlFor="pdfFile" className=" hover:text-blue-60">
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
              </div>
            </div>
          ) : (
            <>
              {infoDocumentLock?.chapters?.length > 0 ? (
                <div className={`${styles.chaptersWrap} mt-[33px]`}>
                  {infoDocumentLock?.chapters?.map((item, index) => (
                    <div className={`input-wrap`} key={index}>
                      <div className={styles.contactWrap}>
                        <div className={`${styles.itemChapter}`}>
                          <div className={`input-wrap`}>
                            <div className="label-wrap flex justify-between">
                              <label className={`label-input p-1`}>Chương {index + 1}</label>
                              <div>
                                <Tooltip placement="top" title={'Xóa'}>
                                  <div
                                    className={`btn-delete cursor-pointer`}
                                    onClick={() => removeContact(index)}
                                  >
                                    <InlineSVG src={Delete} width={14} />
                                  </div>
                                </Tooltip>
                              </div>
                            </div>
                            <Input
                              value={item.name}
                              onChange={(e) => handleChapterChange(index, 'name', e.target.value)}
                              className={`main-input`}
                              placeholder={`Nhập tên chương ${index + 1}`}
                            />
                          </div>
                          <div className={`input-wrap`}>
                            <input
                              id={`pdfFile${index}`}
                              type="file"
                              accept="application/pdf"
                              required
                              style={{display: 'none'}}
                              onChange={(e) => handleChapterChange(index, 'file_chapter', e.target.files[0])}
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
                              <label htmlFor={`pdfFile${index}`} className="ml-[12px] hover:text-blue-60">
                                {item?.name_file_chapter ? (
                                  <div
                                    style={{
                                      color: 'blue',
                                      whiteSpace: 'nowrap',
                                      overflow: 'hidden',
                                      textOverflow: 'ellipsis',
                                      maxWidth: '550px',
                                    }}
                                  >
                                    <Tooltip title={item?.name_file_chapter}>
                                      <span>{item?.name_file_chapter}</span>
                                    </Tooltip>
                                  </div>
                                ) : item?.name_file_chapter ? (
                                  <div
                                    style={{
                                      color: 'blue',
                                      whiteSpace: 'nowrap',
                                      overflow: 'hidden',
                                      textOverflow: 'ellipsis',
                                      maxWidth: '550px',
                                    }}
                                  >
                                    <Tooltip title={item?.name_file_chapter}>
                                      <span>{item?.name_file_chapter}</span>
                                    </Tooltip>
                                  </div>
                                ) : (
                                  '+ Tải tệp ở đây'
                                )}
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={`${styles.noChapter} mt-[37px]`}>
                  <NoData description="Không có chương nào!" />
                </div>
              )}

              <div
                className={`flex justify-center ${
                  infoDocumentLock?.chapter?.length > 0 ? 'mt-[16px]' : 'mt-[33px]'
                }`}
              >
                <Button
                  icon={<InlineSVG src={PlusIcon} className={`w-3 h-3`} />}
                  className={`ant-btn-primary`}
                  onClick={addContact}
                >
                  Thêm chương
                </Button>
              </div>
            </>
          )}
        </Col>
      </Row>

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
