// app/api/markdown/route.ts

import { NextResponse } from "next/server";

const BASE_URL = "https://jsonplaceholder.typicode.com/posts";

// Handle GET - load markdown content
export async function GET() {
  try {
    const res = await fetch(BASE_URL);
    const data = await res.json();
    return NextResponse.json(data.slice(0, 5)); // return only first 5 for demo
  } catch (error) {
    return NextResponse.json({ error: "Failed to load markdown content" }, { status: 500 });
  }
}

// Handle POST - save markdown content
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: body.title,
        body: body.content,
        userId: 1,
      }),
    });

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to save markdown content" }, { status: 500 });
  }
}
