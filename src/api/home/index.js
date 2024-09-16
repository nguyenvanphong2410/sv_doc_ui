import callApi from '@/api/callApi';
import { getInfoDashboard, getInfoDashboardFailure, getInfoDashboardSuccess } from '@/states/modules/home';


export const requestGetInfoDashboard = () => async (dispatch, getState) => {
  return callApi({
    method: 'get',
    apiPath: `/admin/dashboard`,
    actionTypes: [  getInfoDashboard,
        getInfoDashboardSuccess,
        getInfoDashboardFailure],
    variables: {},
    dispatch,
    getState,
  });
};

