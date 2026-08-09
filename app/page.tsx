"use client";

import { useMemo, useState } from "react";

const voices = [
  {
    id: "sofia",
    name: "Sofía",
    gender: "Femenina",
    style: "Cálida y comercial",
  },
  {
    id: "mateo",
    name: "Mateo",
    gender: "Masculina",
    style: "Energética y moderna",
  },
  {
    id: "valentina",
    name: "Valentina",
    gender: "Femenina",
    style: "Elegante y premium",
  },
  {
    id: "diego",
    name: "Diego",
    gender: "Masculina",
    style: "Fuerte y corporativa",
  },
];

const formats = [
  {
    id: "9:16",
    name: "Vertical",
    platforms: "TikTok, Reels, Shorts",
  },
  {
    id: "16:9",
    name: "Horizontal",
    platforms: "YouTube, TV, web",
  },
  {
    id: "1:1",
    name: "Cuadrado",
    platforms: "Facebook, Instagram",
  },
];

export default function Home() {
  const [module, setModule] = useState("campaign");

  const [product, setProduct] = useState(
    "Restaurante El Sabor"
  );

  const [description, setDescription] = useState(
    "Restaurante de comida peruana dirigido a familias y jóvenes, con estilo moderno y atractivo."
  );

  const [voice, setVoice] = useState("sofia");
  const [format, setFormat] = useState("9:16");
  const [duration, setDuration] = useState("30");
  const [platform, setPlatform] =
    useState("Instagram Reels");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [campaign, setCampaign] = useState<any>(null);

  const selectedVoice = useMemo(
    () =>
      voices.find((item) => item.id === voice) ??
      voices[0],
    [voice]
  );

  const previewVoice = (text?: string) => {
    if (!("speechSynthesis" in window)) {
      setMessage(
        "Tu navegador no admite reproducción de voz."
      );
      return;
    }

    window.speechSynthesis.cancel();

    const utterance =
      new SpeechSynthesisUtterance(
        text ||
          `¡Descubre ${product}! ${description} Ven y vive una experiencia deliciosa.`
      );

    utterance.lang = "es-PE";
    utterance.rate = 0.95;

    utterance.pitch =
      selectedVoice.gender === "Femenina"
        ? 1.05
        : 0.9;

    window.speechSynthesis.speak(utterance);

    setMessage(
      `Reproduciendo vista previa de ${selectedVoice.name}.`
    );
  };  const createCampaign = async () => {
    if (!product.trim() || !description.trim()) {
      setMessage(
        "Completa el producto y la descripción."
      );
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        "/api/generate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            product,
            description,
            voice: selectedVoice,
            format,
            duration,
            platform,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "No se pudo generar la campaña."
        );
      }

      setCampaign(data.campaign);

      setMessage(
        "Campaña generada correctamente."
      );
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

  const navigation = [
    ["campaign", "🤖 Campaña"],
    ["voices", "🎙️ Voces IA"],
    ["spots", "🎬 Spots"],
    ["social", "📱 Redes"],
  ];  const createCampaign = async () => {
    if (!product.trim() || !description.trim()) {
      setMessage(
        "Completa el producto y la descripción."
      );
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        "/api/generate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            product,
            description,
            voice: selectedVoice,
            format,
            duration,
            platform,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "No se pudo generar la campaña."
        );
      }

      setCampaign(data.campaign);

      setMessage(
        "Campaña generada correctamente."
      );
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

  const navigation = [
    ["campaign", "🤖 Campaña"],
    ["voices", "🎙️ Voces IA"],
    ["spots", "🎬 Spots"],
    ["social", "📱 Redes"],
  ];
    return (
    <main className="min-h-screen bg-[#050914] text-white">
      <header className="border-b border-white/10 bg-[#070b17] px-5 py-5">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <button
            onClick={() => setModule("campaign")}
            className="flex items-center gap-3"
          >
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-cyan-400 to-violet-500 font-black text-slate-950">
              JR
            </span>

            <div className="text-left">
              <b>JR Spot IA</b>

              <div className="text-xs text-slate-400">
                Publicidad inteligente
              </div>
            </div>
          </button>

          <nav className="hidden gap-2 md:flex">
            {navigation.map(([id, label]) => (
              <button
                key={id}
                onClick={() => setModule(id)}
                className={`rounded-xl px-4 py-2 text-sm ${
                  module === id
                    ? "bg-cyan-400 font-bold text-slate-950"
                    : "bg-white/5 text-slate-300"
                }`}
              >
                {label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-5 py-12">
        <div className="mb-10">
          <div className="mb-3 text-sm font-bold uppercase tracking-[.25em] text-cyan-300">
            IA PUBLICITARIA
          </div>

          <h1 className="text-4xl font-black md:text-6xl">
            Convierte tu idea en una{" "}
            <span className="bg-gradient-to-r from-cyan-300 to-violet-400 bg-clip-text text-transparent">
              campaña completa
            </span>
          </h1>

          <p className="mt-5 text-lg text-slate-400">
            Guiones, voces, spots y versiones para redes
            desde un solo lugar.
          </p>
        </div>

        {module === "campaign" && (
          <div className="grid gap-6 lg:grid-cols-[1.2fr_.8fr]">
            <div className="rounded-3xl border border-white/10 bg-[#0b1222] p-6 md:p-8">
              <h2 className="text-2xl font-bold">
                Nueva campaña
              </h2>

              <label className="mt-6 block text-sm text-slate-300">
                Producto o negocio
              </label>

              <input
                value={product}
                onChange={(e) =>
                  setProduct(e.target.value)
                }
                className="mt-2 w-full rounded-2xl border border-white/10 bg-[#080e1b] p-4"
                placeholder="Ej: Restaurante El Sabor"
              />

              <label className="mt-5 block text-sm text-slate-300">
                Describe tu campaña
              </label>

              <textarea
                value={description}
                onChange={(e) =>
                  setDescription(e.target.value)
                }
                rows={6}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-[#080e1b] p-4"
                placeholder="Producto, público, oferta, estilo..."
              />

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <select
                  value={format}
                  onChange={(e) =>
                    setFormat(e.target.value)
                  }
                  className="rounded-2xl border border-white/10 bg-[#080e1b] p-4"
                >
                  {formats.map((item) => (
                    <option
                      key={item.id}
                      value={item.id}
                    >
                      {item.id} — {item.name}
                    </option>
                  ))}
                </select>

                <select
                  value={duration}
                  onChange={(e) =>
                    setDuration(e.target.value)
                  }
                  className="rounded-2xl border border-white/10 bg-[#080e1b] p-4"
                >
                  <option value="15">
                    15 segundos
                  </option>

                  <option value="30">
                    30 segundos
                  </option>

                  <option value="45">
                    45 segundos
                  </option>

                  <option value="60">
                    60 segundos
                  </option>
                </select>
              </div>

              <button
                onClick={createCampaign}
                disabled={loading}
                className="mt-6 w-full rounded-2xl bg-gradient-to-r from-cyan-400 to-violet-500 px-6 py-4 font-black text-slate-950 disabled:opacity-50"
              >
                {loading
                  ? "🤖 Generando..."
                  : "🚀 Generar campaña con IA"}
              </button>

              {message && (
                <div className="mt-4 rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-4 text-cyan-200">
                  {message}
                </div>
              )}
            </div>

            <div className="rounded-3xl border border-white/10 bg-[#0b1222] p-6">
              <h2 className="text-xl font-bold">
                Resultado
              </h2>

              {!campaign ? (
                <div className="mt-6 rounded-2xl border border-dashed border-white/10 p-8 text-center text-slate-500">
                  Aquí aparecerán el guion,
                  escenas y CTA.
                </div>
              ) : (
                <div className="mt-5 space-y-4">
                  <div className="rounded-2xl bg-white/5 p-5">
                    <div className="text-xs uppercase text-cyan-300">
                      Guion
                    </div>

                    <p className="mt-2 leading-7">
                      {campaign.script}
                    </p>

                    <button
                      onClick={() =>
                        previewVoice(
                          campaign.script
                        )
                      }
                      className="mt-4 rounded-xl bg-white/10 px-4 py-2 font-bold"
                    >
                      🔊 Escuchar
                    </button>
                  </div>

                  <div className="rounded-2xl bg-white/5 p-5">
                    <div className="text-xs uppercase text-cyan-300">
                      CTA
                    </div>

                    <p className="mt-2 font-bold">
                      {campaign.cta}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-white/5 p-5">
                    <div className="text-xs uppercase text-cyan-300">
                      Escenas
                    </div>

                    {campaign.scenes.map(
                      (
                        scene: any,
                        index: number
                      ) => (
                        <div
                          key={index}
                          className="mt-3 rounded-xl bg-black/20 p-3"
                        >
                          <b>
                            Escena {index + 1}
                          </b>

                          <p className="text-sm text-slate-400">
                            {scene.visual}
                          </p>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
                {module === "voices" && (
          <div className="rounded-3xl border border-white/10 bg-[#0b1222] p-6 md:p-8">
            <h2 className="text-3xl font-black">
              🎙️ Voces IA
            </h2>

            <p className="mt-2 text-slate-400">
              Selecciona una voz y prueba una vista previa.
            </p>

            <div className="mt-7 grid gap-4 md:grid-cols-2">
              {voices.map((item) => (
                <button
                  key={item.id}
                  onClick={() =>
                    setVoice(item.id)
                  }
                  className={`rounded-2xl border p-5 text-left ${
                    voice === item.id
                      ? "border-cyan-400 bg-cyan-400/10"
                      : "border-white/10 bg-white/5"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <b className="text-xl">
                      {item.name}
                    </b>

                    <span className="text-2xl">
                      🎙️
                    </span>
                  </div>

                  <p className="mt-2 text-sm text-slate-400">
                    {item.gender} · {item.style}
                  </p>
                </button>
              ))}
            </div>

            <div className="mt-6 rounded-2xl bg-black/20 p-5">
              <label className="text-sm text-slate-400">
                Texto para probar la voz
              </label>

              <textarea
                id="voiceText"
                defaultValue={`¡Descubre ${product}! Una experiencia que tienes que vivir.`}
                rows={4}
                className="mt-2 w-full rounded-xl border border-white/10 bg-[#080e1b] p-4"
              />

              <button
                onClick={() => {
                  const element =
                    document.getElementById(
                      "voiceText"
                    ) as HTMLTextAreaElement;

                  previewVoice(element.value);
                }}
                className="mt-4 rounded-xl bg-cyan-400 px-5 py-3 font-bold text-slate-950"
              >
                ▶ Probar voz
              </button>

              {message && (
                <div className="mt-4 text-cyan-200">
                  {message}
                </div>
              )}
            </div>
          </div>
        )}
                {module === "spots" && (
          <div className="rounded-3xl border border-white/10 bg-[#0b1222] p-6 md:p-8">
            <h2 className="text-3xl font-black">
              🎬 Generador de Spots
            </h2>

            <p className="mt-2 text-slate-400">
              Elige el formato de tu anuncio.
            </p>

            <div className="mt-7 grid gap-4 md:grid-cols-3">
              {formats.map((item) => (
                <button
                  key={item.id}
                  onClick={() =>
                    setFormat(item.id)
                  }
                  className={`rounded-2xl border p-6 text-left ${
                    format === item.id
                      ? "border-cyan-400 bg-cyan-400/10"
                      : "border-white/10 bg-white/5"
                  }`}
                >
                  <div className="text-3xl">
                    🎬
                  </div>

                  <b className="mt-4 block text-xl">
                    {item.id}
                  </b>

                  <div className="mt-1 text-slate-300">
                    {item.name}
                  </div>

                  <p className="mt-2 text-sm text-slate-500">
                    {item.platforms}
                  </p>
                </button>
              ))}
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <select
                value={duration}
                onChange={(e) =>
                  setDuration(e.target.value)
                }
                className="rounded-2xl border border-white/10 bg-[#080e1b] p-4"
              >
                <option value="15">
                  15 segundos
                </option>

                <option value="30">
                  30 segundos
                </option>

                <option value="45">
                  45 segundos
                </option>

                <option value="60">
                  60 segundos
                </option>
              </select>

              <select
                value={voice}
                onChange={(e) =>
                  setVoice(e.target.value)
                }
                className="rounded-2xl border border-white/10 bg-[#080e1b] p-4"
              >
                {voices.map((item) => (
                  <option
                    key={item.id}
                    value={item.id}
                  >
                    Voz: {item.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={createCampaign}
              disabled={loading}
              className="mt-7 rounded-2xl bg-gradient-to-r from-cyan-400 to-violet-500 px-6 py-4 font-black text-slate-950 disabled:opacity-50"
            >
              {loading
                ? "🤖 Generando spot..."
                : "🚀 Crear estructura del spot"}
            </button>

            {message && (
              <div className="mt-4 rounded-2xl bg-white/5 p-4 text-cyan-200">
                {message}
              </div>
            )}
          </div>
        )}
                {module === "social" && (
          <div className="rounded-3xl border border-white/10 bg-[#0b1222] p-6 md:p-8">
            <h2 className="text-3xl font-black">
              📱 Redes sociales
            </h2>

            <p className="mt-2 text-slate-400">
              Genera una versión adaptada a cada plataforma.
            </p>

            <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                "TikTok",
                "Instagram Reels",
                "Facebook",
                "YouTube Shorts",
                "YouTube",
                "Instagram",
              ].map((item) => (
                <button
                  key={item}
                  onClick={() =>
                    setPlatform(item)
                  }
                  className={`rounded-2xl border p-5 text-left ${
                    platform === item
                      ? "border-cyan-400 bg-cyan-400/10"
                      : "border-white/10 bg-white/5"
                  }`}
                >
                  <div className="text-2xl">
                    📱
                  </div>

                  <b className="mt-3 block">
                    {item}
                  </b>

                  <span className="text-sm text-slate-500">
                    Versión optimizada
                  </span>
                </button>
              ))}
            </div>

            <button
              onClick={createCampaign}
              disabled={loading}
              className="mt-7 rounded-2xl bg-gradient-to-r from-cyan-400 to-violet-500 px-6 py-4 font-black text-slate-950 disabled:opacity-50"
            >
              {loading
                ? "🤖 Generando..."
                : `📱 Generar versión para ${platform}`}
            </button>

            {message && (
              <div className="mt-4 rounded-2xl bg-white/5 p-4 text-cyan-200">
                {message}
              </div>
            )}
          </div>
        )}
                <div className="mt-10 grid gap-5 md:grid-cols-3">
          <button
            onClick={() => setModule("voices")}
            className="rounded-3xl border border-white/10 bg-[#0b1222] p-7 text-left hover:border-cyan-400/50"
          >
            <div className="text-4xl">🎙️</div>

            <h3 className="mt-5 text-2xl font-bold">
              Voces IA
            </h3>

            <p className="mt-2 text-slate-400">
              Voces y vista previa de audio.
            </p>
          </button>

          <button
            onClick={() => setModule("spots")}
            className="rounded-3xl border border-white/10 bg-[#0b1222] p-7 text-left hover:border-cyan-400/50"
          >
            <div className="text-4xl">🎬</div>

            <h3 className="mt-5 text-2xl font-bold">
              Spots
            </h3>

            <p className="mt-2 text-slate-400">
              Formatos 9:16, 16:9 y 1:1.
            </p>
          </button>

          <button
            onClick={() => setModule("social")}
            className="rounded-3xl border border-white/10 bg-[#0b1222] p-7 text-left hover:border-cyan-400/50"
          >
            <div className="text-4xl">📱</div>

            <h3 className="mt-5 text-2xl font-bold">
              Redes sociales
            </h3>

            <p className="mt-2 text-slate-400">
              Versiones para cada plataforma.
            </p>
          </button>
        </div>
      </section>
    </main>
  );
}
