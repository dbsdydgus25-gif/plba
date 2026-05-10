import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: NextRequest) {
  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY || "dummy",
    });

    const { prompt, size = "1024x1024", quality = "standard", n = 1 } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: "prompt is required" }, { status: 400 });
    }

    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt,
      size,
      quality,
      n,
    });

    return NextResponse.json({ images: response.data });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Image generation failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
