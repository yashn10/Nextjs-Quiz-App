"use client"
import axios from 'axios';
import { useState, useEffect } from 'react';

const Page = () => {

    const [questions, setQuestions] = useState([]);
    const [editingQuestionId, setEditingQuestionId] = useState(null);
    const [editData, setEditData] = useState({
        question: '',
        options: ['', '', '', ''],
        correctAnswer: '',
    });

    // Fetch questions from the backend
    const fetchQuestions = async () => {
        try {
            const response = await axios.get('https://nextjs-quiz-app.onrender.com/api/questions');
            if (response) {
                setQuestions(response.data);
            }
        } catch (error) {
            console.error("Error fetching questions:", error);
        }
    };

    // Delete a question
    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`https://nextjs-quiz-app.onrender.com/api/questions/${id}`);
            if (response.status === 200) {
                alert(response.data.message);
                fetchQuestions();
            } else {
                alert("failed to delete question");
            }
        } catch (error) {
            console.error("Error deleting question:", error);
        }
    };

    // Start editing a question
    const handleEdit = (question) => {
        setEditingQuestionId(question._id);
        setEditData({
            question: question.question,
            options: question.options,
            correctAnswer: question.correctAnswer,
        });
    };

    // Handle edit input changes
    const handleInputChange = (e, index = null) => {
        if (index !== null) {
            const newOptions = [...editData.options];
            newOptions[index] = e.target.value;
            setEditData({ ...editData, options: newOptions });
        } else {
            setEditData({ ...editData, [e.target.name]: e.target.value });
        }
    };

    // Submit updated question
    const handleUpdate = async (id) => {
        try {
            const response = await axios.patch(`https://nextjs-quiz-app.onrender.com/api/questions/${id}`, editData);
            if (response.status === 201) {
                alert(response.data.message);
                fetchQuestions();
                setQuestions(updatedQuestions);
                setEditingQuestionId(null);
            } else {
                alert("failed to update data");
            }
        } catch (error) {
            console.error("Error updating question:", error);
        }
    };

    useEffect(() => {
        fetchQuestions();
    }, []);


    return (

        <div className="container mx-auto p-14 text-center">
            <h2 className="text-2xl font-bold mb-4">Manage Questions</h2>

            {/* Table Structure for Questions */}
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">Question</th>
                        <th className="py-2 px-4 border-b">Options</th>
                        <th className="py-2 px-4 border-b">Correct Answer</th>
                        <th className="py-2 px-4 border-b">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {questions.map((question) => (
                        <tr key={question._id}>
                            {editingQuestionId === question._id ? (
                                <>
                                    <td className="py-2 px-4 border-b">
                                        <input
                                            type="text"
                                            name="question"
                                            value={editData.question}
                                            onChange={handleInputChange}
                                            className="p-2 border rounded w-full"
                                        />
                                    </td>
                                    <td className="py-2 px-4 border-b">
                                        {editData.options.map((option, i) => (
                                            <div key={i} className="mb-2">
                                                <input
                                                    type="text"
                                                    value={option}
                                                    onChange={(e) => handleInputChange(e, i)}
                                                    className="p-2 border rounded w-full"
                                                />
                                            </div>
                                        ))}
                                    </td>
                                    <td className="py-2 px-4 border-b">
                                        <input
                                            type="text"
                                            name="correctAnswer"
                                            value={editData.correctAnswer}
                                            onChange={handleInputChange}
                                            className="p-2 border rounded w-full"
                                        />
                                    </td>
                                    <td className="py-2 px-4 border-b space-x-2">
                                        <button
                                            onClick={() => handleUpdate(question._id)}
                                            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                                        >
                                            Save
                                        </button>
                                        <button
                                            onClick={() => setEditingQuestionId(null)}
                                            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                                        >
                                            Cancel
                                        </button>
                                    </td>
                                </>
                            ) : (
                                <>
                                    <td className="py-2 px-4 border-b">{question.question}</td>
                                    <td className="py-2 px-4 border-b">
                                        <ul>
                                            {question.options.map((option, i) => (
                                                <li key={i} className="mb-1 flex">
                                                    <span className='text-left'>{i + 1}.</span>
                                                    <span className='w-full text-center'>{option}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </td>
                                    <td className="py-2 px-4 border-b">
                                        {question.correctAnswer}
                                    </td>
                                    <td className="py-2 px-4 border-b space-x-2">
                                        <button
                                            onClick={() => handleEdit(question)}
                                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(question._id)}
                                            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    );

}

export default Page