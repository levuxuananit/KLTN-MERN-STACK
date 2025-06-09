module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn(
            'Reports',
            'seen',
            Sequelize.BOOLEAN
        );

    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn(
            'Reports',
            'seen'
        );
    }
}