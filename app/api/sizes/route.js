import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { join } from "path";
import { rmdir } from "fs/promises";

const db = new PrismaClient();

async function ensureRemoveDirectory(folder_id) {
    const public_ = join(process.cwd(), 'public');
    const dir = join(public_, 'uploads', 'Rainafashion', folder_id);
    await rmdir(dir, { recursive: true });
}

export async function GET(req, res) {
    if (req.method === 'GET') {
        try {
            const postData = await db.sizes.findMany();
            return NextResponse.json({ data: postData, message: 'Get Data SuccessFully' })
        } catch (error) {
            return NextResponse.json({ error: 'Error fetching posts' })
        }
    }
}

export async function POST(req) {
    const body = await req.json();
    if (req.method === 'POST') {
        const { extrasmall, small, meduim, large, extralarge, extraextralarge } = body

        try {
            const postData = await db.sizes.create({
                data: {
                    extrasmall,
                    small,
                    meduim,
                    large,
                    extralarge,
                    extraextralarge
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
    const { id } = body
    const folderid = id
    const folder_id = folderid.toString()

    await ensureRemoveDirectory(folder_id);
    if (req.method === 'DELETE') {

        try {
            const deletedPost = await db.sizes.delete({
                where: {
                    id: id
                }
            });
            return NextResponse.json({ data: deletedPost, message: 'Size deleted successfully' })
        } catch (error) {
            return NextResponse.json({ error: 'Error in deleting Size' , error })
        }
    }
}

export async function PUT(req) {
    const body = await req.json();

    if (req.method === 'PUT') {
        const { extrasmall, small, meduim, large, extralarge, extraextralarge, id } = body
        try {
            const updatePost = await db.sizes.update({
                where: {
                    id: id
                },
                data: {
                    extrasmall,
                    small,
                    meduim,
                    large,
                    extralarge,
                    extraextralarge
                }
            });
            return NextResponse.json({ data: updatePost, message: 'Post Updated successfully' })
        } catch (error) {
            return NextResponse.json({ error: 'Error in Update post' })
        }
    }
}
