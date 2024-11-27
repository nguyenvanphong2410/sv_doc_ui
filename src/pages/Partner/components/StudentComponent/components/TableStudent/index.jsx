import React, { useState } from 'react';
import {Avatar, Switch, Tooltip} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import InlineSVG from 'react-inlinesvg';
import TableDefault from '@/components/Table';
import {PERMISSIONS, TYPE_SUBMIT, USER_STATUS} from '@/utils/constants';
import IconEditTable from '@/assets/images/icons/duotone/pencil.svg';
import IconDeleteTable from '@/assets/images/icons/duotone/trash-can.svg';
import {hasPermission} from '@/utils/helper';
import {handleChangeStatusStudent, requestDeleteStudent, requestGetListStudent} from '@/api/partners';
import {
  setConfigModalStudent,
  setDataChangePassStudent,
  setDataFilterStudent,
  setErrorInfoStudent,
  setInfoStudent,
  setVisibleModalChangePassStudent,
  setVisibleModalCreateOrUpdateStudent,
  setVisibleModalListDocStudent,
} from '@/states/modules/partner';
import {initInfoPartner} from '@/states/modules/partner/initState';
import Swal from 'sweetalert2';
import avatarDefault from '@/assets/images/user/default-avatar-point.png';
import IconChangePass from '@/assets/images/icons/duotone/lock.svg';
import ModalDefault from '@/components/Modal';
import ModalListDoc from '../ModalListDoc';

function TableStudent() {
  const dispatch = useDispatch();
  const dataListStudent = useSelector((state) => state.partner.students);
  const isLoadingTableStudent = useSelector((state) => state.partner.isLoadingTableStudent);
  const paginationListStudent = useSelector((state) => state.partner.paginationListStudent);
  const dataFilterStudent = useSelector((state) => state.partner.dataFilterStudent);
  const authEmployee = useSelector((state) => state.auth.authUser);
  const visibleModalListDocStudent = useSelector((state) => state.partner.visibleModalListDocStudent);
  const [nameSelected, setNameSelected] = useState();
  const [idSelected, setIdSelected] = useState(null);

  const handleCancelModalListDoc = () => {
    dispatch(setVisibleModalListDocStudent(false));
  };
  const handleShowModalListDoc = (record) => {
    setNameSelected(record?.name);
    setIdSelected(record?._id)
    dispatch(setVisibleModalListDocStudent(true));
  };

  const columns = [
    {
      title: <span className="title-table">Họ tên</span>,
      dataIndex: 'name',
      key: 'name',
      width: 250,
      sorter: (a, b) => a.age - b.age,
      showSorterTooltip: false,
      defaultSortOrder: '',
      render: (text, record) => {
        return (
          <div className={`flex`}>
            <Avatar
              className={`avatar-user shadow`}
              crossOrigin="anonymous"
              src={record.avatar ? record.avatar : avatarDefault}
            />
            <div className={`mt-1 ml-[10px] font-medium`}>
              <div className={`name-user`} onClick={() => handleShowModalListDoc(record)}>
                {text}
              </div>
              <span className={`email-user`}>Email:</span>
              <a className="email" href={`mailto:${record.email}`}>
                {record.email}
              </a>
            </div>
          </div>
        );
      },
    },
    {
      title: <span className="title-table">Số điện thoại</span>,
      dataIndex: 'phone',
      key: 'phone',
      width: 150,

      showSorterTooltip: false,
      defaultSortOrder: '',
      render: (text, record) => {
        return record.phone ? (
          <a className={`text-ui`} href={`tel:${record.phone}`}>
            {record.phone}
          </a>
        ) : (
          <i className={`text-update`}>Đang cập nhật</i>
        );
      },
    },
    hasPermission([PERMISSIONS.EDIT.EDIT_STUDENT])
      ? {
          title: <span className="title-table">Trạng thái</span>,
          dataIndex: 'status',
          key: 'status',
          align: 'center',
          defaultSortOrder: '',
          width: 120,
          render: (status, record) => {
            return (
              authEmployee._id !== record._id && (
                <Tooltip placement="top" title={status === USER_STATUS.LOCK ? 'Khoá' : 'Kích hoạt'}>
                  <Switch
                    className={`main-switch`}
                    onChange={() => handleUpdateStatusStudent(record)}
                    checked={status === USER_STATUS.UNLOCK}
                  />
                </Tooltip>
              )
            );
          },
        }
      : {
          width: 1,
        },
    hasPermission([PERMISSIONS.EDIT.EDIT_STUDENT, PERMISSIONS.DELETE.DELETE_STUDENT])
      ? {
          title: <span className="title-table">Hoạt động</span>,
          dataIndex: 'actions',
          key: 'actions',
          align: 'center',
          fixed: window.innerWidth > 767 ? 'right' : '',
          width: 120,
          render: (text, record) => {
            return (
              <div className={`flex w-full justify-center bg-white`}>
                {hasPermission([PERMISSIONS.EDIT.EDIT_STUDENT]) && (
                  <div
                    className={`action-user mr-2`}
                    onClick={() => handleShowModalUpdateStudent(record, TYPE_SUBMIT.UPDATE)}
                  >
                    <Tooltip title="Cập nhật thông tin">
                      <InlineSVG src={IconEditTable} className={`w-[16px] h-[16px] `} alt="" />
                    </Tooltip>
                  </div>
                )}

                {hasPermission([PERMISSIONS.EDIT.EDIT_RESET_PASSWORD_STUDENT]) && (
                  <Tooltip title="Đổi mật khẩu">
                    <div
                      className={`action-user mr-2`}
                      onClick={() => handleShowModalChangePassEmployee(record)}
                    >
                      <InlineSVG src={IconChangePass} className={`w-[16px] h-[16px]`} alt="" />
                    </div>
                  </Tooltip>
                )}

                {hasPermission([PERMISSIONS.DELETE.DELETE_STUDENT]) && (
                  <div className={`action-user`} onClick={() => handleDeleteStudentAlert(record)}>
                    <Tooltip title="Xóa thông tin">
                      <InlineSVG src={IconDeleteTable} className={`w-[16px] h-[16px]`} alt="" />
                    </Tooltip>
                  </div>
                )}
              </div>
            );
          },
        }
      : {
          width: 1,
        },
  ];

  const handleChangeTableStudent = (pagination, filters, sorter) => {
    const sortOrder = sorter.order && sorter.field ? (sorter.order === 'descend' ? 'desc' : 'asc') : null;
    const column = sortOrder ? sorter.field : null;
    dispatch(
      setDataFilterStudent({
        ...dataFilterStudent,
        sort_order: sortOrder,
        column,
      })
    );
    dispatch(requestGetListStudent());
  };

  const handleChangePaginationStudent = (event) => {
    dispatch(
      setDataFilterStudent({
        ...dataFilterStudent,
        page: event,
      })
    );
    dispatch(requestGetListStudent());
  };

  const handleShowModalUpdateStudent = (teacher, type) => {
    dispatch(
      setConfigModalStudent({
        title: 'Thông tin sinh viên',
        type,
      })
    );
    dispatch(setInfoStudent({...teacher, avatarUrl: teacher.avatar}));
    dispatch(setErrorInfoStudent(initInfoPartner));
    dispatch(setVisibleModalCreateOrUpdateStudent(true));
  };

  const handleDeleteStudentAlert = (record) => {
    return Swal.fire({
      title: `<p class="title-modal-warning">
        Bạn có chắn chắn muốn xóa sinh viên <strong>${record.name}</strong> không?
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
        dispatch(requestDeleteStudent(record._id));
      }
    });
  };

  const handleShowModalChangePassEmployee = (other) => {
    dispatch(setDataChangePassStudent({_id: other._id}));
    dispatch(setVisibleModalChangePassStudent(true));
  };

  const handleUpdateStatusStudent = (other) => {
    dispatch(
      handleChangeStatusStudent(
        other._id,
        other.status === USER_STATUS.LOCK ? USER_STATUS.UNLOCK : USER_STATUS.LOCK
      )
    );
  };

  return (
    <div>
      <TableDefault
        extraClassName="table-category"
        loading={isLoadingTableStudent}
        dataSource={dataListStudent}
        pagination={paginationListStudent}
        columns={columns}
        rowKey={(record) => record?._id}
        onChange={handleChangeTableStudent}
        handleSelectPagination={(e) => handleChangePaginationStudent(e)}
      />
      <ModalDefault
        isModalOpen={visibleModalListDocStudent}
        handleCancel={handleCancelModalListDoc}
        title={
          <>
            Tài liệu đăng bởi <span className="italic text-blue-25">{nameSelected}</span>
          </>
        }
        width={1000}
      >
        <ModalListDoc idSelected={idSelected}/>
      </ModalDefault>
    </div>
  );
}

export default TableStudent;
