module.exports = (sequelize, DataTypes) => {
    const Review = sequelize.define("review", {
        ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        rating: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Comment: {
            type: DataTypes.STRING,
            allowNull: false
        },
       
    });
    return Review;
};
