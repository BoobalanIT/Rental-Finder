const express = require('express');
const router = express.Router();
const {addProperty,fetchProperties,deleteProperty,updateProperty} = require('../controllers/propertyController');
const verifyToken = require('../middlewares/authMiddleware');

router.put('/:id', verifyToken, updateProperty);
router.post('/', verifyToken, addProperty);
router.get('/', verifyToken, fetchProperties);

router.delete('/:id', verifyToken, deleteProperty,updateProperty);

module.exports = router;