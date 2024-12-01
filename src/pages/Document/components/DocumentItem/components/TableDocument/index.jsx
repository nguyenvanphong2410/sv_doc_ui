import React from 'react';
import Handle from './handle';
import {Switch, Tag, Tooltip} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import InlineSVG from 'react-inlinesvg';
import TableDefault from '@/components/Table';
import {DOCUMENT_STATUS, PERMISSIONS, STATUS_DOC_CHECK, TYPE_SUBMIT} from '@/utils/constants';
import IconEditTable from '@/assets/images/icons/duotone/pencil.svg';
import IconEye from '@/assets/images/icons/duotone/eye.svg';
import IconDeleteTable from '@/assets/images/icons/duotone/trash-can.svg';
import imageDefaultDocument from '@/assets/images/document/image-default.png';
import styles from './styles.module.scss';
import {hasPermission} from '@/utils/helper';
import {setDocumentSelected} from '@/states/modules/document';
import {useNavigate} from 'react-router-dom';
import {CheckOutlined, CloseCircleOutlined} from '@ant-design/icons';

function TableDocument({handleChangeTableDocument}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const dataListDocuments = useSelector((state) => state.document.documents);
  const isLoadingTableDocument = useSelector((state) => state.document.isLoadingTableDocument);
  const paginationListDocument = useSelector((state) => state.document.paginationListDocument);

  const handleClickViewDetails = (item) => {
    dispatch(setDocumentSelected(item));
    navigate(`/details-doc/${item._id}`);
  };

  const {
    handleShowModalUpdateDocument,
    handleDeleteDocumentAlert,
    handleChangePaginationDocument,
    handleUpdateStatusRoom,
    handleUpdateChecked,
  } = Handle();

  const columns = [
    {
      title: <span className="title-table">Mã tài liệu</span>,
      dataIndex: 'pictures',
      key: 'pictures',
      width: 190,
      align: 'center',
      render: (text, record) => {
        return (
          <div className="flex items-center">
            <img
              src={record.image_featured ? record.image_featured : imageDefaultDocument}
              crossOrigin="anonymous"
              alt="img-document"
              className={`${styles.pictures}`}
              onClick={() => handleShowModalUpdateDocument(record, TYPE_SUBMIT.UPDATE)}
            />
            <span className="ml-3">
              <a
                className={`text-ui`}
                onClick={() => handleShowModalUpdateDocument(record, TYPE_SUBMIT.UPDATE)}
              >
                {record.code}
              </a>
              <div className="mt-2">
                {record.doc_check === STATUS_DOC_CHECK.PENDING ? (
                  <Tooltip title="Tài liệu chờ phê duyệt">
                    <Tag color="yellow">Chờ duyệt</Tag>
                  </Tooltip>
                ) : (
                  <Tooltip title="Tài liệu đã được phê duyệt">
                    <Tag color="green">Đã duyệt</Tag>
                  </Tooltip>
                )}
              </div>
            </span>
          </div>
        );
      },
    },

    {
      title: <span className="title-table">Tên tài liệu</span>,
      dataIndex: 'name',
      key: 'name',
      width: 300,
      sorter: (a, b) => a.age - b.age,
      showSorterTooltip: false,
      defaultSortOrder: '',
      render: (text, record) => {
        return (
          <div className={` font-medium`}>
            <span
              className={`name-user cursor-pointer textDotDotDot`}
              onClick={() => handleShowModalUpdateDocument(record, TYPE_SUBMIT.UPDATE)}
            >
              {text}
            </span>
          </div>
        );
      },
    },
    {
      title: <span className="title-table">Đăng bởi</span>,
      dataIndex: 'creator',
      key: 'creator',
      width: 200,
      showSorterTooltip: false,
      defaultSortOrder: '',
      render: (text) => {
        return (
          <div className={` font-medium`}>
            <span className={`name-user cursor-pointer`}>{text?.name}</span>
          </div>
        );
      },
    },
    {
      title: <span className="title-table">Tác giả</span>,
      dataIndex: 'author',
      key: 'author',
      width: 200,
      sorter: (a, b) => a.age - b.age,
      showSorterTooltip: false,
      defaultSortOrder: '',
      render: (text) => {
        return (
          <div className={`font-medium`}>
            <span className={`name-user cursor-pointer`}>{text}</span>
          </div>
        );
      },
    },
    {
      title: <span className="title-table">Lượt xem</span>,
      dataIndex: 'view_quantity',
      key: 'view_quantity',
      align: 'center',
      width: 120,
      sorter: (a, b) => a.age - b.age,
      showSorterTooltip: false,
      defaultSortOrder: '',
      render: (text) => {
        return text ? <span>{text}</span> : 0;
      },
    },

    hasPermission([PERMISSIONS.EDIT.EDIT_DOCUMENT, PERMISSIONS.DELETE.DELETE_DOCUMENT])
      ? {
          title: <span className="title-table">Hoạt động</span>,
          dataIndex: 'actions',
          key: 'actions',
          align: 'center',
          fixed: window.innerWidth > 767 ? 'right' : '',
          width: 160,
          render: (text, record) => {
            return (
              <>
                <div className={`flex w-full justify-center bg-white`}>
                  {hasPermission([PERMISSIONS.DETAIL.DETAIL_DOCUMENT]) && (
                    <div className={`action-user mr-2`} onClick={() => handleClickViewDetails(record)}>
                      <Tooltip title="Xem chi tiết">
                        <InlineSVG src={IconEye} className={`w-[16px] h-[16px] `} alt="" />
                      </Tooltip>
                    </div>
                  )}
                  {hasPermission([PERMISSIONS.EDIT.EDIT_DOCUMENT]) && (
                    <div
                      className={`action-user mr-2`}
                      onClick={() => handleShowModalUpdateDocument(record, TYPE_SUBMIT.UPDATE)}
                    >
                      <Tooltip title="Cập nhật thông tin">
                        <InlineSVG src={IconEditTable} className={`w-[16px] h-[16px] `} alt="" />
                      </Tooltip>
                    </div>
                  )}

                  {hasPermission([PERMISSIONS.DELETE.DELETE_DOCUMENT]) && (
                    <div className={`action-user`} onClick={() => handleDeleteDocumentAlert(record)}>
                      <Tooltip title="Xóa thông tin">
                        <InlineSVG src={IconDeleteTable} className={`w-[16px] h-[16px]`} alt="" />
                      </Tooltip>
                    </div>
                  )}
                </div>
                <div className={`flex w-full justify-center bg-white mt-1`}>
                  {hasPermission([PERMISSIONS.EDIT.EDIT_DOCUMENT]) && (
                    <div className={`mt-[5px] mr-2`}>
                      {record.doc_check === STATUS_DOC_CHECK.PENDING ? (
                        <Tooltip title="Duyệt tài liệu này" color="#1f7a1f">
                          <Tag
                            className={`cursor-pointer`}
                            color="#1f7a1f"
                            icon={<CheckOutlined />}
                            onClick={() => handleUpdateChecked(record)}
                          >
                            Duyệt
                          </Tag>
                        </Tooltip>
                      ) : (
                        <Tooltip title="Nhấn để bỏ duyệt tài liệu" color="grey">
                          <Tag
                            className={`cursor-pointer`}
                            color="grey"
                            icon={<CloseCircleOutlined />}
                            onClick={() => handleUpdateChecked(record)}
                          >
                            Hủy
                          </Tag>
                        </Tooltip>
                      )}
                    </div>
                  )}
                  {hasPermission([PERMISSIONS.EDIT.EDIT_DOCUMENT]) && (
                    <div className={`mt-[5px]`}>
                      <Tooltip
                        placement="top"
                        title={record.status === DOCUMENT_STATUS.LOCK ? 'Khoá' : 'Kích hoạt'}
                      >
                        <Switch
                          size="small"
                          className={`main-switch`}
                          onChange={() => handleUpdateStatusRoom(record)}
                          checked={record.status === DOCUMENT_STATUS.UNLOCK ? true : false}
                        />
                      </Tooltip>
                    </div>
                  )}
                </div>
              </>
            );
          },
        }
      : {
          width: 1,
        },
  ];

  return (
    <div>
      <TableDefault
        extraClassName="table-document"
        loading={isLoadingTableDocument}
        onChange={handleChangeTableDocument}
        dataSource={dataListDocuments}
        pagination={paginationListDocument}
        columns={columns}
        rowKey={(record) => record?._id}
        handleSelectPagination={(e) => handleChangePaginationDocument(e)}
      />
    </div>
  );
}

export default TableDocument;
