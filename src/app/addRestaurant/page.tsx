import { redirect } from "next/navigation"
import register from "@/libs/register"
import postRestaurant from "@/libs/postRestaurant"
import { getServerSession } from "next-auth"
import getUserProfile from "@/libs/getUserProfile"
import { authOptions } from "@/libs/auth";

export default async function RegisterPage() {
    const session = await getServerSession(authOptions)
    if(!session || !session.user.token) return null

    const profile = await getUserProfile(session.user.token)
    var createdAt = new Date(profile.data.createdAt)

    const addUser = async (addUserForm: FormData) => {
        "use server"
        const name = addUserForm.get("name")as string || "";
        const address = addUserForm.get("address")as string || "";
        const tel = addUserForm.get("tel")as string || "";
        const openingtime = addUserForm.get("openingtime")as string || "";

        const regis = postRestaurant(session.user.token, name, address, tel, openingtime)
        redirect("/car")
    }    

    return (
        <main className="m-5 p-5">
            <form className="w-[100%] flex flex-col items-center space-y-4 pt-13 bg-white" action={addUser}>
                    <div className="text-5xl p-10">Create Restaurant</div>
                    <div className="flex items-center w-1/2 my-2">
                    <label className="w-auto block text-gray-700 pr-4" htmlFor="name">
                        Name
                    </label>
                    <input type="text" required id="name" name="name" placeholder="Name" 
                            className="bg-white border-2 border-gray-200 rounded w-full p-2 
                            text-gray-700 focus:outline-none focus:border-blue-400"/>
                    </div>

                    <div className="flex items-center w-1/2 my-2">
                    <label className="w-auto block text-gray-700 pr-4" htmlFor="address">
                    Address
                    </label>
                    <input type="text" required id="address" name="address" placeholder="address" 
                            className="bg-white border-2 border-gray-200 rounded w-full p-2 
                            text-gray-700 focus:outline-none focus:border-blue-400"/>
                    </div>

                    <div className="flex items-center w-1/2 my-2">
                    <label className="w-auto block text-gray-700 pr-4" htmlFor="tel">
                    Telephonenumber
                    </label>
                    <input type="text" required id="tell" name="tel" placeholder="Telephonenumber"
                            className="bg-white border-2 border-gray-200 rounded w-full p-2 
                            text-gray-700 focus:outline-none focus:border-blue-400"/>
                    </div>

                    <div className="flex items-center w-1/2 my-2">
                    <label className="w-auto block text-gray-700 pr-4" htmlFor="openingtime">
                    Openingtime
                    </label>
                    <input type="text" required id="openingtime" name="openingtime" placeholder="openingtime"
                            className="bg-white border-2 border-gray-200 rounded w-full p-2 
                            text-gray-700 focus:outline-none focus:border-blue-400"/>
                    </div>

                    <button type="submit" className="block rounded-md bg-red-800 hover:bg-red-400 px-3 py-2 text-white">Submit</button>
                </form>
            
        </main>
    )
}
