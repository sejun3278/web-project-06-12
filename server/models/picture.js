module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
      'picture',
      {
       image_url : {
        type: DataTypes.TEXT,
        allowNull : true
       },

       nickname: {
        type: DataTypes.STRING(50),
        allowNull : true
       },

       profile_image_url: {
        type: DataTypes.TEXT,
        allowNull : true
       },
      },
      {
        charset: 'utf8',
        collate: 'utf8_general_ci',
        timestamps: false, 
      }
  )};