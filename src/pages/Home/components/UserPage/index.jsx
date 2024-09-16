import {useEffect, useState} from 'react';
import CarouselCpn from './components/Carousel';
import styles from './styles.module.scss';
import {useSelector} from 'react-redux';
import CardDoc from './components/CardDoc';
import ListCategoryForUser from './components/ListCategoryForUser';

const UserPage = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  const dataFilter = useSelector((state) => state.document.dataFilter)
  const showBackToTopButton = scrollPosition > 250; // Hiển thị nút khi cuộn xuống 300px

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
    {
      dataFilter.keySearch === '' ?
      <CarouselCpn /> 
      : ''
    }
      <div className={styles.newDocumentWrap}>
        <span className={`${styles.titleNewDocument} ${dataFilter.keySearch === '' ? '' : 'mt-[50px]'}`}>
          {
            dataFilter.keySearch === '' ?
            'Tài liệu luôn luôn cập nhật'
            : 'Kết quả tìm kiếm'
          }
          </span>
      </div>
      <div className={`${styles.contentLayout}`}>
        <ListCategoryForUser/>
        <div className={`${styles.cardContainer}`}>
          <CardDoc />
        </div>
      </div>

      {showBackToTopButton && (
        <div
          style={{
            position: 'fixed',
            bottom: '130px',
            height: '60px',
            width: '60px',
            right: '30px',
            background: '#104c91',
            padding: '10px 20px',
            cursor: 'pointer',
            borderRadius: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '14px',
            boxShadow: 'rgba(0, 0, 0, 0.3) 0px 7px 29px 0px',
            zIndex: 11111,
          }}
          onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
        >
          <svg
            style={{
              color: '#ffffff',
              fontWeight: '600',
              width: '30px',
              height: '3em',
            }}
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 384 512"
          >
            <g fill="currentColor">
              <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
            </g>
          </svg>
        </div>
      )}
    </>
  );
};

export default UserPage;
