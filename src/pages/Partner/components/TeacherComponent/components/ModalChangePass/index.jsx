import React from 'react'
import InlineSVG from 'react-inlinesvg'
import {useSelector} from 'react-redux'
import IconWarning from '@/assets/images/icons/light/warning.svg'
import {Button, Input} from 'antd'
import Handle from './handle'
import {TYPE_SUBMIT} from '@/utils/constants'
import { passwordTeacherSchema } from './schema'

function ModalChangePassTeacher() {
  const dataChangePassTeacher = useSelector((state) => state.partner.dataChangePassTeacher)
  const errorDataChangePassTeacher = useSelector((state) => state.partner.errorDataChangePassTeacher)
  const isLoadingBtnChangePassWordTeacher = useSelector((state) => state.partner.isLoadingBtnChangePassWordTeacher)

  const {
    handleChangeInputInfo,
    handleFocus,
    handleSubmit,
    handleCancelModalChangePass
  } = Handle()
  
  return (
    <div>
      <div className={`input-wrap`}>
        <div className="label-wrap">
          <label htmlFor="new_password" className={`required label-input`}>
            Mật khẩu mới
          </label>
        </div>
        <Input.Password
          id="new_password"
          value={dataChangePassTeacher.new_password}
          onChange={(e) => handleChangeInputInfo(e, 'new_password')}
          onFocus={() => handleFocus('new_password')}
          className={`main-input ${
            errorDataChangePassTeacher && errorDataChangePassTeacher.new_password ? 'error-input' : ''
          }`}
          placeholder={'Nhập mật khẩu mới'}
        />
        {
          errorDataChangePassTeacher && errorDataChangePassTeacher.new_password &&
          <span className={`error`}>
            <div className={`icon`}>
              <InlineSVG src={IconWarning} width={14} height={14}/>
            </div>
            {errorDataChangePassTeacher.new_password}
          </span>
        }
      </div>
      
      <div className={`input-wrap`}>
        <div className="label-wrap">
          <label className="required label-input" htmlFor="confirm_password">
            Xác nhận mật khẩu
          </label>
        </div>
        <Input.Password
          id="confirm_password"
          value={dataChangePassTeacher.confirm_password}
          onChange={(e) => handleChangeInputInfo(e, 'confirm_password')}
          onFocus={() => handleFocus('confirm_password')}
          className={`main-input ${
            errorDataChangePassTeacher && errorDataChangePassTeacher.confirm_password ? 'error-input' : ''
          }`}
          placeholder={'Xác nhận mật khẩu'}
        />
        {
          errorDataChangePassTeacher && errorDataChangePassTeacher.confirm_password &&
          <span className={`error`}>
            <div className={`icon`}>
              <InlineSVG src={IconWarning} width={14} height={14}/>
            </div>
            {errorDataChangePassTeacher.confirm_password}
          </span>
        }
      </div>
      
      <div className={`flex justify-center mt-8`}>
        <Button
          className={`ant-btn-close mx-[5px]`}
          size={'large'}
          onClick={handleCancelModalChangePass}
        >
          Đóng
        </Button>
        <Button
          loading={isLoadingBtnChangePassWordTeacher}
          className={`ant-btn-primary mx-[5px]`}
          size={'large'}
          onClick={() => handleSubmit(TYPE_SUBMIT.CHANGE_PASSWORD, passwordTeacherSchema, dataChangePassTeacher)}
        >
          Cập nhật
        </Button>
      </div>
    </div>
  )
}

export default ModalChangePassTeacher
