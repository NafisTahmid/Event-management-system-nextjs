import { NextResponse } from "next/server";
import { readEvents, writeEvents } from "@/lib/events";

export async function GET() {
  const events = readEvents();
  return NextResponse.json(events);
}

export async function POST(req: Request) {
  const newEvent = await req.json();
  const events = readEvents();
  events.push(newEvent);
  writeEvents(events);
  return NextResponse.json({ message: "Event added!" });
}
