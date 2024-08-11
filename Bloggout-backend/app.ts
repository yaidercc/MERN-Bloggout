import dotenv from "dotenv"
import path from "path";
import Server from "./src/server";

dotenv.config({ path: path.resolve(__dirname, "../.env") })

const server = new Server();

server.listen();