import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const product = body.product || "";
    const description = body.description || "";

    if (!product || !description) {
      return NextResponse.json(
        {
          message: "Completa el producto y la descripción de la campaña.",
        },
        { status: 400 }
      );
    }

    const campaign = {
      product,
      description,
      ads: [
        {
          format: "Video vertical",
          duration: "30 segundos",
          platform: "TikTok / Reels / Shorts",
        },
        {
          format: "Video horizontal",
          duration: "30 segundos",
          platform: "YouTube / Facebook",
        },
        {
          format: "Historia",
          duration: "15 segundos",
          platform: "Instagram / Facebook",
        },
      ],
    };

    return NextResponse.json({
      success: true,
      message: "Campaña creada correctamente.",
      campaign,
    });
  } catch {
    return NextResponse.json(
      {
        message: "Error al crear la campaña.",
      },
      { status: 500 }
    );
  }
}
