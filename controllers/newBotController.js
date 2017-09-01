var path = require('path');
var botBuilder = require('botbuilder');
var config = require('../config');
var BlankCard = require('../adaptiveCards/blankCard');
var TextFieldCard = require('../adaptiveCards/textFieldCard');
var TextBlockCard = require('../adaptiveCards/textBlock');
var Button = require('../adaptiveCards/button');
var EmptyCard = require('../adaptiveCards/emptyCard');
var Data = require('../adaptiveCards/data');
var Action = require('../adaptiveCards/actions');

var connector = new botBuilder.ChatConnector({
    appId: config.appId,
    appPassword: config.password
});

var bot = new botBuilder.UniversalBot(connector, function (session) {

    if (session.message && session.message.value) {
        // A Card's Submit Action obj was received
        processSubmitAction(session, session.message.value);
        return;
    }
});

function processSubmitAction(session, value) {
    session.userdata = {};
    session.userdata.contactInfo = {};
    if (session && session.userdata && session.userdata.contactInfo) {
        session.userdata.contactInfo.name = value.name;
        session.userdata.contactInfo.phone = value.phone;
    }

    switch (value.type) {
        case 'catering':
            session.beginDialog('catering');
    }
}

bot.on('conversationUpdate', function (message) {
    if (message.membersAdded) {
        message.membersAdded.forEach(function (identity) {
            if (identity.id === message.address.bot.id) {
                bot.loadSession(message.address, function (err, session) {
                    if (err) {
                        return console.log(err);
                    }

                    var textCard = new TextFieldCard();
                    var textBlock = new TextBlockCard();
                    textBlock
                        .setWrap(true)
                        .setType("TextBlock")
                        .setText("Welcome to unoBridge! One stop shop for all your event needs!")
                        .setWeight('bolder');

                    textCard
                        .setType('Input.Text')
                        .setPlaceHolder("What's is your name")
                        .setId("name");

                    var blankCard = new BlankCard();
                    var arr = [textBlock, textCard];
                    blankCard.setBody(textBlock);
                    blankCard.setBody(textCard);
                    bot.dialog('catering', require('../dialogs/cateringDialog'));
                    bot.dialog('serviceButtons', require('../dialogs/serviceButtons'));
                    session.beginDialog('serviceButtons');


                    var card = new EmptyCard();
                    var action1 = new Action();
                    var data1 = new Data();

                    var action2 = new Action();
                    var data2 = new Data();
                    data1.setType('catering');//thses two lines are enough for buttons
                    action1
                        .setType('Action.Submit')
                        .setTitle('Catering')
                        .setData(data1);
                    card
                        .setType('AdaptiveCard')
                        .setActions(action1);

                    data2.setType('Photograpy');
                    action2.
                        setType('Action.Submit')
                        .setTitle('Photography')
                        .setData(data2);
                    card
                        .setType('AdaptiveCard')
                        .setActions(action2);
                    blankCard.setAction(action1);
                    blankCard.setAction(action2);
                    var msg = new botBuilder.Message(session).addAttachment(blankCard);
                    session.send(msg);


                });
            } else {
                var reply = new botBuilder.Message()
                    .address(message.address)
                    .text("Welcome to unoBridge! One stop shop for all your event needs!, Please say Hi");
                // User is joining conversation (they sent message)
                var address = Object.create(message.address);
                address.user = identity;
            }
        });
    }
});


exports.getBotListener = function () {
    return connector.listen();
}