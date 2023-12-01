import * as yup from 'yup';
import YupPassword from 'yup-password';
import { useAppSelector } from '../store/hooks';
YupPassword(yup);

export function convertBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result?.toString() as string);
    reader.onerror = reject;
  });
}

export function base64ToBlob(base64: string): Blob {
  const arr = base64.split(',');
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new Blob([u8arr], { type: 'image/png' });
}

export function SetSchema() {
  const coutries = useAppSelector((store) => store.main.countries);
  const schema = yup.object().shape({
    name: yup
      .string()
      .required('enter your name')
      .matches(/(^[A-Z][a-zA-Z]*$)/, {
        message: 'capitalize first letter, use only letters',
      })
      .required('enter your name'),
    age: yup
      .number()
      .typeError('enter your age')
      .required('enter your age')
      .min(0, 'no negative values'),
    email: yup.string().email().required('enter your email'),
    confirmEmail: yup
      .string()
      .oneOf([yup.ref('email')], 'emails mismatch')
      .required('confirm your email'),
    password: yup
      .string()
      .required('enter password')
      .password()
      .minLowercase(1, 'at least 1 lowercase letter')
      .required('enter password'),
    confirmPassword: yup
      .string()
      .required('confirm password')
      .oneOf([yup.ref('password')], 'passwords mismatch'),
    country: yup
      .string()
      .oneOf(coutries, 'select correct country')
      .required('select country'),
    gender: yup.string().required('select gender'),
    flag: yup.boolean().isTrue('check T&S').required(),
    image: yup.mixed().required('select file'),
  });
  return schema;
}

export function createErrors(arr: string[]) {
  const errors = {
    name: '',
    age: '',
    email: '',
    confirmEmail: '',
    password: '',
    confirmPassword: '',
    country: '',
    gender: '',
    image: '',
    flag: '',
  };
  arr.map((item) => {
    if (item === 'capitalize first letter, use only letters')
      errors.name = item;
    if (item === 'enter your name') errors.name = item;
    if (item === 'no negative values') errors.age = item;
    if (item === 'enter your age') errors.age = item;
    if (item === 'email must be a valid email') errors.email = item;
    if (item === 'enter your email') errors.email = item;
    if (item === 'emails mismatch') errors.confirmEmail = item;
    if (item === 'confirm your email') errors.confirmEmail = item;
    if (item === 'at least 1 lowercase letter') errors.password = item;
    if (item === 'password must contain at least 1 symbol')
      errors.password = item;
    if (item === 'password must contain at least 1 number')
      errors.password = item;
    if (item === 'password must contain at least 1 uppercase letter')
      errors.password = item;
    if (item === 'password must be at least 8 characters')
      errors.password = item;
    if (item === 'enter password') errors.password = item;
    if (item === 'passwords mismatch') errors.confirmPassword = item;
    if (item === 'confirm password') errors.confirmPassword = item;
    if (item === 'select correct country') errors.country = item;
    if (item === 'select country') errors.country = item;
    if (item === 'select gender') errors.gender = item;
    if (item === 'check T&S') errors.flag = item;
    if (item === 'select file') errors.image = item;
  });
  return errors;
}
