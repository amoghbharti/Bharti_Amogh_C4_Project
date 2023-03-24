import { Outlet } from "react-router-dom";
import NavigationBar from "../navigation/NavigationBar";

function AppLayout() {
    return <div id="appLayout">
        <NavigationBar />
        <Outlet />
    </div>
}

export default AppLayout;