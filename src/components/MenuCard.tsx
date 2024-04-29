import { Rating } from '@mui/material';
import { Link } from '@mui/material';
import getMenus from '@/libs/getMenu';
import { PromotionItem, ReviewItem, menupromotionsItem ,MenuItem } from "../../interfaces";

export default async function MenuCard( {name,price,resID,menuID} : {name: string, price: number,resID: string, menuID: string } ) { 

    const findPromotion = (menu: MenuItem[]) => {
        for (let i = 0; i < menu.length; i++) { 
            if (menu[i].name === name) { 
                return menu[i];
            }
        }
    };

    const menudata = await getMenus(resID);
    const thismenudata = await findPromotion(menudata.data);

    const calculateAverageRating = (reviews: ReviewItem[]) => {
        const totalRating = reviews.reduce((acc, current) => {
            const rating = parseFloat(current.rating);
            return acc + rating;
        }, 0);

        return reviews.length > 0 ? (totalRating / reviews.length) : 0;
    };
    const averageRating = calculateAverageRating(thismenudata.menureviews).toFixed(1);
        
    return (
        <main>
            <div className='w-[750px] h-[65px] rounded-lg bg-slate-100 relative'>
                <div className="pt-5 px-5 py-5">
                    <span className='block font-bold text-lg'>{name}</span>
                    <span className="absolute inset-y-0 right-0 flex items-center mr-5">
                        <span className='p-[5px] font-bold text-red-600 text-lg mr-5'>{price} ฿</span>
                        <Rating name="half-rating-read mr-5" defaultValue={averageRating} precision={0.5} sx={{color: 'red'}} readOnly />
                        <span className='p-[5px] font-bold text-red-600 text-lg mr-5'></span>
                        <Link href={`/menu/${name}/${resID}/${menuID}`} >
                            <button className="block rounded-md bg-lime-700 hover:bg-lime-950 px-3 py-2 text-white mr-5 ">
                                Details
                            </button>
                        </Link>
                        
                    </span>
                </div>                
            </div>

        </main>
       
    );
}

