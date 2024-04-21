const User = require('../models/users');
const Question = require('../models/question');
exports.submitQuizResponse = async (req, res) => {
    try {
        const { email, quizId, responses } = req.body;

        // Find the user by email
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ message: "User not found. Please initialize first." });
        }

        // Find the quiz within the user's quizzes array based on quizId
        const quiz = user.quizzes.find(q => q.quiz_id.toString() === quizId);
        if (!quiz) {
            return res.status(404).json({ message: "Quiz not found for the user." });
        }

        let scoreToAdd = 0;

        // Process each response
        for (let response of responses) {
            const question = await Question.findById(response.question_id);
            if (question) {
                const isCorrect = question.correct_answer === response.selected_response;
                let existingResponse = quiz.responses.find(r => r.question_id.toString() === response.question_id);

                if (existingResponse) {
                    // Update existing response if it has changed
                    if (existingResponse.selected_response !== response.selected_response) {
                        if (existingResponse.is_correct) {
                            scoreToAdd -= question.points; // Deduct points if previously correct but now incorrect
                        }
                        existingResponse.selected_response = response.selected_response;
                        existingResponse.is_correct = isCorrect;
                        if (isCorrect) {
                            scoreToAdd += question.points; // Add points for correct response
                        }
                    }
                } else {
                    // Add new response
                    quiz.responses.push({
                        question_id: response.question_id,
                        selected_response: response.selected_response,
                        is_correct: isCorrect
                    });
                    if (isCorrect) {
                        scoreToAdd += question.points; // Add points for correct response
                    }
                }
            }
        }

        // Mark the modified paths as modified
        user.markModified('quizzes'); // Necessary if any part of the quizzes array is modified

        // Update the quiz score and save the user document
        quiz.score += scoreToAdd;
        await user.save();

        // Construct the response excluding questions and streak dates
        const responseQuiz = {
            quiz_id: quiz.quiz_id,
            date: quiz.date,
            responses: quiz.responses.map(r => ({
                question_id: r.question_id,
                selected_response: r.selected_response,
                is_correct: r.is_correct
            })),
            score: quiz.score
        };

        res.json({ message: "Responses submitted successfully!", quiz: responseQuiz });
    } catch (error) {
        console.error('Error submitting quiz responses:', error);
        res.status(500).json({ message: "Failed to submit responses", error });
    }
};

exports.getResponsesByEmail = async (req, res) => {
    try {
        const { email } = req.params;  // Get email directly from URL params

        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).send({ message: "User not found." });
        }

        const responseData = {
            email: email,
            res: user.quizzes.map(quiz => ({
                streak_date: quiz.date.toISOString(),  // Ensure the date is formatted correctly
                score: quiz.score
            })),
            total_score: user.quizzes.reduce((acc, quiz) => acc + quiz.score, 0)
        };

        res.json(responseData);
    } catch (error) {
        console.error('Error fetching quiz responses by email:', error);
        res.status(500).send({ message: "Failed to retrieve quiz responses", error });
    }
};
