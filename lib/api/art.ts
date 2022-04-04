import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/lib/supabase";

export async function addArt(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse> {
  const { title, description, artist, creationDate, artUrl } = req.body;

  try {
    const { data } = await supabase
      .from("art")
      .insert({ title, description, artist, creationDate, artUrl });

    return res.status(201).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).end(error);
  }
}
