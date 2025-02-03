"use client";

// Force dynamic rendering (disable prerendering)
export const dynamic = "force-dynamic";

import { useState } from "react";
import Form from "react-bootstrap/Form";
import Navigation from "../components/navbar/navigation";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import InputGroup from "react-bootstrap/InputGroup";
import { useFormikValidation } from "../../hooks/useFormikValidation";
import { addDoc } from "firebase/firestore";
import { convidadosRef } from "../../lib/firebase/config";
import { Alert, Button, Container } from "react-bootstrap";

function Formulario() {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formik = useFormikValidation(async (values, { resetForm }) => {
    try {
      console.log("Enviando dados:", values);

      // Verifica se a referência do Firestore está definida
      if (!convidadosRef) {
        throw new Error("Firestore initialization failed");
      }

      // Adiciona os dados ao Firestore
      await addDoc(convidadosRef, {
        ...values,
        acompanhante: values.acompanhante ?? 0, // Garantindo que sempre há um número
        createdAt: new Date().toISOString(), // Adiciona um timestamp para organização
      });

      console.log("Dados enviados com sucesso!");

      // Exibe o alerta de sucesso
      setSuccess(true);
      setError(null); // Limpa qualquer erro anterior
      resetForm(); // Reseta o formulário

      // Remove o alerta após 3 segundos
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Erro ao salvar:", error);
      setError("Erro ao enviar o formulário. Tente novamente."); // Exibe uma mensagem de erro
    }
  });

  return (
    <div>
      <Navigation />
      <Container>
        {/* Alertas de sucesso e erro */}
        {success && (
          <Alert variant="success" className="text-center">
            ✅ Formulário enviado com sucesso!
          </Alert>
        )}
        {error && (
          <Alert variant="danger" className="text-center">
            ❌ {error}
          </Alert>
        )}

        {/* Formulário */}
        <Form
          className="row g-3 shadow p-3 mt-5 mb-5 bg-body-tertiary rounded"
          onSubmit={formik.handleSubmit}
        >
          <div className="col-12 text-center">
            <h1>Obrigado pela sua presença</h1>
            <p>
              Preencha o formulário abaixo para confirmar a sua presença no casamento.
            </p>
          </div>

          {/* Nome e Sobrenome */}
          <Form.Group className="col-12 mb-1">
            <Row>
              <Col>
                <Form.Label>Primeiro Nome</Form.Label>
                <Form.Control
                  {...formik.getFieldProps("nome")}
                  value={formik.values.nome || ""}
                  isInvalid={!!formik.errors.nome && formik.touched.nome}
                />
                {formik.touched.nome && formik.errors.nome && (
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.nome}
                  </Form.Control.Feedback>
                )}
              </Col>
              <Col>
                <Form.Label>Sobrenome</Form.Label>
                <Form.Control
                  {...formik.getFieldProps("sobrenome")}
                  value={formik.values.sobrenome || ""}
                  isInvalid={!!formik.errors.sobrenome && formik.touched.sobrenome}
                />
                {formik.touched.sobrenome && formik.errors.sobrenome && (
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.sobrenome}
                  </Form.Control.Feedback>
                )}
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
                isInvalid={!!formik.errors.email && formik.touched.email}
              />
              {formik.touched.email && formik.errors.email && (
                <Form.Control.Feedback type="invalid">
                  {formik.errors.email}
                </Form.Control.Feedback>
              )}
            </InputGroup>
          </Form.Group>

          {/* Telefone */}
          <Form.Group className="col-12 mb-1">
            <Form.Label>Telefone</Form.Label>
            <Form.Control
              {...formik.getFieldProps("telefone")}
              value={formik.values.telefone || ""}
              isInvalid={!!formik.errors.telefone && formik.touched.telefone}
            />
            {formik.touched.telefone && formik.errors.telefone && (
              <Form.Control.Feedback type="invalid">
                {formik.errors.telefone}
              </Form.Control.Feedback>
            )}
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
              isInvalid={!!formik.errors.acompanhante && formik.touched.acompanhante}
            />
            {formik.touched.acompanhante && formik.errors.acompanhante && (
              <Form.Control.Feedback type="invalid">
                {formik.errors.acompanhante}
              </Form.Control.Feedback>
            )}
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

          {/* Botão de Envio */}
          <Form.Group className="col-12">
            <Button type="submit" className="btn btn-primary">
              Enviar
            </Button>
          </Form.Group>
        </Form>
      </Container>
    </div>
  );
}

export default Formulario;