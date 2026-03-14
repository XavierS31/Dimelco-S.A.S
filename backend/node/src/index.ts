import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { auth } from "express-oauth2-jwt-bearer";

const app = express();
const PORT = Number(process.env.PORT) || 5000;

const checkJwt = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}`,
});

app.use(cors({ origin: process.env.FRONTEND_URL || "http://localhost:5173" }));
app.use(express.json());

app.get("/health", (_req: Request, res: Response) => {
  res.json({ status: "ok", service: "dimelco-auth" });
});

app.get("/protected", checkJwt, (req: Request, res: Response) => {
  const auth = req.auth as { payload?: { sub?: string; email?: string } } | undefined;
  res.json({
    message: "Authenticated",
    user: auth?.payload?.sub,
    email: auth?.payload?.email,
  });
});

app.use((err: Error & { name?: string }, _req: Request, res: Response, _next: NextFunction) => {
  if (err.name === "UnauthorizedError") {
    return res.status(401).json({ error: "Invalid or missing token" });
  }
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`Auth server running on http://localhost:${PORT}`);
});
