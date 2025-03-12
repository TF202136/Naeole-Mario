"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "@/lib/firebase/config";
import { signOut } from "firebase/auth";
import { Button, Table, Container, Modal, Form } from "react-bootstrap";
import styles from "../../../styles/dashboard.module.css";

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
  const router = useRouter();
  const [convidados, setConvidados] = useState<Convidado[]>([]);
  const [selectedConvidado, setSelectedConvidado] = useState<Convidado | null>(
    null
  );
  const [showModal, setShowModal] = useState(false);
  const [totalConvidados, setTotalConvidados] = useState(0);

  useEffect(() => {
    if (!db) {
      console.error("Firestore is not initialized");
      return;
    }
    const unsubscribe = onSnapshot(collection(db, "convidados"), (snapshot) => {
      const convidadosList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Convidado[];

      setConvidados(convidadosList);
      calcularTotalConvidados(convidadosList);
    });

    return () => unsubscribe();
  }, []);

  const calcularTotalConvidados = (convidadosList: Convidado[]) => {
    const total = convidadosList.reduce(
      (acc, convidado) => acc + 1 + (convidado.acompanhante || 0),
      0
    );
    setTotalConvidados(total);
  };

  const handleDelete = async (id: string) => {
    if (db) {
      await deleteDoc(doc(db, "convidados", id));
    } else {
      console.error("Firestore is not initialized");
    }
  };

  const handleEdit = async () => {
    if (selectedConvidado) {
      if (db) {
        await updateDoc(doc(db, "convidados", selectedConvidado.id), {
          ...selectedConvidado,
        });
      } else {
        console.error("Firestore is not initialized");
      }
      setShowModal(false);
      setSelectedConvidado(null);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/login");
    } catch (error) {
      console.error("Erro ao sair:", error);
    }
  };

  return (
    <Container className={`mt-5 ${styles.dashboardContainer}`}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className={styles.dashboardTitle}>Dashboard dos Noivos</h2>
        <Button
          variant="danger"
          onClick={handleLogout}
          className={styles.logoutButton}
        >
          Sair
        </Button>
      </div>

      <div className="mb-3">
        <strong>Total de Convidados:</strong> {totalConvidados}
      </div>

      <div className="table-responsive">
        <Table
          striped
          bordered
          hover
          className={`${styles.convidadosTable} w-100`}
        >
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
                <td className="d-flex flex-column flex-md-row gap-2">
                  <Button
                    size="sm"
                    onClick={() => {
                      console.log("Convidado clicado:", c);
                      setSelectedConvidado(c);
                      console.log("selectedConvidado:", selectedConvidado);
                      console.log("Antes de setShowModal:", showModal);
                      setShowModal(true);
                      console.log("Depois de setShowModal:", showModal);
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
      </div>

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
                  value={selectedConvidado.mensagem || ""}
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