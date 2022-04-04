import type { NextApiRequest, NextApiResponse } from "next";
import { HttpMethod } from "@/types";
import { addArt } from "@/lib/api";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case HttpMethod.POST:
      return addArt(req, res);
    default:
      res.setHeader("Allow", [HttpMethod.POST]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
