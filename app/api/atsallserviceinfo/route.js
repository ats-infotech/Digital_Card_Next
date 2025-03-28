import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const db = new PrismaClient();

export async function DELETE(req) {
    try {
        const { id } = await req.json()
        const ids = Array.isArray(id) ? id : [id]

        await db.atsServiceInfo.deleteMany({
            where: { id: { in: ids } }
        })

        return NextResponse.json({ message: "Subtitles deleted successfully" })

    } catch (error) {
        console.error(error)
        return NextResponse.json({ message: "Failed to delete Subtitles" }, { status: 500 })
    }
}