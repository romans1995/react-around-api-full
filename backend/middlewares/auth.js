module.exports = (req, res, next) => {
  const { jwt } = process.env;
  // get authorization from the header by destructuring
  const { authorization } = req.headers;

  // check that the header exists and starts with 'Bearer '
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res
      .status(401)
      .send({ message: 'Authorization required' });
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, jwt);
  } catch (err) {
    res
      .status(401)
      .send({ message: 'Authorization required' });
  }
  /* Save payload to request. This makes the payload available
     to the latter parts of the route. See the `Accessing user
     data with req.user` example for details. */
  req.user = payload;
  next();
  // sending the request to the next middleware
};
