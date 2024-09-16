import styles from './styles.module.scss';

const CategoryTagItem = (props) => {
  const {name, selectCategory, id, setSelectCategory} = props;
  return (
    <>
      <span style={{}} className={`${selectCategory === id ?  styles.categoriesActive : styles.categoriesItem}`} onClick={() => setSelectCategory(id)}>
        {name}
      </span>
    </>
  );
};

export default CategoryTagItem;
