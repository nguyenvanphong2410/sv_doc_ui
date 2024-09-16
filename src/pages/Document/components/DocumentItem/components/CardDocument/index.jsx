import styles from './styles.module.scss';
import imageDefaultDocument from '@/assets/images/document/image-default.png';
import {useSelector} from 'react-redux';
import {formatMoney} from '@/utils/helper';
import IconEditTable from '@/assets/images/icons/duotone/pencil.svg';
import IconDeleteTable from '@/assets/images/icons/duotone/trash-can.svg';
import {Pagination, Skeleton, Tooltip} from 'antd';
import InlineSVG from 'react-inlinesvg';
import {TYPE_SUBMIT} from '@/utils/constants';
import Handle from '@/pages/Document/components/DocumentItem/components/TableDocument/handle';
import DataEmpty from '@/components/DataEmpty';

function CardDocument() {
  const dataListDocuments = useSelector((state) => state.document.documents);
  const isLoadingTableDocument = useSelector((state) => state.document.isLoadingTableDocument);
  const pagination = useSelector((state) => state.document.paginationListDocument);

  const {handleShowModalUpdateDocument, handleDeleteDocumentAlert, handleChangePaginationDocument} = Handle();

  return (
    <>
      <div className={styles.cardDocumentWrap}>
        {isLoadingTableDocument ? (
          <Skeleton active />
        ) : dataListDocuments?.length <= 0 ? (
          <DataEmpty />
        ) : (
          dataListDocuments.map((item, index) => (
            <div className={styles.cardDocument} key={index}>
              <div className={styles.imgDocument}>
                <img
                  src={item.image_featured ? item.image_featured : imageDefaultDocument}
                  alt="img-document"
                  crossOrigin="anonymous"
                  onClick={() => handleShowModalUpdateDocument(item, TYPE_SUBMIT.UPDATE)}
                  className="cursor-pointer"
                />
              </div>
              <div className={styles.infoDocument}>
                <div className={styles.nameDocument}>
                  <span onClick={() => handleShowModalUpdateDocument(item, TYPE_SUBMIT.UPDATE)}>
                    {item.name}
                  </span>
                </div>
                <div className={styles.quantityDocument}>
                  {item.quantity ? (
                    <span>
                      Có thể bán: {item.quantity}
                      {item.unit ? <span> | {item.unit}</span> : ''}
                    </span>
                  ) : (
                    <div className="h-5"></div>
                  )}
                </div>
                <div className={styles.priceDocument}>
                  {item.sale_price ? (
                    <span>
                      {formatMoney(item.sale_price)} <span className="underline">đ</span>
                    </span>
                  ) : (
                    <i className={styles.textUpdate}>Đang cập nhật</i>
                  )}
                </div>
              </div>
              <div className={styles.actionDocument}>
                <div
                  className={`action-user mb-2`}
                  onClick={() => handleShowModalUpdateDocument(item, TYPE_SUBMIT.UPDATE)}
                >
                  <Tooltip title="Cập nhật thông tin">
                    <InlineSVG src={IconEditTable} className={`w-[12px] h-[12px] `} alt="" />
                  </Tooltip>
                </div>
                <div className={`action-user`} onClick={() => handleDeleteDocumentAlert(item)}>
                  <Tooltip title="Xóa thông tin">
                    <InlineSVG src={IconDeleteTable} className={`w-[12px] h-[12px]`} alt="" />
                  </Tooltip>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <Pagination
        className={`pagination ${styles.customPagination}`}
        current={pagination.currentPage}
        total={pagination.totalRecord}
        pageSize={pagination.perPage}
        onChange={(e) => handleChangePaginationDocument(e)}
        showSizeChanger={false}
        size={'small'}
      />
    </>
  );
}

export default CardDocument;
