import UserLayout from '@/layouts/UserLayout';
import styles from './styles.module.scss';
import {Tabs} from 'antd';
import TableDocumentPending from './components/TableDocumentPending';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getAllCategoriesForUser } from '@/api/category';
import { requestGetListDocumentsChecked, requestGetListDocumentsLock, requestGetListDocumentsPending } from '@/api/document';
import TableDocumentChecked from './components/TableDocumentChecked';
import TableDocumentLock from './components/TableDocumentLock';

const MyDoc = () => {
  const dispatch = useDispatch();
  
  const [tabActive, setTabActive] = useState('1');

  const items = [
    
    {
      key: '1',
      label: 'Tài liệu chờ phê duyệt',
      children: <TableDocumentPending />,
    },
    {
      key: '2',
      label: 'Tài liệu đã duyệt',
      children: <TableDocumentChecked />,
    },
    {
      key: '3',
      label: 'Tài liệu bị khóa',
      children: <TableDocumentLock />,
    },
  ];
  useEffect(() => {
    if (tabActive === '1') {
      dispatch(getAllCategoriesForUser());
      dispatch(requestGetListDocumentsPending());

    }
    if (tabActive === '2') {
      dispatch(getAllCategoriesForUser());
      dispatch(requestGetListDocumentsChecked());
    }

    if (tabActive === '3') {
      dispatch(getAllCategoriesForUser());
      dispatch(requestGetListDocumentsLock());
    }
  }, [tabActive]);

  const onChange = (key) => {
    setTabActive(key)
  };

  return (
    <>
      <UserLayout>
        <div className={`${styles.myDocContainer}`}>
          <Tabs items={items} accessKey={tabActive} onChange={onChange}/>
        </div>
      </UserLayout>
    </>
  );
};

export default MyDoc;
