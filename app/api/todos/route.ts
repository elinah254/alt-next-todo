import { NextResponse } from "next/server";

const BASE_URL = "https://jsonplaceholder.typicode.com/todos";

// GET – fetch todos
export async function GET() {
  try {
    const res = await fetch(BASE_URL + "?_limit=5"); // limit to 5 for demo
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to load todos" }, { status: 500 });
  }
}

// POST – create new todo
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to save todo" }, { status: 500 });
  }
}
