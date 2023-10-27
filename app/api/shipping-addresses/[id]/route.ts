import { PrismaClient } from "@prisma/client";

export async function GET(
  request: Request,
  { params }: { params: { id: number; }; }
) {
  const prisma = new PrismaClient();
  const response = await prisma.shipping_addresses.findUnique({
    where: {
      id: Number(params.id),
    },
  });

  const data = {
    ...response,
    id:
      typeof response?.id === "bigint" ? Number(response.id).toString() : response?.id,
  };
  return Response.json({ data });
}