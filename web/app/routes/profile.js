// import the express router
const router = require('express').Router();
const profileCtrl = require('../controllers/profile');
const validationCtrl = require('../controllers/validation');

router.get('/', profileCtrl.renderProfile);

router.get('/create', profileCtrl.renderEntryForm);

router.post('/create', [
  validationCtrl.validate('createEntry'),
  profileCtrl.renderEntryFormWithErrors,
  profileCtrl.saveEntry,
]);

router.get('/edit/:id', profileCtrl.renderEditForm);

router.post('/edit/:id', [
  validationCtrl.validate('editEntry'),
  profileCtrl.renderEntryFormWithErrors,
  profileCtrl.saveEntry,
]);

router.get('/delete/:id', profileCtrl.deleteEntry);

module.exports = router;
