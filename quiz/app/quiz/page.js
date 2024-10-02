"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';
import Home from './home';


const Quiz = () => {

    // State for quiz questions and user selections
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [userAnswers, setUserAnswers] = useState({});
    const [score, setScore] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null); // Default category
    const [timer, setTimer] = useState(20); // Set initial timer (e.g., 5 minutes = 300 seconds)
    const [isRunning, setIsRunning] = useState(false);


    useEffect(() => {
        let interval;

        if (isRunning && timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => {
                    console.log(prev);
                    return prev - 1
                });
            }, 1000);
        } else if (timer === 0) {
            clearInterval(interval);
            alert('Time is up! Submitting your quiz.');
        }

        return () => clearInterval(interval);
    }, [isRunning, timer])


    // Fetch quiz questions from the backend
    useEffect(() => {
        const fetchQuestions = async () => {
            if (selectedCategory) {
                const response = await axios.get(`https://nextjs-quiz-app.onrender.com/api/questions/?category=${selectedCategory}`); // Fetch from backend API

                if (response.status === 200) {
                    setQuestions(response.data);
                } else {
                    alert("no questions available");
                }
            }
        };

        if (selectedCategory === null) {
            console.log("Please select your category");
        } else {
            fetchQuestions();
        }

    }, [selectedCategory]);


    // Handle option selection
    const handleOptionSelect = (questionIndex, option) => {
        setUserAnswers({
            ...userAnswers,
            [questionIndex]: option,
        });
    };

    // Submit quiz and calculate score
    const handleSubmit = (e) => {
        e.preventDefault();

        let newScore = 0;
        questions.forEach((question, index) => {
            if (userAnswers[index] === question.correctAnswer) {
                newScore += 1;
            }
        });

        setScore(newScore);
    };

    // Move to the next question
    const handleNextQuestion = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        }
    };

    // Reset the quiz
    const handleReset = () => {
        setUserAnswers({});
        setCurrentQuestion(0);
        setScore(null);
    };

    // Display the score once the quiz is finished
    if (score !== null) {
        return (
            <div className="container mx-auto text-center" style={{ height: "65vh", alignContent: "center" }}>
                <h2 className="text-2xl font-bold">Quiz Completed!</h2>
                <p className="mt-4">Your score is {score} out of {questions.length}</p>
                <button
                    onClick={handleReset}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                >
                    Retake Quiz
                </button>
            </div>
        );
    }

    const startQuiz = () => {
        setIsRunning(true);
    }

    // Display current question
    const current = questions[currentQuestion];


    return (

        <div className="flex h-100">

            {selectedCategory === null ? (
                <Home onSelectCategory={(category) => setSelectedCategory(category)} />
            ) : (
                <>

                    {/* Sidebar */}
                    <div className="w-64 bg-gray-900 text-white h-100 p-4">
                        <h2 className="text-xl font-bold mb-6">Categories</h2>
                        <nav className="space-y-4">
                            <button
                                className={`block w-full text-left hover:bg-gray-700 px-3 py-2 rounded ${selectedCategory === 'ReactJS' ? 'bg-gray-700' : ''}`}
                                onClick={() => { setSelectedCategory('ReactJS'); startQuiz() }}
                            >
                                ReactJS
                            </button>
                            <button
                                className={`block w-full text-left hover:bg-gray-700 px-3 py-2 rounded ${selectedCategory === 'JavaScript' ? 'bg-gray-700' : ''}`}
                                onClick={() => { setSelectedCategory('JavaScript'); startQuiz() }}
                            >
                                JavaScript
                            </button>
                            <button
                                className={`block w-full text-left hover:bg-gray-700 px-3 py-2 rounded ${selectedCategory === 'NodeJS' ? 'bg-gray-700' : ''}`}
                                onClick={() => { setSelectedCategory('NodeJS'); startQuiz() }}
                            >
                                NodeJS
                            </button>
                            <button
                                className={`block w-full text-left hover:bg-gray-700 px-3 py-2 rounded ${selectedCategory === 'ExpressJS' ? 'bg-gray-700' : ''}`}
                                onClick={() => { setSelectedCategory('ExpressJS'); startQuiz() }}
                            >
                                ExpressJS
                            </button>
                        </nav>
                    </div>

                    {/* Main Quiz Section */}
                    <div className="flex-1 p-20">
                        {questions.length === 0 ? (
                            <div style={{
                                "height": "70vh", "textAlign": "center", "alignContent": "center", "fontSize": "40px"
                            }}>No questions available</div>
                        ) : (
                            <div>
                                <h2 className="text-2xl font-bold mb-4">{selectedCategory} Quiz</h2>

                                <div className="mt-4 text-xl font-semibold float-right">
                                    <span className={`bg-gray-800 text-white px-4 py-2 rounded-md shadow-lg transition-all duration-500 ease-in-out ${timer <= 10 ? 'bg-red-600' : 'bg-gray-800'}`}>
                                        Time Remaining: {Math.floor(timer / 60)}:{String(timer % 60).padStart(2, '0')}
                                    </span>
                                </div>

                                <p className="text-lg mb-4">{currentQuestion + 1}. {current.question}</p>

                                {/* Options */}
                                <form onSubmit={handleSubmit}>
                                    {current.options.map((option, index) => (
                                        <div key={index} className="mt-2">
                                            <label className="block">
                                                <input
                                                    type="radio"
                                                    name={`question-${currentQuestion}`}
                                                    value={option}
                                                    checked={userAnswers[currentQuestion] === option}
                                                    onChange={() => handleOptionSelect(currentQuestion, option)}
                                                    className="mr-2"
                                                    required
                                                />
                                                {option}
                                            </label>
                                        </div>
                                    ))}

                                    {/* Navigation buttons */}
                                    <div className="mt-4">
                                        {currentQuestion > 0 && (
                                            <button
                                                type="button"
                                                onClick={handlePreviousQuestion}
                                                className="mr-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
                                            >
                                                Previous
                                            </button>
                                        )}

                                        {currentQuestion < questions.length - 1 ? (
                                            <button
                                                type="button"
                                                onClick={handleNextQuestion}
                                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                                            >
                                                Next
                                            </button>
                                        ) : (
                                            <button
                                                type="submit"
                                                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                                            >
                                                Submit Quiz
                                            </button>
                                        )}
                                    </div>
                                </form>
                            </div>
                        )}
                    </div>

                </>
            )}

        </div>


    );

}

export default Quiz