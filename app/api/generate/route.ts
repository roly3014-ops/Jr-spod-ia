import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const product = String(body.product || "").trim();
    const description = String(body.description || "").trim();
    const format = String(body.format || "9:16");
    const duration = String(body.duration || "30");
    const platform = String(
      body.platform || "Instagram Reels"
    );

    if (!product || !description) {
      return NextResponse.json(
        {
          message:
            "Producto y descripción son obligatorios.",
        },
        { status: 400 }
      );
    }

    const campaign = {
      title: `Campaña para ${product}`,

      format,

      duration: `${duration} segundos`,

      platform,

      script:
        `¡Descubre ${product}! ` +
        `${description} ` +
        `Una experiencia pensada para ti. ` +
        `Ven, disfruta y comparte. ` +
        `¡Te esperamos!`,

      cta:
        `Visita ${product} hoy y descubre ` +
        `tu próxima experiencia.`,

      scenes: [
        {
          visual:
            `Apertura impactante mostrando ` +
            `${product} y el ambiente.`,
        },

        {
          visual:
            "Presentación del producto y sus principales beneficios.",
        },

        {
          visual:
            "Planos atractivos del producto, clientes y experiencia.",
        },

        {
          visual:
            "Cierre con llamada a la acción, marca y contacto.",
        },
      ],
    };

    return NextResponse.json({
      ok: true,
      message:
        "Campaña generada correctamente.",
      campaign,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message:
          "Error interno al generar la campaña.",
      },
      { status: 500 }
    );
  }
}
