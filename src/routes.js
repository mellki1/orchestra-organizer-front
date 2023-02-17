import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./screen/home/Home";
import Music from "./screen/music/Music";

const RoutePage = () => {
    return (
        <Routes>
            <Route
                path="/"
                element={<Home />}
            />
            <Route
                path="/music/:id"
                element={<Music authed={true} />}
            />
        </Routes>
    )
}
export default RoutePage;