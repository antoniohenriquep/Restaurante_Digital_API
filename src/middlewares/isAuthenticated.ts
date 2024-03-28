import {NextFunction ,Request,Response } from "express";
import { verify } from "jsonwebtoken";

interface Payload
{
    sub: string;
}


export function isAuthenticated(req: Request, res:Response, next: NextFunction)
{
    const authToken = req.headers.authorization;

    //Verifica se o token foi passado na requisição
    if(!authToken)
    {
        return res.status(401).end()
    }
    //A string devolvida é "Bearer (corpo do token)"
    //Usamos a desestruturação para ignorar a primeira parte e pegarmos apenas o corpo do token
    const [, token] = authToken.split(" ")

    //Verifica se o token é válido
    try
    {
        /*
            Verifica se o token foi assinado com nossa chave do .env. Ao final do processo descontruimos a propriedade sub (id do usuario) e tipamos como Payload
         */
        const {sub} = verify(token,process.env.JWT_SECRET) as Payload;

        //O tipo Request não tem uma propriedade chamada user_id, então vamos sobrescrevê-la para adicionarmos isso em src/@types/express/index.d.ts
        //Após isso temos que habilitar tipos externos no tsconfig.json - typeRoots, e adicionar o caminho do diretório 
        req.user_id = sub; //Coloca o id do token na requisição
        next();
    }
    catch(err)
    {
        return res.status(401).end()
    }
}