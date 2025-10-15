import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    // Send the user's message to an AI model (OpenAI-compatible endpoint)
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, // put your key in .env.local
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message }],
      }),
    });

    const data = await response.json();
    const aiText =
      data.choices?.[0]?.message?.content ||
      "Sorry, I couldn't generate a reply right now.";

    return NextResponse.json({ reply: aiText });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ reply: "An error occurred while connecting to AI." });
  }
}
