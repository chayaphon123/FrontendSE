export default async function getMenus(id:string) {

    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/restaurants/${id}/menus`)
    if(!response.ok){
        throw new Error("Failed to fetch menu")
    }
    return await response.json()
} 