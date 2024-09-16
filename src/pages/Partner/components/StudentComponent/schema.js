import {MAX_SIZE_NAME, MAX_STRING_SIZE} from '@/utils/constants';
import { MAX_DESCRIPTION_SIZE, MAX_STRING_ADDRESS, VALIDATE_PHONE_REGEX_RULE } from '@/utils/helper';
import Joi from 'joi';

export const createOrUpdateStudentSchema = Joi.object({
  name: Joi.string().trim().max(MAX_SIZE_NAME).required().label('Họ và tên'),
  birth: Joi.date().allow(null, '').label('Ngày sinh'),
  email: Joi.string().trim().max(MAX_STRING_SIZE).lowercase().email({tlds: false}).allow(null, '').label('Email'),
  phone: Joi.string().pattern(VALIDATE_PHONE_REGEX_RULE).allow(null, '').label('Số điện thoại'),
  address: Joi.string().max(MAX_STRING_ADDRESS).allow(null, '').label('Địa chỉ'),
  notes: Joi.string().max(MAX_DESCRIPTION_SIZE).allow(null, '').label('Ghi chú'),
  tax_code: Joi.string().max(MAX_STRING_SIZE).allow(null, '').label('Mã số thuế'),
  company: Joi.string().max(MAX_STRING_SIZE).allow(null, '').label('Công ty'),
});