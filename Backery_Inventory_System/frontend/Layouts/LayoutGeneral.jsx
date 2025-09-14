import NavBar from "../src/components/NavBar";
import Footer from "../src/components/Footer";

// Dependencias
import { Outlet } from "react-router-dom";
// CSS
import '../src/css/LayoutGeneral.css';


export default function LayoutGeneral() {
    return (
        <div className="app-container">
            <div className="navbar-container">
                <NavBar />
            </div>
            

            <main className="main-container">
                <Outlet/>
            </main>

            <div className="footer-con">
                <Footer />
            </div> 
        </div>
    );
}