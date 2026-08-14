import serverless from 'serverless-http';
import { app } from './index.js';

// API Gateway HTTP API (payload format 2.0) invokes this function in AWS Lambda.
// The same Express app remains available through `npm run dev` for local work.
export const handler = serverless(app);
