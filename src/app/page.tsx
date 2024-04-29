import getRestaurantPromos from '@/libs/getRestaurantPromos';
import Banner from '@/components/Banner'
import CarCatalog from '@/components/CarCatalog';
import { Suspense } from "react"
import Link from 'next/link';
import { LinearProgress } from "@mui/material"
import { PromotionJson, RestaurantJson } from '../../interfaces';
import getRestaurantLimit from '@/libs/getRestaurantLimit';
import SearchIcon from '@mui/icons-material/Search';
import { redirect } from "next/navigation";
import PromotionCatalog from '@/components/PromotionCatalog';

export default async function Home() {
  const cars:RestaurantJson = await getRestaurantLimit()
  const promos:PromotionJson = await getRestaurantPromos();

  const Search = async (addUserForm: FormData) => {
    "use server"
    const name = addUserForm.get("name")as string ||" ";

    redirect(`/searchresults/${name}/1/5`)
  } 

  return (
    <main>
      <Banner/>
      <div className="absolute bottom-40 flex justify-center items-end w-full transform translate-y-[-15px]">
            <form  className="w-[60%] flex flex-col items-center bg-white rounded-2xl shadow-lg" action={Search}>
                    <div className="flex items-center w-full">
                    <SearchIcon className="text-gray-500 m-2 ml-4" />
                    <input type="text" id="name" name="name" placeholder="Search Restaurants"
                    className="bg-white border-2 border-gray-200 rounded-xl w-full p-2
                    text-gray-700 focus:outline-none focus:border-blue-400"/>
                    <button type="submit" className="block rounded-md bg-red-800 hover:bg-red-400 px-3 py-2 text-white m-5 font-bold">Search</button>
                    </div> 
            </form>
      </div>
      <div className='p-10'>
              <h1 className='w-full font-bold pt-20 pl-20 text-2xl'>Recommended Restaurants</h1>
              <div className="flex justify-end"><Link href={"/restaurant"} className="text-red-500 hover:text-blue-700 underline">view all</Link></div>
              <CarCatalog carJson={cars}/>
              <h1 className='w-full font-bold pt-20 pl-20 text-2xl'>Special Promotions</h1>
              <div className="flex justify-end"><Link href={"/promotion"} className="text-red-500 hover:text-blue-700 underline">view all</Link></div>
              <PromotionCatalog PromoJson={promos}/>
      </div>
      
    </main>
  );
}
