var router = require('express').Router();
var botListener = require('../controllers/adaptiveCardController.js');

router.post('/', botListener.getBotListener());
// router.get('/', botListener.getHelloWorld);

router.route('/messages')
    //     .get(botListener.getprecheck, botListener.getHelloWorld)
    .post(botListener.getBotListener());

module.exports = router;




