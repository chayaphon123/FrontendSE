import Link from "next/link"
import ProductCard from "./ProductCard"
import { RestaurantJson } from "../../interfaces"
import { RestaurantItem } from "../../interfaces"

export default async function CarCatalog({carJson}:{carJson:RestaurantJson}) {
    const carJsonReady = await carJson
    
    return (
        <>
        
        
        <div style={{margin:"20px", display:"flex", flexDirection:"row" , flexWrap:"wrap", justifyContent:"space-around",alignContent:"space-around"}}>
                {
                    carJsonReady.data.map((carItem:RestaurantItem)=>(
                        <Link href={`/restaurant/${carItem.id}`} className="w-[100%] sm:w-[50%] md:w-[30%] lg:w-[25%] p-2 sm:p-4 md:p-4 lg:p-8">
                            <ProductCard carName={carItem.name} imgSrc={"/img/reslogo.png"}  tel={carItem.tel} openningtime={carItem.openningtime} priceRange={carItem.priceRange} id={carItem._id}/>
                        </Link>
                       
                    ))
                }
                
            </div>
        </>
    )
}