"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import styles from "../../styles/gallery.module.css";
import { fotos } from "../components/images/fotos"; // Importa as fotos separadas
import Navigation from "../components/navbar/navigation";

const Gallery: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [visiblePhotos, setVisiblePhotos] = useState(6);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1500); // Simula carregamento
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isOpen) {
        if (event.key === "ArrowRight") setPhotoIndex((photoIndex + 1) % fotos.length);
        if (event.key === "ArrowLeft") setPhotoIndex((photoIndex + fotos.length - 1) % fotos.length);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, photoIndex]);

  const openLightbox = (index: number) => {
    setPhotoIndex(index);
    setIsOpen(true);
  };

  const showMorePhotos = () => {
    setVisiblePhotos((prev) => prev + 6);
  };

  return (
    <div>
        <Navigation />
    
    <Container className={styles.gallery}>
       
      <h2 className={styles.title}>Sessão de fotos pré-casamento</h2>

      {isLoading ? (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Carregando...</span>
          </Spinner>
        </div>
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : (
        <>
          <Row>
            {fotos.slice(0, visiblePhotos).map((photo, index) => (
              <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-4">
                <div className={styles.imageContainer} onClick={() => openLightbox(index)}>
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

      {isOpen && (
        <>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${((photoIndex + 1) / fotos.length) * 100}%` }}
            ></div>
          </div>

          <Lightbox
            mainSrc={fotos[photoIndex].src}
            nextSrc={fotos[(photoIndex + 1) % fotos.length].src}
            prevSrc={fotos[(photoIndex + fotos.length - 1) % fotos.length].src}
            onCloseRequest={() => setIsOpen(false)}
            onMovePrevRequest={() => setPhotoIndex((photoIndex + fotos.length - 1) % fotos.length)}
            onMoveNextRequest={() => setPhotoIndex((photoIndex + 1) % fotos.length)}
          />
        </>
      )}
    </Container>
    </div>
  );
};

export default Gallery;
