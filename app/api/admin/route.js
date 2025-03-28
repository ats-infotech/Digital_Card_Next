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
          email: true
        }
      });

      const encodedData = adminData.map((admin) => ({
        id: admin.id,
        username: Buffer.from(admin.username).toString('base64'),
        email: Buffer.from(admin.email).toString('base64'),
      }));

      return NextResponse.json({ data: encodedData, message: 'Get Data Successfully' });
    } catch (error) {
      console.error("Error fetching admin:", error);
      return NextResponse.json({ error: 'Error fetching admin: ' + error.message });
    }
  }
}

export async function POST(req, res) {
  const body = await req.json();
  if (req.method === 'POST') {
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json({ error: 'Username and password are required' });
    }
    try {
      const admin = await db.admin.findUnique({
        where: { username },
      });

      if (!admin || admin.password !== password) {
        return NextResponse.json({ error: 'Invalid username or password' });
      }
      return NextResponse.json({ message: 'Login successful', adminId: admin.id, userName: admin.username, passWord: admin.password });
    } catch (error) {
      console.error('Error logging in:', error);
      return NextResponse.json({ error: 'Internal server error' });
    }
  } else {
    return NextResponse.json({ error: 'Method Not Allowed' });
  }
}