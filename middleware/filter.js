const filter = (model) => {
  return (req, res, next) => {
    const query = {};

    if (req.query.name) {
      query.name = { $regex: req.query.name, $options: "i" };
    }

    if (req.query.email) {
      query.email = { $regex: req.query.email, $options: "i" };
    }

    res.filterQuery = query;
    next();
  };
};

module.exports = filter;
