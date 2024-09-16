import {
  getListEmployees, 
  handleChangeStatusEmployee, 
  handleDeleteEmployee
} from '@/api/employees'
import {
  setConfigModal,
  setDataChangePassEmployee,
  setDataFilter,
  setErrorInfoEmployee,
  setInfoEmployee,
  setVisibleModalChangePass,
  setVisibleModalCreateOrUpdateEmployee
} from '@/states/modules/employee'
import Swal from 'sweetalert2'
import {useDispatch, useSelector} from 'react-redux'
import { USER_STATUS } from '@/utils/constants'

export default function Handle() {
  const dispatch = useDispatch()
  const dataFilter = useSelector((state) => state.employee.dataFilter)
  
  const handleShowModalUpdateEmployee = (employee, type) => {
    dispatch(setConfigModal({
      title: "Cập nhật thông tin tài khoản",
      type
    }));
    dispatch(setInfoEmployee({...employee, avatarUrl: employee.avatar}))
    dispatch(
      setErrorInfoEmployee({
        name: '',
        email: '',
        phone: '',
        avatar: '',
        avatarUrl: '',
        password: '',
      })
    )
    dispatch(setVisibleModalCreateOrUpdateEmployee(true));
  }
  
  const handleShowModalChangePassEmployee = (employee) => {
    dispatch(setDataChangePassEmployee({_id: employee._id}))
    dispatch(setVisibleModalChangePass(true))
  }
  
  const handleUpdateStatusEmployee = (employee) => {
    dispatch(handleChangeStatusEmployee(
      employee._id,
      employee.status === USER_STATUS.LOCK ? USER_STATUS.UNLOCK : USER_STATUS.LOCK
    ))
  }
  
  const handleChangeTableEmployee = (pagination, filters, sorter) => {
    const sortOrder = sorter.order && sorter.field ? (sorter.order === 'descend' ? 'desc' : 'asc') : null
    const column = sortOrder ? sorter.field : null
    dispatch(
      setDataFilter({
        ...dataFilter,
        sort_order: sortOrder,
        column,
      })
    )
    dispatch(getListEmployees())
  }
  
  const handleChangePaginationEmployee = (event) => {
    dispatch(
      setDataFilter({
        ...dataFilter,
        page: event,
      })
    )
    dispatch(getListEmployees())
  }
  
  const handleDeleteEmployeeAlert = (record) => {
    return Swal.fire({
      title: `<p class="title-modal-warning">
        Bạn có chắn chắn muốn xóa tài khoản <strong>${record.name}</strong> không?
      </p>`,
      icon: "warning",
      showCancelButton: true,
      buttonsStyling: false,
      cancelButtonText: "Đóng",
      confirmButtonText: "Xóa",
      customClass: {
        popup: 'popup-modal-warning',
        icon: `icon-modal-warning]`,
        confirmButton: 'confirm-button',
        cancelButton: 'cancel-button'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(handleDeleteEmployee(record._id));
      }
    });
  };

  return {
    handleShowModalUpdateEmployee,
    handleShowModalChangePassEmployee,
    handleUpdateStatusEmployee,
    handleChangeTableEmployee,
    handleDeleteEmployeeAlert,
    handleChangePaginationEmployee
  }
}
