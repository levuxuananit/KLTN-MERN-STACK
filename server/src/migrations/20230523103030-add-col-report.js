module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn(
            'Reports',
            'title',
            Sequelize.STRING
        );

    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn(
            'Reports',
            'title'
        );
    }
}