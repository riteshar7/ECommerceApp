const { requireSignin, userMiddleware } = require("../common-middlewares");
const { addOrder, getOrders, getOrder } = require("../controllers/orderController");
const router = require("express").Router();

router.post("/addOrder", requireSignin, userMiddleware, addOrder);
router.get("/getOrders", requireSignin, userMiddleware, getOrders);
router.post("/getOrder", requireSignin, userMiddleware, getOrder);

module.exports = router;