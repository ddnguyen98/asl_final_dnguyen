const { check, validationResult } = require('express-validator/check');

const checks = {
  id: check('id')
    .isUUID().withMessage('Id not valid, please go back try again'),
  title: check('title')
    .isLength(1)
    .exists().withMessage('title is required'),
  text: check('text')
    .isLength(1)
    .exists().withMessage('text is missing'),
  location: check('location')
    .isLength(1)
    .exists().withMessage('location is missing'),
  type: check('type')
    .exists().withMessage('A type is required')
    .isIn(['public', 'private'])
    .withMessage('Must have a type'),
};

const checkForErrors = (req, res, next) => {
  // get any errors
  const errors = validationResult(req);
  // if there are errors go to the next error handler middleware with the errors from the validation
  if (!errors.isEmpty()) return next(errors.mapped());
  // if there are NO errors, go to the next normal middleware function
  return next();
};

exports.validate = (method) => {
  switch (method) {
    case 'createEntry': {
      return [checks.title, checks.text, checks.location, checks.type, checkForErrors];
    }

    case 'editEntry': {
      return [checks.id, checks.title, checks.text, checks.location, checks.type, checkForErrors];
    }

    case 'deleteItem': {
      return [checks.id, checkForErrors];
    }


    default: {
      return [];
    }
  }
};
