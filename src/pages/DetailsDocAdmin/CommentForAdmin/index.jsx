import _ from 'lodash';
import {setErrorInfoComment, setInfoComment, setIsShowModalUpdateComment} from '@/states/modules/comment';
import {validate} from '@/utils/validates';
import {
  requestCommentByIdDoc,
  requestCreateComment,
  requestDeleteComment,
  requestUpdateComment,
} from '@/api/comment';
import {useDispatch, useSelector} from 'react-redux';
import Joi from 'joi';
import {Avatar, Button, Input, Popover} from 'antd';
import styles from './styles.module.scss';
import avatarDefault from '@/assets/images/user/default-avatar-point.png';
import {DeleteOutlined, EditOutlined, FieldTimeOutlined, MoreOutlined} from '@ant-design/icons';
import {dayjsFormatFromNow} from '@/utils/helper';
import {useEffect, useState} from 'react';
import ModalDefault from '@/components/Modal';
import {TYPE_SUBMIT} from '@/utils/constants';
import Swal from 'sweetalert2';

const CommentForAdmin = () => {
  const dispatch = useDispatch();
  const {TextArea} = Input;
  const [idCommentSelected, setIdCommentSelected] = useState('');
  const infoComment = useSelector((state) => state.comment.infoComment);
  const errorInfoComment = useSelector((state) => state.comment.errorInfoComment);
  const isLoadingBtnCreateComment = useSelector((state) => state.comment.isLoadingBtnCreateComment);
  const isShowModalUpdateComment = useSelector((state) => state.comment.isShowModalUpdateComment);
  const isLoadingBtnUpdateComment = useSelector((state) => state.comment.isLoadingBtnUpdateComment);

  const authUser = useSelector((state) => state.auth.authUser);
  const documentDetails = useSelector((state) => state.detailsDoc.documentDetails);

  const listComment = useSelector((state) => state.comment.listComment);

  const handleFocus = (type) => {
    let dataError = _.cloneDeep(errorInfoComment);
    dataError[type] = '';
    dispatch(setErrorInfoComment(dataError));
  };

  const handleChangeInputInfo = (value, type) => {
    let data = _.cloneDeep(infoComment);
    let dataError = _.cloneDeep(errorInfoComment);
    data[type] = value;
    dataError[type] = '';
    dispatch(setInfoComment({...data}));
    dispatch(setErrorInfoComment(dataError));
  };

  const handleSubmit = (type, scheme, dataComment) => {
    if (type === TYPE_SUBMIT.CREATE) {
      validate(scheme, dataComment, {
        onSuccess: (data) => dispatch(requestCreateComment(data, documentDetails._id)),
        onError: (error) => dispatch(setErrorInfoComment(error)),
      });
    }
    if (type === TYPE_SUBMIT.UPDATE) {
      validate(scheme, dataComment, {
        onSuccess: (data) => dispatch(requestUpdateComment(idCommentSelected, data)),
        onError: (error) => dispatch(setErrorInfoComment(error)),
      });
    }
  };

  const handleCancelModalUpdateComment = () => {
    dispatch(setErrorInfoComment({content: ''}));
    dispatch(setInfoComment({content: ''}));
    dispatch(setIsShowModalUpdateComment(false));
  };

  const handleShowModalUpdateComment = (item) => {
    setIdCommentSelected(item._id);
    dispatch(setIsShowModalUpdateComment(true));
    dispatch(setInfoComment({content: item.content}));
  };

  const handleShowModalDeleteComment = (record) => {
    return Swal.fire({
      title: `<p class="title-modal-warning">
        Bạn có chắn chắn muốn xóa bình luận này không?
      </p>`,
      icon: 'warning',
      showCancelButton: true,
      buttonsStyling: false,
      cancelButtonText: 'Đóng',
      confirmButtonText: 'Xóa',
      customClass: {
        popup: 'popup-modal-warning',
        icon: `icon-modal-warning]`,
        confirmButton: 'confirm-button',
        cancelButton: 'cancel-button',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(requestDeleteComment(record._id));
      }
    });
  };

  const commentSchema = Joi.object({
    content: Joi.string().trim().max(1000).label('Nội dung bình luận'),
  });

  useEffect(() => {
    dispatch(requestCommentByIdDoc(documentDetails._id));
  }, [documentDetails._id]);

  return (
    <>
      <div className={`${styles.commentTitle}`}>Bình luận về tài liệu</div>
      <div className={`${styles.commentWrap}`}>
        {listComment?.comment?.map((item, index) => (
          <>
            <div className={`flex mt-3`}>
              <Avatar
                className={`avatar-user shadow`}
                crossOrigin="anonymous"
                src={item.avatar ? item.avatar : avatarDefault}
                key={index}
              />
              <div className={`mt-1 ml-[10px] font-medium ${styles.commentText}`}>
                <div className={`${styles.nameUserComment}`}>
                  {item.name}
                  <span className="ml-[5px] font-normal italic text-gray-35 text-[12px]">
                    <FieldTimeOutlined />
                    {dayjsFormatFromNow(item.created_at)}
                  </span>
                </div>
                <span className={`text-gray-35 ml-2`}>{item.content}</span>
              </div>
              {(authUser._id === item.creator_id || (authUser.permissions && authUser.permissions.includes("super-admin"))) && (
                <Popover
                  className="popover-comment"
                  placement="right"
                  content={
                    <div className={`${styles.contentPopoverComment}`}>
                      {
                        authUser._id === item.creator_id &&
                      <p
                      className={`${styles.actionComment}`}
                      onClick={() => handleShowModalUpdateComment(item)}
                      >
                        <EditOutlined /> Chỉnh sửa
                      </p>
                      }
                      
                      <p
                        className={`${styles.actionComment}`}
                        onClick={() => handleShowModalDeleteComment(item)}
                      >
                        <DeleteOutlined /> Xóa
                      </p>
                    </div>
                  }
                >
                  <MoreOutlined className="ml-1 cursor-pointer" />
                </Popover>
              )}
            </div>
          </>
        ))}
      </div>
      <div className={`${styles.createComment}`}>
        <Avatar
          className={`avatar-user-comment shadow`}
          crossOrigin="anonymous"
          src={authUser.avatar ? authUser.avatar : avatarDefault}
        />
        <TextArea
          value={infoComment.content}
          onFocus={() => handleFocus('content')}
          onChange={(e) => handleChangeInputInfo(e.target.value, 'content')}
          className={`main-input`}
          placeholder={`Bình luận với vai trò ${authUser?.name}`}
        />
        <Button
          loading={isLoadingBtnCreateComment}
          className={`ant-btn-primary mx-[5px] ml-[10px]`}
          size={'large'}
          onClick={() => handleSubmit(TYPE_SUBMIT.CREATE, commentSchema, infoComment)}
        >
          Gửi
        </Button>
      </div>
      <ModalDefault
        isModalOpen={isShowModalUpdateComment}
        handleCancel={handleCancelModalUpdateComment}
        title={'Chỉnh sửa bình luận'}
        width={700}
      >
        <div className={`${styles.createComment}`}>
          <Avatar
            className={`avatar-user-comment shadow`}
            crossOrigin="anonymous"
            src={authUser.avatar ? authUser.avatar : avatarDefault}
          />
          <TextArea
            value={infoComment.content}
            onFocus={() => handleFocus('content')}
            onChange={(e) => handleChangeInputInfo(e.target.value, 'content')}
            className={`main-input`}
            placeholder={`Chỉnh sửa bình luận với vai trò ${authUser?.name}`}
          />
          <Button
            loading={isLoadingBtnUpdateComment}
            className={`ant-btn-primary mx-[5px] ml-[10px]`}
            size={'large'}
            onClick={() => handleSubmit(TYPE_SUBMIT.UPDATE, commentSchema, infoComment)}
          >
            Sửa
          </Button>
        </div>
      </ModalDefault>
    </>
  );
};

export default CommentForAdmin;
