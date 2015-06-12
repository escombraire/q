var models = require('../models/models.js');

exports.load = function(req, res, next, quizId){
  models.Quiz.find(quizId).then(
    function(quiz){
      if (quiz){
        req.quiz=quiz;
        next();
      }else{
        new Error('No existe '+quizId);
      }
    }
  ).catch(function(error){next(error);});
};

exports.show = function(req, res){
        res.render('quizes/show',{quiz: req.quiz});
};

exports.index = function(req, res){
    console.log("SEARCH: "+req.query.search);
    if (req.query.search === undefined || req.query.search === ''){
        models.Quiz.findAll().then(function(quizes){
        res.render('quizes/index.ejs',{quizes: quizes})});
    }else{
      var search = '%'+req.query.search+'%';
      search = search.replace(' ','%');
      console.log('MI SEARCH'+search);
      models.Quiz.findAll({where: ["pregunta like ?", search], order: ["pregunta"]}).then(function(quizes){
      res.render('quizes/index.ejs',{quizes: quizes})});
    }

}

exports.answer = function(req,res) {
    if (req.query.respuesta === req.quiz.respuesta){
        res.render('quizes/answer', {quiz: req.quiz, respuesta: 'Muy bien'});
    }else{
        res.render('quizes/answer', {quiz: req.quiz, respuesta: 'Es incorrecto'});
    }
};

exports.author = function(req, res){
    res.render('author');
};

exports.new = function(req, res){
  var quiz = models.Quiz.build(
    {pregunta: "Pregunta", respuesta: "Respuesta"}
  );
  res.render('quizes/new', {quiz:quiz});
};

exports.create = function(req, res){
  var quiz = models.Quiz.build(req.body.quiz);

  quiz.save({fields: ["pregunta","respuesta"]}).then(function(){
    res.redirect('/quizes');
  });
};
