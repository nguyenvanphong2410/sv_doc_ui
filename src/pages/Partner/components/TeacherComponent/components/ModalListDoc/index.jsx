import React, { useEffect, useState } from 'react'
import styles from './style.module.scss'
import TableDocumentPending from './components/TableDocumentPending';
import TableDocumentChecked from './components/TableDocumentChecked';
import TableDocumentLock from './components/TableDocumentLock';
import { Tabs } from 'antd';
import { useDispatch } from 'react-redux';
import { getAllCategories } from '@/api/category';
import { requestGetListDocumentsCheckedForAdmin, requestGetListDocumentsLockForAdmin, requestGetListDocumentsPendingForAdmin } from '@/api/employees';

// import NoData from '@/pages/Permission/NoData'
function ModalListDoc({idSelected}) {
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
      children: <TableDocumentLock/>,
    },
  ];
  useEffect(() => {
    if (tabActive === '1') {
      dispatch(getAllCategories());
      dispatch(requestGetListDocumentsPendingForAdmin(idSelected));

    }
    if (tabActive === '2') {
      dispatch(getAllCategories());
      dispatch(requestGetListDocumentsCheckedForAdmin(idSelected));
    }

    if (tabActive === '3') {
      dispatch(getAllCategories());
      dispatch(requestGetListDocumentsLockForAdmin(idSelected));
    }
  }, [tabActive]);

  const onChange = (key) => {
    setTabActive(key)
  };
  return (
    <div>
        <div className={styles.appointmentsWrapper}>
        <Tabs items={items} accessKey={tabActive} onChange={onChange}/>
          
        </div>
    </div>
  )
}

export default ModalListDoc
