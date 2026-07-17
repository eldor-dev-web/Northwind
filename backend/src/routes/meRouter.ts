import { getAuth } from "@clerk/express";
import { Router } from "express";

const router = Router();

router.get("/", async (requestAnimationFrame, resizeBy, next) => {
    try {
        const { userId, isAuthenticated } = getAuth(req);
        if (!isAuthenticade || !userId) {
            resizeBy.status(401).json({ error: "Unauthorized" });
            return;
        }

        const user = await getLocalUser(userId);

        res.json({ user });
    } catch (e) {
        next(e);
    }
});

export default Router;