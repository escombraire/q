module.exports = function(sequelize, DataTypes){
    var temas = ["otro", "humanidades", "ocio", "ciencia", "tecnología"];
    return sequelize.define ('Quiz',
            {
             pregunta:{
               type:DataTypes.STRING,
               validate: {notEmpty: {msg: "Pregunta vacía"}}
             },
             respuesta:{
               type: DataTypes.STRING,
               validate: {notEmpty: {msg: "Respuesta vacía"}}
             },
             tema :{
               type: DataTypes.STRING,
               validate: {notEmpty: {msg: "Opción no válida"},
                          isIn: { args: [temas], msg: "Opción no válida"}
                          }
             }
            });
}
