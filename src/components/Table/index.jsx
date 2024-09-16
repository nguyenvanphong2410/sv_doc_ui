import React, {useEffect, useState} from 'react';
import {Pagination, Table} from 'antd';
import styles from './styles.module.scss';
import './styles.scss';
import PropTypes from 'prop-types';
import _ from 'lodash';
import DataEmpty from '../DataEmpty';

TableDefault.prototype = {
  isPagination: PropTypes.bool,
};

TableDefault.defaultProps = {
  isPagination: true,
  pagination: {
    currentPage: 1,
    perPage: 20,
    totalRecord: 0,
  },
};

function TableDefault(props) {
  let {
    dataSource,
    columns,
    pagination,
    loading,
    onChange,
    handleSelectPagination,
    isPagination,
    isFixed,
    rowKey,
    rowClassName,
    extraClassName,
    scroll,
  } = props;

  const [sizePagination, setSizePagination] = useState('large');

  useEffect(() => {
    if (window.innerWidth >= 320 && window.innerWidth <= 360) {
      setSizePagination('small');
    }
  });

  return (
    <div className={`${styles.tableDefaultWrap}`}>
      <Table
        loading={loading}
        className={`main-table mb-[15px] table-list
            ${!isPagination ? 'no-pagination' : ''}
            ${isFixed ? 'fixed-cell' : ''}
            ${extraClassName ? extraClassName : ''} `}
        rowClassName={(record) => {
          if (rowClassName && _.isFunction(rowClassName)) {
            return rowClassName(record) ? 'active-row-table-default' : '';
          }
          return '';
        }}
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        rowKey={rowKey ? rowKey : '_id'}
        onChange={onChange}
        scroll={
          scroll
            ? scroll
            : {y: isPagination ? (window.innerWidth > 767 ? 'calc(100vh - 50px)' : '') : 730, x: 1000}
        }
        locale={{
          emptyText: <DataEmpty />,
        }}
      />
      {isPagination ? (
        <div className="flex">
          <Pagination
            className={'pagination'}
            current={pagination.currentPage}
            total={pagination.totalRecord}
            pageSize={pagination.perPage}
            onChange={(e) => handleSelectPagination(e)}
            showSizeChanger={false}
            size={sizePagination}
          />
          <div className={`info-pagination`}>
            {`Hiển thị ${pagination.currentPage} - ${pagination.perPage} / Tổng số ${pagination.totalRecord}`}
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
}

export default TableDefault;
