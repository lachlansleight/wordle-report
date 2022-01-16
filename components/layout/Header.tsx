import { useState, useEffect, useRef } from "react";
import Link from "next/link";

import { FaBars } from "react-icons/fa";

const linkClass = "text-white";
const activeLinkClass = "text-green-300";

const Header = ({ pathName = "/" }: { pathName?: string }): JSX.Element => {
    const headerRef = useRef<HTMLElement>(null);

    const [menuOpen, setMenuOpen] = useState(false);
    useEffect(() => {
        //make sure dropdown menu is open when window size is greater than 768 (tailwind md breakpoint)
        //this could introduce bugs if we change this breakpoint...
        const handleResize = () => {
            setMenuOpen(window.innerWidth > 768);
        };
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    //close the menu if the user taps anywhere outside of it
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (window.innerWidth > 768) return;

            if (e.target instanceof Node) {
                if (!headerRef.current?.contains(e.target)) {
                    setMenuOpen(false);
                }
            }
        };

        window.addEventListener("click", handleClick);
        return () => window.removeEventListener("click", handleClick);
    }, [headerRef.current]);

    return (
        <header
            ref={headerRef}
            className="flex flex-wrap flex-row justify-between items-center h-header md:space-x-4 bg-gray-800 py-2 px-6 relative"
        >
            <Link href="/">
                <a className="flex flex-row items-center">
                    <span className="ml-3 text-xl font-bold text-white">Worldle Report</span>
                </a>
            </Link>
            <button
                aria-expanded={menuOpen}
                className="grid place-items-center inline-block md:hidden w-8 h-8 text-white"
                onClick={() => setMenuOpen(!menuOpen)}
            >
                <FaBars className="text-2xl" />
            </button>
            <nav
                className={`${
                    menuOpen ? "flex" : "hidden"
                } absolute md:relative top-12 left-0 md:top-0 z-20 flex-col md:flex-row md:space-x-6 font-semibold w-full md:w-auto bg-gray-700 md:bg-transparent p-4 md:p-0 shadow-lg md:shadow-none `}
            >
                <Link href="/">
                    <a className={`${linkClass} ${pathName === "/" ? activeLinkClass : null}`}>
                        Home
                    </a>
                </Link>
                {/* <Link href="/page">
                    <a
                        className={`${linkClass} ${
                            pathName.includes("page") ? activeLinkClass : null
                        }`}
                    >
                        Page
                    </a>
                </Link>
                <span className="hidden md:block text-gray-700">|</span>
                <hr className="block md:hidden my-2" />
                <Link href="/otherpage">
                    <a
                        className={`${linkClass} ${
                            pathName.includes("otherpage") ? activeLinkClass : null
                        }`}
                    >
                        Other Page
                    </a>
                </Link> */}
            </nav>
        </header>
    );
};

export default Header;
