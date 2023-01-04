const controllerWrapper = (control) => {
  const fn = async (req, res, next) => {
    try {
      await control(req, res, next);
    } catch (error) {
      next(error);
    }
  };
  return fn;
};

module.exports = controllerWrapper;
