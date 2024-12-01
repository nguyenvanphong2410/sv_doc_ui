import {
  setConfigModal,
  setDataFilterChecked,
  setErrorInfoDocumentChecked,
  setInfoDocumentChecked,
  setVisibleModalCreateOrUpdateDocumentChecked
} from '@/states/modules/document'
import Swal from 'sweetalert2'
import {useDispatch, useSelector} from 'react-redux'
import { requestGetListDocumentsChecked, requestDeleteDocumentsChecked } from '@/api/document'
import { initErrInfoDocument } from '@/states/modules/document/initState'

export default function Handle() {
  const dispatch = useDispatch()
  const dataFilterChecked = useSelector((state) => state.document.dataFilterChecked)
  
  const handleShowModalUpdateDocument = (document, type) => {
    dispatch(setConfigModal({
      title: "Thông tin tài liệu",
      type
    }));

    let imageDocuments = [];
    document.images_src.forEach(function(image,index){
      imageDocuments.push({
        id: index+1,
        name: image,
        url: image,
        is_featured: document.image_featured === image,
        file: document.images[index]
      })
    })
    dispatch(setInfoDocumentChecked({
      ...document,
      images: imageDocuments,
    }))
    dispatch(
      setErrorInfoDocumentChecked(initErrInfoDocument)
    )
    dispatch(setVisibleModalCreateOrUpdateDocumentChecked(true));
  }
  
  const handleChangePaginationDocument = (event) => {
    dispatch(
      setDataFilterChecked({
        ...dataFilterChecked,
        page: event,
      })
    )
    dispatch(requestGetListDocumentsChecked())
  }
  
  const handleDeleteDocumentAlert = (record) => {
    return Swal.fire({
      title: `<p class="title-modal-warning">
        Bạn có chắn chắn muốn xóa tài liệu <strong>${record.name}</strong> không?
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
        dispatch(requestDeleteDocumentsChecked(record._id));
      }
    });
  };

  const handleChangeTableDocument = (pagination, filters, sorter) => {
    const sortOrder = sorter.order && sorter.field ? (sorter.order === 'descend' ? 'desc' : 'asc') : null;
    const column = sortOrder ? sorter.field : null;
    dispatch(
      setDataFilterChecked({
        ...dataFilterChecked,
        sort_order: sortOrder,
        column,
      })
    );
    dispatch(requestGetListDocumentsChecked())
  };

  return {
    handleShowModalUpdateDocument,
    handleDeleteDocumentAlert,
    handleChangePaginationDocument,
    handleChangeTableDocument,
  }
}
