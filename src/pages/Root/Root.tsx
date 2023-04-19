import { Outlet } from "react-router-dom";
import MainNavigation from "../../components/Navigation/MainNavigation/MainNavigation";
import Toolbar from "../../components/Toolbar/Toolbar";
import { retrieveToken } from "../../utils/auth";
import "./Root.css";


function RootLayout() {
    return (
        <>
            <header className="main-header">
                <Toolbar>
                    <MainNavigation />
                </Toolbar>
            </header>
            <main className="content"><Outlet /></main>
        </>
    );
};

export default RootLayout;

export function loader() {
    return retrieveToken();
}