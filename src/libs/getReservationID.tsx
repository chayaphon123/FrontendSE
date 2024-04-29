export default async function getReservationID(id:string,token:string) {
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/reservations/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`
    }})
        
    if(!response.ok){
        throw new Error("Failed to getReservation")
    }
    return await response.json()

}