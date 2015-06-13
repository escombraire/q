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

exports.modificar = function(req, res){
  var quiz = req.quiz;
  res.render('quizes/edit', {quiz:quiz, errors:[]});
};


exports.show = function(req, res){
        res.render('quizes/show',{quiz: req.quiz, errors: []});
};

exports.index = function(req, res){
    console.log("SEARCH: "+req.query.search);
    if (req.query.search === undefined || req.query.search === ''){
        models.Quiz.findAll().then(function(quizes){
        res.render('quizes/index.ejs',{quizes: quizes, errors:[]})}
      ).catch(function(error){next(error);});
    }else{
      var search = '%'+req.query.search+'%';
      search = search.replace(' ','%');
      console.log('MI SEARCH'+search);
      models.Quiz.findAll({where: ["pregunta like ?", search], order: ["pregunta"]}).
        then(function(quizes){
          res.render('quizes/index.ejs',{quizes: quizes, errors:[]})}
        ).catch(function(error){next(error);});
    }

}

exports.answer = function(req,res) {
    if (req.query.respuesta === req.quiz.respuesta){
        res.render('quizes/answer', {quiz: req.quiz, respuesta: 'Muy bien',errors:[]});
    }else{
        res.render('quizes/answer', {quiz: req.quiz, respuesta: 'Es incorrecto', errors:[]});
    }
};

exports.author = function(req, res){
    res.render('author',{errors:[]});
};

exports.new = function(req, res){
  var quiz = models.Quiz.build(
    {pregunta: "Pregunta", respuesta: "Respuesta"}
  );
  res.render('quizes/new', {quiz:quiz, errors:[]});
};



exports.create = function(req, res){
  var quiz = models.Quiz.build(req.body.quiz);

  quiz.validate().then (function(err){
    if (err){
      res.render('quizes/new', {quiz:quiz, errors: err.errors});
    }else{
      quiz.save({fields: ["pregunta","respuesta"]}).then(function(){
        res.redirect('/quizes');
      });
    } //fin if else
  }); //fin validate
};

exports.update = function(req, res){
    console.log("HHHHHHHHHHHHHHHHHHHHHH");
    req.quiz.pregunta = req.body.quiz.pregunta;
    req.quiz.respuesta = req.body.quiz.respuesta;

    console.log("QUIZ ID: "+req.quiz.id);
    console.log("QUIZ PREGUNTA "+req.quiz.pregunta);
    console.log("Quiz RESPUESTA "+req.quiz.respuesta);

    req.quiz.validate().
      then(
        function(err){
          if (err){
            res.render('quiz/edit',{quiz:req.quiz, errors: error});
          }else{
            req.quiz.save({fields:["pregunta", "respuesta"]}).
            then(
              function(){ res.redirect('/quizes');}
            );
          };
        }

      );
  };
