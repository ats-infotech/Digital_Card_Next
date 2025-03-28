import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const db = new PrismaClient();

export async function GET(req, res) {
    if (req.method === 'GET') {
        try {
            if (!db.atsServiceInfo) {
                console.error("ATS Service Info model is not defined in Prisma Client.");
                return NextResponse.json({ error: 'ats service info model not found in Prisma Client.' });
            }
            const serviceData = await db.atsServiceInfo.findMany();
            return NextResponse.json({ data: serviceData, message: 'Get ats service Subtitle Successfully' });
        } catch (error) {
            console.error("Error fetching ats service info:", error);
            return NextResponse.json({ error: 'Error fetching ats service info: ' + error.message });
        }
    }
}

export async function POST(req) {
    const body = await req.json();
    if (req.method === 'POST') {
        const { title, ServiceId } = body

        try {
            const postData = await db.atsServiceInfo.create({
                data: {
                    title,
                    ServiceId
                }
            });
            return NextResponse.json({ data: postData, message: 'Create ats service Subtitle SuccessFully' })
        } catch (error) {
            return NextResponse.json({ error: 'Error in create ats service Subtitle' })
        }
    }
}

export async function DELETE(req) {
    const body = await req.json();

    if (req.method === 'DELETE') {
        const { id } = body
         try {
            const deletedPost = await db.atsServiceInfo.delete({
                where: {
                    id: id
                }
            });
            return NextResponse.json({ data: deletedPost, message: 'ats service Subtitle deleted successfully' })
        } catch (error) {
            return NextResponse.json({ error: 'Error in deleting ats service Subtitle' })
        }
    }
}

export async function PUT(req) {
    const body = await req.json();

    if (req.method === 'PUT') {
        const { title, ServiceId, id } = body
        try {
            const updatePost = await db.atsServiceInfo.update({
                where: {
                    id: id
                },
                data: {
                    title,
                    ServiceId
                }
            });
            return NextResponse.json({ data: updatePost, message: 'ats service Subtitle Updated successfully' })
        } catch (error) {
            return NextResponse.json({ error: 'Error in Update ats service Subtitle' })
        }
    }
}