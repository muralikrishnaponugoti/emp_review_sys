export const auth = (req, res, next) => {
    if (req.session.employeEmail) {
      next();
    } else {
      res.redirect('/');
    }
  };