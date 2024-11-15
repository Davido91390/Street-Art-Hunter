const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 19 * 2 ** 10,
  timeCost: 2,
  parallelism: 1,
};

const hashPassword = async (req, res, next) => {
  try {
    const { password } = req.body;

    const hashedPassword = await argon2.hash(password, hashingOptions);

    req.body.hashed_password = hashedPassword;

    delete req.body.password;

    next();
  } catch (err) {
    next(err);
  }
};

const createToken = async (req, res, next) => {
  try {
    const payload = req.user;

    const token = await jwt.sign(payload, process.env.APP_SECRET, {
      expiresIn: "1y",
    });

    req.token = token;

    next();
  } catch (error) {
    next(error);
  }
};

const verifyToken = async (req, res, next) => {
  try {
    const { auth } = req.cookies;

    jwt.verify(auth, process.env.APP_SECRET, (err, decoded) => {
      if (err) {
        res.status(401).json({ message: "Invalid token" });
      }
      req.decoded = decoded;
      next();
    });
  } catch (error) {
    next(error);
  }
};

const deleteCookie = async (req, res, next) => {
  try {
    res.clearCookie("auth");
    res.status(200).send({ message: "Disconnected" });
  } catch (error) {
    next(error);
  }
};

module.exports = { hashPassword, createToken, verifyToken, deleteCookie };
