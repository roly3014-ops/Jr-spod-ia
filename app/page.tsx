"use client";

import { useState } from "react";

export default function Home() {
  const [product, setProduct] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const createCampaign = async () => {
    if (!product.trim() || !description.trim()) {
      setMessage("Completa el producto y la descripción de la campaña.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product,
          description,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "No se pudo generar la campaña.");
      }

      setMessage(data.message || "Campaña creada correctamente.");
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "No se pudo generar la campaña."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="jr-app">
      <header className="jr-header">
        <div>
          <div className="jr-logo">
            <span className="jr-logo-icon">JR</span>
            <span>Spot IA</span>
          </div>

          <p className="jr-subtitle">
            Crea campañas publicitarias con inteligencia artificial
          </p>
        </div>

        <button className="jr-menu" aria-label="Menú">
          ☰
        </button>
      </header>

      <section className="jr-hero">
        <div className="jr-badge">✨ IA PUBLICITARIA</div>

        <h1>
          Convierte tu idea en una
          <span> campaña completa</span>
        </h1>

        <p>
          Genera anuncios profesionales para redes sociales, video y audio
          desde un solo lugar.
        </p>
      </section>

      <section className="jr-card">
        <div className="jr-card-title">
          <div className="jr-icon">✨</div>

          <div>
            <h2>Nueva campaña</h2>
            <p>Cuéntanos qué quieres promocionar</p>
          </div>
        </div>

        <label>Producto o negocio</label>

        <input
          value={product}
          onChange={(e) => setProduct(e.target.value)}
          placeholder="Ej. Restaurante El Sabor"
        />

        <label>Describe tu campaña</label>

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe tu producto, público objetivo, oferta, estilo y cualquier detalle importante..."
          rows={7}
        />

        <button
          className="jr-generate"
          onClick={createCampaign}
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="jr-spinner" />
              Generando campaña...
            </>
          ) : (
            <>🚀 Generar campaña con IA</>
          )}
        </button>

        {message && (
          <div className="jr-message">
            {message}
          </div>
        )}
      </section>

      <section className="jr-section">
        <div className="jr-section-heading">
          <span>Potencia tu publicidad</span>
          <h2>Todo en un solo lugar</h2>
        </div>

        <div className="jr-grid">
          <div className="jr-feature">
            <div className="jr-feature-icon">🎙️</div>
            <h3>Voces IA</h3>
            <p>
              Voces publicitarias naturales y profesionales para tus anuncios.
            </p>
          </div>

          <div className="jr-feature">
            <div className="jr-feature-icon">🎬</div>
            <h3>Spots</h3>
            <p>
              Crea anuncios verticales, horizontales y para diferentes
              plataformas.
            </p>
          </div>

          <div className="jr-feature">
            <div className="jr-feature-icon">📱</div>
            <h3>Redes sociales</h3>
            <p>
              Campañas preparadas para TikTok, Reels, Instagram, Facebook y
              YouTube.
            </p>
          </div>

          <div className="jr-feature">
            <div className="jr-feature-icon">🎵</div>
            <h3>Audio y música</h3>
            <p>
              Prepara tus anuncios para incorporar música, efectos y voz.
            </p>
          </div>
        </div>
      </section>

      <section className="jr-process">
        <div>
          <span>01</span>
          <strong>Describe</strong>
          <p>Cuéntanos sobre tu negocio.</p>
        </div>

        <div>
          <span>02</span>
          <strong>Genera</strong>
          <p>La IA crea tu campaña.</p>
        </div>

        <div>
          <span>03</span>
          <strong>Publica</strong>
          <p>Prepara tus anuncios.</p>
        </div>
      </section>

      <footer className="jr-footer">
        <strong>JR Spot IA</strong>
        <span>Publicidad inteligente</span>
      </footer>
    </main>
  );
}
