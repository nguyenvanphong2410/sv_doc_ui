import { Button } from 'antd';
import { PAGE_ERROR } from '@/utils/constants';
import { useNavigate } from "react-router-dom";
import ImageNotFound from '@/assets/images/error/notfound.png'
import ImageForbidden from '@/assets/images/error/forbidden.png'

function PageError({type, title}) {
    const navigate = useNavigate();

    return (
        <div className='flex justify-center items-center h-screen bg-[#fafafa]'>
            <div className='text-center'>
                <img 
                    src={type === PAGE_ERROR.NOT_FOUND ? ImageNotFound : ImageForbidden} 
                    alt="img-err" 
                />
                <p className='text-[#071437] font-semibold m-5'>
                    {title}
                </p>
                <Button className={`ant-btn-primary`} onClick={() => navigate('/')}>
                    Quay lại trang chủ
                </Button>
            </div>
        </div>
    )
}

export default PageError;