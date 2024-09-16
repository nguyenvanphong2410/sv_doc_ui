import React from 'react'
import IconEditAvatar from '@/assets/images/icons/duotone/pencil.svg'
import InlineSVG from 'react-inlinesvg'
import { useDispatch, useSelector } from 'react-redux'
import avatarDefault from '@/assets/images/user/default-avatar-point.png'
import Close from '@/assets/images/icons/duotone/xmark.svg'
import { setInfoEmployee } from '@/states/modules/employee'
import IconWarning from '@/assets/images/icons/light/warning.svg'
import { Button, Input, Switch, Tooltip } from 'antd'
import Handle from '@/pages/Employee/handle'
import { TYPE_SUBMIT, USER_STATUS } from '@/utils/constants'
import { createEmployeeSchema, updateEmployeeSchema } from '../../schema'

function ModalCreateOrUpdateEmployee() {
  const dispatch = useDispatch()
  const errorInfoEmployee = useSelector((state) => state.employee.errorInfoEmployee)
  const isLoadingBtnCreateEmployee = useSelector((state) => state.employee.isLoadingBtnCreateEmployee)
  const isLoadingBtnUpdateEmployee = useSelector((state) => state.employee.isLoadingBtnUpdateEmployee);
  const infoEmployee = useSelector((state) => state.employee.infoEmployee)
  const configModal = useSelector((state) => state.employee.configModal);
  const authEmployee = useSelector((state) => state.auth.authUser)

  const {
    handleChangeAvatar,
    handleChangeInputInfo,
    handleFocus,
    handleCancelModalCreateOrUpdateEmployee,
    handleSubmit,
    handleSwitchChange
  } = Handle()

  return (
    <div>
      <div className={`input-wrap mb-6`}>
        <div className={`label-wrap`}>
          <label htmlFor="" className={`label-input`}>Ảnh đại diện</label>
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
            <label
              className={`icon-img icon-edit-img`}
              htmlFor="imageUpload"
            >
              <InlineSVG src={IconEditAvatar} alt="" className={`icon-action`} />
            </label>
          </Tooltip>
          <Tooltip title="Xóa ảnh đại diện">
            <div
              className={`icon-img icon-remove-img`}
              onClick={() => dispatch(setInfoEmployee({ ...infoEmployee, avatarUrl: '', avatar: 'delete' }))}
            >
              <InlineSVG src={Close} alt="" className={`icon-action`} />
            </div>
          </Tooltip>
          <div className={`relative`}>
            <img
              src={infoEmployee.avatarUrl ? infoEmployee.avatarUrl : avatarDefault}
              crossOrigin="anonymous"
              alt=""
              className={`img-avt`}
            />
          </div>
        </div>
        {
          errorInfoEmployee && errorInfoEmployee.avatar &&
          <span className={`error !mt-[22px]`}>
            <div className={`icon`}>
              <InlineSVG src={IconWarning} width={14} height={14} />
            </div>
            {errorInfoEmployee.avatar}
          </span>
        }
      </div>

      <div className={`input-wrap`}>
        <div className="label-wrap">
          <label htmlFor="name" className={`required label-input`}>
            Họ và tên
          </label>
        </div>
        <Input
          id="name"
          value={infoEmployee.name}
          onFocus={() => handleFocus('name')}
          onChange={(e) => handleChangeInputInfo(e, 'name')}
          className={`main-input ${errorInfoEmployee && errorInfoEmployee.name ? 'error-input' : ''}`}
          placeholder={'Nhập họ và tên'}
        />
        {
          errorInfoEmployee && errorInfoEmployee.name &&
          <span className={`error`}>
            <div className={`icon`}>
              <InlineSVG src={IconWarning} width={14} height={14} />
            </div>
            {errorInfoEmployee.name}
          </span>
        }
      </div>

      <div className={`input-wrap`}>
        <div className="label-wrap">
          <label htmlFor="email" className={`required label-input`}>
            Email
          </label>
        </div>
        <Input
          id="email"
          value={infoEmployee.email}
          onFocus={() => handleFocus('email')}
          onChange={(e) => handleChangeInputInfo(e, 'email')}
          className={`main-input ${errorInfoEmployee && errorInfoEmployee.email ? 'error-input' : ''}`}
          placeholder={'Nhập email'}
        />
        {
          errorInfoEmployee && errorInfoEmployee.email &&
          <span className={`error`}>
            <div className={`icon`}>
              <InlineSVG src={IconWarning} width={14} height={14} />
            </div>
            {errorInfoEmployee.email}
          </span>
        }
      </div>

      <div className={`${configModal.type === TYPE_SUBMIT.CREATE ? 'input-wrap' : 'hidden'}`}>
        <div className="label-wrap">
          <label htmlFor="password" className={`required label-input`}>
            Mật khẩu
          </label>
        </div>
        <Input.Password
          id="password"
          value={infoEmployee.password}
          onFocus={() => handleFocus('password')}
          onChange={(e) => handleChangeInputInfo(e, 'password')}
          className={`main-input ${errorInfoEmployee && errorInfoEmployee.password ? 'error-input' : ''}`}
          placeholder={'Nhập mật khẩu'}
        />
        {
          errorInfoEmployee && errorInfoEmployee.password &&
          <span className={`error`}>
            <div className={`icon`}>
              <InlineSVG src={IconWarning} width={14} height={14} />
            </div>
            {errorInfoEmployee.password}
          </span>
        }
      </div>

      <div className={`input-wrap`}>
        <div className="label-wrap">
          <label htmlFor="phone" className="cursor-pointer label-input">
            Số điện thoại
          </label>
        </div>
        <Input
          id="phone"
          value={infoEmployee.phone}
          onFocus={() => handleFocus('phone')}
          onChange={(e) => handleChangeInputInfo(e, 'phone')}
          className={`main-input ${errorInfoEmployee && errorInfoEmployee.phone ? 'error-input' : ''}`}
          placeholder={'Nhập số điện thoại'}
        />
        {
          errorInfoEmployee && errorInfoEmployee.phone &&
          <span className={`error`}>
            <div className={`icon`}>
              <InlineSVG src={IconWarning} width={14} height={14} />
            </div>
            {errorInfoEmployee.phone}
          </span>
        }
      </div>

      {
        authEmployee._id !== infoEmployee._id &&
        <div className={`${configModal.type === TYPE_SUBMIT.CREATE ? 'hidden' : 'input-wrap'}`}>
          <div className="label-wrap">
            <label htmlFor="" className={`label-input`}>Trạng thái</label>
          </div>
          <Switch
            className={`main-switch ${errorInfoEmployee && errorInfoEmployee.status ? 'error-input' : ''}`}
            checked={infoEmployee.status === USER_STATUS.UNLOCK ? true : false}
            onChange={(checked) => handleSwitchChange(checked)}
          />
          {
            errorInfoEmployee && errorInfoEmployee.status &&
            <span className={`error`}>
              <div className={`icon`}>
                <InlineSVG src={IconWarning} width={14} height={14}/>
              </div>
              {errorInfoEmployee.status}
            </span>
          }
        </div>
      }

      <div className={`flex justify-center mt-8`}>
        <Button
          className={`ant-btn-close mx-[5px]`}
          size={'large'}
          onClick={handleCancelModalCreateOrUpdateEmployee}
        >
          Đóng
        </Button>
        {
          configModal.type === TYPE_SUBMIT.CREATE ?
            <Button
              loading={isLoadingBtnCreateEmployee}
              className={`ant-btn-primary mx-[5px]`}
              size={'large'}
              onClick={() => handleSubmit(TYPE_SUBMIT.CREATE, createEmployeeSchema, infoEmployee)}
            >
              Tạo mới
            </Button> :
            <Button
              loading={isLoadingBtnUpdateEmployee}
              className={`ant-btn-primary mx-[5px]`}
              size={'large'}
              onClick={() => handleSubmit(TYPE_SUBMIT.UPDATE, updateEmployeeSchema, infoEmployee)}
            >
              Cập nhật
            </Button>
        }
      </div>
    </div>
  )
}

export default ModalCreateOrUpdateEmployee
