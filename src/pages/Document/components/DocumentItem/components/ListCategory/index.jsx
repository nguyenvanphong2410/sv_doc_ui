import { useEffect } from "react";
import CategoryTagItem from "./components/CategoryItem";
import { useDispatch, useSelector } from "react-redux";
import { getListDocumentByCategoryId } from "@/api/category";
import { getListDocuments } from "@/api/document";
import { setSelectCategoryId } from "@/states/modules/document";

const ListCategory = () => {
    const dispatch = useDispatch();

    const allCategory = useSelector((state) => state.category.allCategory)
    const selectCategory = useSelector((state) => state.document.selectCategoryId)
    const allTag = [
        {
            _id: 'default',
            name: 'Tất cả',
        },
        ...allCategory
    ];

    useEffect(() => {
        if (selectCategory === 'default') {
            dispatch(getListDocuments())
        } else {
            dispatch(getListDocumentByCategoryId(selectCategory));
        }
    },[selectCategory] )
    

    return(
        <div className="ml-[-5px] mb-[20px] px-[5px] overflow-x-auto whitespace-nowrap hide-scrollbar">
            {
                allTag.map((item) => (
                    <CategoryTagItem
                        selectCategory={selectCategory}
                        key={item._id}
                        name={item.name}
                        id={item._id}
                        setSelectCategory={(id) => dispatch(setSelectCategoryId(id))}
                    />
                ))
            }
        </div>
    )
}

export default ListCategory;