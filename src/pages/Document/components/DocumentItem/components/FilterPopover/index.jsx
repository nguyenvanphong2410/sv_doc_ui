import {Radio, Space} from 'antd';
import React from 'react';
import {useSelector} from 'react-redux';

function FilterPopover({handleChangeTableDocument}) {
  const {sort_order, column} = useSelector((state) => state.document.dataFilter);

  const onChange = (e) => {
    const value = e.target.value;
    const sorter = {
      order: null,
      field: null,
    };

    switch (value) {
      case 'name-desc':
        sorter.order = 'descend';
        sorter.field = 'name';
        break;
      case 'name-asc':
        sorter.order = 'ascend';
        sorter.field = 'name';
        break;
      case 'quantity-desc':
        sorter.order = 'descend';
        sorter.field = 'quantity';
        break;
      case 'quantity-asc':
        sorter.order = 'ascend';
        sorter.field = 'quantity';
        break;
      case 'sale_price-desc':
        sorter.order = 'descend';
        sorter.field = 'sale_price';
        break;
      case 'sale_price-asc':
        sorter.order = 'ascend';
        sorter.field = 'sale_price';
        break;
      case 'wholesale_price-desc':
        sorter.order = 'descend';
        sorter.field = 'wholesale_price';
        break;
      case 'wholesale_price-asc':
        sorter.order = 'ascend';
        sorter.field = 'wholesale_price';
        break;
    }
    handleChangeTableDocument(null, null, sorter)
  };

  return (
    <div className={`filter-wrap`}>
      <div className={`filter-content`}>
        <div className={`filter-title-wrap`}>
          <div className={`label-wrap label-filter`}>
            <Radio.Group
              onChange={onChange}
              value={sort_order && column ? String(column) + '-' + String(sort_order) : null}
            >
              <Space direction="vertical">
                <Radio value={'name-asc'}>Tên A - Z</Radio>
                <Radio value={'name-desc'}>Tên Z - A</Radio>
                <Radio value={'quantity-desc'}>Số lượng cao - thấp</Radio>
                <Radio value={'quantity-asc'}>Số lượng thấp - cao</Radio>
                <Radio value={'sale_price-desc'}>Giá bán cao - thấp</Radio>
                <Radio value={'sale_price-asc'}>Giá bán thấp - cao</Radio>
                <Radio value={'wholesale_price-desc'}>Giá sỉ cao - thấp</Radio>
                <Radio value={'wholesale_price-asc'}>Giá sỉ thấp - cao</Radio>
              </Space>
            </Radio.Group>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilterPopover;
