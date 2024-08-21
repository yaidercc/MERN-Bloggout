import { NextFunction, Request, Response } from "express"
import bcrypt from "bcryptjs";
import passport from "passport";
import userServices from "./user.services";
import generateJWT from "../../helpers/generateJWT";
import "../../config/passportConfig";
import { User } from "../../helpers/interfaces";

export class UserController {
    public createUser = async (req: Request, res: Response) => {
        try {
            const { password, ...user } = req.body;

            const salt = bcrypt.genSaltSync();
            const encPassword = bcrypt.hashSync(password, salt);

            await userServices.createUser({ ...user, password: encPassword })

            return res.json({
                success: true,
                msg: "Usuario creado con exito."
            })
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
                return res.status(500).json({
                    success: false,
                    error: error.message
                });
            } else {
                return res.status(500).json({
                    success: false,
                    error: 'Hubo un error en el servidor'
                });
            }
        }
    };

    public editUser = async (req: Request, res: Response) => {

    };

    public deleteUser = async (req: Request, res: Response) => { };

    public loginUser = async (req: Request, res: Response, next: NextFunction) => {
        passport.authenticate("local", async (err: Error, user: User | false, info: { msg: string }) => {
            if (err) return next(err);
            if (!user) return res.status(400).json({ message: info.msg });

            req.logIn(user as User, { session: false }, async (err: Error) => {
                if (err) return next(err);

                const token = await generateJWT(user._id);
                const { names, last_names, username } = user
                res.json({ user: { names, last_names, username }, token });
        });
    })(req, res, next);
    };

}


