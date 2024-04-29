import getCar from "@/libs/getCar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/auth";
import getUserProfile from "@/libs/getUserProfile";
import reservation from "@/libs/reservation";
import { redirect } from "next/navigation";
import getReview from "@/libs/getReview";
import ReviewCatalog from "@/components/ReviewCatalog";
import postReview from "@/libs/postReview";
import PromotionCatalog from "@/components/PromotionCatalog";
import Link from "next/link";
import { MenuItem, PromotionItem, ReviewItem, menureviewsItem } from "../../../../../interfaces";
import PromotionCard from "@/components/PromotionCard";
import { Rating} from "@mui/material";
import getMenus from "@/libs/getMenu";
import MenuCatalog from "@/components/MenuCatalog";
import RecomMenuCard from "@/components/RecomMenuCard";
import postMenu from "@/libs/postMenu";

export default async function CarDetailPage({ params }: { params: { cid: string } }) {
    const carDetail = await getCar(params.cid);
    const session = await getServerSession(authOptions);
    const menudata = await getMenus(params.cid);
    if (!session || !session.user.token) return null;

    const profile = await getUserProfile(session.user.token);
    const myReview = await getReview(params.cid,session.user.token)
    
    const addReservation = async (addUserForm: FormData) => {
        "use server";
        const date = addUserForm.get("date") as string || "";
        await reservation(date, profile.data._id, params.cid, session.user.token);
        redirect("/reservations");
    };

    const comment = async (addUserForm: FormData) => {
        "use server"
        const comment = addUserForm.get("comment")as string ||" ";
        const rating = addUserForm.get("rating")as string || " ";
        await postReview(session.user.token,params.cid,rating,comment);


        redirect(`/restaurant/${params.cid}`)
    } 
    const calculateAverageRating = (reviews: ReviewItem[]) => {
        const totalRating = reviews.reduce((acc, current) => {
            const rating = parseFloat(current.rating);
            return acc + rating;
        }, 0);

        return reviews.length > 0 ? (totalRating / reviews.length) : 0;
    };
    const averageRating = calculateAverageRating(myReview.data).toFixed(1);

    const totalRating = myReview.count;
    const countReviewsWithRating = (reviews: ReviewItem[], targetRating: number): number => {
        return reviews.reduce((acc, review) => {
            const rating = parseFloat(review.rating);
            return acc + (rating === targetRating ? 1 : 0);
        }, 0);
    };
    const HorizontalBars = ({ reviews }:{reviews:ReviewItem[]}) => {

        return (
            <div className="flex flex-col w-[15%] px-2">
                {[5, 4, 3, 2, 1].map(star => {
                    const count = countReviewsWithRating(reviews, star);
                    const widthRatio = totalRating > 0 ? (count / totalRating) * 100 : 0;

                    return (
                        <div key={star} className="flex items-center">
                            <div className="flex-1 bg-gray-300 rounded">
                                <div
                                    className="bg-red-500 rounded"
                                    style={{ width: `${widthRatio}%`, height: '10px' }}
                                />
                            </div>
                            <span className="ml-2">{count}</span>
                        </div>
                    );
                })}
            </div>
        );
    };
    const calculateMenuAverageRating = (reviews: menureviewsItem[]) => {
        const totalRating = reviews.reduce((acc, current) => {
            const rating = current.rating;
            return acc + rating;
        }, 0);

        return reviews.length > 0 ? (totalRating / reviews.length) : 0;
    };
    const findMaxRating = (menu: MenuItem[]) => {
        let maxRat = 0;
        for (let i = 0; i < menu.length; i++) { 
            const averageRatingtd = calculateMenuAverageRating(menu[i].menureviews);
            if (maxRat < averageRatingtd) { 
                maxRat = averageRatingtd;
            }
        }
        return maxRat; 
    };

    const maxRating = await findMaxRating(menudata.data);

    const findRecommended = (menu: MenuItem[]) => {
        for (let i = 0; i < menu.length; i++) { 
            const averageRatingtd = calculateMenuAverageRating(menu[i].menureviews);
            if (averageRatingtd === maxRating) { 
                return menu[i];
            }
        }
    };
    const Recommended  = await findRecommended(menudata.data);

    const addMenu= async (addUserForm: FormData) => {
        "use server";
        const name = addUserForm.get("name") as string || "";
        const price = addUserForm.get("price") as string || "";
        await postMenu(session.user.token,params.cid,name,price);
        redirect(`/restaurant/${params.cid}`);
    };


    return (
        <main className="w-full flex flex-col items-center space-y-4 pt-20 bg-white">
            <h1 className="text-5xl font-medium">{carDetail.data.name}</h1>
            <div className="space-x-10 w-fit px-10 py-5 flex flex-row justify-center bg-orange-100 rounded-full">
                <div className="text-md mx-5 font-medium">Address: {carDetail.data.address}</div>
                <div className="text-md mx-5 font-medium">Tel: {carDetail.data.tel}</div>
                <div className="text-md mx-5 font-medium">{carDetail.data.openningtime}</div>
            </div>
            <form className="w-full flex flex-col items-center space-y-4 pt-13 bg-white" action={addReservation}>
                <div className="text-xl p-2">Booker: {profile.data.name}</div>
                <div className="flex items-center w-1/2 my-2">
                    <label className="block text-gray-700 pr-4 font-medium" htmlFor="date">Date:</label>
                    <input type="date" required id="date" name="date"
                        className="bg-white border-2 border-gray-200 rounded w-full p-2 text-gray-700 focus:outline-none focus:border-blue-400" />
                </div>
                <button type="submit" className="rounded-md bg-red-800 hover:bg-red-400 px-3 py-2 text-white">Make Reservation</button>
            </form>
            <div className="w-full flex flex-col items-left space-y-4 pt-13 bg-white">
            <h1 className="ml-80 text-xl font-medium">Recommended Menus</h1>
            <div ><hr /></div>
                {
                    Recommended?
                    <div style={{ margin: "20px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}> 
                    <RecomMenuCard name={Recommended.name} price={Recommended.price} resID={params.cid} menuID={Recommended._id}/>  
                    </div>
                    :<div className="text-center">No Recommended Menus Available</div>
                }
                
                
            </div>
            <div className="w-full flex flex-col items-left space-y-4 pt-13 bg-white">
            <h1 className="ml-80 text-xl font-medium">Menus</h1>
                <div><hr /></div>

                {
                    menudata.data.length?
                    <MenuCatalog MenuJson={menudata} resID={params.cid}/>
                    :<div className="text-center">No Menu Available</div>
                }

            </div>
            
            <div className="w-full flex flex-col items-left space-y-4 pt-13 bg-white">
            {profile.data.role === "admin" ? (
                <div >
                <h1 className="ml-80 text-xl font-medium">Add Menu</h1>
                    <div className="pt-5"><hr /></div>

                    <form className="w-full flex flex-col items-center space-y-4 pt-5 bg-white" action={addMenu}>
                        <div className="text-xl p-2">Admin: {profile.data.name}</div>
                        <div className="flex items-center w-1/2 my-2">
                            <label className="block text-gray-700 pr-4 font-medium" htmlFor="date">Name</label>
                            <input type="text" id="name" name="name" placeholder="name"
                            className="bg-white border-2 border-gray-200 rounded w-full p-2
                            text-gray-700 focus:outline-none focus:border-blue-400"/>
                        </div>
                        <div className="flex items-center w-1/2 my-2">
                            <label className="block text-gray-700 pr-4 font-medium" htmlFor="date">Price</label>
                            <input type="text" id="price" name="price" placeholder="price bath"
                            className="bg-white border-2 border-gray-200 rounded w-full p-2
                            text-gray-700 focus:outline-none focus:border-blue-400"/>
                        </div>
                        <button type="submit" className="rounded-md bg-red-800 hover:bg-red-400 px-3 py-2 text-white">Add Menu</button>
                    </form>

                </div>
            ) : (
                <h1></h1>
            )}
            </div>           

            <div className="w-full flex flex-col items-left space-y-4 pt-13 bg-white">
            <h1 className="ml-80 text-xl font-medium">Promotions</h1>
                <div><hr /></div>

                {
                    carDetail.data.restaurantPromos.length?
                    <div style={{margin:"20px", display:"flex", flexDirection:"row" , flexWrap:"wrap", justifyContent:"space-around",alignContent:"space-around"}}>
                        {
                            carDetail.data.restaurantPromos.map((promoItem: PromotionItem)=>(
                                <Link href={`/promotion/${promoItem._id}`} className="w-1/5">
                                    <PromotionCard name={promoItem.name} detail={promoItem.detail} restaurantname={promoItem.restaurant.name} startdate={promoItem.startDate.toString()} enddate={promoItem.endDate.toString()}
                                /> 
                                </Link>
                            ))
                        }
                    </div>:<div className="text-center">No Promotion Available</div>
                }

            </div>
            

            <div className="w-full flex flex-col items-left space-y-4 pt-13 bg-white">
                <h1 className="ml-80 text-xl font-medium">Review</h1>
                <div><hr /></div>

                <form  className="w-[100%] flex flex-col items-center space-y-4 bg-white" action={comment}>
                    <div className="flex items-center w-1/2 my-2 p-5">
                    <input type="text" id="comment" name="comment" placeholder="Comment"
                    className="bg-white border-2 border-gray-200 rounded w-full p-2
                    text-gray-700 focus:outline-none focus:border-blue-400"/>
                    <label className="w-auto block text-gray-700  m-4 font-medium" htmlFor="Max">
                        Rating 
                    </label>
                    <select id="rating" name="rating" className="bg-white border-2 border-gray-200 rounded w-28 p-2 text-gray-700 focus:outline-none focus:border-blue-400">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </select>
                    <button type="submit" className="block rounded-md bg-red-800 hover:bg-red-400 px-3 py-2 text-white m-5">Comment</button>
                    </div>
               
                
            </form>
            
            <div className="flex justify-center items-center">
                <div
                    style={{
                        display: 'flex',
                        width: '100px',
                        height: '100px',
                        borderRadius: '50%',
                        border: '7px solid red',
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        fontSize: '2rem',
                        color: 'black',
                    }}>
                {averageRating}
                </div>
                <div className="flex flex-col items-left px-2">
                    <div><Rating defaultValue={5} size="small" max={5} sx={{color: 'black'}} readOnly /></div>
                    <div><Rating defaultValue={4} size="small" max={4} sx={{color: 'black'}} readOnly /></div>
                    <div><Rating defaultValue={3} size="small" max={3} sx={{color: 'black'}} readOnly /></div>
                    <div><Rating defaultValue={2} size="small" max={2} sx={{color: 'black'}} readOnly /></div>
                    <div><Rating defaultValue={1} size="small" max={1} sx={{color: 'black'}} readOnly /></div>
                </div>
                <HorizontalBars reviews={myReview.data} />
                
            </div>
                <ReviewCatalog reviewJson={myReview}/>
            </div>
            
           
        </main>
    );
}
