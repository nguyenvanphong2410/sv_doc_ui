import {Col, Row, Tag} from 'antd';
import styles from './style.module.scss';
import {
  CalendarOutlined,
  DownloadOutlined,
  EyeOutlined,
  FieldTimeOutlined,
  HighlightOutlined,
  PicLeftOutlined,
  SolutionOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {useSelector} from 'react-redux';
import {dayjsFormatSort} from '@/utils/helper';

const InfoDetailsDocForUser = () => {
  const documentDetails = useSelector((state) => state.detailsDoc.documentDetails);

  return (
    <>
      <Row>
        <Col xs={24} sm={24} md={12} lg={12}>
          <div className={styles.infoItem}>
            <span className={styles.titleOrigin}>
              <PicLeftOutlined /> Thể loại:{' '}
            </span>
            <span>
              <span className={styles.info}>
                {documentDetails?.categories?.map((item, index) => {
                  return <Tag key={index}>{item.name}</Tag>;
                })}
              </span>
            </span>
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} className={`${styles.colRight} justify-end`}>
          <div className={styles.infoItem}>
            <span className={styles.titleOrigin}>
              <FieldTimeOutlined /> Thời gian đăng:{' '}
            </span>
            <span className={styles.info}>{dayjsFormatSort(documentDetails?.created_at)}</span>
          </div>
        </Col>
      </Row>

      <Row>
        <Col xs={24} sm={24} md={12} lg={12}>
          <div className={styles.infoItem}>
            <span className={styles.titleOrigin}>
              <UserOutlined /> Người đăng:{' '}
            </span>
            <span className={styles.info}>{documentDetails?.creator?.name}</span>
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} className={`${styles.colRight} justify-end`}>
          <div className={styles.infoItem}>
            <span className={styles.titleOrigin}>
              <SolutionOutlined /> Nhà xuất bản:{' '}
            </span>
            {documentDetails?.publisher}
          </div>
        </Col>
      </Row>

      <Row>
        <Col xs={24} sm={24} md={12} lg={12}>
          <div className={styles.infoItem}>
            <span className={styles.titleOrigin}>
              <HighlightOutlined /> Tác giả:{' '}
            </span>
            {documentDetails?.author}
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} className={`${styles.colRight} justify-end`}>
          <div className={styles.infoItem}>
            <span className={styles.titleOrigin}>
              <CalendarOutlined /> Năm xuất bản:{' '}
            </span>
            {documentDetails?.publication_time ? (
              dayjsFormatSort(documentDetails?.publication_time)
            ) : (
              <span className="italic text-gray-65">Đang cập nhật</span>
            )}
          </div>
        </Col>
      </Row>
      <Row>
        <Col xs={24} sm={24} md={12} lg={12}>
          <div className={styles.infoItem}>
            <a
              href={documentDetails?.file_record}
              download
              rel="noreferrer"
              target="_blank"
            >
              <span className={styles.titleDown}>
                <DownloadOutlined /> Tải xuống tại đây{' '}
              </span>
            </a>
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} className={`${styles.colRight} justify-end`}>
          <div className={styles.infoItem}>
            <span className={styles.titleOrigin}>
              <EyeOutlined /> Lượt xem:
              {/* {post.view}  */}
              {documentDetails?.view_quantity ? documentDetails?.view_quantity : 0}
            </span>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default InfoDetailsDocForUser;
