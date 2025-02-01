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
      setSelectedIndex((prev) => (prev !== null ? (prev + 1) % fotos.length : 0));
    }
  };

  const prevPhoto = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((prev) => (prev !== null ? (prev - 1 + fotos.length) % fotos.length : fotos.length - 1));
    }
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
