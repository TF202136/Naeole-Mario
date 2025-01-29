import { useFormik } from 'formik';
import { YupValidationSchema } from './useYupValidation';

// useFormikValidation.tsx
export const useFormikValidation = (onSubmit: (values: any) => void) => {
    const formik = useFormik({
        initialValues: {
        nome: '',
        sobrenome: '',
        email: '',
        telefone: '',
        adultos: 0,
        criancas: 0,
        idade: 0,
        mensagem: '',
        },
        validationSchema: YupValidationSchema,
        onSubmit,
    });
    return formik;
}
