export default async function postMenuReview(token:string,resId:string,menuId:string,rating:string,comment:string) {
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/restaurants/${resId}/menus/${menuId}/menureviews`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            rating: parseFloat(rating),
            comment: comment
        }),
    })
    if(!response.ok){
        throw new Error("Cannot post Review")
    }
    return await response.json()

}

