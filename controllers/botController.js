var path = require('path');
var botBuilder = require('botbuilder');
var connector = new botBuilder.ChatConnector({
    appId: '79035254-da99-42bd-b6b8-23f39f86d3b9',
    appPassword: 'uUNYyWc5aGpAhA9f0sSREfM'
});

var bot = new botBuilder.UniversalBot(connector, [
    function (session) {
        session.send("Welcome to unoBridge! One stop shop for all your event needs!");
        session.beginDialog('welcomeMsg', session.userData.contactInfo);
        // next();
    },
    function (session, result) {
        session.userData.contactInfo = result.response;
        session.send('name:%s phone number:%s ', session.userData.name, session.userData.contactInfo);
    }
]);

bot.dialog('welcomeMsg', [
    function (session, args, next) {
        session.dialogData.contactInfo = args || {};
        if (!session.dialogData.contactInfo.name) {
            session.beginDialog('askName');
        }
        else {
            next();
        }
    },
    function (session, result, next) {
        if (result.response) {
            session.dialogData.contactInfo.name = result.response;
        }
        session.send("Hi %s", session.dialogData.contactInfo.name);
        session.beginDialog('showServicesButtons');

    },
    function (session, result) {
        session.dialogData.contactInfo.phoneNumber = result.response;
        session.send("Thanks %s for the response. We will reach you on %s soon", session.dialogData.contactInfo.name, session.dialogData.contactInfo.phoneNumber);
    }
]);

//dialog definitions
bot.dialog('askName', [function (session, args, next) {
    botBuilder.Prompts.text(session, "What's your name");
},
function (session, result) {
    session.endDialogWithResult(result);
}
]);

var servicesTypes = function (session) {
    return new botBuilder.Message(session)
        .suggestedActions(
        botBuilder.SuggestedActions.create(
            session, [
                botBuilder.CardAction.imBack(session, 'catering', 'Catering'),
                botBuilder.CardAction.imBack(session, "Photograph", "Photograph"),
                botBuilder.CardAction.imBack(session, "Decoration", "Decoration"),
                botBuilder.CardAction.imBack(session, "Entertainment", "Entertainment"),
                botBuilder.CardAction.imBack(session, "venue", "Venue booking"),
                botBuilder.CardAction.imBack(session, "Please specify what are you looking for", "Others")

            ]
        ));

};
bot.dialog('showServicesButtons', [
    function (session, args, next) {
        session.send("These are the services we provide. Please select any one given below");
        session.send(servicesTypes(session));
    }
]);

bot.dialog('catering', function (session, args, next) {
    session.send("Some of the samples are");
    var pa = 'http://localhost:' + (process.env.PORT || 3000);
    var card1 = new botBuilder.HeroCard(session).images([
        botBuilder.CardImage.create(session, pa + '/images/Catering/Aroma_Wedding_Caterer_Showcase_UnoBridge_0_1475162978464.jpg')
    ]);
    var card2 = new botBuilder.HeroCard(session)
        .images([botBuilder.CardImage.create(session, pa + '/images/Catering/Aroma_Wedding_Caterer_UnoBridge_1475162978158.jpg')]);
    var card3 = new botBuilder.HeroCard(session).images([botBuilder.CardImage.create(session, pa + '/images/Catering/Bengalooru_Tiffany_UnoBridge_1475163080364.jpg')]);
    var card4 = new botBuilder.HeroCard(session).images([botBuilder.CardImage.create(session, pa + '/images/Catering/Sri_Manjunatha_Caterer_UnoBridge_1475163100864.jpg')]);

    var msg = new botBuilder.Message(session).attachmentLayout(botBuilder.AttachmentLayout.carousel).attachments([card1, card2, card3, card4]);
    session.send(msg);
    session.send(servicesTypes(session)).endDialog();
})
    .triggerAction({
        matches: /^catering$/i,
        onSelectAction: function (session, args, next) {
            session.beginDialog(args.action, args);
            // session.send(servicesTypes(session));
            // session.beginDialog('number');

        }
    });


bot.dialog('Photograph', function (session, args, next) {
    var pa = 'http://localhost:' + (process.env.PORT || 3000);
    var card2 = new botBuilder.HeroCard(session).images([botBuilder.CardImage.create(session, pa + '/images/Photography/Chetan_Krishna_Photography_UnoBridge_1475161847415.jpg')]);
    var card3 = new botBuilder.HeroCard(session).images([botBuilder.CardImage.create(session, pa + '/images/Photography/Neethu_Photography_Showcase_UnoBridge_1_1475165921177.jpg')]);
    var card4 = new botBuilder.HeroCard(session).images([botBuilder.CardImage.create(session, pa + '/images/Photography/Sumanth_Shetty_Photography_UnoBridge_1475163122953.jpg')]);

    var msg = new botBuilder.Message(session).attachmentLayout(botBuilder.AttachmentLayout.carousel).attachments([card2, card3, card4]);
    session.send(msg);
})
    .triggerAction({
        matches: /^Photograph$/i,
        onSelectAction: function (session, args, next) {
            session.beginDialog(args.action, args);
            session.beginDialog('number');

        }
    });
bot.dialog('Decoration', function (session, args, next) {
    var pa = 'http://localhost:' + (process.env.PORT || 3000);
    var card2 = new botBuilder.HeroCard(session).images([botBuilder.CardImage.create(session, pa + '/images/Decoration/1475226433400b5345_W480.jpg')]);
    var card3 = new botBuilder.HeroCard(session).images([botBuilder.CardImage.create(session, pa + '/images/Decoration/1475226479001RS25.jpg')]);
    var card4 = new botBuilder.HeroCard(session).images([botBuilder.CardImage.create(session, pa + '/images/Decoration/1475226479001RS30.jpg')]);
    var card5 = new botBuilder.HeroCard(session).images([botBuilder.CardImage.create(session, pa + '/images/Decoration/1475226590195a712c9bef8c434d7adfa01793cea8eb0.jpg')]);

    var msg = new botBuilder.Message(session).attachmentLayout(botBuilder.AttachmentLayout.carousel).attachments([card2, card3, card4, card5]);
    session.send(msg);
})
    .triggerAction({
        matches: /^Decoration$/i,
        onSelectAction: function (session, args, next) {
            session.beginDialog(args.action, args);
            session.beginDialog('number');

        }
    });

bot.dialog('Entertainment', function (session, args, next) {
    session.send("These are the samples we provide");
    //  session.Prompts.text(session, 'Please provide your number so that we can reach you with details');
    var pa = 'http://localhost:' + (process.env.PORT || 3000);
    var card2 = new botBuilder.HeroCard(session).images([botBuilder.CardImage.create(session, pa + '/images/Entertainment/Aryans_Dance_Studio_UnoBridge_1475163788165.jpg')]);
    var card3 = new botBuilder.HeroCard(session).images([botBuilder.CardImage.create(session, pa + '/images/Entertainment/1489575630852WhatsAppImage20170314at3.22.53PM.jpg')]);
    var card4 = new botBuilder.HeroCard(session).images([botBuilder.CardImage.create(session, pa + '/images/Entertainment/DJ_Ash_UnoBridge_1475160544053.jpg')]);
    var card5 = new botBuilder.HeroCard(session).images([botBuilder.CardImage.create(session, pa + '/images/Entertainment/DJ_Hassan_UnoBridge_1475163746351.jpg')]);

    var msg = new botBuilder.Message(session).attachmentLayout(botBuilder.AttachmentLayout.carousel).attachments([card2, card3, card4, card5]);
    session.send(msg);
})
    .triggerAction({
        matches: /^Entertainment$/i,
        onSelectAction: function (session, args, next) {
            session.beginDialog(args.action, args);
            session.beginDialog('number');
        }
    });

bot.dialog('venue', function (session, args, next) {
    var pa = 'http://localhost:' + (process.env.PORT || 3000);
    var card2 = new botBuilder.HeroCard(session).images([botBuilder.CardImage.create(session, pa + '/images/Venu booking/1495092042320km5.JPG')]);
    var card3 = new botBuilder.HeroCard(session).images([botBuilder.CardImage.create(session, pa + '/images/Venue booking/1496741808165IMG20170606143630.jpg')]);
    var msg = new botBuilder.Message(session).attachmentLayout(botBuilder.AttachmentLayout.carousel).attachments([card2, card3]);
    session.send(msg);
    //  session.send(servicesTypes(session));
})
    .triggerAction({
        matches: /^venue$/i,
        onSelectAction: function (session, args, next) {
            session.beginDialog(args.action, args);
            session.beginDialog('number');

        }
    });

bot.on('conversationUpdate', function (message) {
    if (message.membersAdded) {
        message.membersAdded.forEach(function (identity) {
            console.log("identity id" + identity.id + "bot id" + message.address.bot.id);
            if (identity.id === message.address.bot.id) {
                bot.beginDialog(message.address, '/');
            }

        });
    }
});
bot.dialog('number', [function (session, args, next) {
    //  session.send(servicesTypes(session));

    botBuilder.Prompts.number(session, "For further assist you, please enter your mobile number so that our representers will reach you shortly");

},
function (session, result) {
    //  session.dialogData.number = result.response;

    if (result.response > 7000000000 && result.response < 9999999999) {
        return session.endDialogWithResult(result);
    }
    else {
        session.send("Invalid phone number");
        session.replaceDialog('number');
    }
}
]);


// exports.getHelloWorld = function (req, res) {
//     console.log("helloworld");
//     res.send("jjjjjjjj");
// }

exports.getBotListener = function () {
    return connector.listen();
}
// exports.getprecheck = function (req, res, next) {
//     console.log("precheck has been called");
//     console.dir(req.headers);
//     if (req.headers.access_token) {
//         //todo check if acces token is valid call next()
//         return next();
//     }

//     res.status(401).send("invalid access token");
// }