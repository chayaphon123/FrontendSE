export default async function postMenuPromotion(token:string,name:string,detail:string,resId:string,startD:string,endD:string,menuId:string) {
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/promotions`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            name: name,
            detail: detail,
            restaurant: resId,
            startDate: startD,
            endDate: endD,
            menu: menuId
        }),
    })
    if(!response.ok){
        throw new Error("Cannot post Promotion")
    }
    return await response.json()

}

