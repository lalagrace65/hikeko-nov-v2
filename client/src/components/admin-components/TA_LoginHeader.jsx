import { Link } from "react-router-dom";

export default function AgencyHeader() {
    return (
        <div className="sticky top-0 z-50">
            <header  className="py-6 px-60 flex justify-between bg-white shadow-lg text-primary">
                <Link to={'/'} className="flex items-center gap-1 hover:scale-[1.03]">
                    <img src="HIKEKO-LOGO-BIG.png" alt="Logo" className="w-8 h-10" />
                    <span className=" text-xl">HIKEKO</span>
                </Link>
            </header>
        </div>
    );
}
