export default async function register(username:string, usertelephonenumber:string, useremail:string, userpassword:string,userrole:string) {
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: username,
            telephonenumber: usertelephonenumber,
            email: useremail,
            password: userpassword,
            role: userrole
        }),
    })
    if(!response.ok){
        throw new Error("Failed to Register")
    }
    return await response.json()

}