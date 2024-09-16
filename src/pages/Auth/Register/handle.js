import {useNavigate} from 'react-router-dom';
import {useEffect} from 'react';
import _ from 'lodash';
import {useDispatch, useSelector} from 'react-redux';
import {setDataRegister, setErrorRegister} from '@/states/modules/auth/index.js';
import {register} from '@/api/auth/index.js';
import Joi from 'joi';
import {validate} from '@/utils/validates';
import {VALIDATE_PHONE_REGEX_RULE} from '@/utils/helper';

const registerValidateSchema = Joi.object({
  name: Joi.string().trim().max(255).required().label('Họ và tên'),
  email: Joi.string().required().trim().max(255).email({tlds: false}).label('Email'),
  password: Joi.string().max(255).required().label('Mật khẩu'),
  confirmPassword: Joi.string()
    .max(255)
    .required()
    .label('Mật khẩu xác nhận')
    .custom((value, helpers) => {
      return helpers.prefs.context.data.password === value
        ? value
        : helpers.message('Mật khẩu xác nhận không trùng khớp.');
    }),
  phone: Joi.string().trim().pattern(VALIDATE_PHONE_REGEX_RULE).required().label('Số điện thoại'),
});

export default function Handle() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const errorRegister = useSelector((state) => state.auth.errorRegister);
  const infoRegister = useSelector((state) => state.auth.infoRegister);
  const isLoadingBtnRegister = useSelector((state) => state.auth.isLoadingBtnRegister);
  const isLoadingSendMailRegister = useSelector((state) => state.auth.isLoadingSendMailRegister);

  useEffect(() => {
    dispatch(
      setErrorRegister({
        email: '',
        password: '',
      })
    );
  }, [dispatch]);

  const handleChangeInput = (e, type) => {
    let value = e.target.value;
    let data = _.cloneDeep(infoRegister);
    data[type] = value;
    dispatch(setDataRegister(data));
  };

  const handleFocus = (event, type) => {
    dispatch(
      setErrorRegister({
        ...errorRegister,
        [type]: '',
      })
    );
  };

  const handleConfirmRegister = () => {
    validate(registerValidateSchema, infoRegister, {
      onSuccess: (data) => {
        dispatch(register(data));
      },
      onError: (err) => {
        dispatch(setErrorRegister({...errorRegister, ...err}));
      },
    });
  };


  return {
    navigate,
    infoRegister,
    errorRegister,
    isLoadingBtnRegister,
    isLoadingSendMailRegister,
    handleChangeInput,
    handleFocus,
    handleConfirmRegister,
  };
}
