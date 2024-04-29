import get from "@/libs/getCar"
import { getServerSession } from "next-auth"
import { authOptions } from "@/libs/auth";
import getUserProfile from "@/libs/getUserProfile"
import reservation from "@/libs/reservation"
import { redirect } from "next/navigation"
import getReservation from "@/libs/getReservation"
import { Suspense } from "react"
import { LinearProgress } from "@mui/material"
import ReservationCatalog from "@/components/ReservationCatalog"


export default async function myReservation() {

    
    const session = await getServerSession(authOptions)
    if(!session || !session.user.token) return null

    const profile = await getUserProfile(session.user.token)
    var createdAt = new Date(profile.data.createdAt)
    const myReser = await getReservation(session.user.token)

    
    return (
        <main className="w-full text-center p-5">
            <h1 className="text-5xl font-medium p-10">Your Restaurants</h1>
            <Suspense fallback={<p>Loading... <LinearProgress/></p>}>
                <ReservationCatalog carJson={myReser}/>
            </Suspense>

        </main>
    )
}
