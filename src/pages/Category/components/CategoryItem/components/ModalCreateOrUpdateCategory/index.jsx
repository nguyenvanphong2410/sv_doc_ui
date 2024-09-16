import React from 'react'
import InlineSVG from 'react-inlinesvg'
import IconWarning from '@/assets/images/icons/light/warning.svg';
import {Button, Input} from 'antd';
import Handle from '@/pages/Category/components/CategoryItem/handle'
import {TYPE_SUBMIT } from '@/utils/constants'
import { createCategorySchema, updateCategorySchema } from '../../schema'
import './styles.scss';

function ModalCreateOrUpdateCategory() {
  const {
    isLoadingBtnCreateCategory,
    isLoadingBtnUpdateCategory,
    configModalCategory,
    errorInfoCategory,
    infoCategory,
    handleChangeInputInfo,
    handleFocus,
    handleCancelModalCreateOrUpdateCategory,
    handleSubmit,
  } = Handle()

  const { TextArea } = Input;
  return (
    <div>

      <div className={`input-wrap`}>
        <div className="label-wrap">
          <label className={`required label-input`}>
            Tên danh mục
          </label>
        </div>
        <Input
          value={infoCategory.name}
          onFocus={() => handleFocus('name')}
          onChange={(e) => handleChangeInputInfo(e, 'name')}
          className={`main-input ${errorInfoCategory && errorInfoCategory.name ? 'error-input' : ''}`}
          placeholder={'Nhập danh mục'}
        />
        {
          errorInfoCategory && errorInfoCategory.name &&
          <span className={`error`}>
            <div className={`icon`}>
              <InlineSVG src={IconWarning} width={14} height={14} />
            </div>
            {errorInfoCategory.name}
          </span>
        }
      </div>

      <div className={`input-wrap`}>
        <div className="label-wrap">
          <label className={`label-input`}>
            Mô tả
          </label>
        </div>
        <TextArea
          value={infoCategory.desc}
          onFocus={() => handleFocus('desc')}
          onChange={(e) => handleChangeInputInfo(e, 'desc')}
          className={`main-input ${errorInfoCategory && errorInfoCategory.desc ? 'error-input' : ''}`}
          placeholder={'Nhập mô danh mục'}
        />
        {
          errorInfoCategory && errorInfoCategory.desc &&
          <span className={`error`}>
            <div className={`icon`}>
              <InlineSVG src={IconWarning} width={14} height={14} />
            </div>
            {errorInfoCategory.desc}
          </span>
        }
      </div>

      <div className={`flex justify-center mt-8`}>
        <Button
          className={`ant-btn-close mx-[5px]`}
          size={'large'}
          onClick={handleCancelModalCreateOrUpdateCategory}
        >
          Đóng
        </Button>
        {
          configModalCategory.type === TYPE_SUBMIT.CREATE ?
            <Button
              loading={isLoadingBtnCreateCategory}
              className={`ant-btn-primary mx-[5px]`}
              size={'large'}
              onClick={() => handleSubmit(TYPE_SUBMIT.CREATE, createCategorySchema, infoCategory)}
            >
              Tạo mới
            </Button> :
            <Button
              loading={isLoadingBtnUpdateCategory}
              className={`ant-btn-primary mx-[5px]`}
              size={'large'}
              onClick={() => handleSubmit(TYPE_SUBMIT.UPDATE, updateCategorySchema, infoCategory)}
            >
              Cập nhật
            </Button>
        }
      </div>
    </div>
  )
}

export default ModalCreateOrUpdateCategory
