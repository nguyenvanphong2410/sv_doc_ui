import React from 'react';
import styles from './style.module.scss';
import { Pagination } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { setDataFilter } from '@/states/modules/document';
import { requestGetListDocumentForUser } from '@/api/document';

function PaginationDocument() {
    const dispatch = useDispatch();

    const dataFilter = useSelector(state => state.document.dataFilter)
    const paginationListDocument = useSelector((state) => state.document.paginationListDocument);


    const handleChangePage = (e) => {
        dispatch(setDataFilter({ ...dataFilter, page: e }))
        dispatch(requestGetListDocumentForUser());
    }
    return (
        <div className={styles.paginationWrap}>
            <Pagination
                responsive
                onChange={handleChangePage}
                current={paginationListDocument.currentPage}
                pageSize={paginationListDocument.perPage || 20}
                total={paginationListDocument.totalRecord}
                showSizeChanger={false}
            />

        </div>
    )
}

export default PaginationDocument;