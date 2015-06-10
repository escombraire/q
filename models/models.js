var path = require('path');
var Sequelize = require('sequelize');

var seque = new Sequelize(null,null,null, {dialect: 'sqlite', storage: 'quiz.sqlite'});

var Quiz = seque.import(path.join(__dirname,'quiz'));
exports.Quiz = Quiz;

seque.sync().then(function(){
    Quiz.count().then(function(count){
        if (count === 0){
            Quiz.create(
                {pregunta:'Capital de Portugal',
                 respuesta: 'Lisboa'}
            );
            Quiz.create(
                {pregunta: "Capital de Italia", respuesta: 'Roma'}
            ).then(function(){
                console.log('Base de datas inicialitzada');
            });
        }
    });
});
