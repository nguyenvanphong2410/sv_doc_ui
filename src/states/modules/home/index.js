import {createSlice} from '@reduxjs/toolkit';

const homeSlice = createSlice({
  name: 'home',
  initialState: {
    dataFilter: {
      q: '',
      start_time: '',
      end_time: '',
      quantity: null
    },
    listDashboard:[],
  },
  reducers: {

    setDataFilter: (state, action) => ({
      ...state,
      dataFilter: action.payload
    }),
    getInfoDashboard: (state) => ({
      ...state,
      isLoadingTableDashboard: true,
    }),
    getInfoDashboardSuccess: (state, action) => ({
      ...state,
      isLoadingTableDashboard: false,
      listDashboard: action.payload.data,
    }),
    getInfoDashboardFailure: (state) => ({
      ...state,
      comment: [],
      isLoadingTableDashboard: false,
    }),
  }
});

export const {
  setDataFilter,
  getInfoDashboard,
  getInfoDashboardSuccess,
  getInfoDashboardFailure,
} = homeSlice.actions;

export default homeSlice.reducer;