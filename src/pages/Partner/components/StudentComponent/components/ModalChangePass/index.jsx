import React from 'react'
import InlineSVG from 'react-inlinesvg'
import {useSelector} from 'react-redux'
import IconWarning from '@/assets/images/icons/light/warning.svg'
import {Button, Input} from 'antd'
import Handle from './handle'
import {TYPE_SUBMIT} from '@/utils/constants'
import { passwordStudentSchema } from './schema'

function ModalChangePassStudent() {
  const dataChangePassStudent = useSelector((state) => state.partner.dataChangePassStudent)
  const errorDataChangePassStudent = useSelector((state) => state.partner.errorDataChangePassStudent)
  const isLoadingBtnChangePassWordStudent = useSelector((state) => state.partner.isLoadingBtnChangePassWordStudent)

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
          value={dataChangePassStudent.new_password}
          onChange={(e) => handleChangeInputInfo(e, 'new_password')}
          onFocus={() => handleFocus('new_password')}
          className={`main-input ${
            errorDataChangePassStudent && errorDataChangePassStudent.new_password ? 'error-input' : ''
          }`}
          placeholder={'Nhập mật khẩu mới'}
        />
        {
          errorDataChangePassStudent && errorDataChangePassStudent.new_password &&
          <span className={`error`}>
            <div className={`icon`}>
              <InlineSVG src={IconWarning} width={14} height={14}/>
            </div>
            {errorDataChangePassStudent.new_password}
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
          value={dataChangePassStudent.confirm_password}
          onChange={(e) => handleChangeInputInfo(e, 'confirm_password')}
          onFocus={() => handleFocus('confirm_password')}
          className={`main-input ${
            errorDataChangePassStudent && errorDataChangePassStudent.confirm_password ? 'error-input' : ''
          }`}
          placeholder={'Xác nhận mật khẩu'}
        />
        {
          errorDataChangePassStudent && errorDataChangePassStudent.confirm_password &&
          <span className={`error`}>
            <div className={`icon`}>
              <InlineSVG src={IconWarning} width={14} height={14}/>
            </div>
            {errorDataChangePassStudent.confirm_password}
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
          loading={isLoadingBtnChangePassWordStudent}
          className={`ant-btn-primary mx-[5px]`}
          size={'large'}
          onClick={() => handleSubmit(TYPE_SUBMIT.CHANGE_PASSWORD, passwordStudentSchema, dataChangePassStudent)}
        >
          Cập nhật
        </Button>
      </div>
    </div>
  )
}

export default ModalChangePassStudent
