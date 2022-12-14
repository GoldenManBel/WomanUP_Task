import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../common/config.js';
import statusCode from '../common/status.code.js';

/**
 * Intermediate function
 * Checks for a valid token
 * @param {object} req first argument request
 * @param {object} res second argument response
 * @param {any} next for next
 * @returns {any} void
 */
const checkToken = (req, res, next) => {
  const textError = 'Authorization Error!';
  const path = req.path;
  const autHeader = req.headers.authorization;

  if (!path.includes('/todo', 0)) {
    return next();
  }

  if (autHeader === undefined) {
    console.error(textError);
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Cache-Control', 's-max-age=1, stale-while-revalidate');
    res.status(statusCode.FORBIDDEN).send(textError);
    return;
  } else {
    const [type, token] = autHeader.split(' ');

    if (type === 'Bearer' && token) {
      try {
        jwt.verify(token, JWT_SECRET_KEY);
      } catch (error) {
        console.error(textError);
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Cache-Control', 's-max-age=1, stale-while-revalidate');
        res.status(statusCode.FORBIDDEN).send(textError);
        return;
      }
    } else {
      console.error(textError);
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Cache-Control', 's-max-age=1, stale-while-revalidate');
      res.status(statusCode.FORBIDDEN).send(textError);
      return;
    }
  }

  next();
};

export { checkToken };
