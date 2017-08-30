var router = require('express').Router();
//var botListener = require('../controllers/botController.js');
var botListener = require('../controllers/newBotController.js');

router.post('/', botListener.getBotListener());
// router.get('/', botListener.getHelloWorld);

router.route('/messages')
    //     .get(botListener.getprecheck, botListener.getHelloWorld)
    .post(botListener.getBotListener());

module.exports = router;




