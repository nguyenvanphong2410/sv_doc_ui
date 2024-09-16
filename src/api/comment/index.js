import callApi from '@/api/callApi';
import {
  createComment,
  createCommentFail,
  createCommentSuccess,
  deleteComment,
  deleteCommentFail,
  deleteCommentSuccess,
  getListComment,
  getListCommentFailure,
  getListCommentSuccess,
  updateComment,
  updateCommentFail,
  updateCommentSuccess,
} from '@/states/modules/comment';

export const requestCommentByIdDoc = (id) => async (dispatch, getState) => {
  return callApi({
    method: 'get',
    apiPath: `/user/comment/by-id-doc/${id}`,
    actionTypes: [getListComment, getListCommentSuccess, getListCommentFailure],
    variables: {},
    dispatch,
    getState,
  });
};

export const requestCreateComment = (data, id) => async (dispatch, getState) => {
  return callApi({
    method: 'post',
    apiPath: `/user/comment/${id}`,
    actionTypes: [createComment, createCommentSuccess, createCommentFail],
    variables: data,
    dispatch,
    getState,
  });
};

export const requestUpdateComment = (id, data) => async (dispatch, getState) => {
  return callApi({
    method: 'put',
    apiPath: `/user/comment/${id}`,
    actionTypes: [updateComment, updateCommentSuccess, updateCommentFail],
    variables: data,
    dispatch,
    getState,
  });
};

export const requestDeleteComment = (id) => async (dispatch, getState) => {
  return callApi({
    method: 'delete',
    apiPath: `/user/comment/${id}`,
    actionTypes: [deleteComment, deleteCommentSuccess, deleteCommentFail],
    variables: {},
    dispatch,
    getState,
  });
};
