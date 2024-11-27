import { handleChangePassOther } from '@/api/partners'
import { setDataChangePassOther, setErrorDataChangePassOther, setVisibleModalChangePassOther } from '@/states/modules/partner'
import { TYPE_SUBMIT } from '@/utils/constants'
import { validate } from '@/utils/validates'
import _ from 'lodash'
import {useDispatch, useSelector} from 'react-redux'

export default function Handle() {
  const dispatch = useDispatch()
  const dataChangePassOther = useSelector((state) => state.partner.dataChangePassOther)
  const errorDataChangePassOther = useSelector((state) => state.partner.errorDataChangePassOther)
  
  const handleChangeInputInfo = (valueInput, type) => {
    let value = valueInput.target.value
    let data = _.cloneDeep(dataChangePassOther)
    let dataError = _.cloneDeep(errorDataChangePassOther)
    data[type] = value
    dataError[type] = ''
    dispatch(setDataChangePassOther(data))
    dispatch(setErrorDataChangePassOther(dataError))
  }
  
  const handleFocus = (type) => {
    let dataError = _.cloneDeep(errorDataChangePassOther)
    dataError[type] = ''
    dispatch(setErrorDataChangePassOther(dataError))
  }

  const handleSubmit = (type, scheme, dataOther) => { 
    if (type === TYPE_SUBMIT.CHANGE_PASSWORD) {
      validate(scheme, dataOther, {
        onSuccess: (data) => dispatch(handleChangePassOther(data._id, data)),
        onError: (error) => dispatch(setErrorDataChangePassOther(error)),
      })
    }
  }
  const handleCancelModalChangePass = () => {
    dispatch(
      setDataChangePassOther({
        new_password: '',
        confirm_password: '',
      })
    )
    dispatch(
      setErrorDataChangePassOther({
        new_password: '',
        confirm_password: '',
      })
    )
    dispatch(setVisibleModalChangePassOther(false))
  }
  
  return {
    handleChangeInputInfo,
    handleFocus,
    handleSubmit,
    handleCancelModalChangePass
  }
}
