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
            const postData = await db.sunildiamondProduct.findMany();
            return NextResponse.json({ data: postData, message: 'Get Data SuccessFully' })
        } catch (error) {
            return NextResponse.json({ error: 'Error fetching posts' })
        }
    }
}

export async function POST(req) {
    const data = await req.formData();

    const imageFiles = data.getAll('image');
    const name = data.get('name');
    const price = data.get('price');
    const folder_id = "SunilDiamond";

    if (!imageFiles.length || !name || !price) {
        return NextResponse.json({ message: "Files, name, and price are required." }, { status: 400 });
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

            const postData = await db.sunildiamondProduct.create({
                data: {
                    image: imageUrl,
                    name: name,
                    price: price,
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
        const name = data.get('name');
        const price = data.get('price');

        const product = await db.sunildiamondProduct.findUnique({
            where: { id: id },
            select: { image: true },
        });

        if (!product) {
            return NextResponse.json({ message: 'Product not found' }, { status: 404 });
        }
        const imagePath = product.image;

        if (!id || !name || !price) {
            return NextResponse.json({ message: "ID, name, and price are required." }, { status: 400 });
        }

        let imageUrl = null;
        if (imageFiles.length) {
            await ensureUploadsDirectory('SunilDiamond');

            const imageFile = imageFiles[0];
            const bytes = await imageFile.arrayBuffer();
            const buffer = Buffer.from(bytes);

            imageUrl = join('uploads', 'Sunildiamond', `${Date.now()}-${imageFile.name}`);
            const filePath = join('public', imageUrl);

            await writeFile(filePath, buffer);
            if (imagePath) {
                const oldFilePath = join(process.cwd(), 'public', imagePath);
                await new Promise((resolve, reject) => {
                    unlink(oldFilePath, (err) => {
                        if (err) {
                            reject(new Error(`Failed to delete image file: ${err.message}`));
                        } else {
                            resolve();
                        }
                    });
                });
            }
        } else {
            imageUrl = imagePath;
        }

        const updatedData = await db.sunildiamondProduct.update({
            where: { id: id },
            data: {
                name: name,
                price: price,
                image: imageUrl ? imageUrl : undefined,
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
            const product = await db.sunildiamondProduct.findUnique({
                where: { id: id },
                select: { image: true },
            });

            if (!product) {
                return NextResponse.json({ message: 'Product not found' }, { status: 404 });
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
            const deletedProduct = await db.sunildiamondProduct.delete({
                where: { id: id }
            });

            return NextResponse.json({
                data: deletedProduct,
                message: 'Product and associated image deleted successfully'
            });

        } catch (error) {
            console.error('Error in deleting product or image:', error);
            return NextResponse.json({ error: 'Error in deleting product or image' }, { status: 500 });
        }
    }
}
