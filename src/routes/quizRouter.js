
const { addQuiz, getAllQuiz, getQuizDetails, takeQuiz, viewResults } = require("../controllers/quizController");
const router = require("./userRouter");

router.post('/quiz' , addQuiz)
router.get('/getQuiz' , getAllQuiz)
router.post('/getQuizDetails' , getQuizDetails)
router.post('/take-quiz' , takeQuiz)
router.post('/result' , viewResults)


module.exports = router