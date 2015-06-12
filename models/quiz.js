module.exports = function(sequelize, DataTypes){
    return sequelize.define ('Quiz',
            {
             pregunta:{
               type:DataTypes.STRING,
               validate: {notEmpty: {msg: "Pregunta vacía"}}
             },
             respuesta:{
               type: DataTypes.STRING,
               validate: {notEmpty: {msg: "Respuesta vacía"}}
             }
            });
}
