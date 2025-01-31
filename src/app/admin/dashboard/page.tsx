"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase/config";
import { Button, Table, Container, Alert, Modal } from "react-bootstrap";
import AddConvidado from "../../components/admin/AddConvidados";

interface Convidado {
  id: string;
  nome: string;
  sobrenome: string;
  email: string;
  acompanhante: number;
  crianca: number;
}

const Dashboard = () => {
  const router = useRouter();
  const [convidados, setConvidados] = useState<Convidado[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchConvidados();
  }, []);

  const fetchConvidados = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "convidados"));
      const lista = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Convidado[];
      setConvidados(lista);
    } catch (error) {
      console.error("Erro ao buscar convidados:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, "convidados", id));
      setConvidados((prev) => prev.filter((convidado) => convidado.id !== id));
      showSuccessMessage("Convidado removido com sucesso!");
    } catch (error) {
      console.error("Erro ao remover convidado:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      router.push("/admin");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  const showSuccessMessage = (message: string) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  return (
    <Container className="mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Dashboard dos Noivos</h2>
        <Button variant="danger" onClick={handleLogout}>
          Sair
        </Button>
      </div>

      {successMessage && <Alert variant="success">{successMessage}</Alert>}

      <Button
        variant="primary"
        onClick={() => setShowModal(true)}
        className="mb-3"
      >
        Adicionar Convidado
      </Button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Sobrenome</th>
            <th>Email</th>
            <th>Acompanhante</th>
            <th>Crianças</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {convidados.map((convidado) => (
            <tr key={convidado.id}>
              <td>{convidado.nome}</td>
              <td>{convidado.sobrenome}</td>
              <td>{convidado.email}</td>
              <td>{convidado.acompanhante}</td>
              <td>{convidado.crianca}</td>
              <td>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(convidado.id)}
                >
                  Remover
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Adicionar Convidado</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddConvidado
            onAdd={() => {
              fetchConvidados();
              setShowModal(false);
            }}
          />
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Dashboard;
