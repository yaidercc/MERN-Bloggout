import jwt from "jsonwebtoken";

const generateJWT = (id: string = "", expiresTime: string = "6h"): Promise<string> => {
    return new Promise((resolve, reject) => {
        const payload = { id };

        jwt.sign(
            payload,
            process.env.JWT_SECRET || "31iuhiu3h12i3yh1098",
            {
                expiresIn: expiresTime
            },
            (err: Error | null, token: string | undefined) => {
                if (err) {
                    reject("No se pudo generar el token")
                } else {
                    resolve(token || '')
                }
            }
        )
    })
}
export default generateJWT