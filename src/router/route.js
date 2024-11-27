import React from 'react';
import {createBrowserRouter} from 'react-router-dom';
import {rootLoader} from './rootLoader.js';
import Login from '@/pages/Auth/Login';
import Home from '@/pages/Home';
import Employee from '@/pages/Employee/index.jsx';
import {PAGE_ERROR, PERMISSIONS} from '@/utils/constants.js';
import PageError from '@/components/Error/index.jsx';
import Permission from '@/pages/Permission/index.jsx';
import Partner from '@/pages/Partner/index.jsx';
import Register from '@/pages/Auth/Register/index.jsx';
import Document from '@/pages/Document/index.jsx';
import Category from '@/pages/Category/index.jsx';
import DetailsDocUser from '@/pages/DetailsDocUser/index.jsx';
import CreateDocForUser from '@/pages/CreateDocForUser/index.jsx';
import Intro from '@/pages/Intro/index.jsx';
import Contact from '@/pages/Contact/index.jsx';
import MyDoc from '@/pages/MyDoc/index.jsx';
import DetailsDocAdmin from '@/pages/DetailsDocAdmin/index.jsx';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
    loader: ({request, params}) => rootLoader({request, params}, false, 'LOAD_AUTH_PAGE'),
  },
  {
    path: '/register',
    element: <Register />,
    loader: ({request, params}) => rootLoader({request, params}, false, 'LOAD_AUTH_PAGE'),
  },
  {
    path: '/',
    element: <Home />,
    loader: ({request, params}) => rootLoader({request, params}, true, 'LOAD_HOME_PAGE'),
  },
  {
    path: '/employees',
    element: <Employee />,
    loader: ({request, params}) =>
      rootLoader({request, params}, true, 'LOAD_EMPLOYEE_PAGE', [
        PERMISSIONS.SUPER_ADMIN,
        PERMISSIONS.LIST.LIST_EMPLOYEE,
      ]),
  },
  {
    path: '/403',
    element: <PageError type={PAGE_ERROR.FORBIDDEN} title={'Bạn không có quyền truy cập!'} />,
    loader: ({request, params}) => rootLoader({request, params}, true, ''),
  },
  {
    path: '*',
    element: <PageError type={PAGE_ERROR.NOT_FOUND} title={'Trang bạn truy cập không tồn tại!'} />,
    loader: ({request, params}) => rootLoader({request, params}, true, ''),
  },
  {
    path: '/documents',
    element: <Document />,
    loader: ({request, params}) =>
      rootLoader({request, params}, true, 'LOAD_DOCUMENT_AND_CATEGORY_PAGE', [
        PERMISSIONS.SUPER_ADMIN,
        PERMISSIONS.LIST.LIST_DOCUMENT,
      ]),
  },
  {
    path: '/permission',
    element: <Permission />,
    loader: ({request, params}) =>
      rootLoader({request, params}, true, 'LOAD_PERMISSIONS_PAGE', [
        PERMISSIONS.SUPER_ADMIN,
        PERMISSIONS.LIST.LIST_ROLE,
      ]),
  },
  {
    path: '/partners',
    element: <Partner />,
    loader: ({request, params}) =>
      rootLoader({request, params}, true, 'LOAD_PARTNERS_PAGE', [PERMISSIONS.SUPER_ADMIN, PERMISSIONS.LIST.LIST_USER]),
  },
  {
    path: '/category',
    element: <Category />,
    loader: ({request, params}) =>
      rootLoader({request, params}, true, 'LOAD_CATEGORY_PAGE', [
        PERMISSIONS.SUPER_ADMIN,
        PERMISSIONS.LIST.LIST_CATEGORY,
      ]),
  },
  {
    path: '/details-doc/:id',
    element: <DetailsDocAdmin />,
    loader: ({request, params}) =>
      rootLoader({request, params}, true, 'LOAD_DETAILS_DOC_PAGE', []),
  },
  {
    path: '/details-doc-for-user/:id',
    element: <DetailsDocUser />,
    loader: ({request, params}) => rootLoader({request, params}, true, 'LOAD_DETAILS_DOC_PAGE', []),
  },
  {
    path: '/create-doc',
    element: <CreateDocForUser />,
    loader: ({request, params}) => rootLoader({request, params}, true, 'LOAD_DOCUMENT_AND_CATEGORY_PAGE', []),
  },
  {
    path: '/intro',
    element: <Intro />,
    loader: ({request, params}) => rootLoader({request, params}, true, '', []),
  },
  {
    path: '/contact',
    element: <Contact />,
    loader: ({request, params}) => rootLoader({request, params}, true, '', []),
  },
  {
    path: '/my-doc',
    element: <MyDoc />,
    loader: ({request, params}) => rootLoader({request, params}, true, 'LOAD_DOCUMENT_AND_CATEGORY_PAGE', []),
  },
]);

export default router;
