"use client";

import Form from "react-bootstrap/Form";
import Navigation from "../components/navbar/navigation";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import InputGroup from "react-bootstrap/InputGroup";
import { useFormikValidation } from "../../hooks/useFormikValidation";

function Formulario() {
  const formik = useFormikValidation((values) => {
    alert(JSON.stringify(values, null, 2));
  });

  return (
    <div>
      <header>
        <div className="container">
          <Navigation />
        </div>
        <h1 className="text-center mt-5">Formulário de comparença</h1>
        <h2 className="text-center mt-3">
          Preencha o formulário abaixo para confirmar a sua presença no nosso
          casamento e festa.
        </h2>
        <p className="text-center mt-3">Agradecemos a sua presença!</p>
      </header>
      <article>
        <div className="container mt-5">
          <Form
            className="row g-3 shadow p-3 mb-5 bg-body-tertiary rounded"
            method="POST"
            onSubmit={formik.handleSubmit}
          >
            {/* Escolha */}
            <Form.Group className="col-12 mb-1">
              <Form.Label>
                Você irá festejar connosco nesta data tão especial?
              </Form.Label>
              <div>
                <Form.Check
                  type="radio"
                  label="Sim"
                  name="comparecer"
                  id="comparecerSim"
                  onChange={formik.handleChange}
                />
                <Form.Check
                  type="radio"
                  label="Não"
                  name="comparecer"
                  id="comparecerNao"
                  onChange={formik.handleChange}
                />
              </div>
            </Form.Group>
            {/* Nome */}
            <Form.Group className="col-12 mb-1">
              <Row>
                <Col>
                  <Form.Label>Primeiro Nome</Form.Label>
                  <Form.Control
                    type="text"
                    id="nome"
                    placeholder="Digite o seu nome"
                    {...formik.getFieldProps("nome")}
                  />
                  {formik.touched.nome && formik.errors.nome && (
                    <div className="text-danger">{formik.errors.nome}</div>
                  )}
                </Col>
                <Col>
                  <Form.Label>Sobrenome</Form.Label>
                  <Form.Control
                    type="text"
                    id="sobrenome"
                    placeholder="Digite o seu sobrenome"
                    {...formik.getFieldProps("sobrenome")}
                  />
                  {formik.touched.sobrenome && formik.errors.sobrenome && (
                    <div className="text-danger">{formik.errors.sobrenome}</div>
                  )}
                </Col>
              </Row>
            </Form.Group>
            {/* Email */}
            <Form.Group as={Col} md="12">
              <Form.Label>Email</Form.Label>
              <InputGroup>
                <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                <Form.Control
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Digite o seu email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </InputGroup>
              {formik.touched.email && formik.errors.email && (
                <div className="text-danger">{formik.errors.email}</div>
              )}{" "}
            </Form.Group>
            {/* Telefone */}
            <Form.Group className="col-12 mb-1">
              <Form.Label>Telefone</Form.Label>
              <Form.Control
                type="tel"
                id="telefone"
                placeholder="Digite o seu telefone"
                {...formik.getFieldProps("telefone")}
                />
                {formik.touched.telefone && formik.errors.telefone && (
                  <div className="text-danger">{formik.errors.telefone}</div>
                )}
            </Form.Group>
            {/* Número de adultos */}
            <Form.Group className="col-12 mb-1">
              <Form.Label>Número de adultos</Form.Label>
              <Form.Control
                type="number"
                id="adultos"
                placeholder="Número de adultos"
                min="1"
                max="5"
                {...formik.getFieldProps("adultos")}
              />
              {formik.touched.adultos && formik.errors.adultos && (
                <div className="text-danger">{formik.errors.adultos}</div>
              )}
            </Form.Group>
            {/* crinças */}
            <Form.Group className="col-12 mb-1">
              <Form.Label>Quantas crianças</Form.Label>
              <Form.Control
                type="number"
                id="criancas"
                min="0"
                max="2"
                {...formik.getFieldProps("criancas")}
              />
              {formik.touched.criancas && formik.errors.criancas && (
                <div className="text-danger">{formik.errors.criancas}</div>
              )}
            </Form.Group>
            {/* Número de crianças */}
            <Form.Group className="col-12 mb-1">
              <Form.Label>Idade da criança (0 - 12)</Form.Label>
              <Form.Control
                type="number"
                id="idade"
                min="0"
                max="12"
                {...formik.getFieldProps("idade")}
              />
              {formik.touched.idade && formik.errors.idade && (
                <div className="text-danger">{formik.errors.idade}</div>
              )}
            </Form.Group>
            {/* Mensagem */}
            <Form.Group className="col-12 mb-1">
              <Form.Label>Mensagem</Form.Label>
              <Form.Control
                as="textarea"
                id="mensagem"
                placeholder="Deixe-nos uma mensagem"
                {...formik.getFieldProps("mensagem")}
              />
            </Form.Group>
            {/* Botão de envio */}
            <Form.Group className="col-12">
              <button type="submit" className="btn btn-primary">
                Enviar
              </button>
            </Form.Group>
          </Form>
        </div>
      </article>
    </div>
  );
}

export default Formulario;
