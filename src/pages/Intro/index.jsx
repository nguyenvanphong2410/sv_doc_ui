import React, {useEffect} from 'react';
import UserLayout from '@/layouts/UserLayout';
import styles from './styles.module.scss';
import {Col, Row} from 'antd';
import img1 from '@/assets/images/intro/fita.png';
import img2 from '@/assets/images/logos/user_default.png';
import img3 from '@/assets/images/intro/vnua.jpg';

const Intro = () => {
  useEffect(() => {
    document.title = 'Giới thiệu - IT Documents.';
  }, []);

  return (
    <>
      <UserLayout>
        <div className={`${styles.introWrap}`}>
          <div className={`${styles.titleIntro}`}>SV.Doc</div>
          <div className={`${styles.contentIntro}`}>
            <Row gutter={20}>
              <Col md={8}>
                <div className={`${styles.itemIntro}`}>
                  <img className={`${styles.imgIntro}`} src={img1} alt="img1" />
                </div>
                <div className={`${styles.textIntro}`}>SV.Doc</div>
              </Col>
              <Col md={8}>
                <div className={`${styles.itemIntro}`}>
                  <img className={`${styles.imgIntro}`} src={img2} alt="img2" />
                </div>
                <div className={`${styles.textIntro}`}>SV.Doc</div>
              </Col><Col md={8}>
                <div className={`${styles.itemIntro}`}>
                  <img className={`${styles.imgIntro}`} src={img3} alt="img3" />
                </div>
                <div className={`${styles.textIntro}`}>SV.Doc</div>
              </Col>
            </Row>
            <div className={`${styles.textDesc}`}>
              Xây dựng kho tài liệu cho sinh viên khoa Công nghệ thông tin nhằm hỗ trợ đắc lực trong công tác quản lí và thống kê các tài liệu liên quan đến lĩnh vực Công nghệ thông tin và đặc biệt là hỗ trợ cho sinh viên khoa công nghệ thông tin có một nguồn thông tin hữu ích để học tập và trao đổi.
Từ đó nâng cao khả năng dạy và học của cán bộ viên chức và sinh viên của khoa.
              
            </div>
          </div>
        </div>
      </UserLayout>
    </>
  );
};

export default Intro;
