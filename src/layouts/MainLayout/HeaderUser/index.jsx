import React from 'react';
import styles from './styles.module.scss';
import './styles.scss';
import {Popover} from 'antd';
import contentInfo from '../Header/components/PopoverProfile';
import ImageUser from '@/assets/images/logos/user_default.png';
import {useSelector} from 'react-redux';
import Breadcrumb from '../Header/components/Breadcrumb';
import IconLogo from '@/assets/images/logos/logo-ptit.png';
import {useNavigate} from 'react-router-dom';

const HeaderUser = () => {
  const authUser = useSelector(state => state.auth.authUser);
  const path = useSelector(state => state.app.location.pathName);
  const navigate = useNavigate();

  return (
    <header className={styles.headerWrap}>
      <div className={styles.headerContent}>
        <div className={styles.headerLeftWrap}>
          <div className={styles.logoHeader}>
            <div className={`${styles.imgWrap}`}>
              <img src={IconLogo} alt='' onClick={() => navigate('/')} />
            </div>
          </div>
          <Breadcrumb />
        </div>
        <div className={styles.navBar}>
          <ul className={styles.navContent}>
            <li className={path === '/' ? `${styles.navItem} ${styles.activePath}` : styles.navItem}>
              Trang chủ
            </li>
            <li
              className={path === '/history' ? `${styles.navItem} ${styles.activePath}` : styles.navItem}
              onClick={() => navigate('/history')}
            >
              Lịch sử
            </li>
          </ul>
        </div>
        <div className={`${styles.headerRightWrap}`}>
          <div className={`${styles.itemHeaderRight}`}>
            <Popover className={`popover-info-wrap`} placement='bottomRight' content={contentInfo} trigger='click'>
              <div className={styles.infoWrap}>
                <div className={styles.avatarWrap}>
                  <img crossOrigin='anonymous' src={authUser.avatar ? authUser.avatar : ImageUser} alt='' />
                </div>
              </div>
            </Popover>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderUser;
