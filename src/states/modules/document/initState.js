import {TYPE_SAVE} from '@/utils/constants';

export const initInfoDocument = {
  code: '',
  name: '',
  images: [],
  description: '',
  category_id: [],
  name_file: '',
  author: '',
  publisher: '',
  publication_time: null,
  status: null,
  doc_check: '',
  type_save: TYPE_SAVE.FILE,
  file_record: null,
  chapters: [],
};

export const initErrInfoDocument = {
  code: '',
  name: '',
  author: '',
  publisher: '',
  images: '',
  description: '',
  category_id: '',
  file_record: '',
  status: '',
  doc_check: '',
  type_save: '',
  chapters: '',
};

export const initDataFilterDocument = {
  keySearch: '',
  perPage: 20,
  page: 1,
  sort_order: null,
  column: null,
};

export const initPaginationListDocument = {
  currentPage: 1,
  perPage: 20,
  totalRecord: 0,
};
