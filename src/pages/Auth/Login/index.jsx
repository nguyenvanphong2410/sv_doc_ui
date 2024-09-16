import React, { useEffect } from 'react';
import './styles.scss';
import AuthLayout from '@/layouts/AuthLayout';
import {Button, Flex, Input} from "antd";
import Handle from "./handle.js";
import ErrorMessage from '@/components/ErrorMessage';

function Login() {
  const {
    navigate,
    datFormLogin,
    errorLogin,
    isLoadingBtnLogin,
    handleChangeInput,
    handleFocus,
    handleConfirmLogin
  } = Handle();

  useEffect(() => {
    document.title = "SV.Doc - Đăng nhập";
  }, []);
  
  return (
    <AuthLayout title={'Đăng nhập'} description={'SV.Doc'}>
      <div className={'input-wrap'}>
        <Input
          className={`main-input ${errorLogin && errorLogin.email.length > 0 ? 'error-input' : ''}`}
          placeholder={'Email'}
          value={datFormLogin.email}
          onChange={(e) => handleChangeInput(e, 'email')}
          onFocus={(e) => handleFocus(e, 'email')}
        />
        <ErrorMessage message={errorLogin.email} />
      </div>

      <div className={'input-wrap mt-5'}>
        <Input.Password
          className={`main-input !pt-[9px] !pb-[9px] ${
            errorLogin && errorLogin.password.length > 0 ? 'error-input' : ''
          }`}
          placeholder={'Mật khẩu'}
          value={datFormLogin.password}
          onChange={(e) => handleChangeInput(e, 'password')}
          onFocus={(e) => handleFocus(e, 'password')}
        />
        <ErrorMessage message={errorLogin.password} />
      </div>

      <Flex vertical gap="small">
        <Button
          loading={isLoadingBtnLogin}
          type="primary"
          onClick={() => handleConfirmLogin()}
          size={'large'}
          className={`main-btn-primary`}
          block
        >
          Đăng nhập
        </Button>
      </Flex>
      <div className="text-center mt-5 md:text-sm s:text-xs">
        Bạn chưa có tài khoản?{' '}
        <span className="text-blue-60 cursor-pointer" onClick={() => navigate('/register')}>
          Đăng ký.
        </span>
      </div>
    </AuthLayout>
  );
}

export default Login;
