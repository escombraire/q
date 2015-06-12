var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quizController');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
});

router.param('quizId', quizController.load);

router.get('/quizes',quizController.index);
router.get('/quizes/:quizId(\\d+)',quizController.show);
router.get('/quizes/:quizId(\\d+)/answer',quizController.answer);
router.get('/quizes/new',quizController.new);
router.get('/author', quizController.author);

router.post('/quizes/create', quizController.create);


module.exports = router;
