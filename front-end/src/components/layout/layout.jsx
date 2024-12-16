import {
    Outlet,
    ScrollRestoration,
} from "react-router-dom";
import Header from "../home/header/header";
import Footer from "../home/footer/footer";
import LoginModal from "../login/loginModal";
import { useLoginModal } from "../../contexts/LoginModalContext";
import { useAuth } from '../../contexts/AuthContext';
const Layout = () => {
    const { isLoginModalOpen, openLoginModal, closeLoginModal } = useLoginModal();
    const { login } = useAuth();
    const handleLoginSuccess = () => {
        login();
    };
    return (
        <div>
            <header className="sticky top-0 z-50 bg-white shadow-md">
                <Header />
            </header>
            <ScrollRestoration />
            <Outlet />
            <Footer />
            {isLoginModalOpen && <LoginModal 
                onClose={closeLoginModal} 
                onLoginSuccess={handleLoginSuccess}/>}
        </div>
    );
};

export default Layout;