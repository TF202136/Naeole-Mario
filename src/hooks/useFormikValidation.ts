import { useFormik } from 'formik';
import * as Yup from 'yup';

export const useFormikValidation = (onSubmit: (values: any, formikHelpers: any) => void | Promise<void>) => {
  return useFormik({
    initialValues: {
      nome: '',
      sobrenome: '',
      email: '',
      telefone: '',
      acompanhante : 0,
      mensagem: ''
    },
    validationSchema: Yup.object({
      nome: Yup.string().required('Obrigatório'),
      sobrenome: Yup.string().required('Obrigatório'),
      email: Yup.string().email('Email inválido').required('Obrigatório'),
      telefone: Yup.string().required('Obrigatório'),
      acompanhante : Yup.number().min(0).max(5, 'Máximo de 5').required('Obrigatório'),
      mensagem: Yup.string()
    }),
    onSubmit
  });
};
