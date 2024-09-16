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
import TableStudent from './components/TableStudent'
import { setConfigModalStudent, setDataChangePassStudent, setDataFilterStudent, setErrorDataChangePassStudent, setInfoStudent, setVisibleModalChangePassStudent, setVisibleModalCreateOrUpdateStudent } from '@/states/modules/partner'
import { initInfoPartner } from '@/states/modules/partner/initState'
import { requestGetListStudent } from '@/api/partners'
import ModalChangePassStudent from './components/ModalChangePass'

function StudentComponent() {
  const dispatch = useDispatch()

  const visibleModalCreateOrUpdateStudent = useSelector(state => state.partner.visibleModalCreateOrUpdateStudent)
  const configModalStudent = useSelector(state => state.partner.configModalStudent)
  const dataFilterStudent = useSelector(state => state.partner.dataFilterStudent)
  const visibleModalChangePass = useSelector((state) => state.partner.visibleModalChangePass)

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

  const handleShowModalCreateStudent = () => {
    dispatch(
      setConfigModalStudent({
        title: 'Tạo mới người dùng',
        type: TYPE_SUBMIT.CREATE,
      })
    );
    dispatch(setInfoStudent(initInfoPartner));
    dispatch(setVisibleModalCreateOrUpdateStudent(true));

  }

  const handleCancelModalCreateOrUpdateStudent = () => {
    dispatch(setVisibleModalCreateOrUpdateStudent(false));
  }

  const handleEnterSearchStudent = (event) => {
    if (event.key === 'Enter') {
      dispatch(
        setDataFilterStudent({
          ...dataFilterStudent,
          page: 1,
        })
      )
      dispatch(requestGetListStudent());
    }
  };

  const handleSearchStudent = (value) => {
    dispatch(setDataFilterStudent({...dataFilterStudent, keySearch: value}));
    if (!value) {
      dispatch(requestGetListStudent());
    }
  };

  const handleCancelModalChangePass = () => {
    dispatch(
      setDataChangePassStudent({
        new_password: '',
        confirm_password: '',
      })
    )
    dispatch(
      setErrorDataChangePassStudent({
        new_password: '',
        confirm_password: '',
      })
    )
    dispatch(setVisibleModalChangePassStudent(false))
  }

  return (
    <div className={`list-persion`}>
      <div className={`md:px-7 md:py-5 s:p-[10px]`}>
        <div className={`flex justify-between mb-2.5`}>
          <div className={`md:w-96 s:w-full`}>
            <Input
              value={dataFilterStudent.keySearch}
              onKeyDown={(e) => handleEnterSearchStudent(e)}
              onChange={(e) => handleSearchStudent(e.target.value)}
              prefix={<InlineSVG src={SearchIcon} className={`icon-search`} alt="" />}
              className={`main-input`}
              placeholder="Tìm kiếm theo mã, tên, email, số điện thoại"
            />
          </div>

          <div>

            {
              hasPermission([PERMISSIONS.ADD.ADD_CATEGORY]) &&
              <>
                <Button
                  icon={<InlineSVG src={PlusIcon} className={`w-4 h-4`} />}
                  className={`md:flex items-center ant-btn-primary h-full s:hidden`}
                  onClick={handleShowModalCreateStudent}
                >
                  Tạo mới
                </Button>
                <FloatButton
                  onClick={handleShowModalCreateStudent}
                  className={`md:hidden bottom-[55px]`}
                  icon={<PlusOutlined />}
                  type="primary"
                />
              </>
            }
          </div>
        </div>

        <TableStudent />

        <ModalDefault
          isModalOpen={visibleModalCreateOrUpdateStudent}
          handleCancel={handleCancelModalCreateOrUpdateStudent}
          title={configModalStudent.type === TYPE_SUBMIT.CREATE ? configModalStudent.title : configModalStudent.title}
        >
          <ModalCreateOrUpdate />
        </ModalDefault>

        <ModalDefault
            isModalOpen={visibleModalChangePass}
            handleCancel={handleCancelModalChangePass}
            title="Đổi mật khẩu"
          >
            <ModalChangePassStudent />
          </ModalDefault>
      </div>
    </div>
  )
}

export default StudentComponent
