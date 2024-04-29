import Link from "next/link"
import ProductCard from "./ProductCard"
import { RestaurantJson, ReviewItem, ReviewJson } from "../../interfaces"
import { RestaurantItem } from "../../interfaces"
import ReviewCard from "./reviewcard"

export default async function ReviewCatalog({reviewJson}:{reviewJson:ReviewJson}) {
    const reviewJsonReady = await reviewJson
    return (
        <>
        <div className="text-right mr-3">{reviewJsonReady.count} {reviewJsonReady.count <= 1 ? 'review' : 'reviews'}</div>
        
        <div style={{margin: "20px",display: "flex",flexDirection: "row",overflowX: "auto",
            padding: "20px",scrollbarWidth: "thin",scrollbarColor: "red lightgrey"}}>
            {reviewJsonReady.data.map((reviewItem:ReviewItem) => (   
                <div style={{ padding: "10px" }}>          
                <ReviewCard comment={reviewItem.comment} rating={reviewItem.rating} />
                </div>
            ))}
        </div>
        </>
    )
}