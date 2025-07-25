import { connectToDB } from "@/utils/database";
import React from "react";
import Prompt from "@/models/prompt";

export const GET = async (req, {params}) => {
  try {
    await connectToDB()
    const { id } = await params

    const prompts = await Prompt.find({
        creator: id
    }).populate('creator')

    return new Response(JSON.stringify(prompts), {status: 200})
  } catch (e) {
    return new Response("Failed to fetch all prompts", {status: 500})

  }
}
