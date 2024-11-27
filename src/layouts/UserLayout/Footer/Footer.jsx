import React from 'react';
import './footer.scss';
// import { SvgFaceBook } from '../svgs/SvgFaceBook';
// import { SvgYoutube } from '../svgs/SvgYoutube';
// import { SvgInstagram } from '../svgs/SvgInstagram';
import logo from "@/assets/images/logos/logolight.png"
import styles from './style.module.scss';
import { Col, Row } from 'antd';
import { MailOutlined, PhoneOutlined } from '@ant-design/icons';

const Footer = () => {

  return (
    <div className={styles.footerWrap}>

      <Row gutter={[16, 16]} className={styles.rowFooterWrap}>
        <Col xs={24} sm={12} md={8} lg={6} className={styles.colFooterWrap}>
          <div className={styles.oneFooter}>
            <div ><img className={styles.logo} src={logo} alt="" /></div>
            <div className="footer__icons anime">
              {/* <a href="https://www.facebook.com/nvp241001" className="footer__icon"><SvgFaceBook /></a>
              <a href="https://www.youtube.com/channel/UCGnJm5YAcdf5vbZ-YmXAJ5w" className="footer__icon"><SvgYoutube /></a>
              <a href="https://www.instagram.com/nvp241001/" className="footer__icon"><SvgInstagram /></a> */}
            </div>
          </div>
        </Col>

        <Col xs={24} sm={12} md={8} lg={6} className={styles.colFooterWrap}>
          <div className={styles.twoFooter}>
            <p className={styles.textTwoInfo}>

            </p>
            <p className={styles.textTwo}> Vũ Trọng Giáp - K64ATTT - 646526</p>
            <p className={styles.textTwo}> <MailOutlined /> vutronggiap@gmail.com</p>
            <p className={styles.textTwo}> <PhoneOutlined  /> 0362800787</p>
          </div>
        </Col>

        <Col xs={24} sm={12} md={8} lg={6} className={styles.colFooterWrap}>
          <div className={styles.threeFooter}>
            <ul>
              <li className={styles.textAsk}>Câu hỏi thường gặp</li>
              <li className={styles.textAsk}>Câu hỏi bảo mật? </li>
              <li className={styles.textAsk}>Các vấn đề liên quan</li>
            </ul>

          </div>
        </Col>
      </Row>

      <div style={{display:'flex', justifyContent:'center', marginTop: '30px', paddingBottom: '20px'}}>
        <p className="footer__text">© Vũ Trọng Giáp - Học viện Nông nghiệp Việt Nam</p>
      </div>
    </div>

  )
}

export default Footer;
