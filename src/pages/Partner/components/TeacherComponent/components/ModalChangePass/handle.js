import { handleChangePassTeacher } from '@/api/partners'
import { setDataChangePassTeacher, setErrorDataChangePassTeacher, setVisibleModalChangePass } from '@/states/modules/partner'
import { TYPE_SUBMIT } from '@/utils/constants'
import { validate } from '@/utils/validates'
import _ from 'lodash'
import {useDispatch, useSelector} from 'react-redux'

export default function Handle() {
  const dispatch = useDispatch()
  const dataChangePassTeacher = useSelector((state) => state.partner.dataChangePassTeacher)
  const errorDataChangePassTeacher = useSelector((state) => state.partner.errorDataChangePassTeacher)
  
  const handleChangeInputInfo = (valueInput, type) => {
    let value = valueInput.target.value
    let data = _.cloneDeep(dataChangePassTeacher)
    let dataError = _.cloneDeep(errorDataChangePassTeacher)
    data[type] = value
    dataError[type] = ''
    dispatch(setDataChangePassTeacher(data))
    dispatch(setErrorDataChangePassTeacher(dataError))
  }
  
  const handleFocus = (type) => {
    let dataError = _.cloneDeep(errorDataChangePassTeacher)
    dataError[type] = ''
    dispatch(setErrorDataChangePassTeacher(dataError))
  }

  const handleSubmit = (type, scheme, dataTeacher) => { 
    if (type === TYPE_SUBMIT.CHANGE_PASSWORD) {
      validate(scheme, dataTeacher, {
        onSuccess: (data) => dispatch(handleChangePassTeacher(data._id, data)),
        onError: (error) => dispatch(setErrorDataChangePassTeacher(error)),
      })
    }
  }
  const handleCancelModalChangePass = () => {
    dispatch(
      setDataChangePassTeacher({
        new_password: '',
        confirm_password: '',
      })
    )
    dispatch(
      setErrorDataChangePassTeacher({
        new_password: '',
        confirm_password: '',
      })
    )
    dispatch(setVisibleModalChangePass(false))
  }
  
  return {
    handleChangeInputInfo,
    handleFocus,
    handleSubmit,
    handleCancelModalChangePass
  }
}
