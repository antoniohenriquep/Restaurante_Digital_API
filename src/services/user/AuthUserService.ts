import { sign } from "jsonwebtoken";
import prismaClient from "../../prisma";
import { compare } from "bcryptjs";
interface AuthRequest
{
    email:string;
    password:string;
}

class AuthUserService 
{
    async execute({email, password}: AuthRequest)
    {
        //Verifica se o usuario existe
        const user = await prismaClient.user.findFirst({
            where:{
                email
            }
        });

        //Caso o usuario nao exista
        if(!user)
        {
            throw new Error("Incorrect user or password")
        }

        const passwordMatch = await compare(password, user.password)
        
        if(!passwordMatch)
        {
            throw new Error("Incorrect user or password")
        }

        const token = sign(
            {
            name: user.name,
            email:user.email
            },
            process.env.JWT_SECRET,
            {
                subject:user.id,
                expiresIn: '30d'
            }
        )

        return {
            id: user.id,
            name:user.name,
            email:user.email,
            token:token
        };
    }
}

export {AuthUserService};