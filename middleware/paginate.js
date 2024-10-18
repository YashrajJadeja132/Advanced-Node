const paginate = (model) => {
  return async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    try {
      const totalCount = await model.countDocuments();
      res.paginatedResults = {
        limit,
        skip,
        currentPage: page,
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
      };
      next();
    } catch (err) {
      next(err);
    }
  };
};

module.exports = paginate;
