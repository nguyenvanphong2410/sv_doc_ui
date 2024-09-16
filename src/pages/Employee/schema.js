import {
  USER_STATUS, 
  MAX_SIZE_NAME, 
  MAX_STRING_SIZE
} from "@/utils/constants";
import {
  VALIDATE_NAME_REGEX_RULE,
  VALIDATE_PASSWORD_REGEX,
  VALIDATE_PHONE_REGEX_RULE,
} from "@/utils/helper";
import Joi from "joi";

export const updateEmployeeSchema = Joi.object({
  name: Joi.string()
    .trim()
    .max(MAX_SIZE_NAME)
    .pattern(VALIDATE_NAME_REGEX_RULE)
    .required()
    .label("Họ và tên"),
  email: Joi.string()
    .trim()
    .max(MAX_STRING_SIZE)
    .email({tlds: false})
    .required()
    .label("Email"),
  phone: Joi.string()
    .trim()
    .pattern(VALIDATE_PHONE_REGEX_RULE)
    .allow(null, "")
    .label("Số điện thoại"),
  avatar: Joi.any(),
  _id: Joi.any(),
  status: Joi.string()
    .valid(...Object.values(USER_STATUS))
    .label("Trạng thái")
    .messages({"any.only": "Trạng thái không hợp lệ."}),
});

export const createEmployeeSchema = Joi.object({
  name: Joi.string()
    .trim()
    .max(MAX_SIZE_NAME)
    .pattern(VALIDATE_NAME_REGEX_RULE)
    .required()
    .label("Họ và tên"),
  email: Joi.string()
    .trim()
    .max(MAX_STRING_SIZE)
    .email({tlds: false})
    .required()
    .label("Email"),
  phone: Joi.string()
    .trim()
    .pattern(VALIDATE_PHONE_REGEX_RULE)
    .allow(null, "")
    .label("Số điện thoại"),
  password: Joi.string()
    .min(8)
    .pattern(VALIDATE_PASSWORD_REGEX)
    .max(MAX_STRING_SIZE)
    .required()
    .label("Mật khẩu")
    .messages({
      "string.pattern.base":
        "Mật khẩu phải bao gồm chữ thường, chữ hoa, số và ký tự đặc biệt.",
    }),
  avatar: Joi.any(),
});

export const passwordEmployeeSchema = Joi.object({
  _id: Joi.any(),
  new_password: Joi.string()
    .min(8)
    .pattern(VALIDATE_PASSWORD_REGEX)
    .required()
    .max(MAX_STRING_SIZE)
    .label("Mật khẩu mới")
    .messages({
      "string.pattern.base":
        "Mật khẩu phải bao gồm chữ thường, chữ hoa, số và ký tự đặc biệt.",
    }),
  confirm_password: Joi.string()
    .required()
    .valid(Joi.ref("new_password"))
    .label("Mật khẩu xác nhận")
    .messages({
      "any.only": "Mật khẩu xác nhận không trùng khớp.",
    }),
});

export const changeStatus = Joi.object({
  status: Joi.string()
    .valid(...Object.values(USER_STATUS))
    .label("Trạng thái")
    .messages({"any.only": "Trạng thái không hợp lệ."}),
});
