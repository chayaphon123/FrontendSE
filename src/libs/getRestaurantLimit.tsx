import { resolve } from "path"

export default async function getRestaurantLimit() {


    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/restaurants/limit`,)
    if(!response.ok){
        throw new Error("Failed to fetch limit")
    }
    return await response.json()
} 