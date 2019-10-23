// import the express router
const router = require('express').Router();
const authCtrl = require('../controllers/auth');

router.get('/', authCtrl.renderLogin);

router.get('/login/github', authCtrl.redirectToGithub);
router.get('/github/callback', authCtrl.verifyGithubCode);

module.exports = router;
