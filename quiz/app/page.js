import Link from 'next/link';
import React from 'react'


const page = () => {

  return (

    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Welcome to QuizApp</h1>

      {/* Admin Functionalities */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Admin Functionalities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-800 text-white p-4 rounded shadow-lg">
            <h3 className="text-xl font-semibold">Add Questions</h3>
            <p className="mt-2">
              Admin can add new quiz questions along with their options and correct answers.
            </p>
            <Link href="/questions">
              <button className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded transition">
                Manage Questions
              </button>
            </Link>
          </div>

          <div className="bg-gray-800 text-white p-4 rounded shadow-lg">
            <h3 className="text-xl font-semibold">View All Questions</h3>
            <p className="mt-2">
              Admin can view all the quiz questions and update or delete them.
            </p>
            <Link href="/allquestions">
              <button className="mt-4 px-4 py-2 bg-green-500 hover:bg-green-600 rounded transition">
                View Questions
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* User Functionalities */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">User Functionalities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-800 text-white p-4 rounded shadow-lg">
            <h3 className="text-xl font-semibold">Take a Quiz</h3>
            <p className="mt-2">
              Users can take the quiz and submit their answers to get their score.
            </p>
            <Link href="/quiz">
              <button className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded transition">
                Start Quiz
              </button>
            </Link>
          </div>

          <div className="bg-gray-800 text-white p-4 rounded shadow-lg">
            <h3 className="text-xl font-semibold">View Quiz Results</h3>
            <p className="mt-2">
              Users can view their quiz results after completing the quiz.
            </p>
            <Link href="/quiz">
              <button className="mt-4 px-4 py-2 bg-green-500 hover:bg-green-600 rounded transition">
                View Results
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>

  );

}

export default page