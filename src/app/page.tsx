import Button from "react-bootstrap/Button";
import "../styles/page.css";

export default function HomePage() {
  return (
    <div id="hero">
      <section>
        <div className="d-flex justify-content-center align-items-center vh-100">
          <div className="hero-overlay text-center">
            <h1>
              {" "}
              Sejam bem-vindos ao nosso <span id="span1">
                dia especial
              </span>{" "}
            </h1>
            <p> Estamos muito felizes em compartilhar esse momento com vocês</p>{" "}
            <div>
              <Button variant="outline-primary" id="btn-1" href="/formulario">
                Confirme a sua presença
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
