module.exports = function(sequelize, DataTypes){
    return sequelize.define ('Comentarios',
            {
             texto:{
               type:DataTypes.STRING,
               validate: {notEmpty: {msg: "Comentario vacío"}
               }
             }
            });
}
