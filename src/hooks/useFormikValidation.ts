import { useFormik } from 'formik';
import * as Yup from 'yup';

export const useFormikValidation = (onSubmit: (values: any, formikHelpers: any) => void | Promise<void>) => {
  return useFormik({
    initialValues: {
      comparecer: '',
      nome: '',
      sobrenome: '',
      email: '',
      telefone: '',
      adultos: 0,
      criancas: 0,
      idade: 0,
      mensagem: ''
    },
    validationSchema: Yup.object({
      comparecer: Yup.string().required('Obrigatório'),
      nome: Yup.string().required('Obrigatório'),
      sobrenome: Yup.string().required('Obrigatório'),
      email: Yup.string().email('Email inválido').required('Obrigatório'),
      telefone: Yup.string().required('Obrigatório'),
      adultos: Yup.number().min(1, 'Deve ser pelo menos 1').max(5, 'Máximo de 5').required('Obrigatório'),
      criancas: Yup.number().min(0, 'Deve ser pelo menos 0').max(2, 'Máximo de 2').required('Obrigatório'),
      idade: Yup.number().min(0, 'Deve ser pelo menos 0').max(12, 'Máximo de 12').required('Obrigatório'),
      mensagem: Yup.string()
    }),
    onSubmit
  });
};
