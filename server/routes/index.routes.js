const router = require("express").Router();

const userRouter = require("./api/user.routes");
const authRouter = require("./api/auth.routes");
const tokensRouter = require("./api/tokens.routes");
const groupRouter = require("./api/group.routes")
const horoscopeRouter = require("./api/horoscope.routes")

router.use("/users", userRouter);
router.use("/auth", authRouter);
router.use("/tokens", tokensRouter);
router.use("/mainpage", groupRouter);
router.use("/horoscope", horoscopeRouter)



module.exports = router;
