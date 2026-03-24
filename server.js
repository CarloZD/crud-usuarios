const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("public"));

// Simulación de BD
let usuarios = [];
let id = 1;

// LISTAR
app.get("/usuarios", (req, res) => {
  res.json(usuarios);
});

// CREAR
app.post("/usuarios", (req, res) => {
  const usuario = { id: id++, ...req.body };
  usuarios.push(usuario);
  res.json(usuario);
});

// ACTUALIZAR
app.put("/usuarios/:id", (req, res) => {
  const uid = parseInt(req.params.id);
  usuarios = usuarios.map(u =>
    u.id === uid ? { ...u, ...req.body } : u
  );
  res.json({ mensaje: "Actualizado" });
});

// ELIMINAR
app.delete("/usuarios/:id", (req, res) => {
  const uid = parseInt(req.params.id);
  usuarios = usuarios.filter(u => u.id !== uid);
  res.json({ mensaje: "Eliminado" });
});

app.listen(PORT, () => {
  console.log("Servidor corriendo en puerto " + PORT);
});