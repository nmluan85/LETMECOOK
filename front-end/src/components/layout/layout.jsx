import {
    Outlet,
    ScrollRestoration,
} from "react-router-dom";
import Header from "../home/header/header";
import Footer from "../home/footer/footer";
import LoginModal from "../login/loginModal";
import { useLoginModal } from "../../contexts/LoginModalContext";
const Layout = () => {
    const {isLoginModalOpen, closeLoginModel} = useLoginModal();
    return (
        <div>
            <header className="sticky top-0 z-50 bg-white shadow-md">
                <Header />
            </header>
            <ScrollRestoration />
            <Outlet />
            <Footer />
            {isLoginModalOpen && <LoginModal onClose={closeLoginModel} />}
        </div>
    );
};

export default Layout;