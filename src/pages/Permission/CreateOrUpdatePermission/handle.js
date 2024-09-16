import _ from 'lodash';
import { validate } from '@/utils/validateJoi';
import { TYPE_SUBMIT } from '@/utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { handleCreateRole, handleUpdateRole } from '@/api/permission';
import { setErrorCreateOrUpdateRole, setInfoRole } from '@/states/modules/permissions/index';

export default function Handle() {
  const dispatch = useDispatch();

  const infoRole = useSelector((state) => state.permission.infoRole);
  const rolesList = useSelector((state) => state.permission.rolesList);
  const dataRoleList = useSelector((state) => state.permission.roleList);
  const configModal = useSelector((state) => state.permission.configModal);
  const infoRoleSelected = useSelector((state) => state.permission.infoRoleSelected);
  const errorCreateOrUpdateRole = useSelector((state) => state.permission.errorCreateOrUpdateRole);
  const isLoadingBtnCreateOrUpdateRole = useSelector(
    (state) => state.permission.isLoadingBtnCreateOrUpdateRole
  );

  const handleSubmitForm = (type, schema, data) => {
    if (type === TYPE_SUBMIT.CREATE) {
      validate(schema, data, {
        onSuccess: (data) => dispatch(handleCreateRole({ ...data })),
        onError: (error) => dispatch(setErrorCreateOrUpdateRole(error)),
      });
    }

    if (type === TYPE_SUBMIT.UPDATE) {
      validate(schema, data, {
        onSuccess: (data) => dispatch(handleUpdateRole(infoRole._id, data)),
        onError: (error) => dispatch(setErrorCreateOrUpdateRole(error)),
      });
    }
  };

  const handleChangeInput = (value, type) => {
    let data = _.cloneDeep(infoRole);
    let dataError = _.cloneDeep(errorCreateOrUpdateRole);
    data[type] = value;
    dataError[type] = '';

    dispatch(setInfoRole(data));
    dispatch(setErrorCreateOrUpdateRole(dataError));
  };

  const handleFocus = (type) => {
    let dataError = _.cloneDeep(errorCreateOrUpdateRole);
    dataError[type] = '';
    dispatch(setErrorCreateOrUpdateRole(dataError));
  };

  const convertToTreeData = (data) => {
    const treeData = data?.reduce((acc, role) => {
      if (role && role.protected !== 'PROTECTED' ? 1 : 0) {
        const treeItem = {
          title: role.name,
          value: role._id,
          children: role.children && role.children.length > 0 ? convertToTreeData(role.children) : [],
        };
        return [...acc, treeItem];
      }
      return acc;
    }, []);
    return treeData;
  };
  const treeDataOption = convertToTreeData(rolesList);
  
  const removeDataEditRole = (treeData, data) => {
    return treeData.filter((item) => {
      if (item.value === data._id) {
        return false;
      }
      if (item.children && item.children.length > 0) {
        item.children = removeDataEditRole(item.children, data);
      }
      return true;
    });
  };
  let treeDataOptionClone = _.cloneDeep(treeDataOption);
  const updatedTreeData = removeDataEditRole(treeDataOptionClone, infoRoleSelected);

  return {
    infoRole,
    configModal,
    dataRoleList,
    treeDataOption,
    updatedTreeData,
    errorCreateOrUpdateRole,
    isLoadingBtnCreateOrUpdateRole,
    dispatch,
    handleFocus,
    handleSubmitForm,
    handleChangeInput,
  };
}
