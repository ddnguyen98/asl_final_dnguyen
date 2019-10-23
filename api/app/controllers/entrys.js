const { Entrys } = require('../models');

exports.getEntrys = async (req, res) => {
  const entry = await Entrys.findAll({ where: { userId: req.userId } });
  // respond with json of the public decisions array
  res.json(entry || []);
};

// find one decision by id
exports.getOneById = async (req, res) => {
  // get the id from the route params
  const { id } = req.params;
  const entry = await Entrys.findByPk(id);
  // if no entry is found
  if (!entry) {
    // return a 404 (not found) code
    res.sendStatus(404);
    return;
  }
  // if the item is found send it back.
  res.json(entry);
};


// add a new decision
exports.createEntry = async (req, res) => {
  // get the values from the request body
  const { title, text, location, type } = req.body;
  const today = new Date();
  const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+(today.getDate()+1);
  // create the item and save the new id
  try {
    // create the entry and save the new decision
    const newEntry = await Entrys.create({ title, text, location, type, userId: req.userId, date });
    // send the new id back to the request
    res.json({ id: newEntry.id });
  } catch (e) {
    // map the errors messages to send them back
    const errors = e.errors.map((err) => err.message);
    res.status(400).json({ errors });
  }
};

// update an existing decisions
exports.updateEntry = async (req, res) => {
  const { id } = req.params;
  try {
    // update the decision with the request body
    const [, [updatedEntry]] = await Entrys.update(req.body, {
      // only update the row using the id in the url
      where: { id },
      // return the updated row
      returning: true,
    });
    // send the updated decision back to the front-end
    res.json(updatedEntry);
  } catch (e) {
    // map the errors messages to send them back
    const errors = e.errors.map((err) => err.message);
    res.status(400).json({ errors });
  }
};

// delete a decision
exports.removeEntry = async (req, res) => {
  // get the id from the route
  const { id } = req.params;
  // remove the decision
  await Entrys.destroy({ where: { id } });
  // send a good status code
  res.sendStatus(200);
};
