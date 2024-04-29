import User from "@/db/models/User"
import { dbConnect } from "@/db/dbConnect"
import { revalidateTag } from "next/cache"
import { redirect } from "next/navigation"
import register from "@/libs/register"

export default async function RegisterPage() {

    const addUser = async (addUserForm: FormData) => {
        "use server"
        const name = addUserForm.get("name")as string || "";
        const telephonenumber = addUserForm.get("tel")as string || "";
        const email = addUserForm.get("email")as string || "";
        const password = addUserForm.get("password")as string || "";

        const regis = register(name ,telephonenumber ,email ,password ,"user")
        redirect("/")
    }    

    return (
        <main className="m-5 p-5">
            <form className="w-[100%] flex flex-col items-center space-y-4 pt-13 bg-white" action={addUser}>
                    <div className="text-5xl p-10">Register</div>
                    <div className="flex items-center w-1/2 my-2">
                    <label className="w-auto block text-gray-700 pr-4" htmlFor="name">
                        Name
                    </label>
                    <input type="text" required id="name" name="name" placeholder="Name" 
                            className="bg-white border-2 border-gray-200 rounded w-full p-2 
                            text-gray-700 focus:outline-none focus:border-blue-400"/>
                    </div>

                    <div className="flex items-center w-1/2 my-2">
                    <label className="w-auto block text-gray-700 pr-4" htmlFor="tel">
                    Telephonenumber
                    </label>
                    <input type="text" required id="tel" name="tel" placeholder="Telephonenumber" 
                            className="bg-white border-2 border-gray-200 rounded w-full p-2 
                            text-gray-700 focus:outline-none focus:border-blue-400"/>
                    </div>

                    <div className="flex items-center w-1/2 my-2">
                    <label className="w-auto block text-gray-700 pr-4" htmlFor="email">
                        Email
                    </label>
                    <input type="text" required id="email" name="email" placeholder="Email"
                            className="bg-white border-2 border-gray-200 rounded w-full p-2 
                            text-gray-700 focus:outline-none focus:border-blue-400"/>
                    </div>

                    <div className="flex items-center w-1/2 my-2">
                    <label className="w-auto block text-gray-700 pr-4" htmlFor="password">
                    Password
                    </label>
                    <input type="text" required id="password" name="password" placeholder="Password"
                            className="bg-white border-2 border-gray-200 rounded w-full p-2 
                            text-gray-700 focus:outline-none focus:border-blue-400"/>
                    </div>

                    <button type="submit" className="block rounded-md bg-red-800 hover:bg-red-400 px-3 py-2 text-white">Submit</button>
                </form>
            
        </main>
    )
}