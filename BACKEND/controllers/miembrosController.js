const Miembros = require("../models/miembros"); // Importa el modelo Miembros
const mongoose = require("mongoose");



const miembrosController = {
    getMiembros: async (req, res) => {
      try {
        const miembros = await Miembros.find();
        res.status(200).json(miembros);
      } catch (error) {
        res.status(500).json({ error: "Error al obtener los miembros" });
      }
    },
  
    getMiembroById: async (req, res) => {
      const id = req.params.id;
      try {
        const miembro = await Miembros.findById(id);
        res.status(200).json(miembro);
      } catch (error) {
        res.status(500).json({ error: "Error al obtener el miembro" });
      }
    },
  
    createMiembro: async (req, res) => {
      const { nombre_completo, estado, telefono, direccion } = req.body;
      const nuevoMiembro = new Miembros({
        nombre_completo,
        estado,
        telefono,
        direccion,
      });
      try {
        const miembroGuardado = await nuevoMiembro.save();
        res.status(201).json({message: "Miembro creado de manera exitosa", miembro:miembroGuardado});
      } catch (error) {
        res.status(500).json({ error: "Error al crear el miembro" });
      }
    },
  
    updateMiembro: async (req, res) => {
      const id = req.params.id;
      const { nombre_completo, estado, telefono, direccion } = req.body;
      try {
        const miembroActualizado = await Miembros.findByIdAndUpdate(id, {
          nombre_completo,
          estado,
          telefono,
          direccion,
        });
        res.status(200).json(miembroActualizado);
      } catch (error) {
        res.status(500).json({ error: "Error al actualizar el miembro" });
      }
    },
  
    deleteMiembro: async (req, res) => {
      const id = req.params.id;
      try {
        await Miembros.findByIdAndDelete(id);
        res.status(200).json({ message: "Miembro eliminado correctamente" });
      } catch (error) {
        res.status(500).json({ error: "Error al eliminar el miembro" });
      }
    },
  };
  
module.exports = miembrosController;