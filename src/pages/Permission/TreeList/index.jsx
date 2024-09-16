import React from "react";
import HandleParent from "../handle";
import { Tooltip, Tree } from "antd";
import InlineSVG from "react-inlinesvg";
import styles from "./styles.module.scss";
import { PERMISSIONS, TYPE_SUBMIT } from "@/utils/constants";
import { InfoCircleFilled } from "@ant-design/icons";
import Edit from "@/assets/images/icons/duotone/pencil.svg";
import Delete from "@/assets/images/icons/duotone/trash-can.svg";
import { hasPermission } from "@/utils/helper";

export default function TreeList({ data }) {
  const {
    openModalEdit,
    openModalDelete,
    handleContentSelect,
  } = HandleParent();


  function convertToTreeData(data) {
    if (!Array.isArray(data)) {
      return [];
    }
    return data.map((item) => ({
      title: (
        <div key={item._id} className={styles.selectedWrap}>
          <div className={styles.selectedContent}>
            <span 
              className={styles.selectedName} 

              onClick={() => { hasPermission([PERMISSIONS.LIST.LIST_PERMISSION]) && handleContentSelect(item) }}
            >
              {item.name}{" "}
            </span>
            {item.description && (
              <span className={styles.selectedTooltip}>
                <Tooltip placement="top" title={item.description}>
                  <InfoCircleFilled />
                </Tooltip>
              </span>
            )}
          </div>
          <div>
            {item.protected !== 1 && (
              <div className={styles.track}>
                <div className={styles.roleItem}>

                  <span className={`${styles.actionWrap}`}>
                    {
                      hasPermission([PERMISSIONS.EDIT.EDIT_ROLE]) &&
                      <Tooltip title="Chỉnh sửa vai trò" placement="top">
                        <InlineSVG
                          src={Edit}
                          width={14}
                          className={`btn-edit ${styles.iconEdit}`}
                          onClick={() => openModalEdit(item, TYPE_SUBMIT.UPDATE)}
                        />
                      </Tooltip>
                    }
                    {
                      hasPermission([PERMISSIONS.DELETE.DELETE_ROLE]) &&
                      <Tooltip title="Xóa vai trò" placement="top">
                        <InlineSVG
                          src={Delete}
                          width={14}
                          className={`btn-delete ${styles.iconDelete}`}
                          onClick={() => openModalDelete(item)}
                        />
                      </Tooltip>
                    }
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      ),
      key: item._id,
      children: item.children?.length > 0 ? convertToTreeData(item.children) : [],
    }));
  }

  const treeData = convertToTreeData(data);

  return (
    <div>
      <Tree treeData={treeData} className="treeWrap" blockNode defaultExpandAll />
    </div>
  );
}
