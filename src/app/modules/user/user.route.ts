import express from "express";
import { UserControllers } from "./user.controller";
const router = express.Router();

router.post("/", UserControllers.createUser);
router.get("/", UserControllers.getAllUser);
router.get("/:userId", UserControllers.getSingleUser);
router.put("/:userId", UserControllers.updateUser);
router.delete("/:userId", UserControllers.deleteUser);
router.put("/:userId/orders", UserControllers.orderAddOfUser);
router.get("/:userId/orders", UserControllers.getOrdersByUserId);
router.get("/:userId/orders/total-price", UserControllers.getSumOfUserOrders);

export const UserRoutes = router;
