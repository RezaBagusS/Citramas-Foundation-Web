'use client'

import { Provider, useDispatch } from "react-redux";
import store from "../redux/store";
import NavbarScroll from "../components/molecules/navbarScroll";
import { Suspense, useEffect } from "react";
import Toaster from "../components/molecules/toaster";
import MobileMenu from "../components/molecules/mobileMenu";

interface MainKontenProps {
    children: React.ReactNode;
}

export default function MainKonten<FC>({ children }: MainKontenProps) {

    return (
        <Provider store={store}>
            <MobileMenu />
            <Toaster />
            <NavbarScroll />
            <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        </Provider>
    )
}