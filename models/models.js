var path = require('path');
var Sequelize = require('sequelize');

var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name  = (url[6]||null);
var user     = (url[2]||null);
var pwd      = (url[3]||null);
var protocol = (url[1]||null);
var dialect  = (url[1]||null);
var port     = (url[5]||null);
var host     = (url[4]||null);
var storage  = process.env.DATABASE_STORAGE;

var seque = new Sequelize(DB_name,user,pwd, {
  dialect: protocol,
  protocol: protocol,
  port: port,
  host: host,
  storage: storage,
  omitNull: true
  });

var Quiz = seque.import(path.join(__dirname,'quiz'));
var Comentarios = seque.import(path.join(__dirname,'comentarios'));

Comentarios.belongsTo(Quiz);
Quiz.hasMany(Comentarios);

exports.Quiz = Quiz;
exports.Comentarios = Comentarios;

seque.sync().then(function(){
    Quiz.count().then(function(count){
        if (count === 0){
            Quiz.create(
                {pregunta:'Capital de Portugal',
                 respuesta: 'Lisboa',
                 tema: 'otro'}
            );
            Quiz.create(
                {pregunta: "Memoria de un ordenador", respuesta: 'RAM', tema: 'tecnología'}
            ).then(function(){
                console.log('Base de datas inicialitzada');
            });
        }
    });
});
