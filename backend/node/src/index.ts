import './env.js';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { authHandler, hasAuthProvider } from './auth.js';
import { errorHandler, HttpError, notFound } from './lib/http.js';
import { authLimiter, generalApiLimiter } from './middleware/rateLimiter.js';
import { adminRouter } from './routes/admin.js';
import { chatRouter } from './routes/chat.js';
import { contactRouter } from './routes/contact.js';
import { employeeRouter } from './routes/employee.js';
import { publicJobsRouter } from './routes/publicJobs.js';

export const app = express();
const port = Number(process.env.PORT || 4000);
const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
const isLocalDevelopmentOrigin = (origin: string) => /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin);

app.set('trust proxy', 1);
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || origin === frontendUrl || (process.env.NODE_ENV !== 'production' && isLocalDevelopmentOrigin(origin))) {
      callback(null, true);
      return;
    }
    callback(new HttpError(403, 'Origin is not allowed'));
  },
  credentials: true,
}));
app.use(express.json({ limit: '250kb' }));

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'dimelco-platform', authProviderConfigured: hasAuthProvider() });
});

app.use('/api/auth', authLimiter, authHandler);
app.use('/api', generalApiLimiter);
app.use('/api/chat', chatRouter);
app.use('/api/jobs', publicJobsRouter);
app.use('/api/contact', contactRouter);
app.use('/api/employee', employeeRouter);
app.use('/api/admin', adminRouter);

app.use(notFound);
app.use(errorHandler);

// Lambda imports this module through handler.ts. Do not open a local TCP listener
// in that runtime; API Gateway invokes the exported handler instead.
if (process.env.NODE_ENV !== 'test' && !process.env.AWS_LAMBDA_FUNCTION_NAME) {
  app.listen(port, () => {
    console.log(`DIMELCO platform API running on http://localhost:${port}`);
  });
}
