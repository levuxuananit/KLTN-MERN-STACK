module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn(
            'Reports',
            'uid',
            Sequelize.STRING
        );

    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn(
            'Reports',
            'uid'
        );
    }
}