import styles from "../../../styles/casamentoInfo.module.css";

export const Direccoes = () => {
  return (
    <div className={styles.direccoesContainer}>
      <div id="div" className={styles.mapContainer}>
        <iframe
          className={styles.direccoesMap}
          title="Montebello Eventos"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3001.0722313872157!2d-8.254917623904188!3d41.22019637132164!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd2491649ba474bd%3A0x71cd467b83c5a793!2smontebello%20.%20eventos!5e0!3m2!1sen!2suk!4v1731881335343!5m2!1sen!2suk"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <a
        href="https://maps.app.goo.gl/ZXb8LRVsqvWRn7Aw9"
        target="_blank"
        rel="noopener noreferrer"
        className={`btn btn-primary mt-3 ${styles.btn2}`} 
       
      >
        Obter direções
      </a>
    </div>
  );
};