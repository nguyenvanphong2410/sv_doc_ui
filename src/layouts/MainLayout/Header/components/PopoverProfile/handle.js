import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {getMe, logout} from "@/api/auth/index.js";
import {
  setDataChangePassword,
  setErrorChangePassword,
  setErrorInformation
} from "@/states/modules/profile/index.js";
import { useNavigate } from "react-router-dom";

export default function Handle() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isShowInformation, setIsShowInformation] = useState(false);
  const authUser = useSelector(state => state.auth.authUser);
  const errorInformation = useSelector(state => state.profile.errorInformation);
  const errorChangePassword = useSelector(state => state.profile.errorChangePassword);
  
  const handleConfirmLogout = () => {
    dispatch(getMe());
    dispatch(logout());
  }
  

  const handleResetError = (type) => {
    dispatch(setErrorInformation({
      ...errorInformation,
      [type]: ''
    }))
    dispatch(setErrorChangePassword({
      ...errorChangePassword,
      [type]: ''
    }))
  }
  
  const handleShowProfile = () => {
    dispatch(setErrorInformation({
      name: '',
      email: '',
      phone: '',
      avatar: '',
    }))
    dispatch(setErrorChangePassword({
      password: '',
      newPassword: '',
      confirmPassword: '',
    }))
    dispatch(setDataChangePassword({
      password: '',
      newPassword: '',
      confirmPassword: '',
    }));
    dispatch(getMe());
    setIsShowInformation(true)
  }
  
  const handleClearError = () => {
    dispatch(setErrorInformation({
      name: '',
      email: '',
      phone: '',
      avatar: '',
    }))
    dispatch(setErrorChangePassword({
      password: '',
      newPassword: '',
      confirmPassword: '',
    }))
  }

  const handleCLickMyDoc = () => {
    navigate('/my-doc')
  }
  
  return {
    isShowInformation,
    setIsShowInformation,
    authUser,
    handleConfirmLogout,
    handleShowProfile,
    handleResetError,
    handleClearError,
    handleCLickMyDoc
  }
}
