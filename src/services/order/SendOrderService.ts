//Coloca o pedido que está como rascunho como definitivo
import prismaClient from "../../prisma";

interface OrderRequest
{
    order_id:string;
}

class SendOrderService
{
    async execute({order_id}:OrderRequest)
    {
        const order = await prismaClient.order.update({
            data:{
                draft:false
            },
            where:{
                id:order_id
            }
        })
        return order;
    }
}

export {SendOrderService}