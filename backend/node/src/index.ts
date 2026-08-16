import './env.js';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import serverless from 'serverless-http';
import { authHandler, hasAuthProvider } from './auth.js';
import { errorHandler, HttpError, notFound } from './lib/http.js';
import { corsOptions } from './middleware/cors.js';
import { authLimiter, generalApiLimiter } from './middleware/rateLimiter.js';
import { adminRouter } from './routes/admin.js';
import { chatRouter } from './routes/chat.js';
import { contactRouter } from './routes/contact.js';
import { employeeRouter } from './routes/employee.js';
import { publicJobsRouter } from './routes/publicJobs.js';

export const app = express();
app.set('trust proxy', true);
const port = Number(process.env.PORT) || 4000;

app.use(
  helmet({
    crossOriginResourcePolicy: false,
    contentSecurityPolicy: {
      directives: {
        imgSrc: ["'self'", 'data:', 'https://authjs.dev', 'https://*.googleusercontent.com', 'https://www.gstatic.com'],
      },
    },
  }),
);
app.use(cors(corsOptions));
// Explicitly answer API Gateway/browser CORS preflight requests before routes.
app.options('*', cors(corsOptions));
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

// API Gateway HTTP API invokes this export in AWS Lambda. The Express app remains
// usable locally through the listener below.
export const handler = serverless(app);

// Local development uses the normal Express listener. In Lambda, API Gateway
// invokes the exported handler instead.
if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => {
    console.log(`DIMELCO platform API running on http://localhost:${port}`);
  });
}
