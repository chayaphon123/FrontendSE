import InteractiveCard from './InteractiveCard';
import Image from 'next/image'
import getCar from "@/libs/getCar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/auth";
import getUserProfile from "@/libs/getUserProfile";
import reservation from "@/libs/reservation";
import { redirect } from "next/navigation";
import getReview from "@/libs/getReview";
import ReviewCatalog from "@/components/ReviewCatalog";
import postReview from "@/libs/postReview";
import { RestaurantJson, ReviewItem, ReviewJson } from "../../interfaces"
import { Rating } from '@mui/material';


export default async function productcard( {carName,imgSrc,tel,openningtime,priceRange,id} : 
    {carName : string, imgSrc: string, tel: string, openningtime: string,priceRange: number, id:string} ) {
    
    const session = await getServerSession(authOptions);
    if (!session || !session.user.token) return null;
    const myReview:ReviewJson = await getReview(id,session.user.token) 

    const renderPrice = (price:number)=>{
        return '$'.repeat(price);

    }
    
    const calculateAverageRating = (reviews: ReviewItem[]) => {
            const totalRating = reviews.reduce((acc, current) => {
                const rating = parseFloat(current.rating);
                return acc + rating;
            }, 0);
    
            return reviews.length > 0 ? (totalRating / reviews.length) : 0;
        };
    const averageRating = calculateAverageRating(myReview.data);
    const precisionAverageRating = averageRating.toFixed(1);
    
    return (
        <InteractiveCard contentName={carName}>          
            <div className='w-full h-[70%] relative rounded-t-lg '>
                <Image src={imgSrc}
                alt='Product Picture'
                fill={true}
                className='object-cover rounded-t-lg '
                />
            </div>
            <div>
                <div className='w-full h-[9%] p-[5px] font-bold px-5'>{carName}</div>
                <div className='w-full h-[6%] p-[0px] px-5 item-center'>
                    <Rating name="half-rating-read" defaultValue={averageRating} precision={0.5} size="small" 
                        sx={{color: 'red'}} readOnly /> {precisionAverageRating}
                    <p>({myReview.count} {myReview.count <= 1 ? 'review' : 'reviews'})</p>
                </div>
                <div className='w-full h-[6%] p-[0px] px-5'>{openningtime}</div>
                <div className='w-full h-[6%] p-[0px] px-5 text-green-700 font-bold'>{renderPrice(priceRange)}</div>

            </div>
         
        </InteractiveCard>
       
    );
}