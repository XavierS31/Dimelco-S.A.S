import { resolve } from 'node:path';
import dotenv from 'dotenv';

dotenv.config();
// Transitional fallback while secrets are moved from the deprecated backend folder.
dotenv.config({ path: resolve(process.cwd(), '..', '.env') });
