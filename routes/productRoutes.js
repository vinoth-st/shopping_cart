const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController');


// Route to display product listing page
router.get('/', ProductController.index);
router.get('/add', ProductController.add);
router.post('/add', ProductController.store);
router.get('/:id/edit', ProductController.edit);
router.post('/:id/edit', ProductController.store);

module.exports = router;
