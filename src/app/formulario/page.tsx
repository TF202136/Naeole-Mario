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
import { addDoc, serverTimestamp } from "firebase/firestore";
import { convidadosRef } from "../../lib/firebase/config";
import { Alert, Button, Container, Spinner } from "react-bootstrap";

function Formulario() {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const formik = useFormikValidation(async (values, { resetForm }) => {
    try {
      setLoading(true);
      setError(null);

      if (!convidadosRef) {
        throw new Error("Erro na inicialização do Firestore");
      }

      await addDoc(convidadosRef, {
        ...values,
        acompanhante: values.acompanhante ?? 0,
        createdAt: serverTimestamp(),
      });

      setSuccess(true);
      resetForm();
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      setError("Erro ao enviar o formulário. Tente novamente.");
    } finally {
      setLoading(false);
    }
  });

  return (
    <div>
      <Navigation />
      <Container>
        {success && <Alert variant="success">✅ Formulário enviado com sucesso!</Alert>}
        {error && <Alert variant="danger">❌ {error}</Alert>}

        <Form className="shadow p-4 mt-5 mb-5 bg-light rounded" onSubmit={formik.handleSubmit}>
          <h2 className="text-center">Confirme sua Presença</h2>
          <p className="text-center">Preencha o formulário abaixo.</p>

          <Row>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Nome</Form.Label>
                <Form.Control {...formik.getFieldProps("nome")} isInvalid={formik.touched.nome && !!formik.errors.nome} />
                <Form.Control.Feedback type="invalid">{formik.errors.nome}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Sobrenome</Form.Label>
                <Form.Control {...formik.getFieldProps("sobrenome")} isInvalid={formik.touched.sobrenome && !!formik.errors.sobrenome} />
                <Form.Control.Feedback type="invalid">{formik.errors.sobrenome}</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group>
            <Form.Label>Email</Form.Label>
            <InputGroup>
              <InputGroup.Text>@</InputGroup.Text>
              <Form.Control {...formik.getFieldProps("email")} isInvalid={formik.touched.email && !!formik.errors.email} />
              <Form.Control.Feedback type="invalid">{formik.errors.email}</Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          <Form.Group>
            <Form.Label>Telefone</Form.Label>
            <Form.Control {...formik.getFieldProps("telefone")} isInvalid={formik.touched.telefone && !!formik.errors.telefone} />
            <Form.Control.Feedback type="invalid">{formik.errors.telefone}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Label>Acompanhantes</Form.Label>
            <Form.Control type="number" min={0} max={5} {...formik.getFieldProps("acompanhante")} />
          </Form.Group>

          <Form.Group>
            <Form.Label>Mensagem</Form.Label>
            <Form.Control as="textarea" {...formik.getFieldProps("mensagem")} />
          </Form.Group>

          <Button type="submit" className="w-100 mt-3" disabled={loading}>
            {loading ? <Spinner as="span" animation="border" size="sm" /> : "Enviar"}
          </Button>
        </Form>
      </Container>
    </div>
  );
}

export default Formulario;