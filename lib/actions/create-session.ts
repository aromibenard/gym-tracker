"use server"

import { db } from "@/client"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"


export default async function createSession() {
    const user = await currentUser()
    
    if (!user) {
        throw new Error("Unauthorized")
    }

    const activeSession = await db.session.findFirst({
        where: {
            userId: user.id,
            status: "ACTIVE"
        }
    })

    if (activeSession) {
        redirect(`/workouts/${activeSession.id}`)    
    }

    const session = await db.session.create({
        data: { userId: user.id }
    })

    redirect(`/workouts/${session.id}`)
}