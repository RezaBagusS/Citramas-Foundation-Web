'use client'

import { Provider } from "react-redux";
import store from "../redux/store";
import NavbarScroll from "../components/molecules/navbarScroll";
import { Suspense } from "react";

interface MainKontenProps {
    children: React.ReactNode;
  }

export default function MainKonten<FC>({ children }: MainKontenProps) {
    return (
        <Provider store={store}>
            <NavbarScroll />
            <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        </Provider>
    )
}