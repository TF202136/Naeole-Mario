"use client";
import { useState } from "react";
import { addDoc, convidadosRef } from "../../../lib/firebase/config";
import { Form, Button, Alert } from "react-bootstrap";

const AddConvidado = ({ onAdd }: { onAdd: () => void }) => {
  const [form, setForm] = useState({
    nome: "",
    sobrenome: "",
    email: "",
    acompanhante: 0,
    crianca: 0,
  });

  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Adicionar convidado ao Firestore
      await addDoc(convidadosRef, {
        ...form,
        acompanhante: Number(form.acompanhante), // Garantir número
        crianca: Number(form.crianca), // Garantir número
      });

      setSuccess(true);
      setForm({ nome: "", sobrenome: "", email: "", acompanhante: 0, crianca: 0 });

      // Esconder o alerta de sucesso após 3 segundos
      setTimeout(() => setSuccess(false), 3000);

      onAdd();
    } catch (error) {
      console.error("Erro ao adicionar convidado:", error);
    }
  };

  return (
    <div className="mt-4">
      <h3>Adicionar Convidado</h3>
      {success && <Alert variant="success">✅ Convidado adicionado com sucesso!</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-2">
          <Form.Label>Nome</Form.Label>
          <Form.Control
            value={form.nome}
            onChange={(e) => setForm({ ...form, nome: e.target.value })}
            required
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Sobrenome</Form.Label>
          <Form.Control
            value={form.sobrenome}
            onChange={(e) => setForm({ ...form, sobrenome: e.target.value })}
            required
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Acompanhantes</Form.Label>
          <Form.Control
            type="number"
            min="0"
            value={form.acompanhante}
            onChange={(e) => setForm({ ...form, acompanhante: Number(e.target.value) })}
            required
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Crianças</Form.Label>
          <Form.Control
            type="number"
            min="0"
            value={form.crianca}
            onChange={(e) => setForm({ ...form, crianca: Number(e.target.value) })}
            required
          />
        </Form.Group>
        <Button type="submit">Adicionar</Button>
      </Form>
    </div>
  );
};

export default AddConvidado;
