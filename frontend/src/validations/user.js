import * as yup from 'yup';
import I18n from 'i18next';
import YupPassword from 'yup-password';

YupPassword(yup);

const requiredMessage = I18n.t('form.error.required');

export const user = {
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], I18n.t('form.error.password.match'))
    .required(requiredMessage),
  email: yup
    .string()
    .email(I18n.t('form.error.email'))
    .required(requiredMessage),
  institution: yup
    .string()
    .trim()
    .min(2, I18n.t('form.error.string.min', { amount: 2 }))
    .max(100, I18n.t('form.error.string.max', { amount: 100 }))
    .required(requiredMessage),
  mechNumber: yup
    .number()
    .integer(I18n.t('form.error.number.integer'))
    .positive(I18n.t('form.error.number.positive'))
    .typeError(I18n.t('form.error.number.type'))
    .required(requiredMessage),
  name: yup
    .string()
    .trim()
    .min(2, I18n.t('form.error.string.min', { amount: 2 }))
    .max(100, I18n.t('form.error.string.max', { amount: 100 }))
    .required(requiredMessage),
  password: yup
    .string()
    .password()
    .min(8, I18n.t('form.error.password.min', { amount: 8 }))
    .minLowercase(1, I18n.t('form.error.password.minLowercase', { amount: 1 }))
    .minUppercase(1, I18n.t('form.error.password.minUppercase', { amount: 1 }))
    .minNumbers(1, I18n.t('form.error.password.minNumbers', { amount: 1 }))
    .minSymbols(0),
};
