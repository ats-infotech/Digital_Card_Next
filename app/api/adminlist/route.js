import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const db = new PrismaClient();

export async function GET(req, res) {
  if (req.method === 'GET') {
    try {
      if (!db.admin) {
        console.error("admin model is not defined in Prisma Client.");
        return NextResponse.json({ error: 'admin model not found in Prisma Client.' });
      }

      const adminData = await db.admin.findMany({
        select: {
          username: true,
          id: true,
          email: true,
          password: true
        }
      });

      const encodedData = adminData.map((admin) => ({
        id: admin.id,
        username: Buffer.from(admin.username).toString('base64'),
        email: Buffer.from(admin.email).toString('base64'),
        password: Buffer.from(admin.password).toString('base64'),
      }));

      return NextResponse.json({ data: encodedData, message: 'Get Data Successfully' });
    } catch (error) {
      console.error("Error fetching admin:", error);
      return NextResponse.json({ error: 'Error fetching admin: ' + error.message });
    }
  }
}

export async function PUT(req) {
    const body = await req.json();
  
    if (req.method === 'PUT') {
        const { id, username, password, email } = body
        try {
            const updatePost = await db.admin.update({
                where: {
                    id: id
                },
                data: {
                    username,
                    password,
                    email
                }
            });
            return NextResponse.json({ data: updatePost, message: 'Post Updated successfully' })
        } catch (error) {
            return NextResponse.json({ error: 'Error in Update post' })
        }
    }
  }