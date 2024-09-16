import Swal from 'sweetalert2';
import {useDispatch, useSelector} from 'react-redux';
import {CATEGORY_STATUS} from '@/utils/constants';
import {
  setConfigModalCategory,
  setDataFilterCategory,
  setErrorInfoCategory,
  setInfoCategory,
  setVisibleModalCreateOrUpdateCategory,
} from '@/states/modules/category';
import {getListCategories, handleChangeStatusCategory, handleDeleteCategory} from '@/api/category';

export default function Handle() {
  const dispatch = useDispatch();
  const dataFilter = useSelector((state) => state.category.dataFilter);

  const handleShowModalUpdateCategory = (category, type) => {
    dispatch(setInfoCategory(category));
    dispatch(
      setConfigModalCategory({
        title: 'Cập nhật thông tin danh mục',
        type,
      })
    );

    dispatch(
      setErrorInfoCategory({
        name: '',
        desc: '',
        status: '',
      })
    );
    dispatch(setVisibleModalCreateOrUpdateCategory(true));
  };

  const handleUpdateStatusCategory = (category) => {
    dispatch(
      handleChangeStatusCategory(
        category._id,
        category.status === CATEGORY_STATUS.LOCK ? CATEGORY_STATUS.UNLOCK : CATEGORY_STATUS.LOCK
      )
    );
  };

  const handleChangeTableCategory = (pagination, filters, sorter) => {
    const sortOrder = sorter.order && sorter.field ? (sorter.order === 'descend' ? 'desc' : 'asc') : null;
    const column = sortOrder ? sorter.field : null;
    dispatch(
      setDataFilterCategory({
        ...dataFilter,
        sort_order: sortOrder,
        column,
      })
    );
    dispatch(getListCategories());
  };

  const handleChangePaginationCategory = (event) => {
    dispatch(
      setDataFilterCategory({
        ...dataFilter,
        page: event,
      })
    );
    dispatch(getListCategories());
  };

  const handleDeleteCategoryAlert = (record) => {
    return Swal.fire({
      title: `<p class="title-modal-warning">
        Bạn có chắn chắn muốn xóa danh mục <strong>${record.name}</strong> không?
      </p>`,
      icon: 'warning',
      showCancelButton: true,
      buttonsStyling: false,
      cancelButtonText: 'Đóng',
      confirmButtonText: 'Xóa',
      customClass: {
        popup: 'popup-modal-warning',
        icon: `icon-modal-warning]`,
        confirmButton: 'confirm-button',
        cancelButton: 'cancel-button',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(handleDeleteCategory(record._id));
      }
    });
  };

  return {
    handleShowModalUpdateCategory,
    handleUpdateStatusCategory,
    handleChangePaginationCategory,
    handleDeleteCategoryAlert,
    handleChangeTableCategory,
  };
}
