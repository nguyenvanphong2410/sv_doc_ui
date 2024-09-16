import React from 'react'
import InlineSVG from 'react-inlinesvg'
import {useSelector} from 'react-redux'
import IconWarning from '@/assets/images/icons/light/warning.svg'
import {Button, Input} from 'antd'
import Handle from './handle'
import HandleEmployee from '@/pages/Employee/handle'
import {TYPE_SUBMIT} from '@/utils/constants'
import { passwordEmployeeSchema } from '../../schema'

function ModalChangePassEmployee() {
  const dataChangePassEmployee = useSelector((state) => state.employee.dataChangePassEmployee)
  const errorDataChangePassEmployee = useSelector((state) => state.employee.errorDataChangePassEmployee)
  const isLoadingBtnChangePassWordEmployee = useSelector((state) => state.employee.isLoadingBtnChangePassWordEmployee)

  const {
    handleChangeInputInfo,
    handleFocus
  } = Handle()
  const {
    handleSubmit,
    handleCancelModalChangePass
  } = HandleEmployee()
  
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
          value={dataChangePassEmployee.new_password}
          onChange={(e) => handleChangeInputInfo(e, 'new_password')}
          onFocus={() => handleFocus('new_password')}
          className={`main-input ${
            errorDataChangePassEmployee && errorDataChangePassEmployee.new_password ? 'error-input' : ''
          }`}
          placeholder={'Nhập mật khẩu mới'}
        />
        {
          errorDataChangePassEmployee && errorDataChangePassEmployee.new_password &&
          <span className={`error`}>
            <div className={`icon`}>
              <InlineSVG src={IconWarning} width={14} height={14}/>
            </div>
            {errorDataChangePassEmployee.new_password}
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
          value={dataChangePassEmployee.confirm_password}
          onChange={(e) => handleChangeInputInfo(e, 'confirm_password')}
          onFocus={() => handleFocus('confirm_password')}
          className={`main-input ${
            errorDataChangePassEmployee && errorDataChangePassEmployee.confirm_password ? 'error-input' : ''
          }`}
          placeholder={'Xác nhận mật khẩu'}
        />
        {
          errorDataChangePassEmployee && errorDataChangePassEmployee.confirm_password &&
          <span className={`error`}>
            <div className={`icon`}>
              <InlineSVG src={IconWarning} width={14} height={14}/>
            </div>
            {errorDataChangePassEmployee.confirm_password}
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
          loading={isLoadingBtnChangePassWordEmployee}
          className={`ant-btn-primary mx-[5px]`}
          size={'large'}
          onClick={() => handleSubmit(TYPE_SUBMIT.CHANGE_PASSWORD, passwordEmployeeSchema, dataChangePassEmployee)}
        >
          Cập nhật
        </Button>
      </div>
    </div>
  )
}

export default ModalChangePassEmployee
