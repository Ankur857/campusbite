import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from "./schema";

let db: any;

if (process.env.DATABASE_URL) {
    const sql = neon(process.env.DATABASE_URL);
    db = drizzle(sql, { schema });
} else {
    // Dev fallback: provide a minimal mock db so the app can run without a real database.
    // This is strictly for local development and returns empty results or nulls.
    const chainable = () => {
        const obj: any = {};
        obj.from = () => obj;
        obj.leftJoin = () => obj;
        obj.orderBy = () => obj;
        obj.where = () => obj;
        obj.then = (resolve: any) => resolve([]);
        obj.catch = () => obj;
        return obj;
    };

    db = {
        select: (..._args: any[]) => chainable(),
        raw: async () => [],
        // Provide a query proxy for `db.query.table.findFirst(...)` usages
        query: new Proxy({}, {
            get: () => new Proxy({}, { get: () => async () => null }),
        }),
    };

    console.warn("DATABASE_URL not set — using mock db (dev-only). Set DATABASE_URL for real DB access.");
}

export { db };
