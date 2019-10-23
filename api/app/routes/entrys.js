// import the express router
const router = require('express').Router();
const protectedRoute = require('../utils/protectedRoute');

// import the decision controller
const entryCtrl = require('../controllers/entrys');

router.get('/', protectedRoute, entryCtrl.getEntrys);
router.get('/:id', protectedRoute, entryCtrl.getOneById);
router.post('/', protectedRoute, entryCtrl.createEntry);
router.put('/:id', protectedRoute, entryCtrl.updateEntry);
router.delete('/:id', protectedRoute, entryCtrl.removeEntry);
module.exports = router;
