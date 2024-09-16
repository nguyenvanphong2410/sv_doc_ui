import {
  MAX_STRING_SIZE,
  CATEGORY_STATUS
} from "@/utils/constants";
import Joi from "joi";

export const createCategorySchema = Joi.object({
  name: Joi.string()
      .trim()
      .max(MAX_STRING_SIZE)
      .required()
      .label("Tên danh mục"),
  description: Joi.string()
      .allow(null, "")
      .label("Mô tả phòng"),
});

export const updateCategorySchema = Joi.object({
  name: Joi.string()
      .trim()
      .max(MAX_STRING_SIZE)
      .required()
      .label("Tên danh mục"),
  description: Joi.string()
      .allow(null, "")
      .label("Mô tả"),
  status: Joi.string()
      .valid(...Object.values(CATEGORY_STATUS))
      .label("Trạng thái")
      .messages({"any.only": "Trạng thái không hợp lệ."}),
});

export const changeStatus = Joi.object({
  status: Joi.string()
    .valid(...Object.values(CATEGORY_STATUS))
    .label("Trạng thái")
    .messages({"any.only": "Trạng thái không hợp lệ."}),
});
