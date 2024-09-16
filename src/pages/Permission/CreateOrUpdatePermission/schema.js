import Joi from "joi";

export const updatePermissionSchema = Joi.object({
  _id: Joi.any(),
  name: Joi.string()
  .trim()
  .required()
  .invalid(
    'super_admin', 
    'super admin', 
    'Super Admin', 
    'Super admin',
    'super Admin',
  )
  .label("Tên vai trò")
  .messages({
    'any.invalid': '{{#label}} không hợp lệ'
  }),
  description: Joi.string()
    .trim()
    .allow(null, '')
    .label("Mô tả"),
  parent_id: Joi.string()
    .trim()
    .allow(null, '')
    .label("Vai trò cha"),
});

export const createPermissionSchema = Joi.object({
  name: Joi.string()
    .trim()
    .required()
    .invalid(
      'super_admin', 
      'super admin', 
      'Super Admin', 
      'Super admin',
      'super Admin',
    )
    .label("Tên vai trò")
    .messages({
      'any.invalid': '{{#label}} không hợp lệ'
    }),
  description: Joi.string()
    .trim()
    .allow(null, '')
    .label("Mô tả"),
  parent_id: Joi.string()
    .trim()
    .allow(null, '')
    .label("Vai trò cha"),
});
