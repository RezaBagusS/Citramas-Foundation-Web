'use client'

import { Provider } from "react-redux";
import store from "../redux/store";
import NavbarScroll from "../components/molecules/navbarScroll";
import { Suspense } from "react";
import Toaster from "../components/molecules/toaster";

interface MainKontenProps {
    children: React.ReactNode;
  }

export default function MainKonten<FC>({ children }: MainKontenProps) {
    return (
        <Provider store={store}>
            <Toaster />
            <NavbarScroll />
            <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        </Provider>
    )
}