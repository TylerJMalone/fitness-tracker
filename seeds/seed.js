const sequelize = require('../config/connection');
const { User } = require('../models/User');

const UserData = require ('./userData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    await User.bulkCreate(UserData, {
        individualHooks: true,
        returning: true,
    });

    process.exit(0);
};

seedDatabase();