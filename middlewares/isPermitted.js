const isPermitted = permittedRoles => (req, res, next) => {
  if (!permittedRoles.some(v => v === req.user.role)) {
    next(new Error("Not Permitted"))
  } else {
    next()
  }
};

module.exports = { isPermitted };
