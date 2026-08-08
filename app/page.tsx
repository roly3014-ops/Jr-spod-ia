"use client";

import { useState } from "react";

export default function Home() {
  const [product, setProduct] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const createCampaign = async () => {
    setLoading(true);

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

      alert(data.message || "Campaña creada");
    } catch {
      alert("No se pudo generar la campaña.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="mb-10 text-center">
          <h1 className="text-5xl font-bold">
            JR Spot IA
          </h1>

          <p className="mt-4 text-lg text-slate-300">
            Crea spots publicitarios con inteligencia artificial
          </p>
        </div>

        <div className="rounded-3xl bg-slate-900 p-8 shadow-2xl">
          <h2 className="mb-6 text-2xl font-semibold">
            Crear nueva campaña
          </h2>

          <label className="mb-2 block text-sm text-slate-300">
            Producto o negocio
          </label>

          <input
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            placeholder="Ej: Restaurante El Sabor"
            className="mb-6 w-full rounded-xl border border-slate-700 bg-slate-800 p-4 text-white outline-none"
          />

          <label className="mb-2 block text-sm text-slate-300">
            Describe tu campaña
          </label>

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe el producto, público objetivo, oferta y estilo del anuncio..."
            rows={6}
            className="mb-6 w-full rounded-xl border border-slate-700 bg-slate-800 p-4 text-white outline-none"
          />

          <button
            onClick={createCampaign}
            disabled={loading}
            className="w-full rounded-xl bg-cyan-500 px-6 py-4 font-bold text-slate-950 transition hover:bg-cyan-400 disabled:opacity-50"
          >
            {loading ? "Generando..." : "🚀 Generar campaña con IA"}
          </button>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl bg-slate-900 p-6">
            <h3 className="font-bold">🎙️ Voces IA</h3>
            <p className="mt-2 text-sm text-slate-400">
              Voces publicitarias de alta calidad.
            </p>
          </div>

          <div className="rounded-2xl bg-slate-900 p-6">
            <h3 className="font-bold">🎬 Spots</h3>
            <p className="mt-2 text-sm text-slate-400">
              Generación de anuncios para diferentes formatos.
            </p>
          </div>

          <div className="rounded-2xl bg-slate-900 p-6">
            <h3 className="font-bold">📱 Redes sociales</h3>
            <p className="mt-2 text-sm text-slate-400">
              Campañas preparadas para redes sociales.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
