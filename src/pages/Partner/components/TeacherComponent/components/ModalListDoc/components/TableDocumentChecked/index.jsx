import React, {useEffect} from 'react';
import Handle from './handle';
import {Input, Tag, Tooltip} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import InlineSVG from 'react-inlinesvg';
import TableDefault from '@/components/Table';
import {TYPE_SUBMIT} from '@/utils/constants';
import IconEye from '@/assets/images/icons/duotone/eye.svg';
import imageDefaultDocument from '@/assets/images/document/image-default.png';
import styles from './styles.module.scss';
import {
  setDataFilterChecked,
  setDocumentSelected,
  setErrorInfoDocumentChecked,
  setInfoDocumentChecked,
  setVisibleModalCreateOrUpdateDocumentChecked,
} from '@/states/modules/document';
import {useNavigate} from 'react-router-dom';
import ModalDefault from '@/components/Modal';
import ModalUpdateDoc from './components/ModalUpdateDoc';
import {initErrInfoDocument, initInfoDocument} from '@/states/modules/document/initState';
import SearchIcon from '@/assets/images/icons/duotone/magnifying-glass.svg';
import {useDebounce} from '@/utils/hooks/useDebounce';
import {requestGetListDocumentsChecked} from '@/api/document';

function TableDocumentChecked() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const dataListDocumentsChecked = useSelector((state) => state.document.documentsChecked);
  const isLoadingTableDocumentChecked = useSelector((state) => state.document.isLoadingTableDocumentChecked);
  const paginationListDocumentChecked = useSelector((state) => state.document.paginationListDocumentChecked);
  const dataFilterChecked = useSelector((state) => state.document.dataFilterChecked);
  const debouncedQuery = useDebounce(dataFilterChecked.keySearch, 500);

  const handleClickViewDetails = (item) => {
    dispatch(setDocumentSelected(item));
    navigate(`/details-doc/${item._id}`);
  };

  const {handleShowModalUpdateDocument, handleChangePaginationDocument, handleChangeTableDocument} = Handle();

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
      render: () => {
        return <Tag color="success">Đã duyệt</Tag>;
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

  const visibleModalCreateOrUpdateDocumentChecked = useSelector(
    (state) => state.document.visibleModalCreateOrUpdateDocumentChecked
  );

  const handleCancelModalUpdateDoc = () => {
    dispatch(setErrorInfoDocumentChecked(initErrInfoDocument));
    dispatch(setInfoDocumentChecked(initInfoDocument));
    dispatch(setVisibleModalCreateOrUpdateDocumentChecked(false));
  };

  useEffect(() => {
    dispatch(setDataFilterChecked({...dataFilterChecked, keySearch: debouncedQuery}));
    dispatch(requestGetListDocumentsChecked());
  }, [debouncedQuery]);
  return (
    <div>
      <div className="w-[285px]">
        <Input
          prefix={<InlineSVG src={SearchIcon} className={`icon-search`} alt="" />}
          className={`main-input `}
          placeholder="Tìm kiếm tài liệu"
          value={dataFilterChecked.keySearch}
          onChange={(e) =>
            dispatch(
              setDataFilterChecked({
                ...dataFilterChecked,
                keySearch: e.target.value,
              })
            )
          }
        />
      </div>
      <TableDefault
        extraClassName="table-my-doc"
        loading={isLoadingTableDocumentChecked}
        onChange={handleChangeTableDocument}
        dataSource={dataListDocumentsChecked}
        pagination={paginationListDocumentChecked}
        columns={columns}
        rowKey={(record) => record?._id}
        handleSelectPagination={(e) => handleChangePaginationDocument(e)}
      />
      <ModalDefault
        isModalOpen={visibleModalCreateOrUpdateDocumentChecked}
        handleCancel={handleCancelModalUpdateDoc}
        title={'Cập nhật tài liệu'}
        width={900}
      >
        <ModalUpdateDoc />
      </ModalDefault>
    </div>
  );
}

export default TableDocumentChecked;
