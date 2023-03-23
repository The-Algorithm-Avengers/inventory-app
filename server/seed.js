const { items } = require("./seedData.js");
const { sequelize } = require("./db");
const { Item } = require("./models");

const seed = async () => {
	try {
		await sequelize.sync({ force: true });

		await Promise.all(items.map((item) => Item.create(item)));

		console.log("db populated!");
	} catch (error) {
		console.error(error);
	}
};

module.exports = seed;
