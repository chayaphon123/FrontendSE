import getCar from "@/libs/getCar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/auth";
import getUserProfile from "@/libs/getUserProfile";
import reservation from "@/libs/reservation";
import { redirect } from "next/navigation";
import Link from "next/link";
import { menupromotionsItem ,MenuItem, MenuJson, menureviewsItem, RestaurantJson, RestaurantItem, PromotionItem } from "../../../../../../../interfaces";
import PromotionCard from "@/components/PromotionCard";
import { Rating} from "@mui/material";
import getMenus from "@/libs/getMenu";
import MenuCatalog from "@/components/MenuCatalog";
import ReviewCard from "@/components/reviewcard";
import postMenuReview from "@/libs/postMenureview";
import postMenuPromotion from "@/libs/addMenuPromo";

export default async function MenuDetailPage({ params }: { params: { name: string, restaurantId: string, menuId: string } }) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user.token) return null;
    const profile = await getUserProfile(session.user.token);

    const findPromotion = (menu: MenuItem[]) => {
        for (let i = 0; i < menu.length; i++) { 
            if (menu[i].name === params.name) { 
                return menu[i];
            }
        }
        throw new Error(`No menu item found with name ${params.name}`);
    };


    const menudata: MenuJson = await getMenus(params.restaurantId);
    const thismenudata: MenuItem = findPromotion(menudata.data);


    const comment = async (addUserForm: FormData) => {
        "use server"
        const comment = addUserForm.get("comment")as string ||" ";
        const rating = addUserForm.get("rating")as string || " ";
        await postMenuReview(session.user.token,params.restaurantId,params.menuId,rating,comment);


        redirect(`/menu/${params.name}/${params.restaurantId}//${params.menuId}`)
    } 

    const calculateAverageRating = (reviews: menureviewsItem[]) => {
        const totalRating = reviews.reduce((acc, current) => {
            const rating = current.rating;
            return acc + rating;
        }, 0);

        return reviews.length > 0 ? (totalRating / reviews.length) : 0;
    };
    const averageRating = calculateAverageRating(thismenudata.menureviews).toFixed(1);

    const totalRating = thismenudata.menureviews.length;

    const countReviewsWithRating = (reviews: menureviewsItem[], targetRating: number): number => {
        return reviews.reduce((acc, review) => {
            const rating = review.rating;
            return acc + (rating === targetRating ? 1 : 0);
        }, 0);
    };
    const HorizontalBars = ({ reviews }:{reviews:menureviewsItem[]}) => {
    
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

    const addPromotion= async (addUserForm: FormData) => {
        "use server";
        const name = addUserForm.get("name") as string || "";
        const detail = addUserForm.get("detail") as string || "";
        const startdate = addUserForm.get("startdate") as string || "";
        const enddate = addUserForm.get("enddate") as string || "";
        await postMenuPromotion(session.user.token,name,detail,params.restaurantId,startdate,enddate,params.menuId);
        redirect(`/menu/${params.name}/${params.restaurantId}//${params.menuId}`);
    };

    
    return (
        <main className="w-full flex flex-col items-center space-y-4 pt-20 bg-white">
            
            <h1 className="text-5xl font-medium items-center"> {params.name}</h1>
            <Link href={`/restaurant/${params.restaurantId}`} >
                            <div className="px-3 py-2 text-lg text-sky-900 ">
                               Back to Restaurant Page
                            </div>
            </Link> 

            <div className="w-full flex flex-col items-left space-y-4 pt-13 bg-white">
            <h1 className="ml-80 text-xl font-medium">Promotions</h1>
                <div><hr /></div>

                {
                    thismenudata.promotions.length?
                    <div style={{margin:"20px", display:"flex", flexDirection:"row" , flexWrap:"wrap", justifyContent:"space-around",alignContent:"space-around"}}>
                        {
                            thismenudata.promotions.map((promoItem: PromotionItem)=>(
                                <Link href={`/promotion/${promoItem._id}`} className="w-1/5">
                                    <PromotionCard name={promoItem.name} detail={promoItem.detail} restaurantname={promoItem.restaurant.name} startdate={promoItem.startDate.toString()} enddate={promoItem.endDate.toString()}
                                /> 
                                </Link>
                            ))
                        }
                    </div>:<div className="text-center">No promotion available</div>
                }

            </div>

            <div className="w-full flex flex-col items-left space-y-4 pt-13 bg-white">
            {profile.data.role === "admin" ? (
                <div>
                <h1 className="ml-80 text-xl font-medium">Add Promotions</h1>
                    <div><hr /></div>

                    <form className="w-full flex flex-col items-center space-y-4 pt-5 bg-white" action={addPromotion}>
                        <div className="text-xl p-2">Admin: {profile.data.name}</div>
                        <div className="flex items-center w-1/2 my-2">
                            <label className="block text-gray-700 pr-4 font-medium" htmlFor="date">Name</label>
                            <input type="text" id="name" name="name" placeholder="name"
                            className="bg-white border-2 border-gray-200 rounded w-full p-2
                            text-gray-700 focus:outline-none focus:border-blue-400"/>
                        </div>
                        <div className="flex items-center w-1/2 my-2">
                            <label className="block text-gray-700 pr-4 font-medium" htmlFor="date">Detail</label>
                            <input type="text" id="detail" name="detail" placeholder="detail"
                            className="bg-white border-2 border-gray-200 rounded w-full p-2
                            text-gray-700 focus:outline-none focus:border-blue-400"/>
                        </div>
                        <div className="flex items-center w-1/2 my-2">
                            <label className="block text-gray-700 pr-4 font-medium" htmlFor="date">Start</label>
                            <input type="date" required id="startdate" name="startdate"
                                className="bg-white border-2 border-gray-200 rounded w-full p-2 text-gray-700 focus:outline-none focus:border-blue-400" />
                        </div>
                        <div className="flex items-center w-1/2 my-2">
                            <label className="block text-gray-700 pr-4 font-medium" htmlFor="date">End</label>
                            <input type="date" required id="enddate" name="enddate"
                                className="bg-white border-2 border-gray-200 rounded w-full p-2 text-gray-700 focus:outline-none focus:border-blue-400" />
                        </div>
                        <button type="submit" className="rounded-md bg-red-800 hover:bg-red-400 px-3 py-2 text-white">Add Promotion</button>
                    </form>

                </div>
            ) : (
                <h1></h1>
            )}
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
                <HorizontalBars reviews={thismenudata.menureviews} />
                
            </div>
                    <div style={{margin: "20px",display: "flex",flexDirection: "row",overflowX: "auto",
                    padding: "20px",scrollbarWidth: "thin",scrollbarColor: "red lightgrey"}}>
                        {thismenudata.menureviews.map((reviewItem:menureviewsItem) => (   
                            <div style={{ padding: "10px" }}>          
                            <ReviewCard comment={reviewItem.comment} rating={reviewItem.rating.toString()} />
                            </div>
                        ))}
                    </div>
            </div>
            
        </main>
    );
}
