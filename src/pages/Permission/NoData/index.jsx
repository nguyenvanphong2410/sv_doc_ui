import { Empty } from "antd";

export default function NoData({description}) {

    return (
        <Empty 
            description={<span className='text-[#a7a9ac]'>{description}</span>}
        />
    );
}
