import { PrismaClient } from "@prisma/client";
import { mkdir, writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import { join } from "path";
import { unlink } from 'fs';

const db = new PrismaClient();

async function ensureUploadsDirectory(folder_id) {
    const public_ = join(process.cwd(), 'public');
    const dir = join(public_, 'uploads', folder_id);
    await mkdir(dir, { recursive: true });
}

export async function GET(req, res) {
    if (req.method === 'GET') {
        try {
            if (!db.atsServices) {
                console.error("Service model is not defined in Prisma Client.");
                return NextResponse.json({ error: 'service model not found in Prisma Client.' });
            }
            const serviceData = await db.atsServices.findMany();
            return NextResponse.json({ data: serviceData, message: 'Get Data Successfully' });
        } catch (error) {
            console.error("Error fetching service:", error);
            return NextResponse.json({ error: 'Error fetching service: ' + error.message });
        }
    }
}

export async function POST(req) {
    const data = await req.formData();

    const imageFiles = data.getAll('image');
    const title = data.get('title');
    const description = data.get('description');
    const folder_id = "ATS";

    if (!imageFiles.length || !title || !description) {
        return NextResponse.json({ message: "Files, title, and description are required." }, { status: 400 });
    }

    try {
        await ensureUploadsDirectory(folder_id);

        const uploadedFilesData = [];
        for (const imageFile of imageFiles) {
            const bytes = await imageFile.arrayBuffer();
            const buffer = Buffer.from(bytes);

            const imageUrl = join('uploads', folder_id, `${Date.now()}-${imageFile.name}`);
            const filePath = join('public', imageUrl);

            await writeFile(filePath, buffer);

            const postData = await db.atsServices.create({
                data: {
                    image: imageUrl, 
                    title: title,    
                    description: description, 
                },
            });

            uploadedFilesData.push(postData);
        }

        return NextResponse.json({ message: "File uploaded successfully", data: uploadedFilesData });

    } catch (error) {
        console.error('Error occurred during file upload:', error);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function PUT(req) {
    try {
        const data = await req.formData();

        const imageFiles = data.getAll('image');
        const id = parseInt(data.get('id'))
        const title = data.get('title');
        const description = data.get('description');

        const product = await db.atsServices.findUnique({
            where: { id: id },
            select: { image: true },
        });

        if (!product) {
            return NextResponse.json({ message: 'Product not found' }, { status: 404 });
        }
        const imagePath = product.image;
        
        if (!id || !title || !description) {
            return NextResponse.json({ message: "ID, title, and description are required." }, { status: 400 });
        }

        let imageUrl = null;
        if (imageFiles.length) {
            await ensureUploadsDirectory('ATS');

            const imageFile = imageFiles[0];
            const bytes = await imageFile.arrayBuffer();
            const buffer = Buffer.from(bytes);

            imageUrl = join('uploads', 'ATS', `${Date.now()}-${imageFile.name}`);
            const filePath = join('public', imageUrl);

            await writeFile(filePath, buffer);

            if (imagePath) {
                const filePathToDelete = join(process.cwd(), 'public', imagePath);
                await new Promise((resolve, reject) => {
                    unlink(filePathToDelete, (err) => {
                        if (err) {
                            reject(new Error(`Failed to delete image file: ${err.message}`));
                        } else {
                            resolve();
                        }
                    });
                });
            }
        }

        const updatedData = await db.atsServices.update({
            where: { id: id },
            data: {
                title: title,
                description: description,
                image: imageUrl ? imageUrl : imagePath,
            },
        });

        if (!updatedData) {
            return NextResponse.json({ message: "Item not found." }, { status: 404 });
        }

        return NextResponse.json({ message: "Item updated successfully", data: updatedData });

    } catch (error) {
        console.error('Error occurred during file update:', error);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}


export async function DELETE(req) {
    const body = await req.json();

    if (req.method === 'DELETE') {
        const { id } = body;
        try {
            const product = await db.atsServices.findUnique({
                where: { id: id },
                select: { image: true },
            });

            if (!product) {
                return NextResponse.json({ message: 'Service not found' }, { status: 404 });
            }
            const imagePath = product.image;
            const filePath = join(process.cwd(), 'public', imagePath);

            await new Promise((resolve, reject) => {
                unlink(filePath, (err) => {
                    if (err) {
                        reject(new Error(`Failed to delete image file: ${err.message}`));
                    } else {
                        resolve();
                    }
                });
            });
            const deletedProduct = await db.atsServices.delete({
                where: { id: id }
            });

            return NextResponse.json({
                data: deletedProduct,
                message: 'Service and associated image deleted successfully'
            });

        } catch (error) {
            console.error('Error in deleting service or image:', error);
            return NextResponse.json({ error: 'Error in deleting service or image' }, { status: 500 });
        }
    }
}
