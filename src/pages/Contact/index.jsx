import React, {useEffect} from 'react';
import UserLayout from '@/layouts/UserLayout';
import styles from './styles.module.scss';
import {Col, Row} from 'antd';
import mail from '@/assets/images/contact/mail.png';

const Contact = () => {
  useEffect(() => {
    document.title = 'Giới thiệu - IT Documents.';
  }, []);

  return (
    <>
      <UserLayout>
        <div className={`${styles.introWrap}`}>
          <div className={`${styles.titleIntro}`}>Liên hệ với SV.Doc</div>
          <div className={`${styles.contentIntro}`}>
            <Row gutter={20}>
              <Col md={8}>

              </Col>
              <Col md={8}>
                <div className={`${styles.itemIntro}`}>
                  <img className={`${styles.imgIntro}`} src={mail} alt="img2" />
                </div>
                <div className={`${styles.textIntro}`}>adminsvdoc@gmail.com</div>
              </Col><Col md={8}>
                
              </Col>
            </Row>
            <div className={`${styles.textDesc}`}>
            Mọi thông tin liên hệ xin gửi về địa chỉ adminsvdoc@gmail.com. Chúng tôi sẽ nhanh chóng tiếp nhận và xử lý trong thời gian sớm nhất.
              
            </div>
          </div>
        </div>
      </UserLayout>
    </>
  );
};

export default Contact;
