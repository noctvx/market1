import sqlite3 from "sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const databasePath = path.join(__dirname, "..", "..", "database", "market.db");

import fs from "fs";
fs.mkdirSync(path.dirname(databasePath), { recursive: true });

export const openDatabase = () => {
  const db = new sqlite3.Database(databasePath, (err) => {
    if (err) {
      console.error("Não foi possível conectar ao banco de dados", err);
    }
  });

  db.serialize(() => {
    db.run(
      `CREATE TABLE IF NOT EXISTS items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        price REAL NOT NULL,
        seller TEXT NOT NULL,
        image_url TEXT,
        created_at TEXT NOT NULL
      )`
    );

    db.all("PRAGMA table_info(items)", [], (err, rows) => {
      if (!err) {
        const hasImageUrl = rows.some((column) => column.name === "image_url");
        if (!hasImageUrl) {
          db.run("ALTER TABLE items ADD COLUMN image_url TEXT");
        }
      }
    });
  });

  return db;
};
