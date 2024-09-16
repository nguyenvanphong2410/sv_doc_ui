import {MAX_STRING_SIZE, PRODUCT_STATUS} from '@/utils/constants';
import Joi from 'joi';

export const createDocumentSchema = Joi.object({
  name: Joi.string().trim().max(MAX_STRING_SIZE).required().label('Tên tài liệu'),
  images: Joi.any().allow(null, '').label('Ảnh mô tả'),
  description: Joi.string().allow(null, '').label('Mô tả'),
  category_id: Joi.array().items(Joi.string().trim().label('Danh mục')).label('Danh mục'),
  publisher: Joi.string().trim().max(MAX_STRING_SIZE).required().label('Nhà xuất bản'),
  author: Joi.string().trim().max(MAX_STRING_SIZE).required().label('Tác giả'),
  publication_time: Joi.any().allow(null, '').label('Thời gian sáng tác'),
  file_record: Joi.any().required().label('File tài liệu'),
  name_file: Joi.string().trim().label('Tên file'),
});

export const updateDocumentSchema = Joi.object({
  name: Joi.string().trim().max(MAX_STRING_SIZE).required().label('Tên tài liệu'),
  images: Joi.any().allow(null, '').label('Ảnh mô tả'),
  publication_time: Joi.any().allow(null, '').label('Thời gian sáng tác'),
  description: Joi.string().allow(null, '').label('Mô tả'),
  category_id: Joi.array().items(Joi.string().trim().label('Danh mục')).label('Danh mục'),
  author: Joi.string().trim().max(MAX_STRING_SIZE).required().label('Tác giả'),
  publisher: Joi.string().trim().max(MAX_STRING_SIZE).required().label('Nhà xuất bản'),
  file_record: Joi.any().required().label('File tài liệu'),
  name_file: Joi.string().trim().label('Tên file'),
});

export const changeStatus = Joi.object({
  status: Joi.string()
    .valid(...Object.values(PRODUCT_STATUS))
    .label('Trạng thái')
    .messages({'any.only': 'Trạng thái không hợp lệ.'}),
});
