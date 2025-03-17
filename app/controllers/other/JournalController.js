const Journal = require('../../models/Journal');

class JournalController {
    static async createJournal(req, res) {
        try {
            const { title, content, category } = req.body;
            const journal = await Journal.create({ title, content, category, userId: req.user.id });
            res.status(201).json({ message: 'Journal entry created', journal });
        } catch (error) {
            res.status(500).json({ error: 'Error creating journal' });
        }
    }

    static async getJournals(req, res) {
        try {
            const journals = await Journal.findAll({ where: { userId: req.user.id } });
            res.json(journals);
        } catch (error) {
            res.status(500).json({ error: 'Error fetching journals' });
        }
    }
}

module.exports = JournalController;
