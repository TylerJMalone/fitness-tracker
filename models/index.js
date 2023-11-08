const User = require('./User');
const Favorite = require('./Favorite');

//Model relationships

User.hasMany(Favorite, {
    foreignKey: 'user_id',
  });

Favorite.belongsTo(User, {
  foreignKey: 'user_id',
});

module.exports = { User, Favorite };