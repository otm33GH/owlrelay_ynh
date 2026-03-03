import { serve } from '@hono/node-server';
import { parseConfig } from './modules/config/config';
import { setupDatabase } from './modules/app/database/database';
import { createServer } from './modules/app/server';

const { config } = parseConfig({ env: process.env as Record<string, string> });
const { db } = setupDatabase(config.database);

const { app } = createServer({ config, db });
const port = Number(process.env.PORT ?? 1222);

serve({ fetch: app.fetch, port });

console.log(`Server running on port ${port}`);
