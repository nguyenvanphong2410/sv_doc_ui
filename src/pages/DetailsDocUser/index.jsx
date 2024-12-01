import {Document, Page} from 'react-pdf';
import {useSelector} from 'react-redux';
import styles from './styles.module.scss';

import {pdfjs} from 'react-pdf';
import {useEffect, useState} from 'react';
import UserLayout from '@/layouts/UserLayout';
import {Col, Row, Tabs} from 'antd';
import SameCardDocForUser from './SameCardDocForUser';
import TrendCardDocForUser from './TrendCardDocForUser';
import InfoDetailsDocForUser from './InfoDetailsDocForUser';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import PageError from '@/components/Error';
import {PAGE_ERROR, TYPE_SAVE} from '@/utils/constants';
import CommentForUser from './CommentForUser';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url
).toString();

function DetailsDocUser() {
  const [numPages, setNumPages] = useState();
  const [tabActive, setTabActive] = useState('1');

  // const pageNumber = 1;

  const documentDetails = useSelector((state) => state.detailsDoc.documentDetails);

  const idsCategory = documentDetails?.categories?.map((item) => item._id);

  function onDocumentLoadSuccess({numPages}) {
    setNumPages(numPages);
  }
  const items = [
    {
      key: '1',
      label: 'Tài liệu liên quan',
      children: <SameCardDocForUser idsCategory={idsCategory} />,
    },
    {
      key: '2',
      label: 'Tài liệu xem nhiều',
      children: <TrendCardDocForUser />,
    },
  ];

  const displayItem = () => {
    return documentDetails?.chapters?.map((item, index) => ({
      key: index + 1,
      label: item.name,
      children: (
        <div className={`${styles.viewPdf}`}>
          <div className={styles.pdfContainer}>
            <Document file={item?.file_chapter} onLoadSuccess={onDocumentLoadSuccess}>
              {Array.from(new Array(numPages), (el, idx) => (
                <Page className={styles.page} key={`page_${idx + 1}`} pageNumber={idx + 1} />
              ))}
            </Document>
          </div>
          <CommentForUser />
        </div>
      ),
    }));
  };



  useEffect(() => {
    if (tabActive === '1') {
      // dispatch(requestGetListDocumentByCategoryIdForUser(idsCategory))
    }
    if (tabActive === '2') {
      // dispatch(getListCategories());
    }
  }, [tabActive]);

  const onChange = (key) => {
    setTabActive(key);
  };
  return (
    <UserLayout>
      {!documentDetails._id ? (
        <PageError type={PAGE_ERROR.NOT_FOUND} title={'Không tìm thấy trang bạn yêu cầu !'} />
      ) : (
        <div className={`${styles.detailsDocForUser}`}>
          <div className={`${styles.nameDetails}`}>{documentDetails?.name}</div>
          <Row gutter={20}>
            <Col sm={17} xs={24}>
              <div className={`${styles.colFirstWrap}`}>
                <InfoDetailsDocForUser />
                <div className={`${styles.description}`}>{documentDetails?.description}</div>
                <div className={`${styles.imgShow}`}>
                  {documentDetails?.images?.map((item, index) => (
                    <>
                      <img src={item ? item : ''} alt="img" key={index} />
                    </>
                  ))}
                </div>
              {documentDetails?.type_save === TYPE_SAVE.FILE ? (
              <div className={`${styles.viewPdf}`}>
                <div className={styles.pdfContainer}>
                  <Document file={documentDetails?.file_record} onLoadSuccess={onDocumentLoadSuccess}>
                    {Array.from(new Array(numPages), (el, index) => (
                      <Page className={styles.page} key={`page_${index + 1}`} pageNumber={index + 1} />
                    ))}
                  </Document>
                </div>
                <CommentForUser />
              </div>
              ) : (
                <Tabs defaultActiveKey="1" items={displayItem()} />
              )}
              </div>
              
            </Col>
            <Col sm={7} xs={24}>
              <div className={`${styles.viewTabs}`}>
                <Tabs items={items} accessKey={tabActive} onChange={onChange} />
              </div>
            </Col>
          </Row>
        </div>
      )}
    </UserLayout>
  );
}

export default DetailsDocUser;
