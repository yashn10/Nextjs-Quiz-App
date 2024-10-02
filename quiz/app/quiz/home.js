import React from 'react'

const Home = ({ onSelectCategory }) => {


    // Category Card Component
    const CategoryCard = ({ title, description, onClick }) => {
        return (

            <div
                className="cursor-pointer bg-blue-500 text-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105"
                onClick={onClick}  // Pass the onClick prop
            >
                <h3 className="text-xl font-bold mb-2">{title}</h3>
                <p>{description}</p>
            </div>

        );
    };


    return (

        <div className="text-center py-12 bg-white">
            <h1 className="text-4xl font-bold mb-6 transition-transform duration-500 hover:scale-105">Welcome to the Ultimate Quiz Challenge</h1>
            <p className="text-lg mb-4 opacity-80 transition-opacity duration-300 hover:opacity-100">Test your knowledge across various topics and improve your skills with our fun and engaging quizzes.</p>

            {/* Quiz Categories */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-10 p-5">
                <CategoryCard
                    title="ReactJS"
                    description="Improve your React skills with our comprehensive ReactJS quiz."
                    onClick={() => onSelectCategory('ReactJS')}
                />
                <CategoryCard
                    title="JavaScript"
                    description="Test your JavaScript knowledge and brush up on your core concepts."
                    onClick={() => onSelectCategory('JavaScript')}
                />
                <CategoryCard
                    title="NodeJS"
                    description="Challenge yourself with our advanced NodeJS questions."
                    onClick={() => onSelectCategory('NodeJS')}
                />
                <CategoryCard
                    title="ExpressJS"
                    description="Improve your React skills with our comprehensive ReactJS quiz."
                    onClick={() => onSelectCategory('ExpressJS')}
                />
            </div>

            {/* Quiz Advantages Section */}
            <div className="mt-12">
                <h2 className="text-2xl font-semibold mb-4 transition-transform duration-500 hover:scale-105">Why Take Our Quizzes?</h2>
                <ul className="list-disc list-inside text-left mx-auto w-1/2">
                    <li className="mb-2 transition-transform duration-300 transform hover:translate-x-1">Strengthen your programming knowledge with real-world questions.</li>
                    <li className="mb-2 transition-transform duration-300 transform hover:translate-x-1">Receive instant feedback on your answers.</li>
                    <li className="mb-2 transition-transform duration-300 transform hover:translate-x-1">Track your progress and improve over time.</li>
                </ul>
            </div>
        </div>

    );

}

export default Home