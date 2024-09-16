import {createSlice} from '@reduxjs/toolkit';

const commentSlice = createSlice({
  name: 'comment',
  initialState: {
    isLoadingListComment: false,
    isLoadingBtnCreateComment: false,
    isLoadingBtnUpdateComment: false,
    isLoadingBtnDeleteComment: false,

    isShowModalUpdateComment:false,
    isShowPopoverComment:false,

    listComment:[],
    infoComment: {
      content: '',
    },
    errorInfoComment: {
      content: '',
    },
  },
  reducers: {
    setInfoComment: (state, action) => ({
      ...state,
      infoComment: action.payload,
    }),
    setErrorInfoComment: (state, action) => ({
      ...state,
      errorInfoComment: action.payload,
    }),
    setIsShowModalUpdateComment: (state, action) => ({
      ...state,
      isShowModalUpdateComment: action.payload,
    }),
    setIsShowPopoverComment: (state, action) => ({
      ...state,
      isShowPopoverComment: action.payload,
    }),

    getListComment: (state) => ({
      ...state,
      comment: [],
      isLoadingTableComment: true,
    }),
    getListCommentSuccess: (state, action) => ({
      ...state,
      isLoadingTableComment: false,
      listComment: action.payload.data,
    }),
    getListCommentFailure: (state) => ({
      ...state,
      comment: [],
      isLoadingTableComment: false,
    }),

    createComment: (state) => ({
      ...state,
      isLoadingBtnCreateComment: true,
    }),
    createCommentSuccess: (state) => ({
      ...state,
      isLoadingBtnCreateComment: false,
    }),
    createCommentFail: (state) => ({
      ...state,
      isLoadingBtnCreateComment: false,
    }),

    updateComment: (state) => ({
      ...state,
      isLoadingBtnUpdateComment: true,
    }),
    updateCommentSuccess: (state) => ({
      ...state,
      isLoadingBtnUpdateComment: false,
    }),
    updateCommentFail: (state) => ({
      ...state,
      isLoadingBtnUpdateComment: false,
    }),

    deleteComment: (state) => ({
      ...state,
      isLoadingBtnDeleteComment: true,
    }),
    deleteCommentSuccess: (state) => ({
      ...state,
      isLoadingBtnDeleteComment: false,
    }),
    deleteCommentFail: (state) => ({
      ...state,
      isLoadingBtnDeleteComment: false,
    }),
  },
});

export const {
  setInfoComment,
  setErrorInfoComment,
  setIsShowModalUpdateComment,
  setIsShowPopoverComment,
  
  getListComment,
  getListCommentSuccess,
  getListCommentFailure,

  createComment,
  createCommentSuccess,
  createCommentFail,

  updateComment,
  updateCommentSuccess,
  updateCommentFail,

  deleteComment,
  deleteCommentSuccess,
  deleteCommentFail,
} = commentSlice.actions;
export default commentSlice.reducer;
