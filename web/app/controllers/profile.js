exports.renderProfile = async (req, res) => {
  const entrys = await req.API.get('/entrys');
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
  let data = {};
  // if there is an id, we are editing, if there isn't we are adding
  if (id) {
    // make a put request with the updated information
    data = await req.API.put(`/entrys/${id}`, { title, text, location, type });
  } else {
    // send the new decision to the api
    data = await req.API.post('/entrys', { title, text, location, type });
  }
  // redirect to the edit decision form
  res.redirect('/profile');
};

exports.renderEditForm = async (req, res) => {
  // the the id from the url
  const { id } = req.params;
  // get the details of the quiz
  const entry = await req.API.get(`/entrys/${id}`);
  // render the edit form
  res.render('entry/form', entry);
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
  await req.API.delete(`/entrys/${id}`);
  // redirect to the dashboard
  res.redirect('/profile');
};
