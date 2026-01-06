import { startScheduler } from "@/lib/scheduler";

startScheduler();

export async function GET() {
  return new Response(JSON.stringify({ message: "Scheduler running" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
