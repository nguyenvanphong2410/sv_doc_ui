import {
  setDataChangePassEmployee, 
  setErrorDataChangePassEmployee
} from '@/states/modules/employee'
import _ from 'lodash'
import {useDispatch, useSelector} from 'react-redux'

export default function Handle() {
  const dispatch = useDispatch()
  const dataChangePassEmployee = useSelector((state) => state.employee.dataChangePassEmployee)
  const errorDataChangePassEmployee = useSelector((state) => state.employee.errorDataChangePassEmployee)
  
  const handleChangeInputInfo = (valueInput, type) => {
    let value = valueInput.target.value
    let data = _.cloneDeep(dataChangePassEmployee)
    let dataError = _.cloneDeep(errorDataChangePassEmployee)
    data[type] = value
    dataError[type] = ''
    dispatch(setDataChangePassEmployee(data))
    dispatch(setErrorDataChangePassEmployee(dataError))
  }
  
  const handleFocus = (type) => {
    let dataError = _.cloneDeep(errorDataChangePassEmployee)
    dataError[type] = ''
    dispatch(setErrorDataChangePassEmployee(dataError))
  }
  
  return {
    handleChangeInputInfo,
    handleFocus,
  }
}
