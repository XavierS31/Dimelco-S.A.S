import { resolve } from 'node:path';
import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { authHandler, hasAuthProvider } from './auth.js';
import { errorHandler, notFound } from './lib/http.js';
import { authLimiter, generalApiLimiter } from './middleware/rateLimiter.js';
import { adminRouter } from './routes/admin.js';
import { employeeRouter } from './routes/employee.js';
import { publicJobsRouter } from './routes/publicJobs.js';

dotenv.config();
// Transitional fallback while the previous backend environment is moved to backend/node/.env.
dotenv.config({ path: resolve(process.cwd(), '..', '.env') });

export const app = express();
const port = Number(process.env.PORT || 4000);
const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';

app.set('trust proxy', 1);
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(cors({ origin: frontendUrl, credentials: true }));
app.use(express.json({ limit: '250kb' }));

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'dimelco-platform', authProviderConfigured: hasAuthProvider() });
});

app.use('/api/auth', authLimiter, authHandler);
app.use('/api', generalApiLimiter);
app.use('/api/jobs', publicJobsRouter);
app.use('/api/employee', employeeRouter);
app.use('/api/admin', adminRouter);

app.use(notFound);
app.use(errorHandler);

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`DIMELCO platform API running on http://localhost:${port}`);
  });
}
