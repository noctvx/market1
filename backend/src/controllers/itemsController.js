import { openDatabase } from "../utils/database.js";

const db = openDatabase();

export const getAllItems = (req, res) => {
  db.all("SELECT * FROM items ORDER BY created_at DESC", [], (err, rows) => {
    if (err) return res.status(500).json({ error: "Falha ao recuperar itens" });
    res.json(rows);
  });
};

export const getItemById = (req, res) => {
  const { id } = req.params;
  db.get("SELECT * FROM items WHERE id = ?", [id], (err, row) => {
    if (err) return res.status(500).json({ error: "Falha ao recuperar o item" });
    if (!row) return res.status(404).json({ error: "Item não encontrado" });
    res.json(row);
  });
};

export const createItem = (req, res) => {
  const { title, description, price, seller, image_url } = req.body;
  const imageUrl = image_url || (req.file ? `/uploads/${req.file.filename}` : null);

  if (!title || !price || !seller) {
    return res.status(400).json({ error: "Título, preço e vendedor são obrigatórios" });
  }

  const createdAt = new Date().toISOString();
  db.run(
    "INSERT INTO items (title, description, price, seller, image_url, created_at) VALUES (?, ?, ?, ?, ?, ?)",
    [title, description || "", price, seller, imageUrl, createdAt],
    function (err) {
      if (err) return res.status(500).json({ error: "Falha ao criar item" });
      db.get("SELECT * FROM items WHERE id = ?", [this.lastID], (err2, row) => {
        if (err2) return res.status(500).json({ error: "Falha ao recuperar item criado" });
        res.status(201).json(row);
      });
    }
  );
};

export const updateItem = (req, res) => {
  const { id } = req.params;
  const { title, description, price, seller, image_url } = req.body;
  const imageUrl = image_url || (req.file ? `/uploads/${req.file.filename}` : null);

  db.run(
    "UPDATE items SET title = ?, description = ?, price = ?, seller = ?, image_url = ? WHERE id = ?",
    [title, description || "", price, seller, imageUrl, id],
    function (err) {
      if (err) return res.status(500).json({ error: "Falha ao atualizar item" });
      if (this.changes === 0) return res.status(404).json({ error: "Item não encontrado" });
      db.get("SELECT * FROM items WHERE id = ?", [id], (err2, row) => {
        if (err2) return res.status(500).json({ error: "Falha ao recuperar item atualizado" });
        res.json(row);
      });
    }
  );
};

export const deleteItem = (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM items WHERE id = ?", [id], function (err) {
    if (err) return res.status(500).json({ error: "Falha ao excluir item" });
    if (this.changes === 0) return res.status(404).json({ error: "Item não encontrado" });
    res.status(204).send();
  });
};
