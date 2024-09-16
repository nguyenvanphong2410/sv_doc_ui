import { Tag } from "antd";

const CategoryTagItem = (props) => {
    const {name, selectCategory, id, setSelectCategory } = props;
    return(
        <>  
            <Tag 
                color={selectCategory === id ? 'processing' : 'default'}
                className="ml-[5px] cursor-pointer"
                onClick={() => setSelectCategory(id)}
            >
                {name}
            </Tag>
        </>
    )
}

export default CategoryTagItem;