import Link from "next/link";
import { PromotionItem, PromotionJson } from "../../interfaces";
import PromotionCard from "./PromotionCard";

export default async function PromotionCatalog({PromoJson}:{PromoJson:PromotionJson})  {
    const promotions = await PromoJson
    // console.log(promotions)
    return (
        <>
            <div className="text-center px-10 py-4">
                Explore promotion in our catalog
            </div>
           
            <div style={{margin: "20px",display: "flex",flexDirection: "row",overflowX: "auto",padding: "10px",scrollbarWidth: "thin",scrollbarColor: "red white"}}>
                {
                    promotions.data.map((promoItem: PromotionItem)=>(
                        <Link href={`/promotion/${promoItem._id}`} className="w-1/5 my-2 mx-2">
                            <PromotionCard name={promoItem.name} detail={promoItem.detail} restaurantname={promoItem.restaurant.name} startdate={promoItem.startDate.toString()} enddate={promoItem.endDate.toString()}
                           /> 
                        </Link>
                    ))
                }
            </div>
        </>
    )
}