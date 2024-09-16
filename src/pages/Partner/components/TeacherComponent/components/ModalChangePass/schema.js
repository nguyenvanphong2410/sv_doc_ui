import {MAX_STRING_SIZE} from '@/utils/constants';
import {VALIDATE_PASSWORD_REGEX} from '@/utils/helper';
import Joi from 'joi';

export const passwordTeacherSchema = Joi.object({
  _id: Joi.any(),
  new_password: Joi.string()
    .min(8)
    .pattern(VALIDATE_PASSWORD_REGEX)
    .required()
    .max(MAX_STRING_SIZE)
    .label('Mật khẩu mới')
    .messages({
      'string.pattern.base': 'Mật khẩu phải bao gồm chữ thường, chữ hoa, số và ký tự đặc biệt.',
    }),
  confirm_password: Joi.string()
    .required()
    .valid(Joi.ref('new_password'))
    .label('Mật khẩu xác nhận')
    .messages({
      'any.only': 'Mật khẩu xác nhận không trùng khớp.',
    }),
});
