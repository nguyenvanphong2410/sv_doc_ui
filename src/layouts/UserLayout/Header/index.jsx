import React, { useEffect } from 'react';
import styles from './styles.module.scss';
import './styles.scss';
import {Input, Popover} from 'antd';
import contentInfo from '../../MainLayout/Header/components/PopoverProfile';
import ImageUser from '@/assets/images/logos/user_default.png';
import {useDispatch, useSelector} from 'react-redux';
import Breadcrumb from '../../MainLayout/Header/components/Breadcrumb';
import IconLogo from '@/assets/images/logos/logodark.png';
import {useNavigate} from 'react-router-dom';
import InlineSVG from 'react-inlinesvg';
import SearchIcon from '@/assets/images/icons/duotone/magnifying-glass.svg';
import { setDataFilter } from '@/states/modules/document';
import { requestGetListDocumentForUser } from '@/api/document';
import { useDebounce } from '@/utils/hooks/useDebounce';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.auth.authUser);
  const path = useSelector((state) => state.app.location.pathName);
  const dataFilter = useSelector((state) => state.document.dataFilter)
  const debouncedQuery = useDebounce(dataFilter.keySearch, 500);

  useEffect(() => {
      dispatch(setDataFilter({...dataFilter, keySearch: debouncedQuery}));
      dispatch(requestGetListDocumentForUser());
  }, [debouncedQuery]);
  
  return (
    <>
      <header className={styles.headerWrap}>
        <div className={styles.headerContent}>
          <div className={styles.headerLeftWrap}>
            <div className={styles.logoHeader}>
              <div className={`${styles.imgWrap}`}>
                <img src={IconLogo} alt="img-logo" onClick={() => navigate('/')} />
              </div>
            </div>
            <Breadcrumb />
          </div>
          <div className={styles.navBar}>
            <ul className={styles.navContent}>
              <li
                className={path === '/' ? `${styles.navItem} ${styles.activePath}` : styles.navItem}
                onClick={() => navigate('/')}
              >
                Trang chủ
              </li>

              <li
                className={path === '/create-doc' ? `${styles.navItem} ${styles.activePath}` : styles.navItem}
                onClick={() => navigate('/create-doc')}
              >
                Đóng góp tài liệu
              </li>
              <li
                className={path === '/intro' ? `${styles.navItem} ${styles.activePath}` : styles.navItem}
                onClick={() => navigate('/intro')}
              >
                Giới thiệu
              </li>
              <li
                className={path === '/contact' ? `${styles.navItem} ${styles.activePath}` : styles.navItem}
                onClick={() => navigate('/contact')}
              >
                Liên hệ
              </li>
            </ul>
            <div className="w-[285px]">
              <Input
                prefix={<InlineSVG src={SearchIcon} className={`icon-search`} alt="" />}
                className={`main-input `}
                placeholder="Tìm kiếm tài liệu"
                value={dataFilter.keySearch}
                onChange={(e) =>
                  dispatch(
                    setDataFilter({
                      ...dataFilter,
                      keySearch: e.target.value,
                    })
                  )
                }
              />
            </div>
          </div>
          <div className={`${styles.headerRightWrap}`}>
            <div className={`${styles.itemHeaderRight}`}>
              <Popover
                className={`popover-info-wrap`}
                placement="bottomRight"
                content={contentInfo}
                trigger="click"
              >
                <div className={styles.infoWrap}>
                  <div className={styles.avatarWrap}>
                    <img crossOrigin="anonymous" src={authUser.avatar ? authUser.avatar : ImageUser} alt="" />
                  </div>
                </div>
              </Popover>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
