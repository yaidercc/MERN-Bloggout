export interface userControllersInterface {
    createUser: (req: Request, res: Response) => Promise<void>,
    editUser: (req: Request, res: Response) => Promise<void>,
    deleteUser: (req: Request, res: Response) => Promise<void>,
}

export interface User {
    names: string;
    last_names: string;
    username: string;
    password: string;
}