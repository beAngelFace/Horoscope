const router = require('express').Router();

console.log(router);
const { Group } = require('../../db/models');
const verifyAccessToken = require('../../middleware/verifyAccessToken');


router.route('/')
 .get(verifyAccessToken, async (req, res) => {
    try {
        const allGroups = await Group.findAll();
        res.json(allGroups);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
 })
 .post(verifyAccessToken, async (req, res) => {
    try {
        const { team, start, graduation, img } = req.body;
        if (team && start && graduation) {
            const createdGroup = (await Group.create({ team, start, graduation, img })).get();
            const newGroup = await Group.findOne({
                where: { id: createdGroup.id }
            });
            res.status(201).json(newGroup);
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
        const group = await Group.findOne({
            where: { id }
        });
        if (group) {
            res.json(group);
        } else {
            res.status(404).json({ message: 'Group not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
 })
 .put(verifyAccessToken, async (req, res) => {
    try {
        const { id } = req.params;
        const { team, start, graduation, img } = req.body;

        const group = await Group.findOne({ where: { id } });

        if (group) {
            await group.update({ team, start, graduation, img });
            res.json(group);
        } else {
            res.status(404).json({ message: 'Group not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
 });

module.exports = router;
