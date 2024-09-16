import {useDispatch, useSelector} from 'react-redux';
import styles from './styles.module.scss';
import imageDefaultDocument from '@/assets/images/document/image-default.png';
import {useNavigate} from 'react-router-dom';
import {useEffect} from 'react';
import {requestGetListDocumentViewQuantity, requestUpdateViewDoc} from '@/api/document';
import {dayjsFormatSort} from '@/utils/helper';

function TrendCardDocForUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const listDocViewQuantity = useSelector((state) => state.document.listDocViewQuantity);

  const handleViewDetailsForUser = (item) => {
    dispatch(requestUpdateViewDoc(item._id));
    navigate(`/details-doc-for-user/${item._id}`);
  };

  useEffect(() => {
    dispatch(requestGetListDocumentViewQuantity());
  }, []);
  return (
    <>
      <div className={styles.cardDocumentWrap}>
        {listDocViewQuantity?.map((item, index) => {
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
                <div className={styles.priceDocument}>Lượt xem: <span className='text-gray-45 font-normal'>{item?.view_quantity}</span></div>
                <div className={styles.quantityDocument}>{dayjsFormatSort(item?.created_at)}</div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default TrendCardDocForUser;
