'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
     await queryInterface.bulkInsert('Groups', [{
      team: 'Киты',
      start: '20.05.2024',
      graduation: '19.07.2024',
      img: 'https://img.stl24.com/list/FANTASY/JOHN%20PITRE/full/0018+PacificSunrise.jpg'
     },
     {
      team: 'Сойки',
      start: '10.06.2024',
      graduation: '09.08.2024',
      img: 'https://i.pinimg.com/736x/ba/24/ba/ba24ba1ac144a4b0c12035c06f90a8e3.jpg'
     },
     {
      team: 'Рыси',
      start: '01.07.2024',
      graduation: '30.09.2024',
      img: 'https://i.pinimg.com/originals/1b/65/97/1b6597035a41e3bf0dcf54f5b9872b3c.jpg'},
     {
      team: 'Волки',
      start: '12.09.2024',
      graduation: '11.11.2024',
      img: 'https://w-dog.ru/wallpapers/16/0/424361983965087/art-volk-morda-krug-simvoly-krasnye-glaza.jpg'
     },
    ], {});
    
  },

  async down (queryInterface, Sequelize) {
    
     await queryInterface.bulkDelete('Groups', null, {});
     
  }
};
