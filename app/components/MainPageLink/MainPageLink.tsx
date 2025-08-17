import Link from "next/link";
import { JSX } from "react";

const MainPageLink = (): JSX.Element => {
    
    return (
        <div className="fixed top-7 right-7">
            <Link href='/'>
                Main page
            </Link>
        </div>
    );
};

export default MainPageLink;