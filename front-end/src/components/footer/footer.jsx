const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-12">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <h3 className="text-lg font-bold mb-4">About Us</h3>
                    <p className="text-gray-400 mb-4">Welcome to our website, a wonderful place to explore and learn how to cook like a pro.</p>
                    <input type="email" placeholder="Enter your email" className="w-full py-2 px-4 rounded-full mb-4"/>
                    <button className="bg-blue-600 py-2 px-4 rounded-full w-full">Send</button>
                </div>
                <div>
                    <h3 className="text-lg font-bold mb-4">Learn More</h3>
                    <ul className="text-gray-400 space-y-2">
                        <li><a href="#">Our Cooks</a></li>
                        <li><a href="#">See Our Features</a></li>
                        <li><a href="#">FAQ</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-lg font-bold mb-4">Shop</h3>
                    <ul className="text-gray-400 space-y-2">
                        <li><a href="#">Gift Subscription</a></li>
                        <li><a href="#">Send Us Feedback</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-lg font-bold mb-4">Recipes</h3>
                    <ul className="text-gray-400 space-y-2">
                        <li><a href="#">What to Cook This Week</a></li>
                        <li><a href="#">Pasta</a></li>
                        <li><a href="#">Dinner</a></li>
                        <li><a href="#">Healthy</a></li>
                        <li><a href="#">Vegan</a></li>
                        <li><a href="#">Christmas</a></li>
                    </ul>
                </div>
            </div>
            <div className="text-center mt-8">
                <img src="https://placehold.co/40x40" alt="Logo" className="h-10 w-10 mx-auto mb-2"/>
                <p className="text-gray-400">LETMECOOK</p>
                <p className="text-gray-400">2023 Chefify Company | Terms of Service | Privacy Policy</p>
            </div>
            <div className="text-center mt-4">
                <p className="text-gray-400">Made with <img src="https://placehold.co/40x40" alt="Visily" className="inline h-6 w-6"/> Visily</p>
            </div>
        </footer>
    )
}

export default Footer