var models = require('../models/models.js');

exports.new = function(req, res){
  res.render('comentarios/new.ejs',{quizid: req.params.quizId, errors: []});
}

exports.create = function(req, res){
  console.log("111111111111111111111111111");
  var comentario = models.Comentarios.build(
    { texto: req.body.comentario.texto,
      QuizId: req.params.quizId
    }
  );
  console.log("22222222222222222222222222");

  comentario.validate().then(
    function(err){
    if (err){
      res.render('comentarios/new.ejs',
          {comentario: comentario, quizid:req.params.quizId, errors: err.errors});
    }else{
      comentario.save().then(function(){res.redirect('/quizes/'+req.params.quizId)});
    }
  } //fin function err
  ).catch(function(error){next(error);});

}
