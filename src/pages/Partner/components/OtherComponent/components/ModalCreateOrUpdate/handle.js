import {useDispatch, useSelector} from 'react-redux'
import {
  setDataFilterOther,
  setInfoOther,
  setErrorInfoOther,
  // setDataChangePassOther,
  // setVisibleModalChangePass,
  // setErrorDataChangePassOther,
  setVisibleModalCreateOrUpdateOther,
  setConfigModalOther,
  setErrorDataChangePassOther,
} from '@/states/modules/partner'
import {
  requestGetListOther, 
  // handleChangePassOther, 
  requestCreateOther, 
  requestUpdateOther,
  handleChangePassOther
} from '@/api/partners'
import {validate} from '@/utils/validates'
import {USER_STATUS, TYPE_FILE, TYPE_SUBMIT} from '@/utils/constants'
import { getNotification } from '@/utils/helper'
import _ from 'lodash'

export default function Handle() {
  const dispatch = useDispatch()
  const infoOther = useSelector((state) => state.partner.infoOther)
  const errorInfoOther = useSelector((state) => state.partner.errorInfoOther)
  const dataFilter = useSelector((state) => state.partner.dataFilter)
  const paginationListOthers = useSelector((state) => state.partner.paginationListOthers)
  
  const handleCancelModalChangePass = () => {
    // dispatch(
    //   setDataChangePassOther({
    //     new_password: '',
    //     confirm_password: '',
    //   })
    // )
    // dispatch(
    //   setErrorDataChangePassOther({
    //     new_password: '',
    //     confirm_password: '',
    //   })
    // )
    // dispatch(setVisibleModalChangePass(false))
  }
  
  const handleSearchOther = (value) => {
    dispatch(setDataFilterOther({...dataFilter, keySearch: value}))
    if (!value) {
      dispatch(requestGetListOther())
    }
  }
  
  const handleEnterSearchOther = (event) => {
    if (event.key === 'Enter') {
      dispatch(setDataFilterOther({...dataFilter, page: 1}))
      dispatch(requestGetListOther())
    }
  }
  
  const handleChangeSelectOther = (perPage) => {
    dispatch(setDataFilterOther({...paginationListOthers, perPage, page: 1}))
    dispatch(requestGetListOther())
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
        let dataCloneDeep = _.cloneDeep(infoOther)
        dataCloneDeep['avatar'] = currentFile
        dataCloneDeep['avatarUrl'] = fileUrl
        dispatch(setInfoOther(dataCloneDeep))
      }
    }
  }
  
  const handleChangeInputInfo = (valueInput, type) => {
    let value = valueInput.target.value
    let data = _.cloneDeep(infoOther)
    let dataError = _.cloneDeep(errorInfoOther)
    data[type] = value
    dataError[type] = ''
    dispatch(setInfoOther(data))
    dispatch(setErrorInfoOther(dataError))
  }
  
  const handleFocus = (type) => {
    let dataError = _.cloneDeep(errorInfoOther)
    dataError[type] = ''
    dispatch(setErrorInfoOther(dataError))
  }
  
  const handleSubmit = (type, scheme, dataOther) => {
    if (type === TYPE_SUBMIT.CREATE) {
      validate(scheme, dataOther, {
        onSuccess: (data) => dispatch(requestCreateOther(data)),
        onError: (error) => dispatch(setErrorInfoOther(error)),
      })
    }
    
    if (type === TYPE_SUBMIT.UPDATE) {
      validate(scheme, dataOther, {
        onSuccess: (data) => dispatch(requestUpdateOther(data._id, data)),
        onError: (error) => dispatch(setErrorInfoOther(error)),
      })
    }
    
    if (type === TYPE_SUBMIT.CHANGE_PASSWORD) {
      validate(scheme, dataOther, {
        onSuccess: (data) => dispatch(handleChangePassOther(data._id, data)),
        onError: (error) => dispatch(setErrorDataChangePassOther(error)),
      })
    }
  }
  
  const handleSwitchChange = (checked) => {
    const switchIndex = checked ? USER_STATUS.UNLOCK : USER_STATUS.LOCK
    dispatch(setInfoOther({...infoOther, status: switchIndex}))
  }

  const handleshowModalCreateOther = () => {
    dispatch(setConfigModalOther({
      title: "Tạo mới tài khoản",
      type: TYPE_SUBMIT.CREATE
    }));
    dispatch(
      setInfoOther({
        name: '',
        email: '',
        phone: '',
        avatar: '',
        password: '',
      })
    )
    dispatch(setVisibleModalCreateOrUpdateOther(true));
  }

  const handleCancelModalCreateOrUpdateOther = () => {
    dispatch(
      setErrorInfoOther({
        name: '',
        email: '',
        phone: '',
        avatar: '',
        password: ''
      })
    );
    dispatch(
      setInfoOther({
        name: '',
        email: '',
        phone: '',
        avatar: '',
        password: '',
      })
    )
    dispatch(setVisibleModalCreateOrUpdateOther(false));
  }
  const hanleChangeUserType = (e) => {
    dispatch(setInfoOther({...infoOther, user_type: e.target.value}))
  };
  
  return {
    handleCancelModalChangePass,
    handleSearchOther,
    handleEnterSearchOther,
    handleChangeSelectOther,
    handleSubmit,
    handleSwitchChange,
    handleChangeAvatar,
    handleChangeInputInfo,
    handleFocus,
    handleshowModalCreateOther,
    handleCancelModalCreateOrUpdateOther,
    hanleChangeUserType,
  }
}
