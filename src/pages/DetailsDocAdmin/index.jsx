import {Document, Page} from 'react-pdf';
import {useSelector} from 'react-redux';
import styles from './styles.module.scss';

import {pdfjs} from 'react-pdf';
import {useState} from 'react';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import PageError from '@/components/Error';
import {PAGE_ERROR} from '@/utils/constants';
import MainLayout from '@/layouts/MainLayout';
import InfoDetailsDocForAdmin from './InfoDetailsDocForAdmin';
import CommentForAdmin from './CommentForAdmin';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url
).toString();

function DetailsDocAdmin() {
  const [numPages, setNumPages] = useState();

  // const pageNumber = 1;

  const documentDetails = useSelector((state) => state.detailsDoc.documentDetails);

  function onDocumentLoadSuccess({numPages}) {
    setNumPages(numPages);
  }

  return (
    <MainLayout>
      {!documentDetails._id ? (
        <PageError type={PAGE_ERROR.NOT_FOUND} title={'Không tìm thấy trang bạn yêu cầu !'} />
      ) : (
        <div className={`${styles.detailsDocForUser}`}>
          <div className={`${styles.nameDetails}`}>{documentDetails?.name}</div>

          <div className={`${styles.colFirstWrap}`}>
            <InfoDetailsDocForAdmin />
            <div className={`${styles.description}`}>{documentDetails?.description}</div>
            <div className={`${styles.imgShow}`}>
              {documentDetails?.images?.map((item, index) => (
                <>
                  <img src={item ? item : ''} alt="img" key={index} />
                </>
              ))}
            </div>
            <div className={`${styles.viewPdf}`}>
              {/* <p style={{fontSize: '20px', fontWeight: 'bold', marginBottom: '20px'}}>
                Page {pageNumber} of {numPages}
              </p> */}
              <div className={styles.pdfContainer}>
                <Document file={documentDetails?.file_record} onLoadSuccess={onDocumentLoadSuccess}>
                  {Array.from(new Array(numPages), (el, index) => (
                    <Page className={styles.page} key={`page_${index + 1}`} pageNumber={index + 1} />
                  ))}
                </Document>
      
              </div>
              <CommentForAdmin/>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
}

export default DetailsDocAdmin;
