import { PromotionJson } from "../../interfaces"

export default async function getRestaurantPromos() {


    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/promotions`)
    if(!response.ok){
        throw new Error("Failed to fetch promo")
    }
    const result:PromotionJson = await response.json()
    return result;
} 