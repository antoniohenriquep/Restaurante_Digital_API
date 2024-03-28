import express,{Request,Response,NextFunction} from "express";
import 'express-async-errors';
import cors from 'cors';
import path from 'path';

import { router } from "./routes";

const app = express();
app.use(cors())

app.use(express.json())
app.use(router)

app.use('/files',express.static(path.resolve(__dirname,'..','tmp')))


app.use((err: Error, req: Request, res: Response, nex:NextFunction)=>{

    //Se err for uma instancia do tipo Error
    if(err instanceof Error)
    {
        return res.status(400).json({
            error:err.message
        });
    }

    return res.status(500).json({
        status:'error',
        message:'Internal error'
    });
})

app.listen(8082, ()=>{
    console.log("Servidor online!");
})