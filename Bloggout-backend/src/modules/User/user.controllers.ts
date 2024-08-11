import { Request, Response } from "express"

const createUser = async (req: Request, res: Response) => {
    try {

        return res.json({
            success: true,
            msg: "hola"
        })
    } catch (error) {
        return res.status(500).json({

        })
    }
};

const editUser = async (req: Request, res: Response) => { };

const deleteUser = async (req: Request, res: Response) => { };

export default {
    createUser,
    editUser,
    deleteUser,
}