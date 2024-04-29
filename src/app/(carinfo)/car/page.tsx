import getCars from "@/libs/getCars"
import CarCatalog from "@/components/CarCatalog"
import { Suspense } from "react"
import { LinearProgress } from "@mui/material"
import { RestaurantJson } from "../../../../interfaces"
import SearchIcon from '@mui/icons-material/Search';
import { redirect } from "next/navigation";


export default async function Car() {

    const cars:RestaurantJson = await getCars()
    const Search = async (addUserForm: FormData) => {
        "use server"
        const name = addUserForm.get("name")as string ||" ";
        const min = addUserForm.get("min")as string || " ";
        const max = addUserForm.get("max")as string || " ";

        redirect(`/searchresults/${name}/${min}/${max}`)
    }  

    return (
        <main className="text-center p-5 ">

            <h1 className="text-5xl font-medium p-10">Select Your Restaurants</h1>
            <div className="text-center p-5">
            <form  className="w-[100%] flex flex-col items-center space-y-4 bg-white" action={Search}>
                    <div className="flex items-center w-1/2 my-2 p-5">
                    <SearchIcon className="text-gray-500 m-2" />
                    <input type="text" id="name" name="name" placeholder="Search Restaurants"
                    className="bg-white border-2 border-gray-200 rounded-xl w-full p-2
                    text-gray-700 focus:outline-none focus:border-blue-400"/>
                    <label className="w-auto block text-gray-700  m-4" htmlFor="Min">
                        Min 
                    </label>
                    <select id="min" name="min" className="bg-white border-2 border-gray-200 rounded w-28 p-2 text-gray-700 focus:outline-none focus:border-blue-400">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </select>
                    <label className="w-auto block text-gray-700  m-4" htmlFor="Max">
                        Max 
                    </label>
                    <select id="max" name="max" className="bg-white border-2 border-gray-200 rounded w-28 p-2 text-gray-700 focus:outline-none focus:border-blue-400">
                        <option>5</option>
                        <option>4</option>
                        <option>3</option>
                        <option>2</option>
                        <option>1</option>
                    </select>
                    <button type="submit" className="block rounded-md bg-red-800 hover:bg-red-400 px-3 py-2 text-white m-5">Search</button>
                    </div>
               
                
            </form>
        </div>
            <Suspense fallback={<p>Loading... <LinearProgress/></p>}>
            <CarCatalog carJson={cars}/>
            </Suspense>
        </main>
    )
}
