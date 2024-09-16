import React from 'react';
import InlineSVG from 'react-inlinesvg';
import IconWarning from '@/assets/images/icons/light/warning.svg';
import {Button, Col, Input, Radio, Row, Space, Switch, Tooltip} from 'antd';
import {TYPE_SUBMIT, USER_STATUS, USER_TYPE} from '@/utils/constants';
import './styles.scss';
import {useDispatch, useSelector} from 'react-redux';
import Handle from '@/pages/Partner/components/TeacherComponent/components/ModalCreateOrUpdate/handle.js';
import {createOrUpdateTeacherSchema} from '../../schema';
import IconEditAvatar from '@/assets/images/icons/duotone/pencil.svg';
import Close from '@/assets/images/icons/duotone/xmark.svg';
import {setInfoTeacher} from '@/states/modules/partner';
import avatarDefault from '@/assets/images/user/default-avatar-point.png';

function ModalCreateOrUpdate() {
  const dispatch = useDispatch();

  const configModalTeacher = useSelector((state) => state.partner.configModalTeacher);
  const isLoadingBtnCreateTeacher = useSelector((state) => state.partner.isLoadingBtnCreateTeacher);
  const isLoadingBtnUpdateTeacher = useSelector((state) => state.partner.isLoadingBtnUpdateTeacher);
  const infoTeacher = useSelector((state) => state.partner.infoTeacher);
  const errorInfoTeacher = useSelector((state) => state.partner.errorInfoTeacher);
  const authTeacher = useSelector((state) => state.auth.authUser);

  const {
    handleChangeAvatar,
    handleChangeInputInfo,
    handleFocus,
    handleCancelModalCreateOrUpdateTeacher,
    handleSubmit,
    handleSwitchChange,
    hanleChangeUserType
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
              onClick={() => dispatch(setInfoTeacher({...infoTeacher, avatarUrl: '', avatar: 'delete'}))}
            >
              <InlineSVG src={Close} alt="" className={`icon-action`} />
            </div>
          </Tooltip>
          <div className={`relative`}>
            <img
              src={infoTeacher.avatarUrl ? infoTeacher.avatarUrl : avatarDefault}
              crossOrigin="anonymous"
              alt=""
              className={`img-avt`}
            />
          </div>
        </div>
        {errorInfoTeacher && errorInfoTeacher.avatar && (
          <span className={`error !mt-[22px]`}>
            <div className={`icon`}>
              <InlineSVG src={IconWarning} width={14} height={14} />
            </div>
            {errorInfoTeacher.avatar}
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
          value={infoTeacher.name}
          onFocus={() => handleFocus('name')}
          onChange={(e) => handleChangeInputInfo(e, 'name')}
          className={`main-input ${errorInfoTeacher && errorInfoTeacher.name ? 'error-input' : ''}`}
          placeholder={'Nhập họ và tên'}
        />
        {errorInfoTeacher && errorInfoTeacher.name && (
          <span className={`error`}>
            <div className={`icon`}>
              <InlineSVG src={IconWarning} width={14} height={14} />
            </div>
            {errorInfoTeacher.name}
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
          value={infoTeacher.email}
          onFocus={() => handleFocus('email')}
          onChange={(e) => handleChangeInputInfo(e, 'email')}
          className={`main-input ${errorInfoTeacher && errorInfoTeacher.email ? 'error-input' : ''}`}
          placeholder={'Nhập email'}
        />
        {errorInfoTeacher && errorInfoTeacher.email && (
          <span className={`error`}>
            <div className={`icon`}>
              <InlineSVG src={IconWarning} width={14} height={14} />
            </div>
            {errorInfoTeacher.email}
          </span>
        )}
      </div>

      <div className={`${configModalTeacher.type === TYPE_SUBMIT.CREATE ? 'input-wrap' : 'hidden'}`}>
        <div className="label-wrap">
          <label htmlFor="password" className={`required label-input`}>
            Mật khẩu
          </label>
        </div>
        <Input.Password
          id="password"
          value={infoTeacher.password}
          onFocus={() => handleFocus('password')}
          onChange={(e) => handleChangeInputInfo(e, 'password')}
          className={`main-input ${errorInfoTeacher && errorInfoTeacher.password ? 'error-input' : ''}`}
          placeholder={'Nhập mật khẩu'}
        />
        {errorInfoTeacher && errorInfoTeacher.password && (
          <span className={`error`}>
            <div className={`icon`}>
              <InlineSVG src={IconWarning} width={14} height={14} />
            </div>
            {errorInfoTeacher.password}
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
          value={infoTeacher.phone}
          onFocus={() => handleFocus('phone')}
          onChange={(e) => handleChangeInputInfo(e, 'phone')}
          className={`main-input ${errorInfoTeacher && errorInfoTeacher.phone ? 'error-input' : ''}`}
          placeholder={'Nhập số điện thoại'}
        />
        {errorInfoTeacher && errorInfoTeacher.phone && (
          <span className={`error`}>
            <div className={`icon`}>
              <InlineSVG src={IconWarning} width={14} height={14} />
            </div>
            {errorInfoTeacher.phone}
          </span>
        )}
      </div>

      <Row>
        <Col sm={18} xs={24}>
          <div className={`${configModalTeacher.type === TYPE_SUBMIT.CREATE ? 'hidden' : 'input-wrap'}`}>
            <div className="label-wrap">
              <label htmlFor="phone" className="cursor-pointer label-input">
                Nhóm người dùng
              </label>
            </div>
            <Radio.Group onChange={(e) => hanleChangeUserType(e)} value={infoTeacher.user_type}>
              <Space>
                <Radio value={USER_TYPE.TEACHER}>Giáo viên</Radio>
                <Radio value={USER_TYPE.STUDENT}>Sinh viên</Radio>
                <Radio value={USER_TYPE.OTHER}>Khác</Radio>
              </Space>
            </Radio.Group>
          </div>
        </Col>
        <Col sm={6} xs={24}>
          {authTeacher._id !== infoTeacher._id && (
            <div className={`${configModalTeacher.type === TYPE_SUBMIT.CREATE ? 'hidden' : 'input-wrap'}`}>
              <div className="label-wrap">
                <label htmlFor="" className={`label-input`}>
                  Trạng thái
                </label>
              </div>
              <Switch
                className={`main-switch ${errorInfoTeacher && errorInfoTeacher.status ? 'error-input' : ''}`}
                checked={infoTeacher.status === USER_STATUS.UNLOCK ? true : false}
                onChange={(checked) => handleSwitchChange(checked)}
              />
              {errorInfoTeacher && errorInfoTeacher.status && (
                <span className={`error`}>
                  <div className={`icon`}>
                    <InlineSVG src={IconWarning} width={14} height={14} />
                  </div>
                  {errorInfoTeacher.status}
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
          onClick={handleCancelModalCreateOrUpdateTeacher}
        >
          Đóng
        </Button>
        {configModalTeacher.type === TYPE_SUBMIT.CREATE ? (
          <Button
            loading={isLoadingBtnCreateTeacher}
            className={`ant-btn-primary mx-[5px]`}
            size={'large'}
            onClick={() => handleSubmit(TYPE_SUBMIT.CREATE, createOrUpdateTeacherSchema, infoTeacher)}
          >
            Tạo mới
          </Button>
        ) : (
          <Button
            loading={isLoadingBtnUpdateTeacher}
            className={`ant-btn-primary mx-[5px]`}
            size={'large'}
            onClick={() => handleSubmit(TYPE_SUBMIT.UPDATE, createOrUpdateTeacherSchema, infoTeacher)}
          >
            Cập nhật
          </Button>
        )}
      </div>
    </div>
  );
}

export default ModalCreateOrUpdate;
