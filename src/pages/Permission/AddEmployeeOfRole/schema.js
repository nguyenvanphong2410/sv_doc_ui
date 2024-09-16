import Joi from "joi";

export const updateEmployeeOfRoleSchema = Joi.object({
  employee_ids: Joi.array()
    .min(1)
    .required()
    .label('Tài khoản')
    .messages({
      'any.required': '{{#label}} không được để trống',
      'array.min': '{{#label}} không được để trống'
    })
});