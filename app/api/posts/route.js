import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const db = new PrismaClient();

export async function GET(req, res) {
    if (req.method === 'GET') {
        try {
            const postData = await db.products.findMany();
            return NextResponse.json({ data: postData, message: 'Get Data SuccessFully' })
        } catch (error) {
            return NextResponse.json({ error: 'Error fetching posts' })
        }
    }
}

export async function POST(req) {
    const body = await req.json();
    if (req.method === 'POST') {
        const { name, type, price, code, description } = body

        try {
            const postData = await db.products.create({
                data: {
                    name,
                    type,
                    price,
                    code,
                    description
                }
            });
            return NextResponse.json({ data: postData, message: 'Create Data SuccessFully' })
        } catch (error) {
            return NextResponse.json({ error: 'Error in create Post' })
        }
    }
}

export async function DELETE(req) {
    const body = await req.json();

    if (req.method === 'DELETE') {
        const { id } = body
         try {
            const deletedPost = await db.products.delete({
                where: {
                    id: id
                }
            });
            return NextResponse.json({ data: deletedPost, message: 'Post deleted successfully' })
        } catch (error) {
            return NextResponse.json({ error: 'Error in deleting post' })
        }
    }
}

export async function PUT(req) {
    const body = await req.json();

    if (req.method === 'PUT') {
        const { name, type, price, code, description, id } = body
        try {
            const updatePost = await db.products.update({
                where: {
                    id: id
                },
                data: {
                    name,
                    type,
                    price,
                    code,
                    description
                }
            });
            return NextResponse.json({ data: updatePost, message: 'Post Updated successfully' })
        } catch (error) {
            return NextResponse.json({ error: 'Error in Update post' })
        }
    }
}
