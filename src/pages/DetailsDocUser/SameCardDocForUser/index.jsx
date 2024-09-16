import {useDispatch, useSelector} from 'react-redux';
import styles from './styles.module.scss';
import imageDefaultDocument from '@/assets/images/document/image-default.png';
import {dayjsFormatSort} from '@/utils/helper';
import {useEffect} from 'react';
import {requestGetListDocumentByCategoryIdForUser} from '@/api/category';
import { requestUpdateViewDoc } from '@/api/document';
import { useNavigate } from 'react-router-dom';

function SameCardDocForUser({idsCategory}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const listDocByCategoryId = useSelector((state) => state.document.listDocByCategoryId);
  
  const handleViewDetailsForUser = (item) => {
    dispatch(requestUpdateViewDoc(item._id));
    navigate(`/details-doc-for-user/${item._id}`);
  };
  useEffect(() => {
    dispatch(requestGetListDocumentByCategoryIdForUser(idsCategory));
  }, [idsCategory]);

  return (
    <>
      <div className={styles.cardDocumentWrap}>
        {listDocByCategoryId?.map((item, index) => {
          return (
            <div key={index} className={styles.cardDocument} onClick={() => handleViewDetailsForUser(item)}>
              <div className={styles.imgDocument}>
                <img
                  src={item?.image_featured ? item?.image_featured : imageDefaultDocument}
                  alt="img-document"
                  crossOrigin="anonymous"
                  className="cursor-pointer"
                />
              </div>
              <div className={styles.infoDocument}>
                <div className={styles.nameDocument}>
                  <span>{item?.name}</span>
                </div>
                <div className={styles.priceDocument}>
                  {/* {
                  item.categor
                } */}
                </div>
                <div className={styles.quantityDocument}>{dayjsFormatSort(item?.created_at)}</div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default SameCardDocForUser;
