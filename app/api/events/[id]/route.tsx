import { NextRequest, NextResponse } from "next/server";
import { readEvents, writeEvents } from "@/lib/events";
import { Event } from "@/utils/events";
import path from "path";
import fs from "fs";

export async function PUT(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const { params } = context; // 👈 get params inside the function
  const updated = await req.json();
  const events = readEvents();
  const index = events.findIndex((e: Event) => e.id === params.id);

  if (index === -1) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  events[index] = updated;
  writeEvents(events);

  return NextResponse.json({ message: "Updated!" });
}

export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  const events = readEvents();
  const filtered = events.filter((e: Event) => e.id !== params.id);
  writeEvents(filtered);
  return NextResponse.json({ message: "Deleted!" });
}

const filePath = path.join(process.cwd(), "data", "events.json");
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    const events: Event[] = JSON.parse(data);
    const event = events.find((e) => e.id === params.id);

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    return NextResponse.json(event);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to read events" },
      { status: 500 }
    );
  }
}
