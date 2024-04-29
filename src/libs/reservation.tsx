export default async function reservation(userrsvDate:string, userid:string, userrestaurant:string,token:string) {
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/restaurants/${userrestaurant}/reservations/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            rsvDate: userrsvDate,
            user: userid,
            restaurant: userrestaurant
        }),
    })
    if(!response.ok){
        throw new Error("Failed to Reservation")
    }
    return await response.json()

}