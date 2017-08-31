var path = require('path');
var botBuilder = require('botbuilder');
var config = require('../config');
var blankCard = require('../adaptiveCards/blankCard.js');
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
    // textCard.
    var textCard = new TextFieldCard();
    var textBlock = new TextBlockCard();
    var button = new Button();
    // button.setType('Action.ShowCard').setTitle('Catering');
    textBlock.setWrap(true).setType("TextBlock").setText("Welcome to unobridge").setWeight('bolder')

    textCard.setType('Input.Text').setPlaceHolder("What's is your name").setId("name");
    console.log("++++++++++++++++++++++");
    console.dir(textBlock);
    blankCard.content.body.push(textBlock, textCard);


    var action = {
        'type': 'Action.ShowCard',
        'title': 'Catering',
        'speak': '<s>Hotels</s>',
        'card': {
            'type': 'AdaptiveCard',
            //  'body': [ /* */],
            'actions': [
                {
                    'type': 'Action.Submit',
                    'title': 'Search',
                    'speak': '<s>Search</s>',
                    'data': {
                        'type': 'hotelSearch'
                    }
                }
            ]
        }
    }

    var action = new Action();
    var data = new Data();
    var card = new EmptyCard();
    data.setType('hotelSearch');
    action.setType('Action.Submit').setTitle('Search').setData(data);
    card.setType('AdaptiveCard').setActions(action);
    button.setType('Action.ShowCard').setTitle('Catering').setCard(card);
    blankCard.content.actions.push(button);


    var card3 = new botBuilder.HeroCard(session).tap({
        value: "https://www.linkedin.com/feed/",
        Type: "openUrl",
    })
        .images([botBuilder.CardImage.create(session, "https://s-media-cache-ak0.pinimg.com/originals/b5/87/2b/b5872b3bb9513d57ea8df4c7bde03052.jpg")]);

    // var msg = new botBuilder.Message(session)
    //     .addAttachment(card);
    // var msg = new botBuilder.Message(session)
    //     .addAttachment(card3);
    var msg = new botBuilder.Message(session).addAttachment(blankCard);
    session.send(msg);

});

function processSubmitAction(session, value) {
    console.dir("///////////////" + value.name + value.phone + value.type + value.date);
    session.userdata = {};
    session.userdata.contactInfo = {};
    if (session && session.userdata && session.userdata.contactInfo) {
        session.userdata.contactInfo.name = value.name;
        session.userdata.contactInfo.phone = value.phone;
    }
    console.dir(session.userdata.contactInfo);
}


bot.on('conversationUpdate', function (message) {
    if (message.membersAdded) {
        message.membersAdded.forEach(function (identity) {
            if (identity.id === message.address.bot.id) {
                bot.loadSession(message.address, function (err, session) {
                    if (err) {
                        return console.log(err);
                    }
                    var card2 = new botBuilder
                        .HeroCard(session)
                        .title('Welcome to unoBridge! One stop shop for all your event needs!\n\
                    Please type Hi or click on Hi')
                        .buttons([botBuilder.CardAction.dialogAction(session, "sendTypingdialog ", "", "Hi")]);
                    var msg = new botBuilder.Message(session).attachmentLayout(botBuilder.AttachmentLayout.carousel).attachments([card2]);
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