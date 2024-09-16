import React, { useEffect } from 'react'
import { setBreadcrumb } from '@/states/modules/app'
import { useDispatch } from 'react-redux'
import { Button, FloatButton, Input } from 'antd'
import InlineSVG from 'react-inlinesvg'
import PlusIcon from '@/assets/images/icons/light/plus.svg'
import SearchIcon from '@/assets/images/icons/duotone/magnifying-glass.svg'
import ModalDefault from '@/components/Modal'
import Handle from './handle'
import { PlusOutlined } from '@ant-design/icons'
import { PERMISSIONS, TYPE_SUBMIT } from '@/utils/constants'
import TableCategory from './components/TableCategory'
import ModalCreateOrUpdateCategory from './components/ModalCreateOrUpdateCategory'
import { hasPermission } from '@/utils/helper'

function CategoryItem() {
  const dispatch = useDispatch()

  const {
    handleSearchCategory,
    handleEnterSearchCategory,
    handleShowModalCreateCategory,
    handleCancelModalCreateOrUpdateCategory,
    visibleModalCreateOrUpdateCategory,
    configModalCategory,
    dataFilter,
  } = Handle()

  useEffect(() => {
    let dataBreadcrumb = [
      {
        path: '/',
        name: 'Trang chủ',
      },
      {
        path: '/category',
        name: 'Quản lý tài liệu',
      },
    ]
    dispatch(setBreadcrumb(dataBreadcrumb))

    return () => dispatch(setBreadcrumb([]))
  }, [dispatch])

  return (
    <div className={`list-persion`}>
      <div className={`md:px-7 md:py-5 s:p-[10px]`}>
        <div className={`flex justify-between mb-2.5`}>
          <div className={`md:w-96 s:w-full`}>
            <Input
              value={dataFilter.keySearch}
              onKeyDown={(e) => handleEnterSearchCategory(e)}
              onChange={(e) => handleSearchCategory(e.target.value)}
              prefix={<InlineSVG src={SearchIcon} className={`icon-search`} alt="" />}
              className={`main-input`}
              placeholder="Tìm kiếm theo tên danh mục"
            />
          </div>

          <div>

            {
              hasPermission([PERMISSIONS.ADD.ADD_CATEGORY]) &&
              <>
                <Button
                  icon={<InlineSVG src={PlusIcon} className={`w-4 h-4`} />}
                  className={`md:flex items-center ant-btn-primary h-full s:hidden`}
                  onClick={handleShowModalCreateCategory}
                >
                  Tạo mới
                </Button>
                <FloatButton
                  onClick={handleShowModalCreateCategory}
                  className={`md:hidden bottom-[55px]`}
                  icon={<PlusOutlined />}
                  type="primary"
                />
              </>
            }
          </div>
        </div>

        <TableCategory />

        <ModalDefault
          isModalOpen={visibleModalCreateOrUpdateCategory}
          handleCancel={handleCancelModalCreateOrUpdateCategory}
          title={configModalCategory.type === TYPE_SUBMIT.CREATE ? configModalCategory.title : configModalCategory.title}
        >
          <ModalCreateOrUpdateCategory />
        </ModalDefault>
      </div>
    </div>
  )
}

export default CategoryItem
