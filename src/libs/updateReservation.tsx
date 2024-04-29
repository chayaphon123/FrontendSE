export default async function updateReservation(reservationID:string,userrsvDate:string,token:string) {
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/reservations/${reservationID}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            rsvDate: userrsvDate

        }),
    })
    if(!response.ok){
        throw new Error("Failed to UpdateReservation")
    }
    return await response.json()

}