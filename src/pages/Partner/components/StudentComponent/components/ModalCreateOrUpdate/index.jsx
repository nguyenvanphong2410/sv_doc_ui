import React from 'react';
import InlineSVG from 'react-inlinesvg';
import IconWarning from '@/assets/images/icons/light/warning.svg';
import {Button, Col, Input, Radio, Row, Space, Switch, Tooltip} from 'antd';
import {TYPE_SUBMIT, USER_STATUS, USER_TYPE} from '@/utils/constants';
import './styles.scss';
import {useDispatch, useSelector} from 'react-redux';
import Handle from '@/pages/Partner/components/StudentComponent/components/ModalCreateOrUpdate/handle.js';
import {createOrUpdateStudentSchema} from '../../schema';
import IconEditAvatar from '@/assets/images/icons/duotone/pencil.svg';
import Close from '@/assets/images/icons/duotone/xmark.svg';
import {setInfoStudent} from '@/states/modules/partner';
import avatarDefault from '@/assets/images/user/default-avatar-point.png';

function ModalCreateOrUpdate() {
  const dispatch = useDispatch();

  const configModalStudent = useSelector((state) => state.partner.configModalStudent);
  const isLoadingBtnCreateStudent = useSelector((state) => state.partner.isLoadingBtnCreateStudent);
  const isLoadingBtnUpdateStudent = useSelector((state) => state.partner.isLoadingBtnUpdateStudent);
  const infoStudent = useSelector((state) => state.partner.infoStudent);
  const errorInfoStudent = useSelector((state) => state.partner.errorInfoStudent);
  const authStudent = useSelector((state) => state.auth.authUser);

  const {
    handleChangeAvatar,
    handleChangeInputInfo,
    handleFocus,
    handleCancelModalCreateOrUpdateStudent,
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
              onClick={() => dispatch(setInfoStudent({...infoStudent, avatarUrl: '', avatar: 'delete'}))}
            >
              <InlineSVG src={Close} alt="" className={`icon-action`} />
            </div>
          </Tooltip>
          <div className={`relative`}>
            <img
              src={infoStudent.avatarUrl ? infoStudent.avatarUrl : avatarDefault}
              crossOrigin="anonymous"
              alt=""
              className={`img-avt`}
            />
          </div>
        </div>
        {errorInfoStudent && errorInfoStudent.avatar && (
          <span className={`error !mt-[22px]`}>
            <div className={`icon`}>
              <InlineSVG src={IconWarning} width={14} height={14} />
            </div>
            {errorInfoStudent.avatar}
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
          value={infoStudent.name}
          onFocus={() => handleFocus('name')}
          onChange={(e) => handleChangeInputInfo(e, 'name')}
          className={`main-input ${errorInfoStudent && errorInfoStudent.name ? 'error-input' : ''}`}
          placeholder={'Nhập họ và tên'}
        />
        {errorInfoStudent && errorInfoStudent.name && (
          <span className={`error`}>
            <div className={`icon`}>
              <InlineSVG src={IconWarning} width={14} height={14} />
            </div>
            {errorInfoStudent.name}
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
          value={infoStudent.email}
          onFocus={() => handleFocus('email')}
          onChange={(e) => handleChangeInputInfo(e, 'email')}
          className={`main-input ${errorInfoStudent && errorInfoStudent.email ? 'error-input' : ''}`}
          placeholder={'Nhập email'}
        />
        {errorInfoStudent && errorInfoStudent.email && (
          <span className={`error`}>
            <div className={`icon`}>
              <InlineSVG src={IconWarning} width={14} height={14} />
            </div>
            {errorInfoStudent.email}
          </span>
        )}
      </div>

      <div className={`${configModalStudent.type === TYPE_SUBMIT.CREATE ? 'input-wrap' : 'hidden'}`}>
        <div className="label-wrap">
          <label htmlFor="password" className={`required label-input`}>
            Mật khẩu
          </label>
        </div>
        <Input.Password
          id="password"
          value={infoStudent.password}
          onFocus={() => handleFocus('password')}
          onChange={(e) => handleChangeInputInfo(e, 'password')}
          className={`main-input ${errorInfoStudent && errorInfoStudent.password ? 'error-input' : ''}`}
          placeholder={'Nhập mật khẩu'}
        />
        {errorInfoStudent && errorInfoStudent.password && (
          <span className={`error`}>
            <div className={`icon`}>
              <InlineSVG src={IconWarning} width={14} height={14} />
            </div>
            {errorInfoStudent.password}
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
          value={infoStudent.phone}
          onFocus={() => handleFocus('phone')}
          onChange={(e) => handleChangeInputInfo(e, 'phone')}
          className={`main-input ${errorInfoStudent && errorInfoStudent.phone ? 'error-input' : ''}`}
          placeholder={'Nhập số điện thoại'}
        />
        {errorInfoStudent && errorInfoStudent.phone && (
          <span className={`error`}>
            <div className={`icon`}>
              <InlineSVG src={IconWarning} width={14} height={14} />
            </div>
            {errorInfoStudent.phone}
          </span>
        )}
      </div>

      <Row>
        <Col sm={18} xs={24}>
          <div className={`${configModalStudent.type === TYPE_SUBMIT.CREATE ? 'hidden' : 'input-wrap'}`}>
            <div className="label-wrap">
              <label htmlFor="phone" className="cursor-pointer label-input">
                Nhóm người dùng
              </label>
            </div>
            <Radio.Group
              onChange={(e) => hanleChangeUserType(e)}
              value={infoStudent.user_type}
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
          {authStudent._id !== infoStudent._id && (
            <div className={`${configModalStudent.type === TYPE_SUBMIT.CREATE ? 'hidden' : 'input-wrap'}`}>
              <div className="label-wrap">
                <label htmlFor="" className={`label-input`}>
                  Trạng thái
                </label>
              </div>
              <Switch
                className={`main-switch ${errorInfoStudent && errorInfoStudent.status ? 'error-input' : ''}`}
                checked={infoStudent.status === USER_STATUS.UNLOCK ? true : false}
                onChange={(checked) => handleSwitchChange(checked)}
              />
              {errorInfoStudent && errorInfoStudent.status && (
                <span className={`error`}>
                  <div className={`icon`}>
                    <InlineSVG src={IconWarning} width={14} height={14} />
                  </div>
                  {errorInfoStudent.status}
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
          onClick={handleCancelModalCreateOrUpdateStudent}
        >
          Đóng
        </Button>
        {configModalStudent.type === TYPE_SUBMIT.CREATE ? (
          <Button
            loading={isLoadingBtnCreateStudent}
            className={`ant-btn-primary mx-[5px]`}
            size={'large'}
            onClick={() => handleSubmit(TYPE_SUBMIT.CREATE, createOrUpdateStudentSchema, infoStudent)}
          >
            Tạo mới
          </Button>
        ) : (
          <Button
            loading={isLoadingBtnUpdateStudent}
            className={`ant-btn-primary mx-[5px]`}
            size={'large'}
            onClick={() => handleSubmit(TYPE_SUBMIT.UPDATE, createOrUpdateStudentSchema, infoStudent)}
          >
            Cập nhật
          </Button>
        )}
      </div>
    </div>
  );
}

export default ModalCreateOrUpdate;
