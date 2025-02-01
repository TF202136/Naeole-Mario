
import Button from "react-bootstrap/Button";
import "../styles/page.css";
import Countdown from "./components/countdown/countdown";

export default function HomePage() {
  return (
    <main id="hero">
      <section>
        <div className="d-flex justify-content-center align-items-center vh-100">
          <div className="hero-overlay text-center">
            <h1>
              Sejam bem-vindos ao nosso  dia especial
            </h1>
            <p>Estamos muito felizes em compartilhar esse momento com vocês</p>
            <div>
              <Button variant="outline-primary" id="btn-1" href="/formulario">
                Confirme a sua presença
              </Button>
            </div>
          </div>
        </div>
        <article>
          <Countdown />
        </article>
      </section>
    </main>
  );
};