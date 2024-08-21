import passport from "passport";
import passportLocal from "passport-local";
import passportJWT from "passport-jwt";
import UserModel from "../modules/user/user.model";
import bcryptjs from "bcryptjs";

const JWTSecret: string = process.env.JWT_SECRET || "31iuhiu3h12i3yh1098";
const LocalStrategy = passportLocal.Strategy;
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

passport.use(
    new LocalStrategy({ usernameField: "username" }, async (username: string, password: string, done: Function) => {
        const userInfo = await UserModel.findOne({ username: username.toLowerCase() })
        if (!userInfo) return done(null, false, { msg: "El usuario no existe" })
        const validatePassword = bcryptjs.compareSync(password, (userInfo.password as string));
        if (!validatePassword) return done(null, false, { msg: "Usuario o contraseña incorrecto" })
        return done(null, userInfo)
    })
)

passport.use(
    new JWTStrategy(
        {
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
            secretOrKey: JWTSecret
        },
        async function (jwtToken: { id: string }, done: Function) {
            const userInfo = await UserModel.findById(jwtToken.id);
            if (!userInfo) return done(null, false)
            return done(null, userInfo, jwtToken)
        }
    )
)

