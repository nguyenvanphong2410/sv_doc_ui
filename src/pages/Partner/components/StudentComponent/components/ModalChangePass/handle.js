import { handleChangePassStudent } from '@/api/partners'
import { setDataChangePassStudent, setErrorDataChangePassStudent, setVisibleModalChangePassStudent } from '@/states/modules/partner'
import { TYPE_SUBMIT } from '@/utils/constants'
import { validate } from '@/utils/validates'
import _ from 'lodash'
import {useDispatch, useSelector} from 'react-redux'

export default function Handle() {
  const dispatch = useDispatch()
  const dataChangePassStudent = useSelector((state) => state.partner.dataChangePassStudent)
  const errorDataChangePassStudent = useSelector((state) => state.partner.errorDataChangePassStudent)
  
  const handleChangeInputInfo = (valueInput, type) => {
    let value = valueInput.target.value
    let data = _.cloneDeep(dataChangePassStudent)
    let dataError = _.cloneDeep(errorDataChangePassStudent)
    data[type] = value
    dataError[type] = ''
    dispatch(setDataChangePassStudent(data))
    dispatch(setErrorDataChangePassStudent(dataError))
  }
  
  const handleFocus = (type) => {
    let dataError = _.cloneDeep(errorDataChangePassStudent)
    dataError[type] = ''
    dispatch(setErrorDataChangePassStudent(dataError))
  }

  const handleSubmit = (type, scheme, dataStudent) => { 
    if (type === TYPE_SUBMIT.CHANGE_PASSWORD) {
      validate(scheme, dataStudent, {
        onSuccess: (data) => dispatch(handleChangePassStudent(data._id, data)),
        onError: (error) => dispatch(setErrorDataChangePassStudent(error)),
      })
    }
  }
  const handleCancelModalChangePass = () => {
    dispatch(
      setDataChangePassStudent({
        new_password: '',
        confirm_password: '',
      })
    )
    dispatch(
      setErrorDataChangePassStudent({
        new_password: '',
        confirm_password: '',
      })
    )
    dispatch(setVisibleModalChangePassStudent(false))
  }
  
  return {
    handleChangeInputInfo,
    handleFocus,
    handleSubmit,
    handleCancelModalChangePass
  }
}
