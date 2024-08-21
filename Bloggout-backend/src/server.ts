import express from "express"
import { createServer, Server as HttpServer } from "http";
import { Server as SocketIOServer } from "socket.io";
import cors from "cors";
import helmet from "helmet"; 
import { dbConnection } from "./config/Database";
import {UserRoutes} from "./modules/user/user.routes"

export default class Server {
    private path: { user: string };
    private server: HttpServer;
    private app = express();
    public io: SocketIOServer
    static port: number = Number(process.env.PORT) || 4400;

    constructor() {
        this.path = {
            user: "/api/user",
        }
        this.server = createServer(this.app)
        this.io = new SocketIOServer(this.server)

        this.connectDB();
        this.middlewares();
        this.routes()
    }

    async connectDB() {
        await dbConnection();
    }

    private middlewares() {
        this.app.use(cors())
        this.app.use(express.json())
        this.app.use(helmet())
    }

    listen() {
        this.server.listen(Server.port, () => {
            console.log(`Escuchando en el puerto ${Server.port}`)
        })
    }

    private routes() {
        this.app.use(this.path.user, new UserRoutes().router);
    }

}

