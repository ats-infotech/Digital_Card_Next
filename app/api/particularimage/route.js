import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { unlink } from 'fs';
import { join } from 'path';

const db = new PrismaClient()

export async function DELETE(req) {
    const body = await req.json();

    if (req.method === 'DELETE') {
        const { id } = body;
        try {
            const product = await db.previewimages.findUnique({
                where: { id: id },
                select: { filename: true },
            });

            if (!product) {
                return NextResponse.json({ message: 'Product not found' }, { status: 404 });
            }
            const imagePath = product.filename;
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
            const deletedProduct = await db.previewimages.delete({
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
