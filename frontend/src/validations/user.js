import * as yup from 'yup';
import YupPassword from 'yup-password';

YupPassword(yup);

const requiredMessage = 'This field is required';

export const user = {
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required(requiredMessage),
  email: yup.string().email('Must be a valid email').required(requiredMessage),
  institution: yup
    .string()
    .trim()
    .min(2, 'Must have a least 2 characters')
    .max(100, 'Must have a least 2 characters')
    .required(requiredMessage),
  mechNumber: yup
    .number()
    .integer('Must be an integer')
    .positive('Must be a positive number')
    .typeError('Must be a number')
    .required(requiredMessage),
  name: yup
    .string()
    .trim()
    .min(2, 'Must have a least 2 characters')
    .max(100, 'Must have a least 2 characters')
    .required(requiredMessage),
  password: yup
    .string()
    .password()
    .min(8, 'Must have at least 8 characters')
    .minLowercase(1, 'Must have at least 1 lowercase letter')
    .minUppercase(1, 'Must have at least 1 uppercase letter')
    .minNumbers(1, 'Must have at least 1 number')
    .minSymbols(0),
};
