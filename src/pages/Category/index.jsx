import { getListCategories } from "@/api/category";
import MainLayout from "@/layouts/MainLayout"
import CategoryItem from "@/pages/Document/components/CategoryItem";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function Category() {
  const dispatch = useDispatch();
  useEffect(() => {
    document.title = "SV.Doc - Thể loại";
    dispatch(getListCategories())
  }, []);

  return (
    <MainLayout className='list-persion-wrap'>
      <CategoryItem/>
    </MainLayout>
  )
}

export default Category
