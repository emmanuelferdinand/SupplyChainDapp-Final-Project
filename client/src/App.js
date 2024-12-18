import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import AppRoutes from "./routes";

const App = () => {
    const [role, setRole] = useState("Buyer"); // Default role

    const handleRoleChange = (newRole) => {
        setRole(newRole);
    };

    return (
        <BrowserRouter>
            <Header onRoleChange={handleRoleChange} />
            <AppRoutes role={role} />
        </BrowserRouter>
    );
};

export default App;
