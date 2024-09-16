import React, {useEffect} from 'react';
import Handle from './handle';
import {Input, Tag, Tooltip} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import InlineSVG from 'react-inlinesvg';
import TableDefault from '@/components/Table';
import {DOCUMENT_STATUS, STATUS_DOC_CHECK, TYPE_SUBMIT} from '@/utils/constants';
import IconEye from '@/assets/images/icons/duotone/eye.svg';
import imageDefaultDocument from '@/assets/images/document/image-default.png';
import styles from './styles.module.scss';
import {
  setDataFilterLock,
  setDocumentSelected,
  setErrorInfoDocumentLock,
  setInfoDocumentLock,
  setVisibleModalCreateOrUpdateDocumentLock,
} from '@/states/modules/document';
import {useNavigate} from 'react-router-dom';
import ModalDefault from '@/components/Modal';
import ModalUpdateDoc from './components/ModalUpdateDoc';
import {initErrInfoDocument, initInfoDocument} from '@/states/modules/document/initState';
import SearchIcon from '@/assets/images/icons/duotone/magnifying-glass.svg';
import {useDebounce} from '@/utils/hooks/useDebounce';
import {requestGetListDocumentsLock} from '@/api/document';

function TableDocumentLock() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const dataListDocumentsLock = useSelector((state) => state.document.documentsLock);
  const isLoadingTableDocumentLock = useSelector((state) => state.document.isLoadingTableDocumentLock);
  const paginationListDocumentLock = useSelector((state) => state.document.paginationListDocumentLock);
  const dataFilterLock = useSelector((state) => state.document.dataFilterLock);
  const debouncedQuery = useDebounce(dataFilterLock.keySearch, 500);

  const handleClickViewDetails = (item) => {
    dispatch(setDocumentSelected(item));
    navigate(`/details-doc/${item._id}`);
  };

  const {
    handleShowModalUpdateDocument, 
    handleChangePaginationDocument, handleChangeTableDocument} = Handle();

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
                className={`text-red-40 font-semibold`}
                onClick={() => handleShowModalUpdateDocument(record, TYPE_SUBMIT.UPDATE)}
              >
                {record.code}
              </a>
            </span>
          </div>
        );
      },
    },

    {
      title: <span className="title-table">Tên tài liệu</span>,
      dataIndex: 'name',
      key: 'name',
      width: 200,
      sorter: (a, b) => a.age - b.age,
      showSorterTooltip: false,
      defaultSortOrder: '',
      render: (text, record) => {
        return (
          <div className={` font-medium`}>
            <span
              className={`name-user cursor-pointer`}
              onClick={() => handleShowModalUpdateDocument(record, TYPE_SUBMIT.UPDATE)}
            >
              {text}
            </span>
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
    {
      title: <span className="title-table">Trạng thái</span>,
      dataIndex: 'doc_check',
      key: 'doc_check',
      align: 'center',
      width: 100,
      showSorterTooltip: false,
      defaultSortOrder: '',
      render: (text) => {
        return <Tag color={text === STATUS_DOC_CHECK.CHECKED ? 'success' : 'yellow'}>
          {
            text === STATUS_DOC_CHECK.CHECKED ? 'Đã duyệt' : 'Chờ duyệt'
          }
          </Tag>;
      },
    },
    {
      title: <span className="title-table">Khóa</span>,
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      width: 100,
      showSorterTooltip: false,
      defaultSortOrder: '',
      render: (text) => {
        return <span>

          {
            text === DOCUMENT_STATUS.LOCK ? 
            <span className='text-white text-[14px] bg-red-45 py-[3px] px-[10px] rounded-sm'>Khóa</span>
            : 'Mở khóa'
          }
          </span>
      },
    },
    {
      title: <span className="title-table">Hoạt động</span>,
      dataIndex: 'actions',
      key: 'actions',
      align: 'center',
      fixed: window.innerWidth > 767 ? 'right' : '',
      width: 160,
      render: (text, record) => {
        return (
          <div className={`flex w-full justify-center bg-white`}>
            <div className={`action-user mr-2`} onClick={() => handleClickViewDetails(record)}>
              <Tooltip title="Xem chi tiết">
                <InlineSVG src={IconEye} className={`w-[16px] h-[16px] `} alt="" />
              </Tooltip>
            </div>
           
          </div>
        );
      },
    },
  ];

  const visibleModalCreateOrUpdateDocumentLock = useSelector(
    (state) => state.document.visibleModalCreateOrUpdateDocumentLock
  );

  const handleCancelModalUpdateDoc = () => {
    dispatch(setErrorInfoDocumentLock(initErrInfoDocument));
    dispatch(setInfoDocumentLock(initInfoDocument));
    dispatch(setVisibleModalCreateOrUpdateDocumentLock(false));
  };

  useEffect(() => {
    dispatch(setDataFilterLock({...dataFilterLock, keySearch: debouncedQuery}));
    dispatch(requestGetListDocumentsLock());
  }, [debouncedQuery]);
  return (
    <div>
      <div className="w-[285px]">
        <Input
          prefix={<InlineSVG src={SearchIcon} className={`icon-search`} alt="" />}
          className={`main-input `}
          placeholder="Tìm kiếm tài liệu"
          value={dataFilterLock.keySearch}
          onChange={(e) =>
            dispatch(
              setDataFilterLock({
                ...dataFilterLock,
                keySearch: e.target.value,
              })
            )
          }
        />
      </div>
      <TableDefault
        extraClassName="table-my-doc"
        loading={isLoadingTableDocumentLock}
        onChange={handleChangeTableDocument}
        dataSource={dataListDocumentsLock}
        pagination={paginationListDocumentLock}
        columns={columns}
        rowKey={(record) => record?._id}
        handleSelectPagination={(e) => handleChangePaginationDocument(e)}
      />
      <ModalDefault
        isModalOpen={visibleModalCreateOrUpdateDocumentLock}
        handleCancel={handleCancelModalUpdateDoc}
        title={'Cập nhật tài liệu'}
        width={900}
      >
        <ModalUpdateDoc />
      </ModalDefault>
    </div>
  );
}

export default TableDocumentLock;
