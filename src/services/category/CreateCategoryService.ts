import prismaClient from "../../prisma";


interface CategoryRequest
{
    name:string
}

class CreateCategoryService
{
    //Name implementa a interface CategoryRequest, que implica que o parametro seja uma string
    async execute({name}:CategoryRequest)
    {
        if(name === '')
        {
            throw new Error("Invalid name")
        }
        //Criar categoria
        const category = await prismaClient.category.create({
            data:{
                name
            },
            select:{
                id:true,
                name:true
            }
        })

        return category;
    }
}

export {CreateCategoryService};