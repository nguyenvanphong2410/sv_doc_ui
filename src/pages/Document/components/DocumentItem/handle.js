import {useDispatch, useSelector} from 'react-redux';
import {
  setDataFilter,
  setConfigModal,
  setInfoDocument,
  setErrorInfoDocument,
  setVisibleModalCreateOrUpdateDocument,
  setImageList,
} from '@/states/modules/document';
import {getListDocuments, handleCreateDocument, handleUpdateDocument} from '@/api/document';
import {validate} from '@/utils/validates';
import {TYPE_FILE, TYPE_SUBMIT, TYPE_IMAGE, DOCUMENT_STATUS, STATUS_DOC_CHECK} from '@/utils/constants';
import {getNotification} from '@/utils/helper';
import _ from 'lodash';
import {useEffect, useState} from 'react';

export default function Handle() {
  const dispatch = useDispatch();

  const [categoryOption, setCategoryOption] = useState([]);

  const infoDocument = useSelector((state) => state.document.infoDocument);
  const errorInfoDocument = useSelector((state) => state.document.errorInfoDocument);
  const dataFilter = useSelector((state) => state.document.dataFilter);
  const paginationListDocument = useSelector((state) => state.document.paginationListDocument);
  const dataListCategory = useSelector((state) => state.category.allCategory);
  const [fileName, setFileName] = useState('');

  useEffect(() => {
    setCategoryOption(
      dataListCategory?.map((item) => ({
        value: item._id,
        label: item.name,
      }))
    );
  }, [dataListCategory]);

  const handleSearchDocument = (value) => {
    dispatch(setDataFilter({...dataFilter, keySearch: value}));
    if (!value) {
      dispatch(getListDocuments());
    }
  };

  const handleEnterSearchDocument = (event) => {
    if (event.key === 'Enter') {
      dispatch(setDataFilter({...dataFilter, page: 1}));
      dispatch(getListDocuments());
    }
  };

  const handleChangeSelectDocument = (perPage) => {
    dispatch(setDataFilter({...paginationListDocument, perPage, page: 1}));
    dispatch(getListDocuments());
  };

  const handleChangePicturesDocument = (file, type) => {
    if (file.target.files[0]) {
      let currentFile = file.target.files[0];
      let fileUrl = URL.createObjectURL(file.target.files[0]);
      let dataError = '';
      if (currentFile.size / 1024 / 1024 > 2.048) {
        dataError = 'Kích thước ảnh không được vượt quá 2MB.';
      } else if (!TYPE_FILE.includes(currentFile.type)) {
        dataError = 'Ảnh phòng chỉ được hỗ trợ kiểu jpg,jpeg,png,svg,webp.';
      }

      if (dataError) {
        getNotification('error', dataError);
      } else {
        let dataCloneDeep = _.cloneDeep(infoDocument);
        switch (type) {
          case 'pictures_one':
            dataCloneDeep[`pictures_one`] = currentFile;
            dataCloneDeep[`pictures_one_url`] = fileUrl;
            dataCloneDeep[`type_image`] = TYPE_IMAGE.PICTURE_ONE;
            break;
          case 'pictures_two':
            dataCloneDeep[`pictures_two`] = currentFile;
            dataCloneDeep[`pictures_two_url`] = fileUrl;
            dataCloneDeep[`type_image`] = TYPE_IMAGE.PICTURE_TWO;
            break;
          case 'pictures_three':
            dataCloneDeep[`pictures_three`] = currentFile;
            dataCloneDeep[`pictures_three_url`] = fileUrl;
            dataCloneDeep[`type_image`] = TYPE_IMAGE.PICTURE_THREE;
            break;
          default:
            break;
        }

        dispatch(setInfoDocument(dataCloneDeep));
      }
    }
  };

  const handleChangeInputInfo = (value, type) => {
    let data = _.cloneDeep(infoDocument);
    let dataError = _.cloneDeep(errorInfoDocument);
    let nameFile = infoDocument.name_file;
    if (type === 'file_record') {
      if (value.target.files.length > 0) {
        nameFile = value.target.files[0].name
        setFileName(nameFile);
        dispatch(setInfoDocument({...data, name_file: nameFile}));
      }
    }

    if (type === 'category_id') {
      data[type] = value;
    } else {
      data[type] = value;
    }
    if (type === 'file_record') {
      data[type] = value.target.files[0];
    }

    dataError[type] = '';
    dispatch(setInfoDocument({...data, name_file: nameFile}));
    dispatch(setErrorInfoDocument(dataError));
  };

  const handleFocus = (type) => {
    let dataError = _.cloneDeep(errorInfoDocument);
    dataError[type] = '';
    dispatch(setErrorInfoDocument(dataError));
  };

  const handleSubmit = (type, scheme, dataDocument) => {
    if (type === TYPE_SUBMIT.CREATE) {
      validate(scheme, dataDocument, {
        onSuccess: (data) => dispatch(handleCreateDocument(data)),
        onError: (error) => dispatch(setErrorInfoDocument(error)),
      });
    }

    if (type === TYPE_SUBMIT.UPDATE) {
      validate(scheme, dataDocument, {
        onSuccess: (data) => dispatch(handleUpdateDocument(data._id, data)),
        onError: (error) => dispatch(setErrorInfoDocument(error)),
      });
    }
  };

  const handleShowModalCreateDocument = () => {
    dispatch(
      setConfigModal({
        title: 'Tạo mới tài liệu',
        type: TYPE_SUBMIT.CREATE,
      })
    );
    dispatch(
      setInfoDocument({
        code: '',
        name: '',
        images: [],
        sale_price: 0,
        wholesale_price: 0,
        cost_price: 0,
        unit: '',
        quantity: 0,
        description: '',
        category_id: [],
      })
    );
    dispatch(setVisibleModalCreateOrUpdateDocument(true));
    dispatch(setImageList([]));
  };

  const handleCancelModalCreateOrUpdateDocument = () => {
    dispatch(
      setErrorInfoDocument({
        name: '',
        images: '',
        sale_price: '',
        wholesale_price: '',
        cost_price: '',
        unit: '',
        quantity: '',
        description: '',
        category_id: '',
      })
    );
    dispatch(
      setInfoDocument({
        code: '',
        name: '',
        images: [],
        sale_price: 0,
        wholesale_price: 0,
        cost_price: 0,
        unit: '',
        quantity: 0,
        description: '',
        category_id: [],
      })
    );
    dispatch(setVisibleModalCreateOrUpdateDocument(false));
  };

  const handleSetDefaultValue = (type) => {
    switch (type) {
      case TYPE_IMAGE.PICTURE_ONE:
        return TYPE_IMAGE.PICTURE_ONE;
      case TYPE_IMAGE.PICTURE_TWO:
        return TYPE_IMAGE.PICTURE_TWO;
      case TYPE_IMAGE.PICTURE_THREE:
        return TYPE_IMAGE.PICTURE_THREE;
      default:
        break;
    }
  };

  const handleChangeImage = (file) => {
    let maxImage = infoDocument.images.length;
    let listImage = _.values(file.target.files);
    if (listImage.length > 0) {
      let document = _.cloneDeep(infoDocument);
      listImage.forEach(function (fileItem) {
        if (maxImage === 3) {
          return false;
        }

        let fileUrl = URL.createObjectURL(fileItem);
        let dataError = '';
        if (fileItem.size / 1024 / 1024 > 10) {
          dataError = 'Kích thước ảnh không vượt quá 10MB.';
        } else if (!TYPE_FILE.includes(fileItem.type)) {
          dataError = 'Ảnh sai định dạng, chỉ được hỗ trợ kiểu jpg,jpeg,png,svg,webp.';
        }

        if (dataError) {
          getNotification('error', dataError);
        } else {
          document.images.push({
            id: maxImage + 1,
            name: fileItem.name,
            file: fileItem,
            url: fileUrl,
            is_featured: document.images.length === 0,
          });
          maxImage++;
        }
      });
      dispatch(setInfoDocument(document));
    }
  };

  const handleClickUpload = () => {
    document.getElementById('inputFile').click();
  };

  const handleChangeImageFeatured = (imageId) => {
    let newInfoDocument = _.cloneDeep(infoDocument);
    newInfoDocument.images.forEach((image) => {
      image.is_featured = image.id === imageId;
    });
    dispatch(setInfoDocument(newInfoDocument));
  };

  const handleRemoveImage = (imageId) => {
    let newInfoDocument = _.cloneDeep(infoDocument);
    let featured = false;
    newInfoDocument.images = _.filter(infoDocument.images, function (o) {
      if (o.id === imageId && o.is_featured) {
        featured = true;
      }
      return o.id !== imageId;
    });
    dispatch(setInfoDocument(newInfoDocument));
  };

  const handleChangeTableDocument = (pagination, filters, sorter) => {
    const sortOrder = sorter.order && sorter.field ? (sorter.order === 'descend' ? 'desc' : 'asc') : null;
    const column = sortOrder ? sorter.field : null;
    dispatch(
      setDataFilter({
        ...dataFilter,
        sort_order: sortOrder,
        column,
      })
    );
    dispatch(getListDocuments());
  };

  const handleRemoveFile = () => {
    setFileName('');
  };

  const handleSwitchChange = (checked) => {
    const switchIndex = checked ? DOCUMENT_STATUS.UNLOCK : DOCUMENT_STATUS.LOCK
    dispatch(setInfoDocument({...infoDocument, status: switchIndex}))
  }

  const handleChangeChecked = (document) => {
    const checkedSwitch = document.doc_check === STATUS_DOC_CHECK.CHECKED ? STATUS_DOC_CHECK.PENDING : STATUS_DOC_CHECK.CHECKED
    dispatch(setInfoDocument({...infoDocument, doc_check: checkedSwitch}))
  }

  return {
    dispatch,
    categoryOption,
    fileName,
    handleSearchDocument,
    handleEnterSearchDocument,
    handleChangeSelectDocument,
    handleSubmit,
    handleChangePicturesDocument,
    handleChangeInputInfo,
    handleFocus,
    handleShowModalCreateDocument,
    handleCancelModalCreateOrUpdateDocument,
    handleSetDefaultValue,
    handleChangeImage,
    handleClickUpload,
    handleChangeImageFeatured,
    handleRemoveImage,
    handleChangeTableDocument,
    handleRemoveFile,
    handleSwitchChange,
    handleChangeChecked,
  };
}
