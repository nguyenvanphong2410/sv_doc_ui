import {
  setConfigModal,
  setDataFilter,
  setErrorInfoDocument,
  setInfoDocument,
  setVisibleModalCreateOrUpdateDocument
} from '@/states/modules/document'
import Swal from 'sweetalert2'
import {useDispatch, useSelector} from 'react-redux'
import { DOCUMENT_STATUS, PRODUCT_STATUS, STATUS_DOC_CHECK } from '@/utils/constants'
import { getListDocuments, handleDeleteDocument, requestChangeDocCheckDocument, requestChangeStatusDocument } from '@/api/document'

export default function Handle() {
  const dispatch = useDispatch()
  const dataFilter = useSelector((state) => state.document.dataFilter)
  
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
    dispatch(setInfoDocument({
      ...document,
      images: imageDocuments,
    }))
    dispatch(
      setErrorInfoDocument({
        name: "",
        images: "",
        sale_price: "",
        wholesale_price: "",
        cost_price: "",
        unit: "",
        quantity: "",
        description: "",
        category_id: "",
      })
    )
    dispatch(setVisibleModalCreateOrUpdateDocument(true));
  }
  
  const handleUpdateStatusDocument = (document) => {
    dispatch(requestChangeStatusDocument(
      document._id,
      document.status === PRODUCT_STATUS.UNAVAILABLE ? PRODUCT_STATUS.AVAILABLE : PRODUCT_STATUS.UNAVAILABLE
    ))
  }
  
  const handleChangePaginationDocument = (event) => {
    dispatch(
      setDataFilter({
        ...dataFilter,
        page: event,
      })
    )
    dispatch(getListDocuments())
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
        dispatch(handleDeleteDocument(record._id));
      }
    });
  };

  const handleUpdateStatusRoom = (document) => {
    dispatch(requestChangeStatusDocument(
      document._id,
      document.status === DOCUMENT_STATUS.UNLOCK ? DOCUMENT_STATUS.LOCK : DOCUMENT_STATUS.UNLOCK
    ))
  }

  const handleUpdateChecked = (document) => {
    dispatch(requestChangeDocCheckDocument(
      document._id,
      document.doc_check === STATUS_DOC_CHECK.CHECKED ? STATUS_DOC_CHECK.PENDING : STATUS_DOC_CHECK.CHECKED
    ))
  }

  return {
    handleShowModalUpdateDocument,
    handleUpdateStatusDocument,
    handleDeleteDocumentAlert,
    handleChangePaginationDocument,
    handleUpdateStatusRoom,
    handleUpdateChecked
  }
}
