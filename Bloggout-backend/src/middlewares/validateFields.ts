import { NextFunction, Response, Request } from "express";
import {  validationResult } from "express-validator"

interface CustomErrors {
    type: string,
    value: string,
    msg: string,
    path: string,
    location: string,
}

const formatErrors = (errors: CustomErrors[]) => {
    return errors.reduce((acc, error) => {
        const field = error.path;
        if (!acc[field]) {
            acc[field] = [];
        }
        acc[field].push(error.msg)
        return acc;
    }, {} as Record<string, string[]>)
}

const validateFields = async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json(
            {
                errors: formatErrors(errors.array() as CustomErrors[])
            }
        )
    }
    next();

}

export default validateFields