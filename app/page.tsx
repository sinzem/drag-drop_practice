import Link from "next/link";
import { JSX } from "react";

export default function Home(): JSX.Element {
  return (
    <div>
        <div className='w-[100%] h-[100vh] px-[12vw] py-[16vh]'>
            <h1 className="text-4xl font-bold">Drag and Drop Practice</h1>
            <nav className='my-8 text-xl flex flex-col gap-4'>
              <li>
                <Link href='/ulbicards'>
                  From UlbiTV - cards
                </Link>
              </li>
              <li>
                <Link href='/ulbitaskboard'>
                  From UlbiTV - task board
                </Link>
              </li>
            </nav>
        </div>
    </div>
  );
}
