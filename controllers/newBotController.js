var path = require('path');
var botBuilder = require('botbuilder');
var config = require('../config');
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
    var card = {
        'contentType': 'application/vnd.microsoft.card.adaptive',
        'content': {
            '$schema': 'http://adaptivecards.io/schemas/adaptive-card.json',
            'type': 'AdaptiveCard',
            'version': '1.0',
            "body": [
                {
                    "type": "Input.Text",
                    "id": "name",
                    "placeholder": "What is your first name?"
                },
                {
                    "type": "Input.Number",
                    "id": "phone",
                    "placeholder": "What is your phone number?"
                },
                {
                    "type": "Input.Date",
                    "id": "date",
                    "placeholder": "Please enter date?"
                },
                {
                    "type": "Image",
                    "url": "https://s-media-cache-ak0.pinimg.com/originals/b5/87/2b/b5872b3bb9513d57ea8df4c7bde03052.jpg",
                    'size': 'medium'
                }
            ],
            'actions': [
                {
                    'type': 'Action.Submit',
                    'title': 'Submit',
                    'weight': 'bolder',
                    'data': {
                        'type': 'profileInfo'
                    }
                }
            ]
        }
    };


    var card3 = new botBuilder.HeroCard(session).tap({
        value: "https://www.linkedin.com/feed/",
        Type: "openUrl",
    })
        .images([botBuilder.CardImage.create(session, "https://s-media-cache-ak0.pinimg.com/originals/b5/87/2b/b5872b3bb9513d57ea8df4c7bde03052.jpg")]);

    // var msg = new botBuilder.Message(session)
    //     .addAttachment(card);
    var msg = new botBuilder.Message(session)
        .addAttachment(card3);
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