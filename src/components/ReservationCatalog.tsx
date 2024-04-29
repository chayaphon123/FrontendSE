import Link from "next/link"
import ReservationCard from "./ReservationCard"
import { RestaurantJson, ReservationItem, ReservationJson } from "../../interfaces"

export default async function ReservationCatalog({carJson}:{carJson:ReservationJson}) {
    const carJsonReady = await carJson
    return (
        <>
        {carJsonReady.count} Reservation
        <div style={{margin:"20px", display:"flex", flexDirection:"row" , flexWrap:"wrap", justifyContent:"space-around",alignContent:"space-around"}}>
                {
                    carJsonReady.data.map((carItem:ReservationItem)=>(
                        <div className="w-[100%] sm:w-[50%] md:w-[30%] lg:w-[25%] p-2 sm:p-4 md:p-4 lg:p-8">   
                            <ReservationCard rsvDate={carItem.rsvDate} user={carItem._id} createdAt={carItem.createdAt} rsvID={carItem._id} restaurant={carItem.restaurant}/>          
                        </div>
                    ))
                }
                
            </div>
        </>
    )
}
