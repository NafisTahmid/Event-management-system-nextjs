import { NextRequest, NextResponse } from "next/server";
import { readEvents, writeEvents } from "@/lib/events";
import { Event } from "@/utils/events";

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
