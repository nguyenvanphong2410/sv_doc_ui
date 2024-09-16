import React, {useState} from 'react';
import InlineSVG from 'react-inlinesvg';
import {useSelector} from 'react-redux';
import IconWarning from '@/assets/images/icons/light/warning.svg';
import IconPlus from '@/assets/images/icons/light/plus.svg';
import IconRemove from '@/assets/images/icons/duotone/remove.svg';
import IconStar from '@/assets/images/icons/duotone/star.svg';
import {Button, Col, DatePicker, Input, Row, Select, Switch, Tag, Tooltip} from 'antd';
import Handle from '@/pages/Document/components/DocumentItem/handle';
import {DOCUMENT_STATUS, formatLocalDateTime, STATUS_DOC_CHECK, TYPE_SUBMIT} from '@/utils/constants';
import {createDocumentSchema, updateDocumentSchema} from '@/pages/Document/components/DocumentItem/schema';
import './styles.scss';
import styles from './styles.module.scss';
import {CheckOutlined, CloseCircleOutlined, DeleteOutlined} from '@ant-design/icons';
import moment from 'moment';
import dayjs from 'dayjs';

function ModalCreateOrUpdateDocument() {
  const errorInfoDocument = useSelector((state) => state.document.errorInfoDocument);
  const isLoadingBtnCreateDocument = useSelector((state) => state.document.isLoadingBtnCreateDocument);
  const isLoadingBtnUpdateDocument = useSelector((state) => state.document.isLoadingBtnUpdateDocument);
  const infoDocument = useSelector((state) => state.document.infoDocument);
  const configModal = useSelector((state) => state.document.configModal);

  const {
    categoryOption,
    fileName,
    handleChangeInputInfo,
    handleFocus,
    handleCancelModalCreateOrUpdateDocument,
    handleSubmit,
    handleChangeImage,
    handleClickUpload,
    handleChangeImageFeatured,
    handleRemoveImage,
    handleRemoveFile,
    handleSwitchChange,
    handleChangeChecked,
  } = Handle();

  const {TextArea} = Input;
  const [isHovered, setIsHovered] = useState(false);

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
                      className={`${styles.featuredWrap} ${!file.is_featured ? styles.noFeaturedWrap : ''}`}
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
                className={`main-input ${errorInfoDocument && errorInfoDocument.name ? 'error-input' : ''}`}
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
                <label className={`label-input`}>Danh mục</label>
              </div>
              <Select
                className={'main-select w-full'}
                value={infoDocument?.category_id}
                mode="multiple"
                allowClear
                placeholder="Chọn danh mục"
                onChange={(value) => handleChangeInputInfo(value, 'category_id')}
                options={categoryOption}
                filterOption={(input, option) =>
                  option.label?.toLowerCase().indexOf(input?.toLowerCase()) >= 0
                }
                onFocus={() => handleFocus('category_id')}
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

            <div className={`${configModal.type === TYPE_SUBMIT.CREATE ? 'hidden' : 'input-wrap'}`}>
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
                value={infoDocument.author}
                onFocus={() => handleFocus('author')}
                onChange={(e) => handleChangeInputInfo(e.target.value, 'author')}
                className={`main-input ${errorInfoDocument && errorInfoDocument.author ? 'error-input' : ''}`}
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

            <div className={`${configModal.type === TYPE_SUBMIT.CREATE ? 'hidden' : 'input-wrap'}`}>
              <div className="label-wrap">
                <label className={`label-input flex justify-center`}>Tùy chọn</label>
              </div>
              <div className="bg-[#f9f9f9] rounded-[6px] py-[8px] px-[8px] mt-[6px]">
                <div className="flex justify-between">
                  <span>Kiểm duyệt tài liệu</span>
                  <span className='mr-[-7px]'>
                    {infoDocument.doc_check === STATUS_DOC_CHECK.PENDING ? (
                      <Tooltip placement="left" title="Duyệt tài liệu này" color="#1f7a1f">
                        <Tag
                          className={`cursor-pointer`}
                          color="#1f7a1f"
                          icon={<CheckOutlined />}
                          onClick={() => handleChangeChecked(infoDocument)}
                        >
                          Duyệt
                        </Tag>
                      </Tooltip>
                    ) : (
                      <Tooltip placement="left" title="Nhấn để bỏ duyệt tài liệu" color="grey">
                        <Tag
                          className={`cursor-pointer`}
                          color="grey"
                          icon={<CloseCircleOutlined />}
                          onClick={() => handleChangeChecked(infoDocument)}
                        >
                          Hủy
                        </Tag>
                      </Tooltip>
                    )}
                  </span>
                </div>
                <div className="flex justify-between mt-[8px]">
                  <span>Trạng thái tài liệu</span>
                  <Tooltip
                    placement="left"
                    title={infoDocument.status === DOCUMENT_STATUS.LOCK ? 'Khoá' : 'Kích hoạt'}
                  >
                    <Switch
                      className={`main-switch`}
                      onChange={(checked) => handleSwitchChange(checked)}
                      checked={infoDocument.status === DOCUMENT_STATUS.UNLOCK ? true : false}
                    />
                  </Tooltip>
                </div>
              </div>
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
          className={`main-input ${errorInfoDocument && errorInfoDocument.description ? 'error-input' : ''}`}
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
          className={`ant-btn-close mx-[5px]`}
          size={'large'}
          onClick={handleCancelModalCreateOrUpdateDocument}
        >
          Đóng
        </Button>
        {configModal.type === TYPE_SUBMIT.CREATE ? (
          <Button
            loading={isLoadingBtnCreateDocument}
            className={`ant-btn-primary mx-[5px]`}
            size={'large'}
            onClick={() => handleSubmit(TYPE_SUBMIT.CREATE, createDocumentSchema, infoDocument)}
          >
            Tạo mới
          </Button>
        ) : (
          <Button
            loading={isLoadingBtnUpdateDocument}
            className={`ant-btn-primary mx-[5px]`}
            size={'large'}
            onClick={() => handleSubmit(TYPE_SUBMIT.UPDATE, updateDocumentSchema, infoDocument)}
          >
            Cập nhật
          </Button>
        )}
      </div>
    </div>
  );
}

export default ModalCreateOrUpdateDocument;
