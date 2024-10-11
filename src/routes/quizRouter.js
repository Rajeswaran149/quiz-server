
const { addQuiz, getAllQuiz } = require("../controllers/quizController");
const router = require("./userRouter");

router.post('/quiz' , addQuiz)
router.get('/getQuiz' , getAllQuiz)


module.exports = router