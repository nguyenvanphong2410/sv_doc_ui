import React from 'react'
import Handle from './handle'
import { Switch, Tooltip } from 'antd'
import { useSelector } from 'react-redux'
import InlineSVG from 'react-inlinesvg'
import TableDefault from '@/components/Table'
import { CATEGORY_STATUS, PERMISSIONS, TYPE_SUBMIT } from '@/utils/constants'
import IconEditTable from '@/assets/images/icons/duotone/pencil.svg'
import IconDeleteTable from '@/assets/images/icons/duotone/trash-can.svg'
import { hasPermission } from '@/utils/helper'

function TableCategory() {
  const dataListCategory = useSelector((state) => state.category.category)
  const isLoadingTableCategory = useSelector((state) => state.category.isLoadingTableCategory)
  const auth = useSelector((state) => state.auth.authUser)
  const paginationListCategory = useSelector((state) => state.category.paginationListCategory)

  const {
    handleShowModalUpdateCategory,
    handleUpdateStatusCategory,
    handleChangePaginationCategory,
    handleDeleteCategoryAlert,
    handleChangeTableCategory,
  } = Handle()

  const columns = [
    {
      title: <span className='title-table'>Tên danh mục</span>,
      dataIndex: 'name',
      key: 'name',
      width: 250,
      sorter: (a, b) => a.age - b.age,
      showSorterTooltip: false,
      defaultSortOrder: '',
      render: (text) => {
        return (
          <div className={`mt-1 ml-[10px] font-medium`}>{text}
          </div>
        )
      },
    },
    {
      title: <span className='title-table flex justify-center text-center'>Mô tả</span>,
      dataIndex: 'desc',
      key: 'desc',
      width: 200,
      showSorterTooltip: false,
      defaultSortOrder: '',
      render: (text, record) => {
        return record.desc ?
          <span>{record.desc}</span> :
          <i className={`text-update`}>Đang cập nhật</i>
      },
    },
    (
      hasPermission([
        PERMISSIONS.EDIT.EDIT_CATEGORY,
        PERMISSIONS.DELETE.DELETE_CATEGORY
      ]) ?
        {
          title: <span className='title-table'>Hoạt động</span>,
          dataIndex: 'actions',
          key: 'actions',
          align: 'center',
          fixed: window.innerWidth > 767 ? 'right' : "",
          width: 80,
          render: (text, record) => {
            return (
              <div className={`flex w-full justify-center bg-white`}>

                {
                  hasPermission([PERMISSIONS.EDIT.EDIT_CATEGORY]) &&
                  <div
                    className={`action-user mr-2`}
                    onClick={() => handleShowModalUpdateCategory(record, TYPE_SUBMIT.UPDATE)}
                  >
                    <Tooltip title="Cập nhật thông tin">
                      <InlineSVG src={IconEditTable} className={`w-[16px] h-[16px] `} alt="" />
                    </Tooltip>
                  </div>
                }

                {
                  hasPermission([PERMISSIONS.DELETE.DELETE_CATEGORY]) &&
                  <div
                    className={`action-user`}
                    onClick={() => handleDeleteCategoryAlert(record)}
                  >
                    <Tooltip title="Xóa thông tin">
                      <InlineSVG src={IconDeleteTable} className={`w-[16px] h-[16px]`} alt="" />
                    </Tooltip>
                  </div>
                }
              </div>
            )
          },
        }
        : {
          width: 1
        }
    ),

  ]

  return (
    <div>
      <TableDefault
        extraClassName='table-category'
        loading={isLoadingTableCategory}
        onChange={handleChangeTableCategory}
        dataSource={dataListCategory}
        pagination={paginationListCategory}
        columns={columns}
        rowKey={(record) => record?._id}
        handleSelectPagination={(e) => handleChangePaginationCategory(e)}
      />
    </div>
  )
}

export default TableCategory
