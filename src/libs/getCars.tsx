export default async function getRestaurants() {


    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/restaurants`)
    if(!response.ok){
        throw new Error("Failed to fetch car")
    }
    return await response.json()
} 