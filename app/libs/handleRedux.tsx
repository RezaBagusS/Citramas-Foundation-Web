'use client'

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setKeyword } from "../redux/slices/reduxKeywordSearchSlices";

interface MainKontenProps {
    children: React.ReactNode;
}

export default function HandleRedux<FC> ({ children }: MainKontenProps) {
    
    const pathname = usePathname();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setKeyword({ keyword: '' }))
    }, [pathname])
    
    return (
        <>
            {children}
        </>
    )
}