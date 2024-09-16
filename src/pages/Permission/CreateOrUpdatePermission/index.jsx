import React from 'react';
import NoData from '../NoData';
import Handle from "./handle.js";
import HandleParent from "../handle";
import InlineSVG from "react-inlinesvg";
import styles from "../styles.module.scss";
import { TYPE_SUBMIT } from '@/utils/constants';
import { Button, Input, TreeSelect } from "antd";
import IconWarning from "@/assets/images/icons/light/warning.svg";
import { createPermissionSchema, updatePermissionSchema } from './schema.js';

const { TextArea } = Input;

export default function CreateOrUpdatePermission() {
  const {
    infoRole,
    configModal,
    treeDataOption,
    updatedTreeData,
    errorCreateOrUpdateRole,
    isLoadingBtnCreateOrUpdateRole,
    handleFocus,
    handleSubmitForm,
    handleChangeInput,
  } = Handle();

  const {
    handleToggleVisibleModalCreateOrUpdate
  } = HandleParent();

  return (
    <div className={`container`}>
      <div className={`form`}>
        <div className={`input-wrap`}>
          <div className={'label-wrap'}>Vai trò cha</div>
          <TreeSelect
            allowClear
            showSearch={false}
            treeDefaultExpandAll
            treeData={configModal.type === TYPE_SUBMIT.CREATE ? treeDataOption : updatedTreeData}
            className="main-select w-full tree_select_wrap"
            notFoundContent={
              <div className='mt-4 mb-4'>
                <NoData description={'Không có dữ liệu !'} />
              </div>
            }
            placeholder="Chọn nhóm vai trò cha"
            value={infoRole.parent_id || null}
            onChange={(value) => handleChangeInput(value, 'parent_id')}
          />
        </div>
        <div className={`input-wrap`}>
          <div className={'label-wrap'}>
            Tên vai trò <span className={'required'}></span>
          </div>
          <Input
            className={`main-input`}
            placeholder={'Nhập tên vai trò'}
            value={infoRole.name}
            onFocus={() => handleFocus('name')}
            onChange={(e) => handleChangeInput(e.target.value, 'name')}
          />
          {
            errorCreateOrUpdateRole && errorCreateOrUpdateRole.name ?
              <span className={'error'}>
                <div className={'icon'}>
                  <InlineSVG src={IconWarning} width={14} height="auto" />
                </div>
                {errorCreateOrUpdateRole.name}
              </span> : ''
          }
        </div>
        <div className={`input-wrap`}>
          <div className={'label-wrap'}>
            Mô tả
          </div>
          <TextArea
            rows={3}
            className={`main-input`}
            placeholder={'Nhập mô tả'}
            value={infoRole.description}
            onFocus={() => handleFocus('description')}
            onChange={(e) => handleChangeInput(e.target.value, 'description')}
          />
          {
            errorCreateOrUpdateRole && errorCreateOrUpdateRole.description ?
              <span className={'error'}>
                <div className={'icon'}>
                  <InlineSVG src={IconWarning} width={14} height="auto" />
                </div>
                {errorCreateOrUpdateRole.description}
              </span> : ''
          }
        </div>

      </div>
      <div className={styles.btnWrap}>
        <div>
          <Button
            className={`main-btn-close`}
            size={'large'}
            onClick={() => handleToggleVisibleModalCreateOrUpdate()}
          >
            Đóng
          </Button>
          {
            configModal.type === TYPE_SUBMIT.CREATE ?
              <Button
                loading={isLoadingBtnCreateOrUpdateRole}
                className={`main-btn-primary`} type={"primary"} size={'large'}
                onClick={() => handleSubmitForm(TYPE_SUBMIT.CREATE, createPermissionSchema, infoRole)}
              >
                Tạo mới
              </Button> :
              <Button
                loading={isLoadingBtnCreateOrUpdateRole}
                className={`main-btn-primary`} type={"primary"} size={'large'}
                onClick={() => handleSubmitForm(TYPE_SUBMIT.UPDATE, updatePermissionSchema, infoRole)}
              >
                Cập nhật
              </Button>
          }
        </div>
      </div>
    </div>
  )
}