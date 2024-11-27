import React from 'react';
import store from '@/states/configureStore';
import {notification} from 'antd';
import moment from 'moment';
import CloseIcon from '@/assets/images/icons/light/close.svg';
import success from '@/assets/images/icons/notification/success_16x16.svg';
import error from '@/assets/images/icons/notification/error_16x16.svg';
import warning from '@/assets/images/icons/notification/warning_16x16.svg';
import Swal from 'sweetalert2';

import dayjs from 'dayjs';
import 'dayjs/locale/vi'; // Nhập ngôn ngữ tiếng Việt
import relativeTime from 'dayjs/plugin/relativeTime'; // Nhập plugin relativeTime
dayjs.extend(relativeTime); // Kích hoạt plugin relativeTime
dayjs.locale('vi'); // Thiết lập ngôn ngữ là tiếng Việt


export const VALIDATE_EMAIL_REGEX = /^[a-zA-Z0-9][a-zA-Z0-9_.+-]{1,}@[a-z0-9]{1,}(\.[a-z0-9]{1,}){1,2}$/;
export const VALIDATE_PASSWORD_REGEX = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{6,50}$/;
export const VALIDATE_PHONE_REGEX_RULE = /^(0[235789])[0-9]{8}$/;
export const VALIDATE_NAME_REGEX_RULE = /^[\p{L} ]*$/u;
export const VALIDATE_IP_ADDRESS_REGEX =
  /^(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

export const MAX_SIZE_CONTENT = 1000;
export const MAX_NAME_ROLE_SIZE = 50;
export const MAX_DESCRIPTION_SIZE = 500;
export const MAX_STRING_ADDRESS = 500;

export const hasPermission = (permissions) => {
  let {auth} = store.getState();
  let isPermission = false;
  if (permissions) {
    permissions.forEach((permission) => {
      if (
        auth.authUser &&
        auth.authUser.permissions &&
        (auth.authUser.permissions.includes(permission) || auth.authUser.permissions.includes('super-admin'))
      ) {
        isPermission = true;
      }
    });
  }

  return isPermission;
};

export const getNotification = (type, content, duration = 3, align = 'top') => {
  let typeNotification = handleGetTypeNotification(type);
  notification[type]({
    message: '',
    description: (
      <div className={`notification-content ${typeNotification.className}`}>
        <div className={'icon-notification'}>
          <img src={typeNotification.icon} alt="" />
        </div>
        <span className={'text-notification'}>{content}</span>
      </div>
    ),
    closeIcon: <img src={CloseIcon} alt="" />,
    placement: align,
    duration: duration,
    style: {fontWeight: 'normal'},
  });
};

const handleGetTypeNotification = (type) => {
  let typeNotification = {};
  switch (type) {
    case 'error':
      typeNotification = {
        className: 'notification-error',
        icon: error,
      };
      break;
    case 'warning':
      typeNotification = {
        className: 'notification-warning',
        icon: warning,
      };
      break;
    default:
      typeNotification = {
        className: 'notification-success',
        icon: success,
      };
  }
  return typeNotification;
};

export const handleCheckRoute = (routes, currentRoute, params = {}) => {
  let keys = Object.keys(params);
  let param = '';
  keys.map((key) => {
    param += '/' + params[key];
  });
  currentRoute = currentRoute.replaceAll(param, '');

  if (routes && routes.length > 0) {
    return routes.includes(currentRoute);
  }
};

export const convertQueryStringToObject = (queryString) => {
  if (queryString.charAt(0) === '?') {
    queryString = queryString.substring(1);
  }

  let pairs = queryString.split('&');
  let result = {};

  for (let i = 0; i < pairs.length; i++) {
    let pair = pairs[i].split('=');
    let key = decodeURIComponent(pair[0]);
    let value = decodeURIComponent(pair[1] || '');

    if (Object.prototype.hasOwnProperty.call(result, key)) {
      if (!Array.isArray(result[key])) {
        result[key] = [result[key]];
      }

      result[key].push(value);
    } else {
      result[key] = value;
    }
  }

  return result;
};

export const formatDate = (date) => {
  return moment(date * 1000).format('HH:mm DD/MM/YYYY');
};

export function classNames(...classes) {
  return classes
    .filter((value) => !!value)
    .map((value) => `${value}`)
    .join(' ');
}

export function handleNotification(type, message, timer = 1000) {
  Swal.fire({
    position: 'center',
    icon: type,
    title: `<span class="title-modal-notification">${message}</span>`,
    showConfirmButton: false,
    timer,
    customClass: {
      icon: '!mt-[50px]',
      popup: 'popup-modal-notification',
    },
  });

  const notification = document.querySelector('.swal2-container');
  notification.style.zIndex = 99999;
}

export const formatRelativeTime = (dateTime) => {
  const now = moment();
  const diffSeconds = now.diff(dateTime, 'second');

  if (diffSeconds <= 60) {
    return `${diffSeconds} giây trước`;
  }

  const diffMinutes = now.diff(dateTime, 'minute');
  if (diffMinutes <= 60) {
    return `${diffMinutes} phút trước`;
  }

  const diffHours = now.diff(dateTime, 'hour');
  if (diffHours <= 24) {
    return `${diffHours} giờ trước`;
  }

  const diffDays = now.diff(dateTime, 'day');
  if (diffDays <= 31) {
    return `${diffDays} ngày trước`;
  }

  const diffMonths = now.diff(dateTime, 'month');
  if (diffMonths <= 12) {
    return `${diffMonths} tháng trước`;
  }

  return 'rất lâu về trước';
};

export const calculateTimeDifference = (startDateTime, endDateTime) => {
  const diffMinutes = endDateTime.diff(startDateTime, 'minute');
  const hours = Math.floor(diffMinutes / 60);
  const minutes = diffMinutes % 60;
  if (hours < 1) {
    return `${minutes} phút`;
  } else if (minutes < 1) {
    return `${hours} giờ`;
  } else {
    return `${hours} giờ ${minutes} phút`;
  }
};

export const formatTimeByDate = (date = moment(), time = moment()) =>
  date.isSame(time, 'day') ? time.format('HH:mm') : date.isBefore(time, 'day') ? '24:00' : '00:00';

export const handleSetTimeOut = (func, delay = 1000, timeoutId = null) => {
  let handleSetTimeOut;
  if (timeoutId) {
    clearTimeout(timeoutId);
  }
  handleSetTimeOut = setTimeout(func, delay);

  return handleSetTimeOut;
};

export const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.onload = () => callback(reader.result);
  reader.readAsDataURL(img);
};

export const formatMoney = (number) => {
  number = Math.abs(number);
  let numberString = number.toString();

  let formattedNumber = '';
  let count = 0;
  for (let i = numberString.length - 1; i >= 0; i--) {
    formattedNumber = numberString[i] + formattedNumber;
    count++;
    if (count % 3 === 0 && i > 0) {
      formattedNumber = '.' + formattedNumber;
    }
  }

  return formattedNumber;
};

export const dayjsFormatSort = (createdAt) => {
  return dayjs(createdAt).format("DD/MM/YYYY");
};
export const dayjsFormatFromNow = (createdAt) => {
  return dayjs(createdAt).fromNow();
};
