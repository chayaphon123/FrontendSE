export default async function postRestaurant(token:string,username:string,useradd:string,usertel:string,useropen:string) {
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/restaurants`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            name: username,
            address: useradd,
            tel: usertel,
            openningtime: useropen
        }),
    })
    if(!response.ok){
        throw new Error("Cannot post Restaurant")
    }
    return await response.json()

}

