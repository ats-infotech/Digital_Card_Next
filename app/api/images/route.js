
import { PrismaClient } from "@prisma/client";
import { mkdir, writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import { join } from "path";
import { unlink } from 'fs';

const db = new PrismaClient()

async function ensureUploadsDirectory(folder_id) {
    const public_ = join(process.cwd(), 'public');
    const dir = join(public_, 'uploads', 'Rainafashion', folder_id);
    await mkdir(dir, { recursive: true });
}

export async function GET(req, res) {
    if (req.method === 'GET') {
        try {
            const imageData = await db.previewimages.findMany();
            return NextResponse.json({ data: imageData, message: 'Get Data SuccessFully' })
        } catch (error) {
            return NextResponse.json({ message: "Failed to fetch images" }, { status: 500 })
        }
    }
}

export async function POST(req) {
    const data = await req.formData()

    const imageFiles = data.getAll('image')
    const imageid = parseInt(data.getAll('id'))
    const folderid = parseInt(data.getAll('folder'))
    const folder_id = folderid.toString()

    if (imageFiles.length === 0) {
        return NextResponse.json({ message: "Files cannot be null or empty" }, { status: 400 });
    }

    await ensureUploadsDirectory(folder_id);

    const uploadedFilesData = [];
    for (const imageFile of imageFiles) {
        const bytes = await imageFile.arrayBuffer()
        const buffer = Buffer.from(bytes)
        const imageUrl = join('uploads','Rainafashion', folder_id, `${Date.now()}-${imageFile.name}`)
        const filePath = join('public', imageUrl);

        try {
            await writeFile(filePath, buffer);
            const postData = await db.previewimages.create({
                data: {
                    filename: imageUrl,
                    ImageId: imageid
                },
            });
            uploadedFilesData.push(postData);
        } catch (error) {
            return NextResponse.json({ message: "File upload failed" }, { status: 500 });
        }
    }
    return NextResponse.json({ message: "File uploaded successfully", data: imageFiles });
}

export async function DELETE(req) {
    try {
        const { id } = await req.json()
        const ids = Array.isArray(id) ? id : [id]
        const images = await db.previewimages.findMany({
            where: {
                id: { in: ids }
            },
            select: { filename: true }
        })

        if (images.length === 0) {
            return NextResponse.json({ message: 'Images not found' }, { status: 404 });
        }

        for (const image of images) {
            const imagePath = image.filename
            const filePath = join(process.cwd(), 'public', imagePath)

            await new Promise((resolve, reject) => {
                unlink(filePath, (err) => {
                    if (err) {
                        reject(new Error(`Failed to delete image file: ${err.message}`))
                        console.log("Error Occured while deleting image from file")
                    } else {
                        resolve()
                        console.log("Images deleted from folder")
                    }
                })
            })
        }
        await db.previewimages.deleteMany({
            where: { id: { in: ids } }
        })

        return NextResponse.json({ message: "Images deleted successfully" })

    } catch (error) {
        console.error(error)
        return NextResponse.json({ message: "Failed to delete images" }, { status: 500 })
    }
}
