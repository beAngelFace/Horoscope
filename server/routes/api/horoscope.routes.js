// horoscope.routes.js
const router = require('express').Router();
const { Horoscope } = require('../../db/models');
const verifyAccessToken = require('../../middleware/verifyAccessToken');

router.route('/random/:groupId')
  .get(verifyAccessToken, async (req, res) => {
    try {
      const { groupId } = req.params;
      const horoscopes = await Horoscope.findAll({
        where: { groupId }
      });
      
      if (horoscopes.length === 0) {
        return res.status(404).json({ message: 'No horoscopes found for this group' });
      }

      const randomIndex = Math.floor(Math.random() * horoscopes.length);
      const randomHoroscope = horoscopes[randomIndex];

      res.json(randomHoroscope);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

router.route('/')
  .get(verifyAccessToken, async (req, res) => {
    try {
      const allHoroscopes = await Horoscope.findAll();
      res.json(allHoroscopes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  })
  router.route('/')
  .post(verifyAccessToken, async (req, res) => {
    try {
      const { date, prediction, groupId } = req.body;
      if (date && prediction && groupId) {
        const createdHoroscope = (await Horoscope.create({ date, prediction, groupId })).get();
        const newHoroscope = await Horoscope.findOne({
          where: { id: createdHoroscope.id }
        });
        res.status(201).json(newHoroscope);
      } else {
        res.status(400).json({ message: 'empty' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

router.route('/:id')
  .get(verifyAccessToken, async (req, res) => {
    try {
      const { id } = req.params;
      const horoscope = await Horoscope.findOne({
        where: { id }
      });
      if (horoscope) {
        res.json(horoscope);
      } else {
        res.status(404).json({ message: 'Horoscope not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  })
  .put(verifyAccessToken, async (req, res) => {
    try {
      const { id } = req.params;
      const { date, prediction, groupId } = req.body;

      const horoscope = await Horoscope.findOne({ where: { id } });

      if (horoscope) {
        await horoscope.update({ date, prediction, groupId });
        res.json(horoscope);
      } else {
        res.status(404).json({ message: 'Horoscope not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  })
  .delete(verifyAccessToken, async (req, res) => {
    try {
      const { id } = req.params;
      const result = await Horoscope.destroy({
        where: { id }
      });
      if (result) {
        res.status(204).send(); // No Content
      } else {
        res.status(404).json({ message: 'Horoscope not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

module.exports = router;
