const express = require("express");
const router = express.Router();
const miembrosController = require("../controllers/miembrosController");

// Definir las rutas para el objeto miembros

router.get("/", miembrosController.getMiembros); // Obtener todos los miembros

router.get("/:id", miembrosController.getMiembroById); // Obtener un miembro por su ID
router.post("/", miembrosController.createMiembro); // Crear un nuevo miembro
router.put("/:id", miembrosController.updateMiembro); // Actualizar un miembro por su ID
router.delete("/:id", miembrosController.deleteMiembro); // Eliminar un miembro por su ID

module.exports = router;
