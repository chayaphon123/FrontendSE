import getRestaurantsPromo from "@/libs/getRestaurantPromos"
import { PromotionItem, PromotionJson } from "../../../../interfaces"
import Link from "next/link"
import { Suspense } from "react"
import { LinearProgress } from "@mui/material"
import PromotionCard from "@/components/PromotionCard"

export default async function Promotion() {
    const promotions:PromotionJson = await getRestaurantsPromo()
    return (
        <main className="text-center p-5 ">
        <h1 className="text-5xl font-medium p-10">All Promotion for restaurants</h1>
        <Suspense fallback={<p>Loading... <LinearProgress/></p>}>
        <div className="text-center px-10 py-4">
                Explore promotion in our catalog
            </div>
           
            <div style={{margin:"20px", display:"flex", flexDirection:"row" , flexWrap:"wrap", justifyContent:"space-around",alignContent:"space-around"}}>
                {
                    promotions.data.map((promoItem: PromotionItem)=>(
                        <Link href={`/promotion/${promoItem._id}`} className="w-1/5 my-2 mx-2">
                            <PromotionCard name={promoItem.name} detail={promoItem.detail} restaurantname={promoItem.restaurant.name} startdate={promoItem.startDate.toString()} enddate={promoItem.endDate.toString()}
                           /> 
                        </Link>
                    ))
                }
            </div>
        </Suspense>
    </main>
    )
}