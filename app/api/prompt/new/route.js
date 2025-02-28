import { connectToDB } from "@/utils/database";
import Prompt from "@/models/prompt";
export const POST = async (req) => {
    let {prompt, userID, tag} = await req.json();

    try{
        await connectToDB();
        const newPrompt = await Prompt({
            creator: userID,
            prompt,
            tag
        })
        await newPrompt.save();

        return new Response(JSON.stringify(newPrompt),{status: 201})
    }catch(err){
        return new Response(JSON.stringify(err),{status: 500})
    }
}

export const GET = async (req,res) => {
    try{
        await connectToDB();
        await Prompt.find({},(err,prompts) => {
            if(err){
                return new Response(JSON.stringify(err),{status: 500})
            }
            return new Response(JSON.stringify(prompts),{status: 200})
        })
    }catch(err){
        return new Response(JSON.stringify(err),{status: 500})
    }
}