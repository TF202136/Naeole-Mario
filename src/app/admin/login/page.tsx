"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Form, Button, Alert, Container } from "react-bootstrap";
import styles from "../../../styles/Login.module.css"; //importe o arquivo de estilos

// Credenciais predefinidas
const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false); // Estado para controlar o carregamento

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); // Ativa o estado de carregamento
    setError(null); // Limpa erros anteriores

    try {
      // Verifica se o e-mail e a senha correspondem às credenciais predefinidas
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        localStorage.setItem("adminLoggedIn", "true"); // Salva sessão
        router.push("/admin/dashboard"); // Redireciona após login
        return;
      }

      // Caso não seja o admin predefinido, tenta autenticar pelo Firebase
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem("adminLoggedIn", "true");
      router.push("/admin/dashboard");
    } catch (err) {
      setError("Email ou senha inválidos!");
    } finally {
      setIsLoading(false); // Desativa o estado de carregamento
    }
  };

  return (
    <Container className={`d-flex flex-column align-items-center justify-content-center vh-100 ${styles.loginContainer}`}>
      <div className={styles.loginBox}>
        <h2 className={styles.loginTitle}>Admin Login</h2>
        {error && <Alert variant="danger" className={styles.alert}>{error}</Alert>}
        <Form onSubmit={handleLogin} className="w-100">
          <Form.Group controlId="email" className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Digite seu email"
            />
          </Form.Group>
          <Form.Group controlId="password" className="mb-3">
            <Form.Label>Senha</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Digite sua senha"
            />
          </Form.Group>
          <Button
            type="submit"
            className={`w-100 ${styles.loginButton}`}
            disabled={isLoading} // Desabilita o botão durante o carregamento
          >
            {isLoading ? "Carregando..." : "Login"}
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default Login;