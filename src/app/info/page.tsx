import { Direccoes } from "../components/direccoes/direccoes";
import Navigation from "../components/navbar/navigation";
import styles from "../../styles/casamentoInfo.module.css"; // Importe o arquivo de estilos

export default function CasamentoInfo() {
  return (
    <div>
      <header>
        <Navigation />
      </header>

      <section className={`container my-5 `}>
        <article className="row g-3 shadow p-3 mb-5 ">
          <div className="col-12 text-center">
            <h1 className="mt-4">Informações sobre o casamento</h1>
            <p className="mt-3">
              Aqui poderá encontrar informações sobre o casamento e festa.
            </p>
          </div>
          <div className={styles.direccoesSection}>
            <Direccoes />
          </div>
        </article>
      </section>
    </div>
  );
}
