import {useDispatch, useSelector} from 'react-redux'
import {
  setDataFilterTeacher,
  setInfoTeacher,
  setErrorInfoTeacher,
  setDataChangePassTeacher,
  setErrorDataChangePassTeacher,
  setVisibleModalCreateOrUpdateTeacher,
  setConfigModalTeacher,
} from '@/states/modules/partner'
import {
  requestGetListTeacher, 
  requestCreateTeacher, 
  requestUpdateTeacher,
  handleChangePassTeacher
} from '@/api/partners'
import {validate} from '@/utils/validates'
import {USER_STATUS, TYPE_FILE, TYPE_SUBMIT} from '@/utils/constants'
import { getNotification } from '@/utils/helper'
import _ from 'lodash'

export default function Handle() {
  const dispatch = useDispatch()
  const infoTeacher = useSelector((state) => state.partner.infoTeacher)
  const errorInfoTeacher = useSelector((state) => state.partner.errorInfoTeacher)
  const dataFilter = useSelector((state) => state.partner.dataFilter)
  const paginationListTeachers = useSelector((state) => state.partner.paginationListTeachers)
  
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
    dispatch(setErrorDataChangePassTeacher(false))
  }
  
  const handleSearchTeacher = (value) => {
    dispatch(setDataFilterTeacher({...dataFilter, keySearch: value}))
    if (!value) {
      dispatch(requestGetListTeacher())
    }
  }
  
  const handleEnterSearchTeacher = (event) => {
    if (event.key === 'Enter') {
      dispatch(setDataFilterTeacher({...dataFilter, page: 1}))
      dispatch(requestGetListTeacher())
    }
  }
  
  const handleChangeSelectTeacher = (perPage) => {
    dispatch(setDataFilterTeacher({...paginationListTeachers, perPage, page: 1}))
    dispatch(requestGetListTeacher())
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
        let dataCloneDeep = _.cloneDeep(infoTeacher)
        dataCloneDeep['avatar'] = currentFile
        dataCloneDeep['avatarUrl'] = fileUrl
        dispatch(setInfoTeacher(dataCloneDeep))
      }
    }
  }
  
  const handleChangeInputInfo = (valueInput, type) => {
    let value = valueInput.target.value
    let data = _.cloneDeep(infoTeacher)
    let dataError = _.cloneDeep(errorInfoTeacher)
    data[type] = value
    dataError[type] = ''
    dispatch(setInfoTeacher(data))
    dispatch(setErrorInfoTeacher(dataError))
  }
  
  const handleFocus = (type) => {
    let dataError = _.cloneDeep(errorInfoTeacher)
    dataError[type] = ''
    dispatch(setErrorInfoTeacher(dataError))
  }
  
  const handleSubmit = (type, scheme, dataTeacher) => {
    if (type === TYPE_SUBMIT.CREATE) {
      validate(scheme, dataTeacher, {
        onSuccess: (data) => dispatch(requestCreateTeacher(data)),
        onError: (error) => dispatch(setErrorInfoTeacher(error)),
      })
    }
    
    if (type === TYPE_SUBMIT.UPDATE) {
      validate(scheme, dataTeacher, {
        onSuccess: (data) => dispatch(requestUpdateTeacher(data._id, data)),
        onError: (error) => dispatch(setErrorInfoTeacher(error)),
      })
    }
    
    if (type === TYPE_SUBMIT.CHANGE_PASSWORD) {
      validate(scheme, dataTeacher, {
        onSuccess: (data) => dispatch(handleChangePassTeacher(data._id, data)),
        onError: (error) => dispatch(setErrorDataChangePassTeacher(error)),
      })
    }
  }
  
  const handleSwitchChange = (checked) => {
    const switchIndex = checked ? USER_STATUS.UNLOCK : USER_STATUS.LOCK
    dispatch(setInfoTeacher({...infoTeacher, status: switchIndex}))
  }

  const handleshowModalCreateTeacher = () => {
    dispatch(setConfigModalTeacher({
      title: "Tạo mới tài khoản",
      type: TYPE_SUBMIT.CREATE
    }));
    dispatch(
      setInfoTeacher({
        name: '',
        email: '',
        phone: '',
        avatar: '',
        password: '',
      })
    )
    dispatch(setVisibleModalCreateOrUpdateTeacher(true));
  }

  const handleCancelModalCreateOrUpdateTeacher = () => {
    dispatch(
      setErrorInfoTeacher({
        name: '',
        email: '',
        phone: '',
        avatar: '',
        password: ''
      })
    );
    dispatch(
      setInfoTeacher({
        name: '',
        email: '',
        phone: '',
        avatar: '',
        password: '',
      })
    )
    dispatch(setVisibleModalCreateOrUpdateTeacher(false));
  }
  const hanleChangeUserType = (e) => {
    dispatch(setInfoTeacher({...infoTeacher, user_type: e.target.value}))
  };

  return {
    handleCancelModalChangePass,
    handleSearchTeacher,
    handleEnterSearchTeacher,
    handleChangeSelectTeacher,
    handleSubmit,
    handleSwitchChange,
    handleChangeAvatar,
    handleChangeInputInfo,
    handleFocus,
    handleshowModalCreateTeacher,
    handleCancelModalCreateOrUpdateTeacher,
    hanleChangeUserType,
  }
}
