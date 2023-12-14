import express from "express";
import { UserControllers } from "./user.controller";
import validateRequestZod from "../../middlewares/validateRequestZod";
import { userValidation } from "./user.zod.validation";
const router = express.Router();

router.post(
  "/",
  validateRequestZod(userValidation.userCreateZodSchema),
  UserControllers.createUser
);
router.get("/", UserControllers.getAllUser);
router.get("/:userId", UserControllers.getSingleUser);
router.put(
  "/:userId",
  validateRequestZod(userValidation.userUpdateZodSchema),
  UserControllers.updateUser
);
router.delete("/:userId", UserControllers.deleteUser);
router.put(
  "/:userId/orders",
  validateRequestZod(userValidation.orderZodSchema),
  UserControllers.orderAddOfUser
);
router.get("/:userId/orders", UserControllers.getOrdersByUserId);
router.get("/:userId/orders/total-price", UserControllers.getSumOfUserOrders);

export const UserRoutes = router;
