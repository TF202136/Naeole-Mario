import { Direccoes } from "../components/direccoes/direccoes";
import Navigation from "../components/navbar/navigation";

export default function casamentoInfo() {
  return (
    <div>
      <header>
        <div>
          <Navigation />
        </div>
      </header>
      <section className="container my-5">
        <article className="row g-3 shadow p-3 mb-5 bg-body-tertiary rounded">
          <div>
            <h1 className="text-center mt-4">Informações sobre o casamento</h1>
            <p className="text-center mt-3">
              Aqui poderá encontrar informações sobre o casamento e festa.
            </p>
          </div>
          {/* Data e hota */}
          <div className="col-md-4">
            <h3>Data, Horário & Localizaçãoa</h3>
            <p>
              <strong>Data:</strong> 26 de Setembro de 2025
            </p>
            <p>
              <strong>Horário:</strong> 4:00 Da Tarde
            </p>
            <p>
              <strong>Localização:</strong> Montebello Eventos
            </p>
          </div>
          {/* local */}
          <div className="col-md-4">
            <h3>Informações do local</h3>
            <p>
              <strong>Local:</strong> Montebello Eventos
            </p>
            <p>
              Uma fazenda histórica em Portugal, conta com parque de
              estacionamento e fácil acesso
            </p>
            <ul>
              <li>Parque de estacionamento livre</li>
              <li>Acessível para deficientes</li>
            </ul>
          </div>
          <div>
            {/* Dress code */}
            <div className="col-md-4">
              <h3>Traje recomendado</h3>
              <p>
                <strong>Traje recomendado:</strong> Formal
              </p>
              <p>
                Nós encorajamos a todos a se vestirem formal e com elegância
              </p>
            </div>
          </div>
        </article>
      </section>
      <section>
        <article>
          <div className="container">
            <h2 className="text-center mt-5">Direções</h2>
          </div>
          <div>
            <Direccoes />
          </div>
        </article>
      </section>
    </div>
  );
}
