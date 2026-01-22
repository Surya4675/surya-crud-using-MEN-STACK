import express from "express";
import {
  renderAll,
  fetch,
  showCreateForm,
  create,
  showEditForm,
  update,
  deleteUser
} from "../controllers/userController.js";

const router = express.Router();

// pages
router.get("/", renderAll);
router.get("/create", showCreateForm);
router.get("/edit/:id", showEditForm);

// api
router.get("/getallusers", fetch);
router.post("/create", create);
router.put("/update/:id", update);
router.delete("/delete/:id", deleteUser);

export default router;
