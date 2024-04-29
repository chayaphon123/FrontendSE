import InteractiveCard from './InteractiveCard';
import Image from 'next/image'
import Link from 'next/link';
import { RestaurantJson, RestaurantItem, ReservationItem, ReservationJson } from '../../interfaces';
export default function ReservationCard( {rsvDate,user,restaurant,createdAt,rsvID} : 
    {rsvDate : string, user: string, restaurant: RestaurantItem, createdAt: string,rsvID:string} ) { 
        
    return (
        <main>
            <div className='w-[330px] h-[230px] rounded-lg bg-slate-50 shadow-lg'>
                    <div>
                        <div className='w-full h-[9%] pt-5 font-bold '>{restaurant.name}</div>
                        <div className='w-full h-[9%] p-[5px] font-bold px-2'>{restaurant.tel}</div>
                        <div className='w-full h-[6%] p-[3px] px-5'>Date : {rsvDate.substring(0, 10)}</div>
                    </div>
                    <div className='flex flex-row items-center px-[80px] pt-10'>
                        <div className='flex items-center h-full px-2 text-sm'>
                        <Link href={`/reser/${rsvID}`}>
                            <button className="block rounded-md bg-sky-700 hover:bg-cyan-950 px-3 py-2 text-white p-5 ">
                                Edit
                            </button>
                        </Link>
                        </div>
                        <div className='flex items-center h-full px-2 text-sm'>
                            <Link href={`/delreser/${rsvID}`}>
                                <button className="block rounded-md bg-red-800 hover:bg-red-400 px-3 py-2 text-white p-5">
                                    DELETE
                                </button>
                            </Link>
                            
                        </div>
                        
                    
                    </div>                 
            </div>
        </main>
       
    );
}

