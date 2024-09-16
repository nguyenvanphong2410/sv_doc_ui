import loadAuthSaga from "@/states/modules/auth/saga.js";
import homeSaga from "@/states/modules/home/saga.js";
import employeeSaga from "@/states/modules/employee/saga";
import documentSaga from "@/states/modules/document/saga.js";
import categorySaga from "@/states/modules/category/saga.js";
import permissionsSaga from "../states/modules/permissions/saga.js";
import loadDocumentAndCategorySaga from "@/states/sagas/documentAndCategory.js";
import partnerSaga from "@/states/modules/partner/saga.js";
import detailsDocSaga from "@/states/modules/document/detailsDoc/saga.js";

export const ROUTE_SAGAS = [];
ROUTE_SAGAS['LOAD_AUTH_PAGE'] = loadAuthSaga;
ROUTE_SAGAS['LOAD_HOME_PAGE'] = homeSaga;
ROUTE_SAGAS['LOAD_EMPLOYEE_PAGE'] = employeeSaga;
ROUTE_SAGAS['LOAD_PRODUCT_PAGE'] = documentSaga;
ROUTE_SAGAS['LOAD_CATEGORY_PAGE'] = categorySaga;
ROUTE_SAGAS['LOAD_PERMISSIONS_PAGE'] = permissionsSaga;
ROUTE_SAGAS['LOAD_DOCUMENT_AND_CATEGORY_PAGE'] = loadDocumentAndCategorySaga;
ROUTE_SAGAS['LOAD_PARTNERS_PAGE'] = partnerSaga;
ROUTE_SAGAS['LOAD_DETAILS_DOC_PAGE'] = detailsDocSaga;

