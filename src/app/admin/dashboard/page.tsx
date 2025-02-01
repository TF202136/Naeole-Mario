"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { collection, deleteDoc, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase/config";
import { Button, Table, Container, Modal, Form } from "react-bootstrap";
import styles from "../../../styles/dashboard.module.css"; // Importe o arquivo de estilos

interface Convidado {
  id: string;
  nome: string;
  sobrenome: string;
  email: string;
  telefone: number;
  acompanhante: number;
  mensagem?: string;
}

const Dashboard = () => {
  // const router = useRouter();
  const [convidados, setConvidados] = useState<Convidado[]>([]);
  const [selectedConvidado, setSelectedConvidado] = useState<Convidado | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "convidados"), (snapshot) => {
      setConvidados(
        snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Convidado))
      );
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, "convidados", id));
  };

  const handleEdit = async () => {
    if (selectedConvidado) {
      await updateDoc(doc(db, "convidados", selectedConvidado.id), { ...selectedConvidado });
      setShowModal(false);
      setSelectedConvidado(null);
    }
  };

  return (
    <Container className={`mt-5 ${styles.dashboardContainer}`}>
      <h2 className={styles.dashboardTitle}>Dashboard dos Noivos</h2>
      <Button variant="danger" onClick={() => auth.signOut()} className={styles.logoutButton}>
        Sair
      </Button>

      <Table striped bordered hover className={styles.convidadosTable}>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Sobrenome</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>Acompanhante</th>
            <th>Mensagem</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {convidados.map((c) => (
            <tr key={c.id}>
              <td>{c.nome}</td>
              <td>{c.sobrenome}</td>
              <td>{c.email}</td>
              <td>{c.telefone}</td>
              <td>{c.acompanhante}</td>
              <td>{c.mensagem}</td>
              <td>
                <Button
                  size="sm"
                  onClick={() => {
                    setSelectedConvidado(c);
                    setShowModal(true);
                  }}
                  className={styles.editButton}
                >
                  Editar
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(c.id)}
                  className={styles.deleteButton}
                >
                  Remover
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal de edição */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Convidado</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedConvidado && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedConvidado.nome}
                  onChange={(e) =>
                    setSelectedConvidado({
                      ...selectedConvidado,
                      nome: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Sobrenome</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedConvidado.sobrenome}
                  onChange={(e) =>
                    setSelectedConvidado({
                      ...selectedConvidado,
                      sobrenome: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={selectedConvidado.email}
                  onChange={(e) =>
                    setSelectedConvidado({
                      ...selectedConvidado,
                      email: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Telefone</Form.Label>
                <Form.Control
                  type="number"
                  value={selectedConvidado.telefone}
                  onChange={(e) =>
                    setSelectedConvidado({
                      ...selectedConvidado,
                      telefone: Number(e.target.value),
                    })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Acompanhantes</Form.Label>
                <Form.Control
                  type="number"
                  value={selectedConvidado.acompanhante ?? 0}
                  onChange={(e) =>
                    setSelectedConvidado({
                      ...selectedConvidado,
                      acompanhante: Number(e.target.value),
                    })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Mensagem</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedConvidado.mensagem || ''}
                  onChange={(e) =>
                    setSelectedConvidado({
                      ...selectedConvidado,
                      mensagem: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Button onClick={handleEdit} className={styles.saveButton}>
                Salvar
              </Button>
            </Form>
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Dashboard;