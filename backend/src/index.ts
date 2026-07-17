import "dotenv/config";
import express from "express";
import cors from "cors";

import fs from "node:fs";
import path from "node:path";

import { clerkMiddleware } from "@clerk/express";
import { clerkWebhookHandler } from "./webhooks/clerk";
import { getEnv } from "./lib/env";
import keepAliveCron from "./lib/cron";

const env = getEnv();
const app = express();

const rawJson = express.raw({ type: "application/json", limit: "1mb" });

app.post("/webhooks/clerk", rawJson, (req, res) => {
    void clerkWebhookHandler(req, res);
});

app.use(express.json());
app.use(cors());
app.use(clerkMiddleware());

app.get("/health", (_req, res) => { // Bu yerda "healtb"ni "health" qilib to'g'riladim
    res.json({ ok: true });
});

const publicDir = path.join(process.cwd(), "public");

if (fs.existsSync(publicDir)) {
    app.use(express.static(publicDir));

    app.use((req, res, next) => {
        if (req.method !== "GET" && req.method !== "HEAD") {
            return next();
        }

        if (req.path.startsWith("/api") || req.path.startsWith("/webhooks")) {
            return next();
        }

        res.sendFile(path.join(publicDir, "index.html"), (err) => {
            if (err) next(err);
        });
    });
}

// CRON ni server ishga tushguncha start qilamiz
if (env.NODE_ENV === "production") {
    keepAliveCron.start();
}

app.listen(env.PORT, () => console.log("Listening on port:", env.PORT));