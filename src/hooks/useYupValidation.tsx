import * as Yup from 'yup';

export const YupValidationSchema = Yup.object().shape({
    nome: Yup.string().required('Nome é obrigatório'),
    sobrenome: Yup.string().required('Sobrenome é obrigatório'),
    email: Yup.string().email('Email inválido').required('Email é obrigatório'),
    telefone: Yup.string().required('Telefone é obrigatório'),
    adultos: Yup.number().min(0).max(5, 'Máximo de 5 adultos permitidos'),
    criancas: Yup.number().min(0).max(2, 'Máximo de 2 crianças permitidas'),
    idade: Yup.number().min(0).max(12, 'Idade inválida'),
    mensagem: Yup.string(),
});
