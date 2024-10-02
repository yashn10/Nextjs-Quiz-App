'use client'
import { useState } from 'react'; // Make sure to import useState
import Link from 'next/link';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false); // State to track menu visibility

    const toggleMenu = () => {
        setIsOpen(!isOpen); // Toggle the state
    };

    return (

        <nav className="bg-gray-900 text-white">
            <div className="container mx-auto flex justify-between items-center p-4">
                <div className="text-2xl font-bold">QuizApp</div>

                {/* Desktop Menu */}
                <div className="hidden md:flex space-x-6">
                    <Link href="/" className="hover:text-gray-300 transition duration-300">Home</Link>
                    <Link href="/quiz" className="hover:text-gray-300 transition duration-300">Quiz</Link>
                    <Link href="/questions" className="hover:text-gray-300 transition duration-300">Questions</Link>
                </div>

                {/* Mobile Menu Button */}
                <button className="md:hidden text-2xl focus:outline-none" onClick={toggleMenu}>
                    &#9776;
                </button>
            </div>

            {/* Mobile Menu */}
            <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} transition-all duration-300 ease-in-out`}>
                <Link href="/" className="block px-4 py-2 hover:bg-gray-700">Home</Link>
                <Link href="/quiz" className="block px-4 py-2 hover:bg-gray-700">Quiz</Link>
                <Link href="/questions" className="block px-4 py-2 hover:bg-gray-700">Questions</Link>
            </div>
        </nav>

    );

};

export default Navbar;
