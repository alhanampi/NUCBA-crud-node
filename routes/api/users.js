const express = require("express");
const router = express.Router();
const uuid = require("uuid");

const users = require("../../database/Users");

//get all
router.get("/", (req, res) => res.json(users));

//get one
router.get("/:id", (req, res) => {
  const isUser = users.some((user) => user.id === req.params.id);

  if (isUser) {
    res.json(users.filter((user) => user.id === req.params.id));
  } else {
    res.status(404).json({ message: "User doesn't exist" });
  }
});

//post: crear un usuario
router.post("/", (req, res) => {
  const addUser = { id: uuid.v4(), ...req.body };

  if (!addUser.name || !addUser.email || !addUser.status) {
    return res.status(400).json({ message: "Faltan campos" });
  } else {
    users.push(addUser);
    res.json(users);
  }
});

//put: modificar un usuario
router.put("/:id", (req, res) => {
  const itExists = users.some((user) => user.id === req.params.id);
  if (itExists) {
    const updateUser = req.body;

    users.forEach((user) => {
      if (user.id === req.params.id) {
        user.name = updateUser.name ? updateUser.name : user.name;
        user.email = updateUser.email ? updateUser.email : user.email;
        user.status = updateUser.status ? updateUser.status : user.status;

        res
          .status(200)
          .json({ message: `El usuario ${user.id} fue modificado con éxito.` });
      }
    });
  } else {
    res.status(404).json({ message: "El usuario no existe" });
  }
});

router.delete("/:id", (req, res) => {
  const itExists = users.some((user) => user.id === req.params.id);
  
  if (itExists) {
    res.status(200).json({
      message: `El usuario fue eliminado con éxito.`,
      users: users.filter((user) => user.id !== req.params.id),
    });
  } else {
    res.status(404).json({ message: "El usuario no existe" });
  }
});

module.exports = router;
