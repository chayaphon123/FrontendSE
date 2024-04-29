export default async function postMenu(token:string,resId:string,name:string,price:string) {
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/restaurants/${resId}/menus`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            name: name,
            price: Number(price),
            restaurant: resId
        }),
    })
    if(!response.ok){
        throw new Error("Cannot post Menu")
    }
    return await response.json()

}

