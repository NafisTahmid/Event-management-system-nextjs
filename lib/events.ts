import fs from "fs";
import path from "path";
import { Event } from "@/utils/events";

const dataPath = path.join(process.cwd(), "data", "events.json");

export function readEvents() {
  const data = fs.readFileSync(dataPath, "utf-8");
  return JSON.parse(data);
}

export function writeEvents(events: Event[]) {
  fs.writeFileSync(dataPath, JSON.stringify(events, null, 2));
}
