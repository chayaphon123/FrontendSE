export default async function getRestaurantPromo(id:string) {
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/promotions/${id}`)
    if(!response.ok){
        throw new Error("Failed to fetch car")
    }
    return await response.json()
}