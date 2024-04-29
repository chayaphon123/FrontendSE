import Link from "next/link";
import { PromotionItem, PromotionJson, MenuItem,MenuJson} from "../../interfaces";
import MenuCard from "./MenuCard";


export default async function MenuCatalog({MenuJson,resID}:{MenuJson:MenuJson,resID:string})  {
    const Menus = await MenuJson
    // console.log(promotions)
    return (
        <>
            <div style={{ margin: "20px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                {
                    Menus.data.map((menuItem: MenuItem)=>(
                        <div className="my-2 mx-2">
                            <MenuCard name={menuItem.name} price={menuItem.price} resID={resID} menuID={menuItem._id}/> 
                        </div>
                    ))
                }
            </div>
        </>
    )
}