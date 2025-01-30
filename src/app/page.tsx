import Button from "react-bootstrap/Button";
import "../styles/page.css";
import "../styles/countdown.module.css";
import Countdown from "./components/countdown/countdown";

export default function HomePage() {
  return (
    <main id="hero">
      <section>
        <div className="d-flex justify-content-center align-items-center vh-100">
          <div className="hero-overlay text-center">
            <h1>
              {" "}
              Sejam bem-vindos ao nosso <span id="span1">
                dia especial
              </span>{" "}
            </h1>
            <p> Estamos muito felizes em compartilhar esse momento connvosco</p>{" "}
            <div>
              <Button variant="outline-primary" id="btn-1" href="/formulario">
                Confirme a sua presença
              </Button>
              
            </div>
          </div>
        </div>
        <Countdown />
      </section>
      {/* countdown section */}

     
        
   

   </main>



  );
}
