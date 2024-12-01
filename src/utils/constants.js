export const TYPE_FILE = [
  'image/jpg',
  'image/JPG',
  'image/jpeg',
  'image/JPEG',
  'image/png',
  'image/PNG',
  'image/svg+xml',
  'image/webp',
];

export const MAX_STRING_SIZE = 100;
export const MAX_SIZE_NAME = 80;

export const TYPE_SUBMIT = {
  CREATE: 'CREATE',
  UPDATE: 'UPDATE',
  CHANGE_PASSWORD: 'CHANGE_PASSWORD',
};

export const USER_STATUS = {
  UNLOCK: 'UNLOCK',
  LOCK: 'LOCK',
};

export const USER_ROLE = {
  USER: 'USER',
  ADMIN: 'ADMIN',
  SUPER_ADMIN: 'SUPER_ADMIN',
};

export const PAGE_ERROR = {
  NOT_FOUND: 'NOT_FOUND',
  FORBIDDEN: 'FORBIDDEN',
};
export const TIME_TYPE = {
  DAY: 0,
  HOUR: 1,
  MINUTE: 2,
};

export const PRODUCT_STATUS = {
  AVAILABLE: 'AVAILABLE',
  UNAVAILABLE: 'UNAVAILABLE',
};

export const CATEGORY_STATUS = {
  LOCK: 'LOCK',
  UNLOCK: 'UNLOCK',
};

export const TYPE_IMAGE = {
  PICTURE_ONE: 'PICTURE_ONE',
  PICTURE_TWO: 'PICTURE_TWO',
  PICTURE_THREE: 'PICTURE_THREE',
};

export const formatLocalDateTime = {
  lang: {
    locale: 'en_US',
    rangePlaceholder: ['Ngày bắt đầu', 'Ngày kết thúc'],
    shortWeekDays: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
    shortMonths: [
      'Tháng 1',
      'Tháng 2',
      'Tháng 3',
      'Tháng 4',
      'Tháng 5',
      'Tháng 6',
      'Tháng 7',
      'Tháng 8',
      'Tháng 9',
      'Tháng 10',
      'Tháng 11',
      'Tháng 12',
    ],
    yearFormat: 'YYYY',
    dateFormat: 'DD-MM-YYYY',
    today: 'Hôm nay',
    placeholder: 'Chọn ngày',
  },
};

export const PROTECTED = {
  UNPROTECTED: 'UNPROTECTED',
  PROTECTED: 'PROTECTED',
};

export const PERMISSIONS = {
  SUPER_ADMIN: 'super-admin',
  LIST: {
    LIST_ADMIN: 'list-admin',
    LIST_DOCUMENT: 'list-document',
    LIST_CATEGORY: 'list-category',
    LIST_EMPLOYEE: 'list-employee',
    LIST_ROLE: 'list-role',
    LIST_PERMISSION: 'list-permission',
    LIST_USER: 'list-user',

    LIST_MANAGEMENT_TEACHER: 'list-management-teacher',
    LIST_MANAGEMENT_STUDENT: 'list-management-student',
    LIST_MANAGEMENT_OTHER: 'list-management-other',
  },
  ADD: {
    ADD_DOCUMENT: 'add-document',
    ADD_CATEGORY: 'add-category',
    ADD_EMPLOYEE: 'add-employee',
    ADD_ROLE: 'add-role',

    ADD_TEACHER: 'add-management-teacher',
    ADD_STUDENT: 'add-management-student',
    ADD_OTHER: 'add-management-other'
  },
  EDIT: {
    EDIT_DOCUMENT: 'edit-document',
    EDIT_CATEGORY: 'edit-category',
    EDIT_EMPLOYEE: 'edit-employee',
    EDIT_RESET_PASSWORD_EMPLOYEE: 'edit-reset-password-employee',
    EDIT_ROLE: 'edit-role',
    EDIT_PERMISSION: 'edit-permission',
    EDIT_EMPLOYEE_ROLE: 'edit-employee-role',

    EDIT_TEACHER: 'edit-management-teacher',
    EDIT_STUDENT: 'edit-management-student',
    EDIT_OTHER: 'edit-management-other',

    EDIT_RESET_PASSWORD_TEACHER: 'edit-reset-password-teacher',
    EDIT_RESET_PASSWORD_STUDENT: 'edit-reset-password-student',
    EDIT_RESET_PASSWORD_OTHER: 'edit-reset-password-other',
  },
  DELETE: {
    DELETE_DOCUMENT: 'delete-document',
    DELETE_CATEGORY: 'delete-category',
    DELETE_EMPLOYEE: 'delete-employee',
    DELETE_ROLE: 'delete-role',
    DELETE_EMPLOYEE_ROLE: 'delete-employee-role',

    DELETE_TEACHER: 'delete-management-teacher',
    DELETE_STUDENT: 'delete-management-student',
    DELETE_OTHER: 'delete-management-other',
  },
  RESET_PASSWORD: {
    ADMIN: 'reset-password-admin',
    USER: 'reset-password-user',
  },
  DETAIL: {
    DETAIL_DOCUMENT: 'detail-document',
  },
};

export const DOCUMENT_STATUS = {
  LOCK: 'LOCK',
  UNLOCK: 'UNLOCK',
};

export const USER_TYPE = {
  ADMIN: "ADMIN",
  STUDENT: "STUDENT",
  TEACHER: "TEACHER",
  OTHER: "OTHER",
};

export const STATUS_DOC_CHECK = {
  CHECKED: "CHECKED",
  PENDING: "PENDING",
};

export const TYPE_SAVE = {
  FILE: "FILE",
  CHAPTERS: "CHAPTERS",
};