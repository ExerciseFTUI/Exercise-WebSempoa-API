export function paginatedResults(model) {
  return async (req, res, next) => {
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 30;
    const search = req.query.search || "";

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};
    results.page = page;
    results.limit = limit;
    // const totalData = await model.countDocuments().exec();
    // results.totalData = totalData;

    // if (endIndex < totalData) {
    //   results.next = {
    //     page: page + 1,
    //     limit: limit,
    //   };
    // }

    // if (startIndex > 0) {
    //   results.previous = {
    //     page: page - 1,
    //     limit: limit,
    //   };
    // }

    // _id: { $regex: search, $options: "i" }
    // find({ _id: new RegExp(search, 'i')}})
    // .sort([["account_id", -1]])
    try {
      results.results = await model
        .find({ name: { $regex: search, $options: "i" } }, [
          "name",
          "username",
          "address",
          "birthdate",
          "email",
        ])
        .limit(limit)
        .skip(page * limit)
        .sort([["name"]]);

      results.totalData = await model.countDocuments({
        name: { $regex: search, $options: "i" },
      });

      results.totalPages = Math.ceil(results.totalData / limit);

      res.paginatedResults = results;
      next();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
}
