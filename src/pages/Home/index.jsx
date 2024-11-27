import React, {useEffect} from 'react';
import MainLayout from '@/layouts/MainLayout/index.jsx';
import {useDispatch, useSelector} from 'react-redux';
import {PERMISSIONS, USER_TYPE} from '@/utils/constants';
import UserLayout from '@/layouts/UserLayout';
import UserPage from './components/UserPage';
import {requestGetListDocumentForUser} from '@/api/document';
import {getAllCategoriesForUser} from '@/api/category';
import Dashboard from './components/Dashboard';
import {hasPermission} from '@/utils/helper';

function Home() {
  const auth = useSelector((state) => state.auth.authUser);
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = 'SV.Doc - Tổng quan';
    dispatch(requestGetListDocumentForUser());
    dispatch(getAllCategoriesForUser());
  }, []);

  return (
    <>
      {auth.is_admin && auth.user_type === USER_TYPE.ADMIN ? (
        <MainLayout>{hasPermission([PERMISSIONS.LIST.LIST_ADMIN]) && <Dashboard />}</MainLayout>
      ) : (
        <UserLayout>
          <UserPage />
        </UserLayout>
      )}
    </>
  );
}

export default Home;
