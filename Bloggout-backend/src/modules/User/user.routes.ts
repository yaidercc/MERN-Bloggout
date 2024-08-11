import { Router } from "express"
import { check } from "express-validator"
import userControllers from "./user.controllers"
import validateFields from "../../middlewares/validateFields";
const router = Router();

router.post("/createUser",[
    check("names","Los nombres son incorrectos")
    .trim()
    .escape()
    .not().isEmpty()
    .withMessage("Los nombres no pueden estar vacios"),
    check("last_names","Los apellidos son incorrectos")
    .trim()
    .escape()
    .not().isEmpty()
    .withMessage("Los apellidos no pueden estar vacios"),
    check("username","El nombre de usuario es incorrecto")
    .trim()
    .escape()
    .not().isEmpty()
    .withMessage("El nombre de usuario no puede estar vacio"),
    check("email","El correo es incorrecto")
    .isEmail()
    .normalizeEmail(),
    check("password","La clave es incorrecta")
    .isLength({min: 8})
    .withMessage("La clave debe tener como minimo 8 caracteres")
    .matches("[0-9]").withMessage("La clave debe tener por lo menos un numero")
    .matches("[A-Z]").withMessage("La clave debe tener por lo menos una mayuscula"),
    validateFields
],userControllers.createUser )


export default router