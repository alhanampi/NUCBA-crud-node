const express = require('express')
const router = express.Router()
const uuid = require("uuid")

const burgers = require('../../database/Burgers')

//get all
router.get("/", (req, res) => res.json(burgers));

//get one
router.get("/:id", (req, res) => {
  const isBurger = burgers.some((burger) => burger.id === req.params.id);

  if (isBurger) {
    res.json(burgers.filter((burger) => burger.id === req.params.id));
  } else {
    res.status(404).json({ message: "Burger doesn't exist" });
  }
});

//post: crear un usuario
router.post("/", (req, res) => {
  const addBurger = { id: uuid.v4(), ...req.body };

  if (!addBurger.name || !addBurger.ingredients) {
    return res.status(400).json({ message: "Faltan campos" });
  } else {
    burgers.push(addBurger);
    res.json(burgers);
  }
});

//put: modificar un usuario
router.put("/:id", (req, res) => {
  const itExists = burgers.some((burger) => burger.id === req.params.id);
  if (itExists) {
    const updateBurger = req.body;

    burgers.forEach((burger) => {
      if (burger.id === req.params.id) {
        burger.name = updateBurger.name ? updateBurger.name : burger.name;
        burger.ingredients = updateBurger.ingredients ? updateBurger.ingredients : burger.ingredients;

        res
          .status(200)
          .json({ message: `El usuario ${burger.id} fue modificado con éxito.` });
      }
    });
  } else {
    res.status(404).json({ message: "El usuario no existe" });
  }
});

router.delete("/:id", (req, res) => {
  const itExists = burgers.some((burger) => burger.id === req.params.id);
  
  if (itExists) {
    res.status(200).json({
      message: `El usuario fue eliminado con éxito.`,
      burgers: burgers.filter((burger) => burger.id !== req.params.id),
    });
  } else {
    res.status(404).json({ message: "El usuario no existe" });
  }
});

module.exports = router;