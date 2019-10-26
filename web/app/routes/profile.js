// import the express router
const router = require('express').Router();
const profileCtrl = require('../controllers/profile');
const validationCtrl = require('../controllers/validation');
const protectedUser = require('../utils/protectedUser');

router.get('/',protectedUser, profileCtrl.renderProfile);

router.get('/create',protectedUser, profileCtrl.renderEntryForm);

router.post('/create', protectedUser,[
  validationCtrl.validate('createEntry'),
  profileCtrl.renderEntryFormWithErrors,
  profileCtrl.saveEntry,
]);

router.get('/edit/:id', protectedUser,profileCtrl.renderEditForm);

router.post('/edit/:id', protectedUser,[
  validationCtrl.validate('editEntry'),
  profileCtrl.renderEntryFormWithErrors,
  profileCtrl.saveEntry,
]);

router.get('/delete/:id', protectedUser,profileCtrl.deleteEntry);

module.exports = router;
