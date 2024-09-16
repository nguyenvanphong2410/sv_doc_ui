import React, { useEffect } from 'react'
import MainLayout from '@/layouts/MainLayout/index.jsx'
import { setBreadcrumb } from '@/states/modules/app'
import { useDispatch, useSelector } from 'react-redux'
import { Button, FloatButton, Input } from 'antd'
import InlineSVG from 'react-inlinesvg'
import PlusIcon from '@/assets/images/icons/light/plus.svg'
import SearchIcon from '@/assets/images/icons/duotone/magnifying-glass.svg'
import ModalDefault from '@/components/Modal'
import TableEmployee from './components/TableEmployee'
import Handle from './handle'
import { PlusOutlined } from '@ant-design/icons'
import { PERMISSIONS, TYPE_SUBMIT } from '@/utils/constants'
import ModalCreateOrUpdateEmployee from './components/CreateOrUpdateModalEmployee'
import ModalChangePassEmployee from './components/ModalChangePass'
import { hasPermission } from '@/utils/helper'

function Employee() {
  const dispatch = useDispatch()
  const dataFilter = useSelector((state) => state.employee.dataFilter)
  const configModal = useSelector((state) => state.employee.configModal);
  const visibleModalCreateOrUpdateEmployee = useSelector((state) => state.employee.visibleModalCreateOrUpdateEmployee)
  const visibleModalChangePass = useSelector((state) => state.employee.visibleModalChangePass)

  const {
    handleCancelModalChangePass,
    handleSearchEmployee,
    handleEnterSearchEmployee,
    handleshowModalCreateEmployee,
    handleCancelModalCreateOrUpdateEmployee
  } = Handle()

  useEffect(() => {
    document.title = "SV.Doc - Tài khoản";
    let dataBreadcrumb = [
      {
        path: '/',
        name: 'Trang chủ',
      },
      {
        path: '/employees',
        name: 'Quản lý tài khoản',
      },
    ]
    dispatch(setBreadcrumb(dataBreadcrumb))

    return () => dispatch(setBreadcrumb([]))
  }, [dispatch])

  return (
    <MainLayout className='list-persion-wrap'>
      <div className={`list-persion`}>
        <div className={`md:px-7 md:py-5 s:p-[10px]`}>
          <div className={`flex justify-between mb-2.5`}>
            <div className={`md:w-96 s:w-full`}>
              <Input
                value={dataFilter.keySearch}
                onKeyDown={(e) => handleEnterSearchEmployee(e)}
                onChange={(e) => handleSearchEmployee(e.target.value)}
                prefix={<InlineSVG src={SearchIcon} className={`icon-search`} alt="" />}
                className={`main-input`}
                placeholder="Tìm kiếm theo tên, email hoặc số điện thoại"
              />
            </div>

            <div>
              {
                hasPermission([PERMISSIONS.ADD.ADD_EMPLOYEE]) &&
                <>
                  <Button
                    icon={<InlineSVG src={PlusIcon} className={`w-4 h-4`} />}
                    className={`md:flex items-center ant-btn-primary h-full s:hidden`}
                    onClick={handleshowModalCreateEmployee}
                  >
                    Tạo mới
                  </Button>
                  <FloatButton
                    className={`md:hidden bottom-[55px]`}
                    icon={<PlusOutlined />}
                    type="primary"
                  />
                </>
              }
            </div>
          </div>

          <TableEmployee />
           
          <ModalDefault
            isModalOpen={visibleModalCreateOrUpdateEmployee}
            handleCancel={handleCancelModalCreateOrUpdateEmployee}
            title={configModal.type === TYPE_SUBMIT.CREATE ? configModal.title : configModal.title}
          >
            <ModalCreateOrUpdateEmployee />
          </ModalDefault>

          <ModalDefault
            isModalOpen={visibleModalChangePass}
            handleCancel={handleCancelModalChangePass}
            title="Đổi mật khẩu"
          >
            <ModalChangePassEmployee />
          </ModalDefault>
        </div>
      </div>
    </MainLayout>
  )
}

export default Employee
