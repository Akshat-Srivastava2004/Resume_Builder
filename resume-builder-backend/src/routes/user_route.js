import { Router } from "express";
import { Userregister,loginuser } from "../controllers/register_controller.js";

const router=Router()

router.route("/Userregister").post(Userregister);
router.route("/loginuser").post(loginuser);

export default router