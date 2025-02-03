import { useFormik, FormikHelpers } from 'formik';
import * as Yup from 'yup';

// Defina a interface para os valores do formulário
interface FormValues {
  nome: string;
  sobrenome: string;
  email: string;
  telefone: string;
  acompanhante: number;
  mensagem: string;
}

// Defina a interface para a função de submit
type OnSubmit = (values: FormValues, formikHelpers: FormikHelpers<FormValues>) => void | Promise<void>;

export const useFormikValidation = (onSubmit: OnSubmit) => {
  return useFormik<FormValues>({
    initialValues: {
      nome: '',
      sobrenome: '',
      email: '',
      telefone: '',
      acompanhante: 0,
      mensagem: ''
    },
    validationSchema: Yup.object({
      nome: Yup.string().required('Obrigatório'),
      sobrenome: Yup.string().required('Obrigatório'),
      email: Yup.string().email('Email inválido').required('Obrigatório'),
      telefone: Yup.string().required('Obrigatório'),
      acompanhante: Yup.number()
        .min(0, 'Mínimo de 0')
        .max(5, 'Máximo de 5')
        .required('Obrigatório'),
      mensagem: Yup.string()
    }),
    onSubmit
  });
};