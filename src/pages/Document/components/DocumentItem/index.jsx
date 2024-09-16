import React, { useEffect } from 'react'
import { setBreadcrumb } from '@/states/modules/app'
import { useDispatch, useSelector } from 'react-redux'
import { Button, FloatButton, Input, Popover } from 'antd'
import InlineSVG from 'react-inlinesvg'
import PlusIcon from '@/assets/images/icons/light/plus.svg'
import SearchIcon from '@/assets/images/icons/duotone/magnifying-glass.svg'
import ModalDefault from '@/components/Modal'
import Handle from '@/pages/Document/components/DocumentItem/handle';
import { PlusOutlined } from '@ant-design/icons'
import { PERMISSIONS, TYPE_SUBMIT } from '@/utils/constants'
import FilterPopover from '@/pages/Document/components/DocumentItem/components/FilterPopover'
import SortIcon from '@/assets/images/icons/duotone/sort.svg';
import TableDocument from '@/pages/Document/components/DocumentItem/components/TableDocument'
import { hasPermission } from '@/utils/helper'
import ModalCreateOrUpdateDocument from '@/pages/Document/components/DocumentItem/components/ModalCreateOrUpdateDocument'
import ListCategory from './components/ListCategory'
import './styles.scss';
import CardDocument from './components/CardDocument'

function DocumentItem() {
  const dispatch = useDispatch()
  const dataFilter = useSelector((state) => state.document.dataFilter)
  const configModal = useSelector((state) => state.document.configModal);
  const visibleModalCreateOrUpdateDocument = useSelector((state) => state.document.visibleModalCreateOrUpdateDocument)

  const {
    handleSearchDocument,
    handleEnterSearchDocument,
    handleShowModalCreateDocument,
    handleCancelModalCreateOrUpdateDocument,
    handleChangeTableDocument
  } = Handle()

  useEffect(() => {
    let dataBreadcrumb = [
      {
        path: '/',
        name: 'Trang chủ',
      },
      {
        path: '/document',
        name: 'Quản lý tài liệu ',
      },
    ]
    dispatch(setBreadcrumb(dataBreadcrumb))

    return () => dispatch(setBreadcrumb([]))
  }, [dispatch])

  return (
      <div className={`list-persion`}>
        <div className={`md:px-7 md:py-5 s:p-[10px]`}>
          <ListCategory/>
          <div className={`flex justify-between mb-2.5`}>
            <div className={`md:w-96 s:w-full`}>
              <Input
                value={dataFilter.keySearch}
                onKeyDown={(e) => handleEnterSearchDocument(e)}
                onChange={(e) => handleSearchDocument(e.target.value)}
                prefix={<InlineSVG src={SearchIcon} className={`icon-search`} alt="" />}
                className={`main-input`}
                placeholder="Tìm kiếm theo tên tài liệu"
              />
            </div>

            <div className="flex">
              <Popover
                className="lg:!mr-2.5 md:mr-0 xs:!ml-2.5 s:!ml-2.5"
                content={<FilterPopover handleChangeTableDocument={handleChangeTableDocument}/>}
                placement="bottomRight"
                trigger={"click"}
                title={
                  <div className={`title-filter-wrap`}>
                    <span className={`title-filter`}>Sắp xếp</span>
                  </div>
                }
              >
                <Button
                  icon={<InlineSVG src={SortIcon} className={`icon-filter`} alt="" />}
                  className={'btn-filter'}
                >
                  <span className={`text-btn-filter`}></span>
                  
                </Button>
              </Popover>

              {
                hasPermission([PERMISSIONS.ADD.ADD_DOCUMENT]) &&
                <>
                  <Button
                    icon={<InlineSVG src={PlusIcon} className={`w-4 h-4`} />}
                    className={`md:flex items-center ant-btn-primary h-full s:hidden`}
                    onClick={handleShowModalCreateDocument}
                  >
                    Tạo mới
                  </Button>
                  <FloatButton
                    onClick={handleShowModalCreateDocument}
                    className={`md:hidden bottom-[55px]`}
                    icon={<PlusOutlined />}
                    type="primary"
                  />
                </>
              }
            </div>
          </div>
          
          <div className='container-table-document'>
            <TableDocument 
              handleChangeTableDocument={handleChangeTableDocument}
            />
          </div>

          <div className='container-card-document'>
            <CardDocument/>
          </div>

          <ModalDefault
            isModalOpen={visibleModalCreateOrUpdateDocument}
            handleCancel={handleCancelModalCreateOrUpdateDocument}
            title={configModal.type === TYPE_SUBMIT.CREATE ? configModal.title : configModal.title}
            width={900}
          >
            <ModalCreateOrUpdateDocument />
          </ModalDefault>
        </div>
      </div>
  )
}

export default DocumentItem
