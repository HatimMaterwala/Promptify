import { connectToDB } from "@/utils/database";
import Prompt from "@/models/prompt";

export const GET = async (req,{params}) => {
    try{
        await connectToDB();
        const prompt = await Prompt.findById(params.id).populate('creator');
        if(!prompt) return new Response(JSON.stringify({message: 'Prompt not found'}),{status: 404}) 
        return new Response(JSON.stringify(prompt),{status: 200})
    }catch(err){
        return new Response(JSON.stringify(err),{status: 500})
    }
}

export const PATCH = async (req,{params}) => {
    const {prompt, tag} = await req.json();
    try{
        await connectToDB();
        const existingPrompt = await Prompt.findById(params.id); 
        if(!existingPrompt) return new Response(JSON.stringify({message: 'Prompt not found'}),{status: 404})
        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;

        await existingPrompt.save();
        return new Response(JSON.stringify(existingPrompt),{status: 200})
    }catch(err){
        return new Response(JSON.stringify(err),{status: 500})
    }
}

export const DELETE = async (req,{params}) => {
    try{
        await connectToDB();
        const promptId = params.id;
        await Prompt.findByIdAndDelete(promptId);
        return new Response(JSON.stringify({message: 'Prompt deleted successfully'}),{status: 200})
    }catch(err){
        return new Response(JSON.stringify(err),{status: 500})
    }
}