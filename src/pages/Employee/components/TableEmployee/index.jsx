import React, { useState } from 'react';
import Handle from './handle';
import {Avatar, Switch, Tooltip} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import InlineSVG from 'react-inlinesvg';
import TableDefault from '@/components/Table';
import {PERMISSIONS, TYPE_SUBMIT, USER_STATUS} from '@/utils/constants';
import IconEditTable from '@/assets/images/icons/duotone/pencil.svg';
import IconChangePass from '@/assets/images/icons/duotone/lock.svg';
import IconDeleteTable from '@/assets/images/icons/duotone/trash-can.svg';
import avatarDefault from '@/assets/images/user/default-avatar-point.png';
import {hasPermission} from '@/utils/helper';
import ModalListDoc from '../ModalListDoc';
import ModalDefault from '@/components/Modal';
import { setVisibleModalListDocEmployee } from '@/states/modules/employee';

function TableEmployee() {
  const dispatch = useDispatch();

  const dataListEmployees = useSelector((state) => state.employee.employees);
  const isLoadingTableEmployee = useSelector((state) => state.employee.isLoadingTableEmployee);
  const authEmployee = useSelector((state) => state.auth.authUser);
  const paginationListEmployees = useSelector((state) => state.employee.paginationListEmployees);
  const visibleModalListDocEmployee = useSelector((state) => state.employee.visibleModalListDocEmployee);
  const [nameSelected, setNameSelected] = useState();
  const [idSelected, setIdSelected] = useState(null);

  const {
    handleShowModalUpdateEmployee,
    handleShowModalChangePassEmployee,
    handleUpdateStatusEmployee,
    handleChangeTableEmployee,
    handleDeleteEmployeeAlert,
    handleChangePaginationEmployee,
  } = Handle();

  const handleCancelModalListDoc = () => {
    dispatch(setVisibleModalListDocEmployee(false))
  }
  const handleShowModalListDoc = (record) => {
    setNameSelected(record?.name)
    setIdSelected(record?._id)
    console.log("🌈 ~ handleShowModalListDoc ~ record?._id:", record?._id)
    dispatch(setVisibleModalListDocEmployee(true))
  }

  const columns = [
    {
      title: <span className="title-table">Họ và tên</span>,
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
              <div 
                className={`name-user cursor-pointer`} 
                onClick={() => handleShowModalListDoc(record)}
              >{text}</div>
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
      align: 'center',
      width: 200,
      sorter: (a, b) => a.age - b.age,
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
    hasPermission([PERMISSIONS.EDIT.EDIT_EMPLOYEE])
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
                    onChange={() => handleUpdateStatusEmployee(record)}
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
    hasPermission([PERMISSIONS.EDIT.EDIT_EMPLOYEE, PERMISSIONS.DELETE.DELETE_EMPLOYEE])
      ? {
          title: <span className="title-table">Hoạt động</span>,
          dataIndex: 'actions',
          key: 'actions',
          align: 'center',
          fixed: window.innerWidth > 767 ? 'right' : '',
          width: 100,
          render: (text, record) => {
            return (
              <div className={`flex w-full justify-center bg-white`}>
                {hasPermission([PERMISSIONS.EDIT.EDIT_EMPLOYEE]) && (
                  <Tooltip title="Cập nhật thông tin">
                    <div
                      className={`action-user mr-2`}
                      onClick={() => handleShowModalUpdateEmployee(record, TYPE_SUBMIT.UPDATE)}
                    >
                      <InlineSVG src={IconEditTable} className={`w-[16px] h-[16px] `} alt="" />
                    </div>
                  </Tooltip>
                )}

                {hasPermission([PERMISSIONS.EDIT.EDIT_RESET_PASSWORD_EMPLOYEE]) && (
                  <Tooltip title="Đổi mật khẩu">
                    <div
                      className={`action-user mr-2`}
                      onClick={() => handleShowModalChangePassEmployee(record)}
                    >
                      <InlineSVG src={IconChangePass} className={`w-[16px] h-[16px]`} alt="" />
                    </div>
                  </Tooltip>
                )}

                {hasPermission([PERMISSIONS.DELETE.DELETE_EMPLOYEE]) && (
                  <Tooltip title="Xóa thông tin">
                    <div className={`action-user`} onClick={() => handleDeleteEmployeeAlert(record)}>
                      <InlineSVG src={IconDeleteTable} className={`w-[16px] h-[16px]`} alt="" />
                    </div>
                  </Tooltip>
                )}
              </div>
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
        loading={isLoadingTableEmployee}
        onChange={handleChangeTableEmployee}
        dataSource={dataListEmployees}
        pagination={paginationListEmployees}
        columns={columns}
        rowKey={(record) => record?._id}
        handleSelectPagination={(e) => handleChangePaginationEmployee(e)}
      />

      <ModalDefault
        isModalOpen={visibleModalListDocEmployee}
        handleCancel={handleCancelModalListDoc}
        title={<>Tài liệu đăng bởi <span className='italic text-blue-25'>{nameSelected}</span></>}
        width={1000}
      >
        <ModalListDoc idSelected={idSelected}/>
      </ModalDefault>
    </div>
  );
}

export default TableEmployee;
