const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

router.get('/', categoryController.getAllCategories);
router.get('/summary', categoryController.getCategorySummary);
router.post('/', categoryController.createCategory);

module.exports = router;
