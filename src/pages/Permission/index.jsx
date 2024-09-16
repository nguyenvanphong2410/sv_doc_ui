import React, { useEffect } from "react";
import "./styles.scss";
import NoData from './NoData';
import Handle from "./handle.js";
import TreeList from './TreeList';
import { Avatar, Tooltip } from 'antd';
import styles from "./styles.module.scss";
import ModalDefault from "@/components/Modal";
import MainLayout from '@/layouts/MainLayout';
import TablePermission from './TablePermission';
import AddEmployeeOfRole from './AddEmployeeOfRole';
import { PERMISSIONS, PROTECTED, TYPE_SUBMIT } from "@/utils/constants";
import { PlusOutlined, SettingFilled } from "@ant-design/icons";
import CreateOrUpdatePermission from "./CreateOrUpdatePermission";
import { setVisibleModalDeleteRole } from "@/states/modules/permissions";
import ModalDeleteDefault from "@/components/ModalDelete";
import { setBreadcrumb } from "@/states/modules/app";
import { hasPermission } from "@/utils/helper";

export default function Permission() {
  const {
    dataRole,
    rolesList,
    configModal,
    infoRoleSelected,
    employeeOfRoleList,
    contentModalDelete,
    isLoadingBtnDeleteRole,
    visibleModalDeleteRole,
    visibleModalCreateOrUpdateRole,
    visibleModalAddEmployeeOfRole,
    dispatch,
    openModalCreate,
    handleConfirmDelete,
    openModalAddEmployeeRole,
    handleToggleVisibleModalCreateOrUpdate,
    handleToggleVisibleModalAddEmployeeOfRole,
  } = Handle();

  useEffect(() => {
    document.title = "SV.Doc - Vai trò";
    let dataBreadcrumb = [
      {
        path: '/',
        name: 'Trang chủ',
      },
      {
        path: '/permission',
        name: 'Vai trò',
      },
    ];
    dispatch(setBreadcrumb(dataBreadcrumb));

    return () => dispatch(setBreadcrumb([]));
  }, []);

  return (
    <MainLayout className='xs:px-[10px] s:px-[10px]'>
      <div className={styles.pageWrap}>
        <div className={styles.permissionWrap}>
          <div className={styles.permissionTitle}>
            <div className={styles.rolesName}>
              <p>Vai trò</p>
              {
                hasPermission([PERMISSIONS.ADD.ADD_ROLE]) &&
                <Tooltip title="Tạo mới vai trò" placement="top">
                  <div className={styles.modalPermiss} onClick={() => openModalCreate(TYPE_SUBMIT.CREATE)}>
                    <PlusOutlined className={styles.iconAdd} />
                    <div className={styles.contentadd}>Tạo mới</div>
                  </div>
                </Tooltip>
              }
            </div>
          </div>
          {
            rolesList?.length > 0 ?
              <div className={styles.permissionContent}>
                <TreeList data={dataRole} />
              </div>
              :
              <div className={styles.permissionNoContent}>
                <NoData description={'Không có dữ liệu !'} />
              </div>
          }
        </div>

        <div className={styles.permissionMain}>
          {infoRoleSelected?._id ? (
            <div className={styles.mainWrap}>
              <div className={styles.mainTitle}>Quyền hạn</div>

              <div className={styles.mainContent}>
                <div className={`${styles.headerPermission} mt-4 mb-4`}>
                  <span
                    className={`${infoRoleSelected.protected === PROTECTED.PROTECTED ? 'mt-2 mb-2' : ''}`}
                  >
                    <span className={styles.roleName}>Vai trò</span>
                    <span className={`${styles.strong}`}> {infoRoleSelected.name}</span>
                    {infoRoleSelected.protected === PROTECTED.PROTECTED ? '': (
                      <span className={styles.avatar}>
                        <Avatar.Group maxCount={3} className="avatar-permissions"
                          maxPopoverTrigger="focus">
                          {employeeOfRoleList.map((users) => (
                            <Tooltip key={users._id} title={users.name} placement="top">
                              <Avatar size={40} src={users.avatar} />
                            </Tooltip>
                          ))}

                        </Avatar.Group>
                        {
                          infoRoleSelected.protected === PROTECTED.PROTECTED ? '' :
                            <Tooltip title="Thêm tài khoản" placement="top">
                              <Avatar
                                onClick={() => openModalAddEmployeeRole()}
                                className={styles.imgAddMember}
                                size={38}
                                icon={<PlusOutlined className={styles.iconAdd} />}
                              >
                              </Avatar>
                            </Tooltip>
                        }
                      </span>
                    )}
                  </span>
                </div>
                <div className={styles.tablePermission}>
                  <TablePermission />
                </div>
              </div>

            </div>
          ) : (
            <div className={styles.container}>
              <div className={styles.iconContainer}>
                <SettingFilled className={styles.iconSetting} />
                <p>Chọn vai trò để thiết lập quyền hạn</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <ModalDefault
        title={configModal.type === TYPE_SUBMIT.CREATE ? configModal.title : configModal.title}
        isModalOpen={visibleModalCreateOrUpdateRole}
        handleOk={() => handleToggleVisibleModalCreateOrUpdate()}
        handleCancel={() => handleToggleVisibleModalCreateOrUpdate()}
      >
        <CreateOrUpdatePermission />

      </ModalDefault>

      <ModalDeleteDefault
        contentBtn={"Xóa vai trò"}
        content={contentModalDelete}
        loading={isLoadingBtnDeleteRole}
        isModalOpen={visibleModalDeleteRole}
        handleConfirm={() => handleConfirmDelete()}
        handleOk={() => dispatch(setVisibleModalDeleteRole(false))}
        handleCancel={() => dispatch(setVisibleModalDeleteRole(false))}
      />

      <ModalDefault
        type={'role'}
        isModalOpen={visibleModalAddEmployeeOfRole}
        title={`Tài khoản với vai trò ${infoRoleSelected.name}`}
        handleCancel={() => handleToggleVisibleModalAddEmployeeOfRole()}
      >
        <AddEmployeeOfRole />
      </ModalDefault>

    </MainLayout>
  )
}
