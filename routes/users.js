const express = require('express');
const router = express.Router();
const usersCtrl = require('../controllers/users');




router.get('/:id/edit', usersCtrl.edit);


router.put('/:id', usersCtrl.update);


router.get('/:id', usersCtrl.show);






module.exports = router;