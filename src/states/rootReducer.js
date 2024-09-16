import appReducer from './modules/app/index.js';
import authReducer from './modules/auth/index.js';
import proFileReducer from './modules/profile/index.js';
import employeeReducer from './modules/employee/index.js';
import homeReducer from './modules/home/index.js';
import documentReducer from './modules/document/index.js';
import categoryReducer from './modules/category/index.js';
import permissionsSlice from './modules/permissions/index.js';
import partnerSlice from './modules/partner/index.js';
import detailsDocSlice from './modules/document/detailsDoc/index.js';
import commentSlice from './modules/comment/index.js';

const rootReducer = {
  app: appReducer,
  auth: authReducer,
  profile: proFileReducer,
  employee: employeeReducer,
  document: documentReducer,
  home: homeReducer,
  category: categoryReducer,
  permission: permissionsSlice,
  partner: partnerSlice,
  detailsDoc: detailsDocSlice,
  comment: commentSlice,


}

export default rootReducer
