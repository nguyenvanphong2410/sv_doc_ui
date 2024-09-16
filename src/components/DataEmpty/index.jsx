import {Empty} from 'antd';

const DataEmpty = () => {
  return (
    <div className={'no-data-wrap'}>
      <Empty description={<span className="text-[#babcbe]">Không có dữ liệu !</span>} />
    </div>
  );
};

export default DataEmpty;
