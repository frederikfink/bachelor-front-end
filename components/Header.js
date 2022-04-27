import { useTheme } from "next-themes";
import { SunIcon, MoonIcon } from "@heroicons/react/solid";
import { useState, useEffect } from "react";


const Header = () => {

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, [])

    const { systemTheme, theme, setTheme } = useTheme();

    const renderThemeChanger = () => {
        if (!mounted) return null;

        const currentTheme = theme === "system" ? systemTheme : theme;

        if (currentTheme === "dark") {
            return (
                <SunIcon className="w-5 h-5 " role="button" onClick={() => setTheme('light')} />
            )
        }

        else {
            return (
                <MoonIcon className="w-5 h-5 text-gray-900 " role="button" onClick={() => setTheme('dark')} />
            )
        }
    };

    return (
        <>
        <header className="fixed border-b-1 h-16 w-screen z-40 border-b backdrop-blur bg-white/30 dark:bg-black/30">
            <div className="flex justify-between container m-auto items-center align-center h-full">
                trust-scan
                {renderThemeChanger()}
            </div>
        </header>
        <div className="h-24 spaceer"></div>
        </>
    );
};

export default Header;