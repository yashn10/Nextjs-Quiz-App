"use client"
import axios from 'axios';
import Link from 'next/link';
import React, { useState } from 'react'


const Question = () => {

    // State to handle the form inputs
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState(['', '', '', '']);
    const [correctAnswer, setCorrectAnswer] = useState('');
    const [category, setCategory] = useState('ReactJS'); // Default category


    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Payload to send to the backend
        const questionData = {
            question,
            options,
            correctAnswer,
            category
        };

        const response = await axios.post('http://localhost:5000/api/questions', questionData);

        if (response.status === 201) {
            alert('Question added successfully!');
            // Clear the form
            setQuestion('');
            setOptions(['', '', '', '']);
            setCorrectAnswer('');
            setCategory('ReactJS');
        } else {
            alert('Failed to add question');
        }
    };


    // Handle option changes
    const handleOptionChange = (index, value) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };


    return (

        <div className="container mx-auto p-12">
            <h1 className="text-2xl font-bold mb-4">Add a New Question</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Question */}
                <div>
                    <label className="block text-gray-700">Question:</label>
                    <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        required
                    />
                </div>

                {/* Options */}
                <div>
                    <label className="block text-gray-700">Options:</label>
                    {options.map((option, index) => (
                        <div key={index} className="mt-2">
                            <input
                                type="text"
                                className="w-full p-2 border border-gray-300 rounded"
                                value={option}
                                placeholder={`Option ${index + 1}`}
                                onChange={(e) => handleOptionChange(index, e.target.value)}
                                required
                            />
                        </div>
                    ))}
                </div>

                {/* Correct Answer */}
                <div>
                    <label className="block text-gray-700">Correct Answer:</label>
                    <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded"
                        value={correctAnswer}
                        onChange={(e) => setCorrectAnswer(e.target.value)}
                        placeholder="Correct answer (e.g. Option 1)"
                        required
                    />
                </div>

                <div>
                    <label className="block text-gray-700">Question Category:</label>
                    <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-4 py-2 border rounded-lg" required>
                        <option value="ReactJS">ReactJS</option>
                        <option value="JavaScript">JavaScript</option>
                        <option value="NodeJS">NodeJS</option>
                        <option value="ExpressJS">ExpressJS</option>
                    </select>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                >
                    Add Question
                </button>

                <Link href={"/allquestions"}
                    type="button"
                    className="px-4 py-3 bg-orange-500 text-white rounded hover:bg-orange-600 transition ml-2"
                >
                    View Questions
                </Link>

            </form>
        </div>

    );

};

export default Question