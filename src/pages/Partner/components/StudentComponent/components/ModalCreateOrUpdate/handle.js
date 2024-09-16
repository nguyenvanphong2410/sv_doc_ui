import {useDispatch, useSelector} from 'react-redux'
import {
  setDataFilterStudent,
  setInfoStudent,
  setErrorInfoStudent,
  setDataChangePassStudent,
  setErrorDataChangePassStudent,
  setVisibleModalCreateOrUpdateStudent,
  setConfigModalStudent,
} from '@/states/modules/partner'
import {
  requestGetListStudent, 
  requestCreateStudent, 
  requestUpdateStudent,
  handleChangePassStudent
} from '@/api/partners'
import {validate} from '@/utils/validates'
import {USER_STATUS, TYPE_FILE, TYPE_SUBMIT} from '@/utils/constants'
import { getNotification } from '@/utils/helper'
import _ from 'lodash'

export default function Handle() {
  const dispatch = useDispatch()
  const infoStudent = useSelector((state) => state.partner.infoStudent)
  const errorInfoStudent = useSelector((state) => state.partner.errorInfoStudent)
  const dataFilter = useSelector((state) => state.partner.dataFilter)
  const paginationListStudents = useSelector((state) => state.partner.paginationListStudents)
  
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
    dispatch(setErrorDataChangePassStudent(false))
  }
  
  const handleSearchStudent = (value) => {
    dispatch(setDataFilterStudent({...dataFilter, keySearch: value}))
    if (!value) {
      dispatch(requestGetListStudent())
    }
  }
  
  const handleEnterSearchStudent = (event) => {
    if (event.key === 'Enter') {
      dispatch(setDataFilterStudent({...dataFilter, page: 1}))
      dispatch(requestGetListStudent())
    }
  }
  
  const handleChangeSelectStudent = (perPage) => {
    dispatch(setDataFilterStudent({...paginationListStudents, perPage, page: 1}))
    dispatch(requestGetListStudent())
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
        let dataCloneDeep = _.cloneDeep(infoStudent)
        dataCloneDeep['avatar'] = currentFile
        dataCloneDeep['avatarUrl'] = fileUrl
        dispatch(setInfoStudent(dataCloneDeep))
      }
    }
  }
  
  const handleChangeInputInfo = (valueInput, type) => {
    let value = valueInput.target.value
    let data = _.cloneDeep(infoStudent)
    let dataError = _.cloneDeep(errorInfoStudent)
    data[type] = value
    dataError[type] = ''
    dispatch(setInfoStudent(data))
    dispatch(setErrorInfoStudent(dataError))
  }
  
  const handleFocus = (type) => {
    let dataError = _.cloneDeep(errorInfoStudent)
    dataError[type] = ''
    dispatch(setErrorInfoStudent(dataError))
  }
  
  const handleSubmit = (type, scheme, dataStudent) => {
    if (type === TYPE_SUBMIT.CREATE) {
      validate(scheme, dataStudent, {
        onSuccess: (data) => dispatch(requestCreateStudent(data)),
        onError: (error) => dispatch(setErrorInfoStudent(error)),
      })
    }
    
    if (type === TYPE_SUBMIT.UPDATE) {
      validate(scheme, dataStudent, {
        onSuccess: (data) => dispatch(requestUpdateStudent(data._id, data)),
        onError: (error) => dispatch(setErrorInfoStudent(error)),
      })
    }
    
    if (type === TYPE_SUBMIT.CHANGE_PASSWORD) {
      validate(scheme, dataStudent, {
        onSuccess: (data) => dispatch(handleChangePassStudent(data._id, data)),
        onError: (error) => dispatch(setErrorDataChangePassStudent(error)),
      })
    }
  }
  
  const handleSwitchChange = (checked) => {
    const switchIndex = checked ? USER_STATUS.UNLOCK : USER_STATUS.LOCK
    dispatch(setInfoStudent({...infoStudent, status: switchIndex}))
  }

  const handleshowModalCreateStudent = () => {
    dispatch(setConfigModalStudent({
      title: "Tạo mới tài khoản",
      type: TYPE_SUBMIT.CREATE
    }));
    dispatch(
      setInfoStudent({
        name: '',
        email: '',
        phone: '',
        avatar: '',
        password: '',
      })
    )
    dispatch(setVisibleModalCreateOrUpdateStudent(true));
  }

  const handleCancelModalCreateOrUpdateStudent = () => {
    dispatch(
      setErrorInfoStudent({
        name: '',
        email: '',
        phone: '',
        avatar: '',
        password: ''
      })
    );
    dispatch(
      setInfoStudent({
        name: '',
        email: '',
        phone: '',
        avatar: '',
        password: '',
      })
    )
    dispatch(setVisibleModalCreateOrUpdateStudent(false));
  }
  const hanleChangeUserType = (e) => {
    dispatch(setInfoStudent({...infoStudent, user_type: e.target.value}))
  };
  
  return {
    handleCancelModalChangePass,
    handleSearchStudent,
    handleEnterSearchStudent,
    handleChangeSelectStudent,
    handleSubmit,
    handleSwitchChange,
    handleChangeAvatar,
    handleChangeInputInfo,
    handleFocus,
    handleshowModalCreateStudent,
    handleCancelModalCreateOrUpdateStudent,
    hanleChangeUserType
  }
}
