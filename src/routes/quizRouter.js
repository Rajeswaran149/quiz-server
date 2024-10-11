
const { addQuiz } = require("../controllers/quizController");
const router = require("./userRouter");

router.post('/quiz' , addQuiz)


module.exports = router