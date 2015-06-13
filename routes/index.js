var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quizController');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz', errors:[] });
});

router.param('quizId', quizController.load);

router.get('/quizes', quizController.index);
router.get('/quizes/:quizId(\\d+)',quizController.show);
router.get('/quizes/:quizId(\\d+)/answer',quizController.answer);
router.get('/quizes/:quizId(\\d+)/edit',quizController.modificar);
router.get('/quizes/new',quizController.new);
router.get('/author', quizController.author);

router.post('/quizes/create', quizController.create);
router.put('/quizes/:quizId(\\d+)',quizController.update);


module.exports = router;
