import Image from 'next/image';
import SearchIcon from '@mui/icons-material/Search';
import { redirect } from "next/navigation";

export default async function Banner(){
    const covers = '/img/projcover.png'

    return (
        <div className="block p-1 m-0 w-screen h-[60vh] relative">
            <Image src={covers} alt='cover' fill={true} priority objectFit='cover' />
            
            <div className="relative top-[100px] z-20 text-center">
                <h1 className='text-8xl font-serif text-white font-bold'> Restaurant</h1>
                <h1 className='text-8xl font-serif text-white font-bold'> Reservation</h1>
            </div>
            

        </div>

    );
}