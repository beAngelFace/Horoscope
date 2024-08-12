'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
     await queryInterface.bulkInsert('Users', [{
       name: 'Elbrus',
       email: 'elbrus@elbrus',
       password: '123',
       groupId: '4'
     }], {});
    
  },

  async down (queryInterface, Sequelize) {
   
   await queryInterface.bulkDelete('Users', null, {});
    
  }
};
