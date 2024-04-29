import { getServerSession } from "next-auth"
import { authOptions } from "@/libs/auth";
import getUserProfile from "@/libs/getUserProfile"
import { redirect } from "next/navigation"
import getReservationID from "@/libs/getReservationID"
import updateReservation from "@/libs/updateReservation"
import deleteReservation from "@/libs/deleteReservation"


export default async function ReservationDetailPage( {params}:{params:{rid:string}}) {

    const session = await getServerSession(authOptions)
    if(!session || !session.user.token) return null

    const profile = await getUserProfile(session.user.token)
    var createdAt = new Date(profile.data.createdAt)
    const rsvDetail = await getReservationID(params.rid,session.user.token)

    const updateReservationf = async (addUserForm: FormData) => {
        "use server"
        const date = addUserForm.get("date")as string || "";
        const regis = deleteReservation(params.rid, session.user.token)
        redirect("/reservations")
    }

    
    return (
        <main className="w-[100%] flex flex-col items-center space-y-4 pt-20 bg-white ">
            <form className="w-[100%] flex flex-col items-center space-y-4 pt-13 bg-white" action={updateReservationf}>
                    <h1 className="text-5xl font-medium p-10">DELETE IT!!</h1>

                    <button type="submit" className="block rounded-md bg-red-800 hover:bg-red-400 px-3 py-2 text-white">Confirm</button>
                </form>
        </main>
    )
}
