import React from 'react'

const Footer = () => {

    return (

        <footer className="bg-gray-900 text-white">
            <div className="container mx-auto py-8 px-4">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-bold">QuizApp</h2>
                        <p className="mt-2 text-gray-400">Making learning fun and interactive!</p>
                    </div>
                    <div className="space-x-4">
                        <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                            <i className="fab fa-facebook-f"></i>
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                            <i className="fab fa-instagram"></i>
                        </a>
                    </div>
                </div>
                <div className="mt-8 text-center text-gray-400">
                    <p>&copy; 2024 QuizApp. All rights reserved.</p>
                </div>
            </div>
        </footer>

    );

}

export default Footer