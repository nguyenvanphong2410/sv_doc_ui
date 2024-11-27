import {useDispatch, useSelector} from 'react-redux';
import styles from './styles.module.scss';
import {Card, Col, Image, Row, Tooltip} from 'antd';
import {Link, useNavigate} from 'react-router-dom';
import {DownloadOutlined, EyeOutlined, FieldTimeOutlined, ProfileOutlined, UserOutlined} from '@ant-design/icons';
import Meta from 'antd/es/card/Meta';
import imageDefaultDocument from '@/assets/images/document/image-default.png';
import PaginationDocument from '../Panigation';
import {dayjsFormatSort} from '@/utils/helper';
import {setDocumentSelected} from '@/states/modules/document';
import {requestUpdateViewDoc} from '@/api/document';

const CardDoc = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const dataListDocuments = useSelector((state) => state.document.documents);

  const handleViewDetailsForUser = (item) => {
    dispatch(requestUpdateViewDoc(item._id));
    dispatch(setDocumentSelected(item));
    navigate(`/details-doc-for-user/${item._id}`);
  };

  return (
    <div className={styles.hihii}>
      <div className={styles.cardContainer}>
        <Row gutter={[20, 60]}>
          {dataListDocuments.map((item, index) => {
            return (
              <Col key={index} xs={24} sm={24} md={12} lg={12}>
                <div>
                  <Card
                    className={styles.cardItem}
                    style={{width: window.innerWidth < 576 ? 300 : 600}}
                    cover={
                      <Image
                        height={330}
                        width={window.innerWidth < 576 ? 300 : 600}
                        src={item.images_src[0] ? item.images_src[0] : imageDefaultDocument}
                        preview={false}
                        onClick={() => handleViewDetailsForUser(item)}
                      />
                    }
                    actions={[
                      <Tooltip key={1} title={`Tài liệu này có 12 lượt xem`} color="purple">
                        <Link>
                          <EyeOutlined style={{color: 'purple', fontSize: '18px'}} key="view" />
                          <span style={{color: 'purple', fontSize: '18px', marginLeft: '2px'}}>
                            {item.view_quantity ? item.view_quantity : 0}
                          </span>
                        </Link>
                      </Tooltip>,

                      <Tooltip key={4} title="Tải xuống tài liệu" color="green">
                        <a 
                          href={item?.file_record} 
                          download 
                          target="blank"
                        >
                          <DownloadOutlined style={{color: 'green', fontSize: '20px'}} />
                        </a>
                      </Tooltip>,
                    ]}
                  >
                    <Meta
                      title={
                        <div>
                          <Tooltip title={item?.name} color="#2646ba">
                            <span
                              className={styles.nameDocumentCard}
                              onClick={() => handleViewDetailsForUser(item)}
                            >
                              {item?.name}
                            </span>
                          </Tooltip>
                          <div className={styles.itemCard}>
                            <ProfileOutlined className={styles.iconOriginCard} />
                            <span className={styles.textOriginCard}> Thể loại: </span>
                            <span className={styles.infoOriginCard}>
                              {/* {item?.categories?.map((item, index) => {
                                return (
                                  <Tooltip key={index} title={item.name}>
                                    <span >{item.name},</span>
                                  </Tooltip>
                                );
                              })} */}

                              <Tooltip key={index} title={item?.categories[0]?.name}>
                                <span>{item?.categories[0]?.name}</span>
                              </Tooltip>
                            </span>
                          </div>
                          <div className={styles.itemCard}>
                            <span>
                              <FieldTimeOutlined className={styles.iconOriginCard} />
                              <span className={styles.textOriginCard}> Thời gian: </span>
                              <span className={styles.infoOriginCard}>
                                {dayjsFormatSort(item?.created_at)}
                              </span>
                            </span>
                          </div>
                          <div className={styles.itemCard}>
                            <span>
                              <UserOutlined className={styles.iconOriginCard} />
                              <span className={styles.textOriginCard}> Tác giả: </span>
                              <span className={styles.infoOriginCard}>{item?.author ? item?.author : <span className='italic'>Đang cập nhật</span> }</span>

                            </span>
                          </div>

                          <div className={styles.itemCard}>
                            {/* <UserOutlined className={styles.iconOriginCard} /> */}
                            <span className={styles.textOriginCard}> Mô tả: </span>
                            <span className={styles.infoOriginCard}>{item?.description ? item?.description : <span className='italic'>Đang cập nhật</span> }</span>
                          </div>
                        </div>
                      }
                    />
                  </Card>
                </div>
              </Col>
            );
          })}
        </Row>
      </div>

      <PaginationDocument />
    </div>
  );
};

export default CardDoc;
