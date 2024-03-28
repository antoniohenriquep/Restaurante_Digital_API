import prismaClient from "../../prisma";
import { hash } from "bcryptjs";
interface UserRequest
{
    name: string;
    email: string;
    password: string;
}

class CreateUserService
{
    async execute({name,email,password}:UserRequest)
    {
        //Verifica se o email foi passado
        if(!email)
        {
            throw new Error("Incorrect email!");
        }

        //Verifica se o email ja está cadastrado
        const userAlreadyExists = await prismaClient.user.findFirst({
            where:{
                email:email
            }
        });

        //Se o usuario já existe, a requisição é negada
        if(userAlreadyExists)
        {
            throw new Error("Email already is been used!");
        }

        const passwordHash = await hash(password,10)

        const user = await prismaClient.user.create({
            data:{
                name,
                email,
                password: passwordHash
            },
            select:{
                id: true,
                name: true,
                email: true
            }
        });


        return user;
    }
}

export {CreateUserService};