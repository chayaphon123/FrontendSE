import styles from './topmenu.module.css';
import Image from 'next/image';
import TopMenuItem from './TopMenuItem';
import { getServerSession } from 'next-auth';
import { authOptions } from "@/libs/auth";
import { Link } from '@mui/material';


export default async function TopMenu() {

    const session = await getServerSession(authOptions)
    
    return (
        <div className={"fixed top-0 left-0 right-0 bg-slate-950 h-16 z-30 border border-gray-300 flex gap-5 flex-row-reverse"}>
            <div className='flex flex-row absolute left-0 h-full '>
                <Link href="/">
                    <Image src={'/img/weblogo.png'} className={styles.logoimg} alt='logo'
                    width={0} height={0} sizes='100vh'/>
                </Link>
                <TopMenuItem title='Restaurants' pageRef='/restaurant' />
                <TopMenuItem title='My Reservation' pageRef='/reservations' />
                <TopMenuItem title='Promotion' pageRef='/promotion' />
            </div>
            

            <div className='flex flex-row absolute right-0 h-full'>
            {
                session? ""
                : <Link href="/register" >
                    <div className='flex items-center h-full px-2 text-sm'>
                        <button className="block rounded-md bg-lime-700 hover:bg-lime-950 px-3 py-2 text-white ">
                            Register
                        </button>
                    </div>
                        
                </Link>
            }
            {
                session? <Link href="/api/auth/signout">
                    <div className='flex items-center h-full px-2 text-sm'>
                        <button className="block rounded-md bg-red-800 hover:bg-red-400 px-3 py-2 text-white ">
                            Log Out
                        </button>
                    </div>
                </Link>
                : <Link href="/api/auth/signin" >
                    <div className='flex items-center h-full px-2 text-sm'>
                        <button className="block rounded-md bg-red-800 hover:bg-red-400 px-3 py-2 text-white ">
                            Log In
                        </button>
                    </div>
                        
                </Link>
            }
            </div>

            
        </div>
    );
}
