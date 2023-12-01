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
      }),
    age: yup
      .number()
      .typeError('enter your age')
      .required('enter your age')
      .min(0, 'no negative values'),
    email: yup.string().email().required('enter your email'),
    confirmEmail: yup
      .string()
      .email()
      .oneOf([yup.ref('email')], 'emails mismatch')
      .required('confirm your email'),
    password: yup
      .string()
      .required('enter password')
      .password()
      .minLowercase(1, 'min 1 small letter'),
    confirmPassword: yup
      .string()
      .required('confirm password')
      .password()
      .oneOf([yup.ref('password')], 'passwords mismatch')
      .minLowercase(1, 'min 1 small letter'),
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
