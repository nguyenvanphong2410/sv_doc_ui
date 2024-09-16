import {useDispatch, useSelector} from 'react-redux'
import {
  setDataFilter,
  setConfigModal,
  setInfoEmployee,
  setErrorInfoEmployee,
  setDataChangePassEmployee,
  setVisibleModalChangePass,
  setErrorDataChangePassEmployee,
  setVisibleModalCreateOrUpdateEmployee,
} from '@/states/modules/employee'
import {
  getListEmployees, 
  handleChangePassEmployee, 
  handleCreateEmployee, 
  handleUpdateEmployee
} from '@/api/employees'
import {validate} from '@/utils/validates'
import {USER_STATUS, TYPE_FILE, TYPE_SUBMIT} from '@/utils/constants'
import { getNotification } from '@/utils/helper'
import _ from 'lodash'

export default function Handle() {
  const dispatch = useDispatch()
  const infoEmployee = useSelector((state) => state.employee.infoEmployee)
  const errorInfoEmployee = useSelector((state) => state.employee.errorInfoEmployee)
  const dataFilter = useSelector((state) => state.employee.dataFilter)
  const paginationListEmployees = useSelector((state) => state.employee.paginationListEmployees)
  
  const handleCancelModalChangePass = () => {
    dispatch(
      setDataChangePassEmployee({
        new_password: '',
        confirm_password: '',
      })
    )
    dispatch(
      setErrorDataChangePassEmployee({
        new_password: '',
        confirm_password: '',
      })
    )
    dispatch(setVisibleModalChangePass(false))
  }
  
  const handleSearchEmployee = (value) => {
    dispatch(setDataFilter({...dataFilter, keySearch: value}))
    if (!value) {
      dispatch(getListEmployees())
    }
  }
  
  const handleEnterSearchEmployee = (event) => {
    if (event.key === 'Enter') {
      dispatch(setDataFilter({...dataFilter, page: 1}))
      dispatch(getListEmployees())
    }
  }
  
  const handleChangeSelectEmployee = (perPage) => {
    dispatch(setDataFilter({...paginationListEmployees, perPage, page: 1}))
    dispatch(getListEmployees())
  }
  
  const handleChangeAvatar = (file) => {
    if (file.target.files[0]) {
      let currentFile = file.target.files[0]
      let fileUrl = URL.createObjectURL(file.target.files[0])
      let dataError = ''
      if (currentFile.size / 1024 / 1024 > 2.048) {
        dataError = 'Kích thước ảnh không được vượt quá 2MB.'
      } else if (!TYPE_FILE.includes(currentFile.type)) {
        dataError = 'Ảnh đại diện chỉ được hỗ trợ kiểu jpg,jpeg,png,svg,webp.'
      }
      
      if (dataError) {
        getNotification('error', dataError)
      } else {
        let dataCloneDeep = _.cloneDeep(infoEmployee)
        dataCloneDeep['avatar'] = currentFile
        dataCloneDeep['avatarUrl'] = fileUrl
        dispatch(setInfoEmployee(dataCloneDeep))
      }
    }
  }
  
  const handleChangeInputInfo = (valueInput, type) => {
    let value = valueInput.target.value
    let data = _.cloneDeep(infoEmployee)
    let dataError = _.cloneDeep(errorInfoEmployee)
    data[type] = value
    dataError[type] = ''
    dispatch(setInfoEmployee(data))
    dispatch(setErrorInfoEmployee(dataError))
  }
  
  const handleFocus = (type) => {
    let dataError = _.cloneDeep(errorInfoEmployee)
    dataError[type] = ''
    dispatch(setErrorInfoEmployee(dataError))
  }
  
  const handleSubmit = (type, scheme, dataEmployee) => {
    if (type === TYPE_SUBMIT.CREATE) {
      validate(scheme, dataEmployee, {
        onSuccess: (data) => dispatch(handleCreateEmployee(data)),
        onError: (error) => dispatch(setErrorInfoEmployee(error)),
      })
    }
    
    if (type === TYPE_SUBMIT.UPDATE) {
      validate(scheme, dataEmployee, {
        onSuccess: (data) => dispatch(handleUpdateEmployee(data._id, data)),
        onError: (error) => dispatch(setErrorInfoEmployee(error)),
      })
    }
    
    if (type === TYPE_SUBMIT.CHANGE_PASSWORD) {
      validate(scheme, dataEmployee, {
        onSuccess: (data) => dispatch(handleChangePassEmployee(data._id, data)),
        onError: (error) => dispatch(setErrorDataChangePassEmployee(error)),
      })
    }
  }
  
  const handleSwitchChange = (checked) => {
    const switchIndex = checked ? USER_STATUS.UNLOCK : USER_STATUS.LOCK
    dispatch(setInfoEmployee({...infoEmployee, status: switchIndex}))
  }

  const handleshowModalCreateEmployee = () => {
    dispatch(setConfigModal({
      title: "Tạo mới tài khoản",
      type: TYPE_SUBMIT.CREATE
    }));
    dispatch(
      setInfoEmployee({
        name: '',
        email: '',
        phone: '',
        avatar: '',
        password: '',
      })
    )
    dispatch(setVisibleModalCreateOrUpdateEmployee(true));
  }

  const handleCancelModalCreateOrUpdateEmployee = () => {
    dispatch(
      setErrorInfoEmployee({
        name: '',
        email: '',
        phone: '',
        avatar: '',
        password: ''
      })
    );
    dispatch(
      setInfoEmployee({
        name: '',
        email: '',
        phone: '',
        avatar: '',
        password: '',
      })
    )
    dispatch(setVisibleModalCreateOrUpdateEmployee(false));
  }
  
  return {
    handleCancelModalChangePass,
    handleSearchEmployee,
    handleEnterSearchEmployee,
    handleChangeSelectEmployee,
    handleSubmit,
    handleSwitchChange,
    handleChangeAvatar,
    handleChangeInputInfo,
    handleFocus,
    handleshowModalCreateEmployee,
    handleCancelModalCreateOrUpdateEmployee
  }
}
