import MainLayout from "@/layouts/MainLayout"
import CategoryItem from "@/pages/Document/components/CategoryItem";
import { Tabs } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllCategories, getListCategories } from "@/api/category";
import DocumentItem from "@/pages/Document/components/DocumentItem";

function Document() {
  const dispatch = useDispatch();
  const [tabActive, setTabActive] = useState('1');
  useEffect(() => {
    document.title = "SV.Doc - Tài liệu";
  }, []);

  useEffect(() => {
    if (tabActive === '1') {
      dispatch(getAllCategories())
    }
    if (tabActive === '2') {
      dispatch(getListCategories());
    }
  }, [tabActive]);

  const onChange = (key) => {
    setTabActive(key)
  };

  const items = [
    {
      key: '1',
      label: 'Tài liệu',
      children: <DocumentItem/>,
    },
    {
      key: '2',
      label: 'Danh mục',
      children: <CategoryItem/>,
    },
  ];
  
  return (
    <MainLayout className='list-persion-wrap'>
      <Tabs accessKey={tabActive} items={items} onChange={onChange} />
    </MainLayout>
  )
}

export default Document
