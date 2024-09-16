import React from 'react';
import InlineSVG from 'react-inlinesvg';
import IconWarning from '@/assets/images/icons/light/warning.svg';
import {Button, Col, Input, Radio, Row, Space, Switch, Tooltip} from 'antd';
import {TYPE_SUBMIT, USER_STATUS, USER_TYPE} from '@/utils/constants';
import './styles.scss';
import {useDispatch, useSelector} from 'react-redux';
import Handle from '@/pages/Partner/components/OtherComponent/components/ModalCreateOrUpdate/handle.js';
import {createOrUpdateOtherSchema} from '../../schema';
import IconEditAvatar from '@/assets/images/icons/duotone/pencil.svg';
import Close from '@/assets/images/icons/duotone/xmark.svg';
import {setInfoOther} from '@/states/modules/partner';
import avatarDefault from '@/assets/images/user/default-avatar-point.png';

function ModalCreateOrUpdate() {
  const dispatch = useDispatch();

  const configModalOther = useSelector((state) => state.partner.configModalOther);
  const isLoadingBtnCreateOther = useSelector((state) => state.partner.isLoadingBtnCreateOther);
  const isLoadingBtnUpdateOther = useSelector((state) => state.partner.isLoadingBtnUpdateOther);
  const infoOther = useSelector((state) => state.partner.infoOther);
  const errorInfoOther = useSelector((state) => state.partner.errorInfoOther);
  const authOther = useSelector((state) => state.auth.authUser);

  const {
    handleChangeAvatar,
    handleChangeInputInfo,
    handleFocus,
    handleCancelModalCreateOrUpdateOther,
    handleSubmit,
    handleSwitchChange,
    hanleChangeUserType,
  } = Handle();
  return (
    <div>
      <div className={`input-wrap mb-6`}>
        <div className={`label-wrap`}>
          <label htmlFor="" className={`label-input`}>
            Ảnh đại diện
          </label>
        </div>
        <div className={`flex`}>
          <input
            id={'imageUpload'}
            type="file"
            accept="image/*"
            className={`hidden`}
            onChange={(file) => handleChangeAvatar(file)}
          />
          <Tooltip title="Chỉnh sửa ảnh đại diện">
            <label className={`icon-img icon-edit-img`} htmlFor="imageUpload">
              <InlineSVG src={IconEditAvatar} alt="" className={`icon-action`} />
            </label>
          </Tooltip>
          <Tooltip title="Xóa ảnh đại diện">
            <div
              className={`icon-img icon-remove-img`}
              onClick={() => dispatch(setInfoOther({...infoOther, avatarUrl: '', avatar: 'delete'}))}
            >
              <InlineSVG src={Close} alt="" className={`icon-action`} />
            </div>
          </Tooltip>
          <div className={`relative`}>
            <img
              src={infoOther.avatarUrl ? infoOther.avatarUrl : avatarDefault}
              crossOrigin="anonymous"
              alt=""
              className={`img-avt`}
            />
          </div>
        </div>
        {errorInfoOther && errorInfoOther.avatar && (
          <span className={`error !mt-[22px]`}>
            <div className={`icon`}>
              <InlineSVG src={IconWarning} width={14} height={14} />
            </div>
            {errorInfoOther.avatar}
          </span>
        )}
      </div>

      <div className={`input-wrap`}>
        <div className="label-wrap">
          <label htmlFor="name" className={`required label-input`}>
            Họ và tên
          </label>
        </div>
        <Input
          id="name"
          value={infoOther.name}
          onFocus={() => handleFocus('name')}
          onChange={(e) => handleChangeInputInfo(e, 'name')}
          className={`main-input ${errorInfoOther && errorInfoOther.name ? 'error-input' : ''}`}
          placeholder={'Nhập họ và tên'}
        />
        {errorInfoOther && errorInfoOther.name && (
          <span className={`error`}>
            <div className={`icon`}>
              <InlineSVG src={IconWarning} width={14} height={14} />
            </div>
            {errorInfoOther.name}
          </span>
        )}
      </div>

      <div className={`input-wrap`}>
        <div className="label-wrap">
          <label htmlFor="email" className={`required label-input`}>
            Email
          </label>
        </div>
        <Input
          id="email"
          value={infoOther.email}
          onFocus={() => handleFocus('email')}
          onChange={(e) => handleChangeInputInfo(e, 'email')}
          className={`main-input ${errorInfoOther && errorInfoOther.email ? 'error-input' : ''}`}
          placeholder={'Nhập email'}
        />
        {errorInfoOther && errorInfoOther.email && (
          <span className={`error`}>
            <div className={`icon`}>
              <InlineSVG src={IconWarning} width={14} height={14} />
            </div>
            {errorInfoOther.email}
          </span>
        )}
      </div>

      <div className={`${configModalOther.type === TYPE_SUBMIT.CREATE ? 'input-wrap' : 'hidden'}`}>
        <div className="label-wrap">
          <label htmlFor="password" className={`required label-input`}>
            Mật khẩu
          </label>
        </div>
        <Input.Password
          id="password"
          value={infoOther.password}
          onFocus={() => handleFocus('password')}
          onChange={(e) => handleChangeInputInfo(e, 'password')}
          className={`main-input ${errorInfoOther && errorInfoOther.password ? 'error-input' : ''}`}
          placeholder={'Nhập mật khẩu'}
        />
        {errorInfoOther && errorInfoOther.password && (
          <span className={`error`}>
            <div className={`icon`}>
              <InlineSVG src={IconWarning} width={14} height={14} />
            </div>
            {errorInfoOther.password}
          </span>
        )}
      </div>

      <div className={`input-wrap`}>
        <div className="label-wrap">
          <label htmlFor="phone" className="cursor-pointer label-input">
            Số điện thoại
          </label>
        </div>
        <Input
          id="phone"
          value={infoOther.phone}
          onFocus={() => handleFocus('phone')}
          onChange={(e) => handleChangeInputInfo(e, 'phone')}
          className={`main-input ${errorInfoOther && errorInfoOther.phone ? 'error-input' : ''}`}
          placeholder={'Nhập số điện thoại'}
        />
        {errorInfoOther && errorInfoOther.phone && (
          <span className={`error`}>
            <div className={`icon`}>
              <InlineSVG src={IconWarning} width={14} height={14} />
            </div>
            {errorInfoOther.phone}
          </span>
        )}
      </div>

      <Row>
        <Col sm={18} xs={24}>
          <div className={`${configModalOther.type === TYPE_SUBMIT.CREATE ? 'hidden' : 'input-wrap'}`}>
            <div className="label-wrap">
              <label htmlFor="phone" className="cursor-pointer label-input">
                Nhóm người dùng
              </label>
            </div>
            <Radio.Group
              onChange={(e) => hanleChangeUserType(e)}
              value={infoOther.user_type}
            >
              <Space>
                <Radio value={USER_TYPE.TEACHER}>Giáo viên</Radio>
                <Radio value={USER_TYPE.STUDENT}>Sinh viên</Radio>
                <Radio value={USER_TYPE.OTHER}>Khác</Radio>
              </Space>
            </Radio.Group>
          </div>
        </Col>
        <Col sm={6} xs={24}>
          {authOther._id !== infoOther._id && (
            <div className={`${configModalOther.type === TYPE_SUBMIT.CREATE ? 'hidden' : 'input-wrap'}`}>
              <div className="label-wrap">
                <label htmlFor="" className={`label-input`}>
                  Trạng thái
                </label>
              </div>
              <Switch
                className={`main-switch ${errorInfoOther && errorInfoOther.status ? 'error-input' : ''}`}
                checked={infoOther.status === USER_STATUS.UNLOCK ? true : false}
                onChange={(checked) => handleSwitchChange(checked)}
              />
              {errorInfoOther && errorInfoOther.status && (
                <span className={`error`}>
                  <div className={`icon`}>
                    <InlineSVG src={IconWarning} width={14} height={14} />
                  </div>
                  {errorInfoOther.status}
                </span>
              )}
            </div>
          )}
        </Col>
      </Row>

      <div className={`flex justify-center mt-8`}>
        <Button
          className={`ant-btn-close mx-[5px]`}
          size={'large'}
          onClick={handleCancelModalCreateOrUpdateOther}
        >
          Đóng
        </Button>
        {configModalOther.type === TYPE_SUBMIT.CREATE ? (
          <Button
            loading={isLoadingBtnCreateOther}
            className={`ant-btn-primary mx-[5px]`}
            size={'large'}
            onClick={() => handleSubmit(TYPE_SUBMIT.CREATE, createOrUpdateOtherSchema, infoOther)}
          >
            Tạo mới
          </Button>
        ) : (
          <Button
            loading={isLoadingBtnUpdateOther}
            className={`ant-btn-primary mx-[5px]`}
            size={'large'}
            onClick={() => handleSubmit(TYPE_SUBMIT.UPDATE, createOrUpdateOtherSchema, infoOther)}
          >
            Cập nhật
          </Button>
        )}
      </div>
    </div>
  );
}

export default ModalCreateOrUpdate;
