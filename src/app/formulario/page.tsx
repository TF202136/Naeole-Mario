"use client";

import { useState } from "react";
import Form from "react-bootstrap/Form";
import Navigation from "../components/navbar/navigation";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import InputGroup from "react-bootstrap/InputGroup";
import { useFormikValidation } from "../../hooks/useFormikValidation";
import { addDoc, convidadosRef } from "@/lib/firebase/config";
import { Alert, Button } from "react-bootstrap";

function Formulario() {
  const [success, setSuccess] = useState(false);

  const formik = useFormikValidation(async (values, { resetForm }) => {
    try {
      await addDoc(convidadosRef, {
        ...values,
        acompanhante: values.acompanhante ?? 0, // Garantindo que sempre há um número
      });

      setSuccess(true);
      resetForm(); // Reseta o formulário

      // Remover alerta após 3 segundos
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Erro ao salvar:", error);
    }
  });

  return (
    <div>
      <header>
        <div className="container">
          <Navigation />
        </div>
        <h1 className="text-center mt-5">Formulário de Comparência</h1>
        <p className="text-center mt-3">Agradecemos a sua presença!</p>
      </header>

      <article>
        <div className="container mt-5">
          {success && <Alert variant="success">Obrigado por confirmar!</Alert>}

          <Form
            className="row g-3 shadow p-3 mb-5 bg-body-tertiary rounded"
            method="POST"
            onSubmit={formik.handleSubmit}
          >
            {/* Nome e Sobrenome */}
            <Form.Group className="col-12 mb-1">
              <Row>
                <Col>
                  <Form.Label>Primeiro Nome</Form.Label>
                  <Form.Control
                    {...formik.getFieldProps("nome")}
                    value={formik.values.nome || ""}
                  />
                </Col>
                <Col>
                  <Form.Label>Sobrenome</Form.Label>
                  <Form.Control
                    {...formik.getFieldProps("sobrenome")}
                    value={formik.values.sobrenome || ""}
                  />
                </Col>
              </Row>
            </Form.Group>

            {/* Email */}
            <Form.Group as={Col} md="12">
              <Form.Label>Email</Form.Label>
              <InputGroup>
                <InputGroup.Text>@</InputGroup.Text>
                <Form.Control
                  {...formik.getFieldProps("email")}
                  value={formik.values.email || ""}
                />
              </InputGroup>
            </Form.Group>

            {/* Telefone */}
            <Form.Group className="col-12 mb-1">
              <Form.Label>Telefone</Form.Label>
              <Form.Control
                {...formik.getFieldProps("telefone")}
                value={formik.values.telefone || ""}
              />
            </Form.Group>

            {/* Acompanhantes */}
            <Form.Group className="col-12 mb-1">
              <Form.Label>Acompanhantes</Form.Label>
              <Form.Control
                type="number"
                min={0}
                max={5}
                {...formik.getFieldProps("acompanhante")}
                value={formik.values.acompanhante ?? 0}
              />
            </Form.Group>

            {/* Mensagem */}
            <Form.Group className="col-12 mb-1">
              <Form.Label>Mensagem</Form.Label>
              <Form.Control
                as="textarea"
                {...formik.getFieldProps("mensagem")}
                value={formik.values.mensagem || ""}
              />
            </Form.Group>

            {/* Botão de envio */}
            <Form.Group className="col-12">
              <Button type="submit" className="btn btn-primary">
                Enviar
              </Button>
            </Form.Group>
          </Form>
        </div>
      </article>
    </div>
  );
}

export default Formulario;
