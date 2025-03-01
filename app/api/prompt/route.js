import { connectToDB } from "@/utils/database";
import Prompt from "@/models/prompt";

export const GET = async (req,{params}) => {
    try{
        await connectToDB();

        const Prompts = await Prompt.find({}).populate('creator');
        return new Response(JSON.stringify(Prompts),{status: 200})

    }catch(e){
        return new Response(JSON.stringify(e),{status: 500})
    }
}