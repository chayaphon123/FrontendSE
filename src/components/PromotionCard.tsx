import InteractiveCard from "./InteractiveCard";
import PromotionInteractiveCard from "./PromotionInteractiveCard";

export default function PromotionCard ({name,detail,restaurantname,startdate,enddate,onCompare}: 
    {name:string , detail:string, restaurantname: string, startdate:string, enddate:string, onCompare?:Function}
) {

    return (
       <PromotionInteractiveCard contentName={name}>
             <div className="w-[300px] py-6">
                <div className='w-full h-[9%] p-[5px] font-bold px-5'>{name}</div>
                <div className='w-full h-[6%] p-[3px] px-5'>{restaurantname}</div>
               <div className='w-full h-[6%] p-[0px] px-5'>start date: {startdate.slice(0,10)}</div>
                <div className='w-full h-[6%] p-[0px] px-5'>end date: {enddate.slice(0,10)}</div>
            </div>
       </PromotionInteractiveCard>
    )
}