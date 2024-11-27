import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, FloatButton, Input } from 'antd'
import InlineSVG from 'react-inlinesvg'
import PlusIcon from '@/assets/images/icons/light/plus.svg'
import SearchIcon from '@/assets/images/icons/duotone/magnifying-glass.svg'
import ModalDefault from '@/components/Modal'
import { PlusOutlined } from '@ant-design/icons'
import { PERMISSIONS, TYPE_SUBMIT } from '@/utils/constants'
import { hasPermission } from '@/utils/helper'
import ModalCreateOrUpdate from './components/ModalCreateOrUpdate'
import { setBreadcrumb } from '@/states/modules/app'
import TableTeacher from './components/TableTeacher'
import { setConfigModalTeacher, setDataChangePassTeacher, setDataFilterTeacher, setErrorDataChangePassTeacher, setInfoTeacher, setVisibleModalChangePassTeacher, setVisibleModalCreateOrUpdateTeacher } from '@/states/modules/partner'
import { initInfoPartner } from '@/states/modules/partner/initState'
import { requestGetListTeacher } from '@/api/partners'
import ModalChangePassTeacher from './components/ModalChangePass'

function TeacherComponent() {
  const dispatch = useDispatch()

  const visibleModalCreateOrUpdateTeacher = useSelector(state => state.partner.visibleModalCreateOrUpdateTeacher)
  const configModalTeacher = useSelector(state => state.partner.configModalTeacher)
  const dataFilterTeacher = useSelector(state => state.partner.dataFilterTeacher)
  const visibleModalChangePassTeacher = useSelector((state) => state.partner.visibleModalChangePassTeacher)

  useEffect(() => {
    let dataBreadcrumb = [
      {
        path: '/',
        name: 'Trang chủ',
      },
      {
        path: '/partners',
        name: 'Quản lý người dùng',
      },
    ]
    dispatch(setBreadcrumb(dataBreadcrumb))

    return () => dispatch(setBreadcrumb([]))
  }, [])

  const handleShowModalCreateTeacher = () => {
    dispatch(
      setConfigModalTeacher({
        title: 'Tạo mới người dùng',
        type: TYPE_SUBMIT.CREATE,
      })
    );
    dispatch(setInfoTeacher(initInfoPartner));
    dispatch(setVisibleModalCreateOrUpdateTeacher(true));

  }

  const handleCancelModalCreateOrUpdateTeacher = () => {
    dispatch(setVisibleModalCreateOrUpdateTeacher(false));
  }

  const handleEnterSearchTeacher = (event) => {
    if (event.key === 'Enter') {
      dispatch(
        setDataFilterTeacher({
          ...dataFilterTeacher,
          page: 1,
        })
      )
      dispatch(requestGetListTeacher());
    }
  };

  const handleSearchTeacher = (value) => {
    dispatch(setDataFilterTeacher({...dataFilterTeacher, keySearch: value}));
    if (!value) {
      dispatch(requestGetListTeacher());
    }
  };

  const handleCancelModalChangePass = () => {
    dispatch(
      setDataChangePassTeacher({
        new_password: '',
        confirm_password: '',
      })
    )
    dispatch(
      setErrorDataChangePassTeacher({
        new_password: '',
        confirm_password: '',
      })
    )
    dispatch(setVisibleModalChangePassTeacher(false))
  }

  return (
    <div className={`list-persion`}>
      <div className={`md:px-7 md:py-5 s:p-[10px]`}>
        <div className={`flex justify-between mb-2.5`}>
          <div className={`md:w-96 s:w-full`}>
            <Input
              value={dataFilterTeacher.keySearch}
              onKeyDown={(e) => handleEnterSearchTeacher(e)}
              onChange={(e) => handleSearchTeacher(e.target.value)}
              prefix={<InlineSVG src={SearchIcon} className={`icon-search`} alt="" />}
              className={`main-input`}
              placeholder="Tìm kiếm theo mã, tên, email, số điện thoại"
            />
          </div>

          <div>

            {
              hasPermission([PERMISSIONS.ADD.ADD_TEACHER]) &&
              <>
                <Button
                  icon={<InlineSVG src={PlusIcon} className={`w-4 h-4`} />}
                  className={`md:flex items-center ant-btn-primary h-full s:hidden`}
                  onClick={handleShowModalCreateTeacher}
                >
                  Tạo mới
                </Button>
                <FloatButton
                  onClick={handleShowModalCreateTeacher}
                  className={`md:hidden bottom-[55px]`}
                  icon={<PlusOutlined />}
                  type="primary"
                />
              </>
            }
          </div>
        </div>

        <TableTeacher />

        <ModalDefault
          isModalOpen={visibleModalCreateOrUpdateTeacher}
          handleCancel={handleCancelModalCreateOrUpdateTeacher}
          title={configModalTeacher.type === TYPE_SUBMIT.CREATE ? configModalTeacher.title : configModalTeacher.title}
        >
          <ModalCreateOrUpdate />
        </ModalDefault>

        <ModalDefault
            isModalOpen={visibleModalChangePassTeacher}
            handleCancel={handleCancelModalChangePass}
            title="Đổi mật khẩu"
          >
            <ModalChangePassTeacher />
          </ModalDefault>
      </div>
    </div>
  )
}

export default TeacherComponent
