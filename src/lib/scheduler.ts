import cron from "node-cron";
import Task from "@/models/Task";
import {User} from "@/models/User";
import client from "./db";
import { sendMail } from "./mail";


export function startScheduler() {
 
  cron.schedule("* * * * *", async () => {
    try {
      await client.connect();
         const db = client.db("timora");
      const now = new Date();
      const currentDate = now.toISOString().split("T")[0]; 
      const currentTime = now.toTimeString().slice(0, 5);

      const tasks = await Task.find({
        date: currentDate,
        status: "pending",
      }).populate("userId");

      for (const task of tasks) {
        const user: any = task.userId;

        if (task.startTime === currentTime) {
          await sendMail(
            user.email,
            " Task Started - Timora",
            `<h3>${task.title}</h3><p>Your task has started. Stay focused!</p>`
          );
        }

        if (task.endTime === currentTime) {
          await sendMail(
            user.email,
            " Task Time Over - Timora",
            `<h3>${task.title}</h3><p>Did you complete this task? Please update your status.</p>`
          );
        }
      }
    } catch (error) {
      console.error("Scheduler error:", error);
    }
  });
}

