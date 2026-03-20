export function clientCheck(req, res, next) {
  if (!req.session || req.session.user_role !== "Client") {
    return res.redirect("/login");
  }
  next();
}
