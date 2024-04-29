import getCar from "@/libs/getCar"
import { getServerSession } from "next-auth"
import { authOptions } from "@/libs/auth";
import getUserProfile from "@/libs/getUserProfile"
import { redirect } from "next/navigation"
import updateReservation  from "@/libs/updateReservation"


export default async function updateReservations( id:string,name:string) {
    
    const session = await getServerSession(authOptions)
    if(!session || !session.user.token) return null

    const profile = await getUserProfile(session.user.token)
    var createdAt = new Date(profile.data.createdAt)

    const updateReservationf = async (addUserForm: FormData) => {
        "use server"
        const date = addUserForm.get("date")as string || "";
        const regis = updateReservation(id, date, session.user.token)
        redirect("/reservations")
    }

    
    return (
        <main className="w-[100%] flex flex-col items-center space-y-4 pt-20 bg-white ">
            <h1 className="text-5xl font-medium">{name}</h1>        
            <form className="w-[100%] flex flex-col items-center space-y-4 pt-13 bg-white" action={updateReservationf}>
                    <div className="flex items-center w-1/2 my-2">
                    <label className="w-auto block text-gray-700 pr-4" htmlFor="date">
                        Date:
                    </label>
                    <input type="date" required id="date" name="date" placeholder="YYYY-MM-DDTHH:MM:SSZ (2024-04-15T19:00:00Z)" 
                            className="bg-white border-2 border-gray-200 rounded w-full p-2 
                            text-gray-700 focus:outline-none focus:border-blue-400"/>
                    </div>
                    <button type="submit" className="block rounded-md bg-red-800 hover:bg-red-400 px-3 py-2 text-white">Update Reservation</button>
                </form>
        </main>
    )
}
