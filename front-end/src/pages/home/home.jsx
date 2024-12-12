import React from 'react';
import { useState } from 'react';
import SeasonRecipe from '../../components/home/seasonRecipe/seasonRecipe';
import Banner from '../../components/home/banner/banner';
import TrendingDishes from '../../components/trending_dishes/trending_dishes';
import { useLoginModal } from '../../contexts/LoginModalContext';
import { useAuth } from '../../contexts/AuthContext';
import LoginModal from '../../components/login/loginModal';
const Home = () => {
    const { isLoginModalOpen, openLoginModal, closeLoginModal } = useLoginModal();
    const { login } = useAuth();
    const handleLoginSuccess = () => {
        login();
    };
    return (
        <div>
            <main>
                <div className='pd-10 flex flex-col gap-10'>
                    <Banner />
                    <SeasonRecipe openLoginModal={openLoginModal}/>
                    <TrendingDishes />
                </div>
            </main>
            {isLoginModalOpen && (
                <LoginModal 
                    onClose={closeLoginModal}
                    onLoginSuccess = {handleLoginSuccess} />
            )}
        </div>
    );
}
export default Home;