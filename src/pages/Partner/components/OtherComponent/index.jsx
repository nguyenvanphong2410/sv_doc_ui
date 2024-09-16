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
import TableOther from './components/TableOther'
import { setConfigModalOther, setDataChangePassOther, setDataFilterOther, setErrorDataChangePassOther, setInfoOther, setVisibleModalChangePass, setVisibleModalCreateOrUpdateOther } from '@/states/modules/partner'
import { initInfoPartner } from '@/states/modules/partner/initState'
import { requestGetListOther } from '@/api/partners'
import ModalChangePassOther from './components/ModalChangePass'

function OtherComponent() {
  const dispatch = useDispatch()

  const visibleModalCreateOrUpdateOther = useSelector(state => state.partner.visibleModalCreateOrUpdateOther)
  const configModalOther = useSelector(state => state.partner.configModalOther)
  const dataFilterOther = useSelector(state => state.partner.dataFilterOther)
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

  const handleShowModalCreateOther = () => {
    dispatch(
      setConfigModalOther({
        title: 'Tạo mới người dùng',
        type: TYPE_SUBMIT.CREATE,
      })
    );
    dispatch(setInfoOther(initInfoPartner));
    dispatch(setVisibleModalCreateOrUpdateOther(true));

  }

  const handleCancelModalCreateOrUpdateOther = () => {
    dispatch(setVisibleModalCreateOrUpdateOther(false));
  }

  const handleEnterSearchOther = (event) => {
    if (event.key === 'Enter') {
      dispatch(
        setDataFilterOther({
          ...dataFilterOther,
          page: 1,
        })
      )
      dispatch(requestGetListOther());
    }
  };

  const handleSearchOther = (value) => {
    dispatch(setDataFilterOther({...dataFilterOther, keySearch: value}));
    if (!value) {
      dispatch(requestGetListOther());
    }
  };

  const handleCancelModalChangePass = () => {
    dispatch(
      setDataChangePassOther({
        new_password: '',
        confirm_password: '',
      })
    )
    dispatch(
      setErrorDataChangePassOther({
        new_password: '',
        confirm_password: '',
      })
    )
    dispatch(setVisibleModalChangePass(false))
  }

  return (
    <div className={`list-persion`}>
      <div className={`md:px-7 md:py-5 s:p-[10px]`}>
        <div className={`flex justify-between mb-2.5`}>
          <div className={`md:w-96 s:w-full`}>
            <Input
              value={dataFilterOther.keySearch}
              onKeyDown={(e) => handleEnterSearchOther(e)}
              onChange={(e) => handleSearchOther(e.target.value)}
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
                  onClick={handleShowModalCreateOther}
                >
                  Tạo mới
                </Button>
                <FloatButton
                  onClick={handleShowModalCreateOther}
                  className={`md:hidden bottom-[55px]`}
                  icon={<PlusOutlined />}
                  type="primary"
                />
              </>
            }
          </div>
        </div>

        <TableOther />

        <ModalDefault
          isModalOpen={visibleModalCreateOrUpdateOther}
          handleCancel={handleCancelModalCreateOrUpdateOther}
          title={configModalOther.type === TYPE_SUBMIT.CREATE ? configModalOther.title : configModalOther.title}
        >
          <ModalCreateOrUpdate />
        </ModalDefault>

        <ModalDefault
            isModalOpen={visibleModalChangePass}
            handleCancel={handleCancelModalChangePass}
            title="Đổi mật khẩu"
          >
            <ModalChangePassOther />
          </ModalDefault>
      </div>
    </div>
  )
}

export default OtherComponent
