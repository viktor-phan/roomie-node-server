const isAuth = (req, res, next) => {
  if (req.session.isAuthenticated) {
    next();
  } else {
    return res
      .status(401)
      .json({ message: "Unauthenticated", authenticated: false });
  }
};
export { isAuth };
