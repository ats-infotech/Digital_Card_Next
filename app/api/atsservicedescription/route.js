import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const db = new PrismaClient();

export async function GET(req, res) {
    if (req.method === 'GET') {
        try {
            if (!db.atsServiceDescription) {
                console.error("ATS Service Description model is not defined in Prisma Client.");
                return NextResponse.json({ error: 'ats service description model not found in Prisma Client.' });
            }
            const serviceData = await db.atsServiceDescription.findMany();
            return NextResponse.json({ data: serviceData, message: 'Get ats service description Successfully' });
        } catch (error) {
            console.error("Error fetching ats service description:", error);
            return NextResponse.json({ error: 'Error fetching ats service description: ' + error.message });
        }
    }
}

export async function POST(req) {
    const body = await req.json();
    if (req.method === 'POST') {
        const { description, SubServiceId } = body

        try {
            const postData = await db.atsServiceDescription.create({
                data: {
                    description,
                    SubServiceId
                }
            });
            return NextResponse.json({ data: postData, message: 'Create ats service description SuccessFully' })
        } catch (error) {
            return NextResponse.json({ error: 'Error in create ats service description' })
        }
    }
}

export async function DELETE(req) {
    const body = await req.json();

    if (req.method === 'DELETE') {
        const { id } = body
         try {
            const deletedPost = await db.atsServiceDescription.delete({
                where: {
                    id: id
                }
            });
            return NextResponse.json({ data: deletedPost, message: 'ats service description deleted successfully' })
        } catch (error) {
            return NextResponse.json({ error: 'Error in deleting ats service description' })
        }
    }
}

export async function PUT(req) {
    const body = await req.json();

    if (req.method === 'PUT') {
        const { description, SubServiceId, id } = body
        try {
            const updatePost = await db.atsServiceDescription.update({
                where: {
                    id: id
                },
                data: {
                    description,
                    SubServiceId
                }
            });
            return NextResponse.json({ data: updatePost, message: 'ats service description Updated successfully' })
        } catch (error) {
            return NextResponse.json({ error: 'Error in Update ats service description' })
        }
    }
}