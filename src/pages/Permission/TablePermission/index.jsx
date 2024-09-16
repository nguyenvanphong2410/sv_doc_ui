import NoData from '../NoData';
import HandleParent from '../handle';
import styles from './styles.module.scss';
import {Checkbox, Table, Tooltip} from 'antd';
import React, {useEffect, useState} from 'react';
import useWindowSize from '@/utils/hooks/useWindowSize';
import ModalConfirm from '@/components/ModalConfirm';
import {hasPermission} from '@/utils/helper';
import {PERMISSIONS} from '@/utils/constants';

const convertData = (data, id) => {
  const transformedData = data?.map((item) => {
    const permissions = item.permissions?.reduce((acc, permission) => {
      if (permission && permission.permission_type_code) {
        const {permission_type_code, active, _id} = permission;
        const permissionKey = permission_type_code;
        let hasRole;
        hasRole = active === true;
        return {
          ...acc,
          [`permissionId`]: item._id,
          [permissionKey]: hasRole,
          [`id${permissionKey}`]: _id,
          [`name${permissionKey}`]: permission.name,
        };
      }
      return acc;
    }, {});
    const children = item.children && item.children.length > 0 ? convertData(item.children, id) : [];
    return {
      name: item.name,
      ...permissions,
      ...(children.length > 0 && {children}),
    };
  });
  return transformedData;
};

export default function TablePermission() {
  const {
    typesList,
    permissionList,
    infoRoleSelected,
    visibleModalUpdatePermissionRole,
    contentModalUpdatePermissionRole,
    isLoadingBtnUpdatePermissionRole,
    handleCheckboxChange,
    handleConfirmUpdatePermissionRole,
    hanleCloseModalUpdatePermissionRole,
  } = HandleParent();

  const {width: widthOfScreen} = useWindowSize();
  const [tableKey, setTableKey] = useState(null);
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false);

  const permissionTypes = typesList;
  const admin = infoRoleSelected.protected === 'PROTECTED' ? 1 : 0;
  const tableData = convertData(permissionList, infoRoleSelected._id);

  const renderCheckboxColumn = (value, title, id, permissionId, record) => {
    const canChangeCheckbox = admin !== 1;
    return (
      <>
        {admin === 1 ? (
          <Tooltip placement="top" title={title}>
            <>
              {value !== undefined ? (
                <Checkbox
                  checked={value}
                  onChange={() => handleCheckboxChange(id, permissionId, record)}
                  disabled={!canChangeCheckbox}
                />
              ) : null}
            </>
          </Tooltip>
        ) : (
          <>
            <Tooltip placement="top" title={title}>
              <>
                {value !== undefined ? (
                  <Checkbox
                    checked={value}
                    onChange={() => handleCheckboxChange(id, permissionId, record)}
                    disabled={!hasPermission([PERMISSIONS.EDIT.EDIT_PERMISSION])}
                  />
                ) : null}
              </>
            </Tooltip>
          </>
        )}
      </>
    );
  };

  const permissionColumns = permissionTypes?.map((item) => ({
    title: item.name,
    dataIndex: item.code,
    width: widthOfScreen < 900 ? 110 : '',
    align: 'center',
    render: (value, record) =>
      renderCheckboxColumn(
        value,
        record['name' + item.code],
        record['id' + item.code],
        record.permissionId,
        record
      ),
  }));

  const filteredColumns = permissionColumns?.filter((column) => column.dataIndex !== 'status-active');

  const expandableProps = tableData && tableData.length > 0 ? {defaultExpandAllRows: true} : {};

  useEffect(() => {
    if (tableData && tableData.length > 0 && !hasLoadedOnce) {
      setTableKey(Date.now());
      setHasLoadedOnce(true);
    }
  }, [tableData, hasLoadedOnce]);

  return (
    <>
      <Table
        key={tableKey}
        pagination={false}
        dataSource={tableData}
        rowKey={'permissionId'}
        scroll={{x: 900, y: 'auto'}}
        className={`${styles.table} table`}
        bordered
        expandable={expandableProps}
        loading={isLoadingBtnUpdatePermissionRole}
        locale={{
          emptyText: (
            <div className={`${styles.noDataContent}`}>
              <NoData description={'Không có dữ liệu quyền hạn !'} />
            </div>
          ),
        }}
      >
        <Table.Column title='Chức năng'
          width='300px'
          dataIndex='name'
          className="tableName"
        />
        {filteredColumns?.map((column) => (
          <Table.Column width key={column.dataIndex} {...column} />
        ))}
      </Table>

      <ModalConfirm
        contentBtn={'Xác nhận'}
        loading={isLoadingBtnUpdatePermissionRole}
        content={contentModalUpdatePermissionRole}
        isModalOpen={visibleModalUpdatePermissionRole}
        handleCancel={() => hanleCloseModalUpdatePermissionRole()}
        handleConfirm={() => handleConfirmUpdatePermissionRole()}
      />
    </>
  );
}
