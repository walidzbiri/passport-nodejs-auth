const Sequelize = require('sequelize');
const sequelize = new Sequelize('mysql://root:@localhost:3306/passport');

const User = sequelize.define('user', {
        // attributes
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique:true
        },
        password : {
            type: Sequelize.STRING,
            allowNull: false
        }
      }, {
        // options
});
sequelize.sync();

module.exports=User;