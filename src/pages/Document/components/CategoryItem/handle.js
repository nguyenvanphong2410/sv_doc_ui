import {useDispatch, useSelector} from 'react-redux';

import {handleCreateCategory, handleUpdateCategory} from '@/api/category';
import {validate} from '@/utils/validates';
import {TYPE_SUBMIT, CATEGORY_STATUS} from '@/utils/constants';
import _ from 'lodash';
import { setConfigModalCategory, setDataFilterCategory, setErrorInfoCategory, setInfoCategory, setVisibleModalCreateOrUpdateCategory } from '@/states/modules/category';
import { getListCategories } from '@/api/category';

export default function Handle() {
  const dispatch = useDispatch();

  const dataFilter = useSelector((state) => state.category.dataFilter);
  const paginationListCategory = useSelector((state) => state.category.paginationListCategory);
  const errorInfoCategory = useSelector((state) => state.category.errorInfoCategory)
  const isLoadingBtnCreateCategory = useSelector((state) => state.category.isLoadingBtnCreateCategory)
  const isLoadingBtnUpdateCategory = useSelector((state) => state.category.isLoadingBtnUpdateCategory);
  const infoCategory = useSelector((state) => state.category.infoCategory)
  const configModalCategory = useSelector((state) => state.category.configModalCategory);
  const auth = useSelector((state) => state.auth.authUser)
  const visibleModalCreateOrUpdateCategory = useSelector((state) => state.category.visibleModalCreateOrUpdateCategory)

  const handleSearchCategory = (value) => {
    dispatch(setDataFilterCategory({...dataFilter, keySearch: value}));
    if (!value) {
      dispatch(getListCategories());
    }
  };

  const handleEnterSearchCategory = (event) => {
    if (event.key === 'Enter') {
      dispatch(setDataFilterCategory({...dataFilter, page: 1}));
      dispatch(getListCategories());
    }
  };

  const handleChangeSelectCategory = (perPage) => {
    dispatch(setDataFilterCategory({...paginationListCategory, perPage, page: 1}));
    dispatch(getListCategories());
  };

  const handleChangeInputInfo = (valueInput, type) => {
    let value = valueInput.target.value;
    let data = _.cloneDeep(infoCategory);
    let dataError = _.cloneDeep(errorInfoCategory);
    data[type] = value;
    dataError[type] = '';
    dispatch(setInfoCategory(data));
    dispatch(setErrorInfoCategory(dataError));
  };

  const handleFocus = (type) => {
    let dataError = _.cloneDeep(errorInfoCategory);
    dataError[type] = '';
    dispatch(setErrorInfoCategory(dataError));
  };

  const handleSubmit = (type, scheme, dataCategory) => {
    if (type === TYPE_SUBMIT.CREATE) {
      validate(scheme, dataCategory, {
        onSuccess: (data) => dispatch(handleCreateCategory(data)),
        onError: (error) => dispatch(setErrorInfoCategory(error)),
      });
    }

    if (type === TYPE_SUBMIT.UPDATE) {
      validate(scheme, dataCategory, {
        onSuccess: (data) => dispatch(handleUpdateCategory(data._id, data)),
        onError: (error) => dispatch(setErrorInfoCategory(error)),
      });
    }
  };

  const handleSwitchChange = (checked) => {
    const switchIndex = checked ? CATEGORY_STATUS.UNLOCK : CATEGORY_STATUS.LOCK;
    dispatch(setInfoCategory({...infoCategory, status: switchIndex}));
  };

  const handleShowModalCreateCategory = () => {
    dispatch(
      setConfigModalCategory({
        title: 'Tạo mới thể loại',
        type: TYPE_SUBMIT.CREATE,
      })
    );
    dispatch(
      setInfoCategory({
        name: '',
        desc: '',
        status: '',
      })
    );
    dispatch(setVisibleModalCreateOrUpdateCategory(true));
  };

  const handleCancelModalCreateOrUpdateCategory = () => {
    dispatch(
      setErrorInfoCategory({
        name: '',
        desc: '',
        status: '',
      })
    );
    dispatch(
      setInfoCategory({
        name: '',
        desc: '',
        status: '',
      })
    );
    dispatch(setVisibleModalCreateOrUpdateCategory(false));
  };

  return {
    auth,
    isLoadingBtnCreateCategory,
    isLoadingBtnUpdateCategory,
    configModalCategory,
    errorInfoCategory,
    infoCategory,
    visibleModalCreateOrUpdateCategory,
    dataFilter,
    paginationListCategory,
    handleSearchCategory,
    handleEnterSearchCategory,
    handleChangeSelectCategory,
    handleSubmit,
    handleSwitchChange,
    handleChangeInputInfo,
    handleFocus,
    handleShowModalCreateCategory,
    handleCancelModalCreateOrUpdateCategory,
  };
}
