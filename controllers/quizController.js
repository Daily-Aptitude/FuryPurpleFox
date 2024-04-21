const User = require('../models/users');
const Question = require('../models/question');
exports.submitQuizResponse = async (req, res) => {
    try {
        const { email, quizId, responses } = req.body;
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ message: "User not found. Please initialize first." });
        }
        const quiz = user.quizzes.find(q => q.quiz_id.toString() === quizId);
        if (!quiz) {
            return res.status(404).json({ message: "Quiz not found for the user." });
        }

        let scoreToAdd = 0;
        for (let response of responses) {
            const question = await Question.findById(response.question_id);

            if (question) {
                const isCorrect = question.correct_answer === response.selected_response;
                let existingResponse = quiz.responses.find(r => r.question_id.toString() === response.question_id);

                if (existingResponse) {
                    if (existingResponse.selected_response !== response.selected_response) {
                        if (existingResponse.is_correct) {
                            scoreToAdd -= question.points;
                        }
                        existingResponse.selected_response = response.selected_response;
                        existingResponse.is_correct = isCorrect;
                        if (isCorrect) {
                            scoreToAdd += question.points;
                        }
                    }
                } else {
                    quiz.responses.push({
                        question_id: response.question_id,
                        selected_response: response.selected_response,
                        is_correct: isCorrect
                    });
                    if (isCorrect) {
                        scoreToAdd += question.points; 
                    }
                }
            }
        }

        quiz.score += scoreToAdd;
        await user.save()
        const responseQuiz = {
            quiz_id: quiz.quiz_id,
            date: quiz.date,
            responses: quiz.responses,
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
