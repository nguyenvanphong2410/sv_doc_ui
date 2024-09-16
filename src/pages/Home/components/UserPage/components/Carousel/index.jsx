import slide1 from '@/assets/images/banner/slide-1.jpg';
import slide2 from '@/assets/images/banner/slide-2.jpg';
import slide4 from '@/assets/images/banner/slide-4.jpg';
import slide5 from '@/assets/images/banner/slide-5.jpg';
import styles from './styles.module.scss';
import {Carousel} from 'antd';

const CarouselCpn = () => {

    return (
        <>
        <div className={styles.sliderHeading}>
            <Carousel autoplay autoplaySpeed={1000}>
              <div>
                <img className={styles.imgSlide} src={slide1} alt="" />
              </div>
              <div>
                <img className={styles.imgSlide} src={slide2} alt="" />
              </div>
              <div>
                <img className={styles.imgSlide} src={slide4} alt="" />
              </div>
              <div>
                <img className={styles.imgSlide} src={slide5} alt="" />
              </div>
            </Carousel>
          </div>
        </>
    )
}

export default CarouselCpn;