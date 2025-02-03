"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { fotos } from "../components/images/fotos";
import Navigation from "../components/navbar/navigation";
import styles from "../../styles/gallery.module.css";
import { ChevronLeft, ChevronRight, X } from "lucide-react"; // Ícones para navegação

const Gallery: React.FC = () => {
  const [visiblePhotos, setVisiblePhotos] = useState(6);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // URL do vídeo (substitua pelo seu)
  const videoSrc = "https://firebasestorage.googleapis.com/v0/b/naeolemariowedding.firebasestorage.app/o/Nae%26Mario%2Fvideo_do_casamento%20(1).mp4?alt=media&token=aa61db07-bdbe-4690-a110-df5b2555f693";

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1500);
  }, []);

  const showMorePhotos = () => {
    setVisiblePhotos((prev) => prev + 6);
  };

  const openPhoto = (index: number) => {
    setSelectedIndex(index);
  };

  const closePhoto = () => {
    setSelectedIndex(null);
  };

  const nextPhoto = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((prev) =>
        prev !== null ? (prev + 1) % fotos.length : 0
      );
    }
  };

  const prevPhoto = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((prev) =>
        prev !== null ? (prev - 1 + fotos.length) % fotos.length : fotos.length - 1
      );
    }
  };

  return (
    <div>
      <Navigation />
      <Container className={styles.gallery}>
        <h2 className={styles.title}>Sessão de fotos pré-casamento</h2>

        {/* Seção de vídeo */}
        <div className={styles.videoContainer}>
          <video
            controls
            width="100%"
            className={styles.videoPlayer}
            poster="https://firebasestorage.googleapis.com/v0/b/naeolemariowedding.firebasestorage.app/o/Nae%26Mario%2Fmaos_dadas.JPG?alt=media&token=43991fa3-40e1-4713-881c-69cd6501d2d9"  // Opcional: substitua pelo caminho do seu poster
            loop // Adicione o atributo loop para reprodução contínua
            autoPlay // Adicione o atributo autoPlay para reprodução automática
          >
            <source src={videoSrc} type="video/mp4" />
            Seu navegador não suporta a exibição de vídeos.
          </video>
        </div>

        {isLoading ? (
          <div className="text-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Carregando...</span>
            </Spinner>
          </div>
        ) : (
          <>
            <Row>
              {fotos.slice(0, visiblePhotos).map((photo, index) => (
                <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-4">
                  <div
                    className={styles.imageContainer}
                    onClick={() => openPhoto(index)}
                  >
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      width={500}
                      height={300}
                      layout="responsive"
                      objectFit="cover"
                      priority={index === 0}
                      placeholder="blur"
                      blurDataURL={photo.src}
                      className={styles.galleryImage}
                    />
                  </div>
                </Col>
              ))}
            </Row>

            {visiblePhotos < fotos.length && (
              <button onClick={showMorePhotos} className={styles.loadMore}>
                Ver Mais
              </button>
            )}
          </>
        )}

        {selectedIndex !== null && (
          <div className={styles.lightbox}>
            <button className={styles.closeButton} onClick={closePhoto}>
              <X size={30} />
            </button>
            <button className={styles.prevButton} onClick={prevPhoto}>
              <ChevronLeft size={40} />
            </button>
            <div className={styles.lightboxImageContainer}>
              <Image
                src={fotos[selectedIndex].src}
                alt={fotos[selectedIndex].alt}
                width={800}
                height={600}
                objectFit="contain"
                className="img-fluid"
              />
            </div>
            <button className={styles.nextButton} onClick={nextPhoto}>
              <ChevronRight size={40} />
            </button>
          </div>
        )}
      </Container>
    </div>
  );
};

export default Gallery;
  