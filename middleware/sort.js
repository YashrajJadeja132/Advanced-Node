const sort = (model) => {
  return (req, res, next) => {
    const sortBy = req.query.sortBy || "createdAt";
    const sortOrder = req.query.sortOrder === "desc" ? -1 : 1;

    res.sortOptions = { [sortBy]: sortOrder };
    next();
  };
};

module.exports = sort;
