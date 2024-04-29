export default async function getReview(id:string,token:string) {
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/restaurants/${id}/reviews`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`
    }})
        
    if(!response.ok){
        throw new Error("Failed to fetch review")
    }
    return await response.json()

}