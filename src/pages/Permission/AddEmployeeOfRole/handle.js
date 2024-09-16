import { handleDeleteEmployeeOfRole, handleEmployeeWithoutRole, handleUpdateAddEmployeeOfRole } from '@/api/permission';
import {
  setEmployeeeIds,
  setErrorEmployeeIds,
  setInfoEmployeeSelected,
  setQueryEmployeeWithoutRole,
  setVisibleModalDeleteEmployeeOfRole,
} from '@/states/modules/permissions';
import { handleSetTimeOut } from '@/utils/helper';
import { validate } from '@/utils/validateJoi';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import { Avatar } from 'antd';
import avatarDefault from '@/assets/images/user/default-avatar-point.png'

export default function Handle() {
  const dispatch = useDispatch();

  const [timeoutId, setTimeoutId] = useState(null);
  const [employeeOption, setEmployeeOption] = useState([]);
  const [contentModalDeleteEmployeeOfRole, setContentModalDeleteEmployeeOfRole] = useState('');

  const employeeIdsErr = useSelector((state) => state.permission.employeeIdsErr);
  const infoEmployeeIds = useSelector((state) => state.permission.infoEmployeeIds);
  const infoRoleSelected = useSelector((state) => state.permission.infoRoleSelected);
  const infoEmployeeSelected = useSelector((state) => state.permission.infoEmployeeSelected);
  const employeeWithoutRoleList = useSelector((state) => state.permission.employeeWithoutRoleList);
  const queryEmployeeWithoutRole = useSelector((state) => state.permission.queryEmployeeWithoutRole);
  const isLoadingListEmployeeOfRole = useSelector((state) => state.permission.isLoadingListEmployeeOfRole);
  const isLoadingBtnAddEmployeeOfRole = useSelector((state) => state.permission.isLoadingBtnAddEmployeeOfRole);
  const isLoadingBtnDeleteEmployeeOfRole = useSelector((state) => state.permission.isLoadingBtnDeleteEmployeeOfRole);
  const visibleModalDeleteEmployeeOfRole = useSelector((state) => state.permission.visibleModalDeleteEmployeeOfRole);

  useEffect(() => {
    setEmployeeOption(
      employeeWithoutRoleList?.map((item) => ({
        value: item._id,
        label: <div className={`flex`}>
        <Avatar
          className={`w-5 h-5 shadow`}
          crossOrigin="anonymous"
          src={item.avatar ? item.avatar : avatarDefault}
        />
        <div className={`ml-[5px] font-medium flex`}>
          <div className={`name-user`}>{item.name}</div>
          <div className='mt-[-1px]'>
            <span className={`text-black-content ml-1 mr-1 md:text-sm s:text-xs`}>-</span>
            <span >{item.email}</span>
          </div>
        </div>
      </div>
      }))
    );
  }, [employeeWithoutRoleList]);

  const handleToggleVisibleModalDeleteEmployeeOfRole = () => {
    dispatch(setVisibleModalDeleteEmployeeOfRole(!visibleModalDeleteEmployeeOfRole));
  };

  const openModalDeleteEmployeeOfRole = (employee) => {
    dispatch(setInfoEmployeeSelected(employee));
    dispatch(setVisibleModalDeleteEmployeeOfRole(true));
  };

  useEffect(() => {
    if (infoEmployeeSelected) {
      setContentModalDeleteEmployeeOfRole(
        <span>
          Bạn có chắc chắn muốn xóa{''}
          <div>
            <b>{infoEmployeeSelected.name}</b> khỏi vai trò <b>{infoRoleSelected.name}</b>?
          </div>
        </span>
      );
    }
  }, [infoEmployeeSelected, infoRoleSelected.name]);

  const handleConfirmDeletEmployeeOfRole = () => {
    if (infoEmployeeSelected) {
      dispatch(handleDeleteEmployeeOfRole(infoRoleSelected._id, infoEmployeeSelected._id));
    }
  };

  const handleChangeSelectEmployeeOfRole = (value, type) => {
    let data = _.cloneDeep(infoEmployeeIds);
    if (type === 'employee_ids') {
      data[type] = value;
    }
    dispatch(setEmployeeeIds(data));
  };

  const handleSubmitEmployeeOfRole = (schema, data) => {
    validate(schema, data, {
      onSuccess: (data) => dispatch(handleUpdateAddEmployeeOfRole(infoRoleSelected._id, data)),
      onError: (error) => dispatch(setErrorEmployeeIds(error)),
    });
    dispatch(setEmployeeeIds({ employee_ids: [] }));
  };

  const handleFocusEmployeeOfRole = (type) => {
    let dataError = _.cloneDeep(employeeIdsErr);
    dataError[type] = '';
    dispatch(setErrorEmployeeIds(dataError));
  };

  const handlePopupScroll = (e) => {
    const scrollContentHeight = e.target.scrollHeight;
    const visibleHeight = e.target.clientHeight;
    const scrollPosition = e.target.scrollTop;

    if (scrollContentHeight - visibleHeight === scrollPosition) {
      dispatch(
        setQueryEmployeeWithoutRole({
          ...queryEmployeeWithoutRole,
          page_size: queryEmployeeWithoutRole.page_size + 20,
        })
      );
      dispatch(handleEmployeeWithoutRole(infoRoleSelected._id));
    }
  };

  const handleSearch = (value) => {
    dispatch(
      setQueryEmployeeWithoutRole({
        ...queryEmployeeWithoutRole,
        q: value,
      })
    );
    let newTimeoutId = handleSetTimeOut(
      () => {
        dispatch(handleEmployeeWithoutRole(infoRoleSelected._id));
      },
      500,
      timeoutId
    );
    setTimeoutId(newTimeoutId);
  };

  const handleClear = () => {
    dispatch(
      setQueryEmployeeWithoutRole({
        ...queryEmployeeWithoutRole,
        q: '',
      })
    );
    let newTimeoutId = handleSetTimeOut(
      () => {
        dispatch(handleEmployeeWithoutRole(infoRoleSelected._id));
      },
      100,
      timeoutId
    );
    setTimeoutId(newTimeoutId);
  };

  const filterOption = () => {
    return true;
  };

  return {
    employeeIdsErr,
    employeeOption,
    infoEmployeeIds,
    queryEmployeeWithoutRole,
    isLoadingListEmployeeOfRole,
    isLoadingBtnAddEmployeeOfRole,
    visibleModalDeleteEmployeeOfRole,
    contentModalDeleteEmployeeOfRole,
    isLoadingBtnDeleteEmployeeOfRole,
    dispatch,
    handleClear,
    filterOption,
    handleSearch,
    handlePopupScroll,
    handleFocusEmployeeOfRole,
    handleSubmitEmployeeOfRole,
    openModalDeleteEmployeeOfRole,
    handleConfirmDeletEmployeeOfRole,
    handleChangeSelectEmployeeOfRole,
    handleToggleVisibleModalDeleteEmployeeOfRole,
  };
}
