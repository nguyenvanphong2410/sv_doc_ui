import MainLayout from '@/layouts/MainLayout';
import {Tabs} from 'antd';
import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {requestGetListOther, requestGetListStudent, requestGetListTeacher} from '@/api/partners';
import OtherComponent from './components/OtherComponent';
import TeacherComponent from './components/TeacherComponent';
import StudentComponent from './components/StudentComponent';
import {hasPermission} from '@/utils/helper';
import {PERMISSIONS} from '@/utils/constants';

function Partner() {
  const dispatch = useDispatch();
  const [tabActive, setTabActive] = useState('1');
  useEffect(() => {
    document.title = 'SV.Doc - Người dùng';
  }, []);

  useEffect(() => {
    if (tabActive === '1') {
      dispatch(requestGetListTeacher());
    }
    if (tabActive === '2') {
      dispatch(requestGetListStudent());
    }
    if (tabActive === '3') {
      dispatch(requestGetListOther());
    }
  }, [tabActive]);

  const onChange = (key) => {
    setTabActive(key);
  };

  const items = [
    {
      key: '1',
      label: `${hasPermission([PERMISSIONS.LIST.LIST_MANAGEMENT_TEACHER]) ? 'Giáo viên' : ''}`,
      children: <TeacherComponent />,
    },
    {
      key: '2',
      label: `${hasPermission([PERMISSIONS.LIST.LIST_MANAGEMENT_STUDENT]) ? 'Sinh viên' : ''}`,
      children: <StudentComponent />,
    },
    {
      key: '3',
      label: `${hasPermission([PERMISSIONS.LIST.LIST_MANAGEMENT_OTHER]) ? '- Khác -' : ''}`,
      children: <OtherComponent />,
    },
  ];

  return (
    <MainLayout className="list-persion-wrap">
      <Tabs defaultActiveKey="1" accessKey={tabActive} items={items} onChange={onChange} />
    </MainLayout>
  );
}

export default Partner;
