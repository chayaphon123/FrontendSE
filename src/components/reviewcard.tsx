import InteractiveCard from './InteractiveCard';
import Image from 'next/image'
import Link from 'next/link';
import { RestaurantJson, RestaurantItem, ReservationItem, ReservationJson } from '../../interfaces';
import React from 'react'; 
import { Rating } from '@mui/material';

export default function ReviewCard( {comment,rating} : 
    {comment:string, rating:string} ) { 
    
    return (
        <main>
            <div className="w-[330px] h-[200px] rounded-lg bg-slate-50 shadow-lg">
                    <div className="flex flex-col items-center py-2">
                        <Rating name="half-rating-read" defaultValue={parseInt(rating)} precision={0.5} sx={{color: 'red'}} readOnly />
                        <div className="w-full h-[9%] p-[5px] px-2">{comment}</div>
                    </div>              
            </div>
        </main>
       
    );
}

