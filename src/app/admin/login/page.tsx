"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword, auth } from "../../../lib/firebase/config";
import { Form, Button, Alert, Container } from "react-bootstrap";

// Credenciais predefinidas
const ADMIN_EMAIL = "teste@email.com";
const ADMIN_PASSWORD = "casamento2025";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Verifica se o e-mail e a senha correspondem às credenciais predefinidas
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      localStorage.setItem("adminLoggedIn", "true"); // Salva sessão
      router.push("/admin/dashboard"); // Redireciona após login
      return;
    }

    // Caso não seja o admin predefinido, tenta autenticar pelo Firebase
    try {
      await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem("adminLoggedIn", "true");
      router.push("/admin/dashboard");
    } catch (err) {
      setError("Email ou senha inválidos!");
    }
  };

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center vh-100">
      <h2>Admin Login</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleLogin} className="w-50">
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Button type="submit" className="mt-3 w-100">Login</Button>
      </Form>
    </Container>
  );
};

export default Login;