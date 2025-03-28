import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const db = new PrismaClient();

export async function GET(req, res) {
  if (req.method === 'GET') {
    try {
      if (!db.atsProfile) {
        console.error("Profile model is not defined in Prisma Client.");
        return NextResponse.json({ error: 'profile model not found in Prisma Client.' });
      }
      const profileData = await db.atsProfile.findMany();
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
      const { facebook, instagram, linkdin, twitter, mail, number, website, Location, gmap, iframe, Projects, Clients, Countries, id } = body
      try {
          const updatePost = await db.atsProfile.update({
              where: {
                  id: id
              },
              data: {
                  facebook,
                  instagram,
                  linkdin,
                  twitter,
                  mail,
                  number,
                  website,
                  Location,
                  gmap,
                  iframe,
                  Projects,
                  Clients,
                  Countries
              }
          });
          return NextResponse.json({ data: updatePost, message: 'Profile Updated successfully' })
      } catch (error) {
          return NextResponse.json({ error: 'Error in Update profile' })
      }
  }
}
