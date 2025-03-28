import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const db = new PrismaClient();

export async function GET(req, res) {
  if (req.method === 'GET') {
    try {
      if (!db.profile) {
        console.error("Profile model is not defined in Prisma Client.");
        return NextResponse.json({ error: 'profile model not found in Prisma Client.' });
      }
      const profileData = await db.profile.findMany();
      return NextResponse.json({ data: profileData, message: 'Get Data Successfully' });
    } catch (error) {
      console.error("Error fetching profile:", error);
      return NextResponse.json({ error: 'Error fetching profile: ' + error.message });
    }
  }
}

export async function PUT(req) {
  const body = await req.json();

  if (req.method === 'PUT') {
      const { Phone, Tel, Address, Gmap, iframe, Insta, Instalink, Desc, otherlink, linktitle, name, year, nature, id, Broadcastlink } = body
      try {
          const updatePost = await db.profile.update({
              where: {
                  id: id
              },
              data: {
                  Phone,
                  Tel,
                  Address,
                  Gmap,
                  iframe,
                  name,
                  year,
                  nature,
                  Insta,
                  Instalink,
                  Desc,
                  otherlink,
                  linktitle,
                  Broadcastlink
              }
          });
          return NextResponse.json({ data: updatePost, message: 'Post Updated successfully' })
      } catch (error) {
          return NextResponse.json({ error: 'Error in Update post' })
      }
  }
}
