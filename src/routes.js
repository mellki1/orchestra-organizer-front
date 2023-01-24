import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./screen/Home";

const RoutePage = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
        </Routes>
    )
}
export default RoutePage;