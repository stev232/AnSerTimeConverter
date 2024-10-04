const router = require('express').Router();
const { CrescentElectricTable } = require('../../models');
const { sequelize } = require('../../models/OnTimeTable');

router.get('/', async (req, res) => {
  try {
    const reachListData = await CrescentElectricTable.findAll({
      order: sequelize.col('id'),
    });

    res.status(200).json(reachListData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new vessel/contact
  try {
    const reachListData = await CrescentElectricTable.create(req.body);
    res.status(200).json(reachListData);
  } catch(err) {
    res.status(500).json(err);
  }
});

router.get('/ByState/:state', async (req, res) => {
  try {
    const reachListData = await CrescentElectricTable.findAll({
      where: {
        state: req.params.state 
      }
    });

    res.status(200).json(reachListData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/ByBranch/:branch', async (req, res) => {
  try {
    const reachListData = await CrescentElectricTable.findOne({
      where: {
        branch: req.params.branch 
      }
    });

    res.status(200).json(reachListData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/ByID/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const reachListData = await CrescentElectricTable.update(req.body, {
      where: {
        id: req.params.id 
      }
    });
    if(!reachListData[0]) {
      res.status(404).json({ message: `Index Error!` });
      return;
    }
    res.status(200).json(reachListData);
  } catch(err) {
    res.status(500).json(err);
  }
});

router.delete('/ByID/:id', async (req, res) => {
  try {
    const reachListData = await CrescentElectricTable.destroy({
      where: {
        id: req.params.id
      }
    });
    if(!reachListData) {
      res.status(404).json({ message: `Index Error!` });
      return;
    }
    res.status(200).json(reachListData);
  } catch(err) {
    res.status(500).json(err);
  }
});

module.exports = router;