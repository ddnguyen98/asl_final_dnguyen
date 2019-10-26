const { Entrys } = require('../models');
const protectedRoute = require('../utils/protectedRoute');

exports.renderProfile = async (req, res) => {
  const entrys = await Entrys.findAll({ where: { userId: req.userId } });
  res.render('profile', { entrys });
};

exports.renderEntryForm = (req, res) => {
  res.render('entry/form', { title: '', text: '', location: '', type: 'public' });
};

exports.saveEntry = async (req, res) => {
  // get the data the user submitted
  const { title, text, location, type } = req.body;
  // pull the id from the url
  const { id } = req.params;
  // variable to hold the data from our api request

  // if there is an id, we are editing, if there isn't we are adding
  if (id) {
    // make a put request with the updated information
    try {
      // update the decision with the request body
      const [, [updatedEntry]] = await Entrys.update(req.body, {
        // only update the row using the id in the url
        where: { id },
        // return the updated row
        returning: true,
      });
      // send the updated decision back to the front-end
      res.redirect('/profile');
    } catch (e) {
      // map the errors messages to send them back
      const errors = e.errors.map((err) => err.message);
      res.status(400).json({ errors });
    }
  } else {
    // send the new decision to the api
    const today = new Date();
    const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+(today.getDate()+1);
    // create the item and save the new id
    try {
      // create the entry and save the new decision
      await Entrys.create({ title, text, location, type, userId: req.userId, date });
      // send the new id back to the request
      res.redirect('/profile');
    } catch (e) {
      // map the errors messages to send them back
      const errors = e.errors.map((err) => err.message);
      res.status(400).json({ errors });
    }
  }

};

exports.renderEditForm = async (req, res) => {
  // the the id from the url
  const { id } = req.params;
  console.log( id );
  // get the details of the quiz
  const entry = await Entrys.findByPk(id);
  // render the edit form
  res.render('entry/form', entry.dataValues);
};

// eslint-disable-next-line no-unused-vars
exports.renderEntryFormWithErrors = (errors, req, res, next) => {
  // get the data the user submitted
  const { title, text, location, type } = req.body;
  // send the name, type, and errors as variables to the view.
  res.render('entry/form', { title, text, location, type, errors });
};

exports.deleteEntry = async (req, res) => {
  const { id } = req.params;
  // send the delete request to the api
  await Entrys.destroy({ where: { id } });
  // redirect to the dashboard
  res.redirect('/profile');
};
