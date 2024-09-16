import {createSlice} from '@reduxjs/toolkit';

const detailsDocSlice = createSlice({
  name: 'detailsDoc',
  initialState: {
    documentDetails: {},
  },
  reducers: {
    getListDetailsDocument: (state) => ({
      ...state,
    }),
    getListDetailsDocumentSuccess: (state, action) => ({
      ...state,
      isLoadingTableDetailsDocument: false,
      documentDetails: action.payload.data,
    }),
    getListDetailsDocumentFailure: (state) => ({
      ...state,
    }),
  },
});

export const {getListDetailsDocument, getListDetailsDocumentSuccess, getListDetailsDocumentFailure} =
  detailsDocSlice.actions;
export default detailsDocSlice.reducer;
