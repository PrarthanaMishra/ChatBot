var path = require('path');
var botBuilder = require('botbuilder');
var config = require('../config');
var connector = new botBuilder.ChatConnector({
    appId: config.appId,
    appPassword: config.password
});

var bot = new botBuilder.UniversalBot(connector, [
    function (session, args, next) {
        session.beginDialog('askName', session.userData.contactInfo);
    },
    function (session, result) {
        if (result.response) {
            session.userData.contactInfo = result.response;
        }
        session.beginDialog('welcomeMsg', session.userData.contactInfo);
    },
    function (session, result, next) {
        if (result.response) {
            session.userData.contactInfo = result.response;
        }
        session.send(servicesTypes(session));
    },
    function (session, result) {
        if (!session.userData.contactInfo.phoneNumber) {
            session.beginDialog('number', session.userData.contactInfo);
        }
    },

    function (session, result) {
        if (result.response) {
            if (!session.userData || !session.userData.contactInfo || !session.userData.contactInfo.phoneNumber) {
                session.userData = session.userData || {};
                session.userData.contactInfo = session.userData.contactInfo || {};
                session.userData.contactInfo = result.response;
                session.send("Thanks %s for response. We will get back to you on %s number soon", session.userData.contactInfo.name.toUpperCase(), session.userData.contactInfo.phoneNumber);
                session.send(servicesTypes(session));

            }
        }

    },
]);

//dialog definition
bot.dialog('askName', [
    function (session, args, next) {
        session.dialogData.contactInfo = args || {};
        if (!session.dialogData.contactInfo.name || session.userData.contactInfo.bool) {
            botBuilder.Prompts.text(session, "What's your name");

        }
        else {
            session.endDialogWithResult({ response: session.dialogData.contactInfo });

        }
    },
    function (session, result) {
        if (result.response === true) {
            return;
        }
        if (result.response) {
            var reg = /^[a-zA-Z ]+$/;
            if (result.response.match(reg)) {

                //  if (session.user)
                if (session.userData && session.userData.contactInfo && session.userData.contactInfo.bool) {
                    session.userData.contactInfo.name = result.response;
                    session.userData.contactInfo.bool = undefined;
                    session.send("Thanks %s for updating your name", session.userData.contactInfo.name);
                    return session.endDialogWithResult({ response: session.userData.contactInfo });
                }
                session.dialogData.contactInfo.name = result.response;
                session.endDialogWithResult({ response: session.dialogData.contactInfo });
            }
            else {
                session.send("Invalid name");
                session.replaceDialog('askName');
            }
        }
    }
]);

//dialog definition
bot.dialog('welcomeMsg',
    function (session, args) {
        session.dialogData.contactInfo = args || {};
        session.send("Hi %s", session.userData.contactInfo.name);
        session.endDialog({ response: session.dialogData.contactInfo });
    }
);

var servicesTypes = function (session) {
    var str = "";
    if (session.userData && session.userData.contactInfo.phoneNumber) {
        str = "Click to check other services";
    }
    else {
        str = "These are the services we provide.Please click any one given below";
    }
    return new botBuilder.Message(session).text(
        str)
        .suggestedActions(
        botBuilder.SuggestedActions.create(
            session, [
                botBuilder.CardAction.imBack(session, 'catering', 'Catering'),
                botBuilder.CardAction.imBack(session, "Photograph", "Photograph"),
                botBuilder.CardAction.imBack(session, "Decoration", "Decoration"),
                botBuilder.CardAction.imBack(session, "Entertainment", "Entertainment"),
                botBuilder.CardAction.imBack(session, "venue", "Venue booking"),
                botBuilder.CardAction.imBack(session, "others", "Others"),
                botBuilder.CardAction.imBack(session, "exit", "End")


            ]
        ));

};

var showMsgOnSelect = function (session) {
    if (session.userData && session.userData.contactInfo && session.userData.contactInfo.phoneNumber) {
        session.send("Thanks %s for response, we will reach you on this %s number shortly", session.userData.contactInfo.name, session.userData.contactInfo.phoneNumber);
        session.send(servicesTypes(session));
    }
    else if (!session.userData || !session.userData.contactInfo || !session.userData.contactInfo.name) {
        //  session.send("Please type continue or click the below button");
        var card2 = new botBuilder.HeroCard(session).title('Please type continue or click the below button')
            .buttons([botBuilder.CardAction.dialogAction(session, " ", "", "continue")]);
        var msg = new botBuilder.Message(session).attachmentLayout(botBuilder.AttachmentLayout.carousel).attachments([card2]);
        session.send(msg);

    }
}

bot.dialog('exit', function (session) {
    session.endConversation("Thanks for visiting our website!!!");
    session.endDialog();
}).triggerAction({
    matches: /^exit$/i,
    onSelectAction: function (session, args, next) {
        session.beginDialog(args.action, args);
    }
});

bot.dialog('others', [function (session) {
    botBuilder.Prompts.text(session, "Please specify what are you looking for?");
},
function (session, result) {
    session.userData.contactInfo.others = result.response;
    session.send("Okay, thanks for the response, we will get back to you shortly");
    session.send(servicesTypes(session));
    session.endDialogWithResult({ response: session.userData.contactInfo });
}
]).triggerAction({
    matches: /^others$/i,
    onSelectAction: function (session, args, next) {
        session.beginDialog(args.action, args);
    }
});

bot.dialog('catering', function (session, args, next) {
    session.send("Some of the samples are");
    var pa = 'https://young-ridge-11917.herokuapp.com';
    var card2 = new botBuilder.HeroCard(session)
        .images([botBuilder.CardImage.create(session, pa + '/images/Catering/1.jpg')])
        .buttons([botBuilder.CardAction.dialogAction(session, "goAction", "", "Go back")]);
    var card3 = new botBuilder.HeroCard(session).images([botBuilder.CardImage.create(session, pa + '/images/Catering/2.jpg')]);
    var card4 = new botBuilder.HeroCard(session).images([botBuilder.CardImage.create(session, pa + '/images/Catering/3.jpg')]);

    var msg = new botBuilder.Message(session).attachmentLayout(botBuilder.AttachmentLayout.carousel).attachments([card2, card3, card4]);
    session.send(msg);
    showMsgOnSelect(session);
    bot.beginDialogAction('goAction', 'action');
})
    .triggerAction({
        matches: /catering/i,
        onSelectAction: function (session, args, next) {
            session.beginDialog(args.action, args);
            session.endDialog();
        }
    });


bot.dialog('Photograph', function (session, args, next) {
    session.send("Some of the samples are");
    var pa = 'https://young-ridge-11917.herokuapp.com';
    var card2 = new botBuilder.HeroCard(session).images([botBuilder.CardImage.create(session, pa + '/images/Photography/1.jpg')])
        .buttons([botBuilder.CardAction.dialogAction(session, "goAction", "", "Go back")]);
    var card3 = new botBuilder.HeroCard(session).images([botBuilder.CardImage.create(session, pa + '/images/Photography/2.jpg')]);
    var card4 = new botBuilder.HeroCard(session).images([botBuilder.CardImage.create(session, pa + '/images/Photography/3.jpg')]);

    var msg = new botBuilder.Message(session).attachmentLayout(botBuilder.AttachmentLayout.carousel).attachments([card2, card3, card4]);
    session.send(msg);
    showMsgOnSelect(session);
    bot.beginDialogAction('goAction', 'action');
})
    .triggerAction({
        matches: /Photograph/i,
        onSelectAction: function (session, args, next) {
            session.beginDialog(args.action, args);
            session.endDialog();

        }
    });
bot.dialog('Decoration', function (session, args, next) {
    session.send("Some of the samples are");
    var pa = 'https://young-ridge-11917.herokuapp.com';
    var card2 = new botBuilder.HeroCard(session).images([botBuilder.CardImage.create(session, pa + '/images/Decoration/1.jpg')])
        .buttons([botBuilder.CardAction.dialogAction(session, "goAction", "", "Go back")]);
    var card3 = new botBuilder.HeroCard(session).images([botBuilder.CardImage.create(session, pa + '/images/Decoration/2.jpg')]);
    var card4 = new botBuilder.HeroCard(session).images([botBuilder.CardImage.create(session, pa + '/images/Decoration/3.jpg')]);
    var msg = new botBuilder.Message(session).attachmentLayout(botBuilder.AttachmentLayout.carousel).attachments([card2, card3, card4]);
    session.send(msg);
    showMsgOnSelect(session);
    bot.beginDialogAction('goAction', 'action');
})
    .triggerAction({
        matches: /Decoration/i,
        onSelectAction: function (session, args, next) {
            session.beginDialog(args.action, args);
            session.endDialog();
        }
    });

bot.dialog('Entertainment', function (session, args, next) {
    session.send("Some of the samples are");;
    var pa = 'https://young-ridge-11917.herokuapp.com';
    var card2 = new botBuilder.HeroCard(session)
        .images([botBuilder.CardImage.create(session, pa + '/images/Entertainment/5.jpg')])
        .buttons([botBuilder.CardAction.dialogAction(session, "goAction", "", "Go back")]);
    var card4 = new botBuilder.HeroCard(session).images([botBuilder.CardImage.create(session, pa + '/images/Entertainment/2.jpg')]);
    var card5 = new botBuilder.HeroCard(session).images([botBuilder.CardImage.create(session, pa + '/images/Entertainment/3.jpg')]);
    var msg = new botBuilder.Message(session).attachmentLayout(botBuilder.AttachmentLayout.carousel).attachments([card2, card4, card5]);
    session.send(msg);
    showMsgOnSelect(session);
    bot.beginDialogAction('goAction', 'action');
})
    .triggerAction({
        matches: /^Entertainment$/i,
        onSelectAction: function (session, args, next) {
            session.beginDialog(args.action, args);
            session.endDialog();
        }
    });

bot.dialog('action', function (session) {
    session.send(servicesTypes(session));
});

bot.dialog('venue', function (session, args, next) {
    session.send("Some of the samples are");
    var pa = 'https://young-ridge-11917.herokuapp.com';
    var card2 = new botBuilder.HeroCard(session).images([botBuilder.CardImage.create(session, pa + '/images/Venu booking/1.JPG')])
        .buttons([botBuilder.CardAction.dialogAction(session, "goAction", "", "Go back")]);
    var msg = new botBuilder.Message(session).attachmentLayout(botBuilder.AttachmentLayout.carousel).attachments([card2]);
    session.send(msg);
    showMsgOnSelect(session);
    bot.beginDialogAction('goAction', 'action');
})
    .triggerAction({
        matches: /(venue|marriage hall)/i,
        onSelectAction: function (session, args, next) {
            session.beginDialog(args.action, args);
            session.endDialog();
        }
    });

bot.dialog('__clear', function (session) {
}).triggerAction({
    matches: /^__clear$/i,
    onSelectAction: function (session) {
        session.send("hello");
        session.userData.contactInfo = {};
    }
});

bot.dialog('number', [function (session, args) {
    session.dialogData.contactInfo = args || {};
    if (session.userData && session.userData.contactInfo && session.userData.contactInfo.bool) {
        botBuilder.Prompts.number(session, "Please enter your number");
    }
    else if (session.userData && session.userData.contactInfo && session.userData.contactInfo.phoneNumber) {
        session.endDialogWithResult({ response: session.dialogData.contactInfo });
    }
    else {
        botBuilder.Prompts.number(session, "For further assist you, please enter your mobile number so that our representers will reach you shortly");

    }
},
function (session, result) {
    if (result.response === true) {
        return;
    }
    if (result.response) {
        if (result.response > 7000000000 && result.response <= 9999999999) {
            if (session.userData && session.userData.contactInfo && session.userData.contactInfo.bool) {
                session.userData.contactInfo.phoneNumber = result.response;
                session.send("Thanks for updating your number, we will get back to you on %s soon", session.userData.contactInfo.phoneNumber);
                session.userData.contactInfo.bool = undefined;
                return session.endDialogWithResult({ response: session.userData.contactInfo });
            }

            session.dialogData.contactInfo.phoneNumber = result.response;
            console.dir(session.dialogData);
            session.endDialogWithResult({ response: session.dialogData.contactInfo });
        }
        else {
            session.send("Invalid phone number");
            session.replaceDialog('number');
        }
    }
}
]);

bot.dialog('help', function (session) {
    var cards = new botBuilder.HeroCard(session)
        .title("Please select one").buttons(
        [botBuilder.CardAction.dialogAction(session, "startAction", "", "Start"),
        botBuilder.CardAction.dialogAction(session, "addNameAction", "", "Add/update name"),
        botBuilder.CardAction.dialogAction(session, "addPhoneNumber", "", "Add/update phone number"),
        botBuilder.CardAction.dialogAction(session, "exit", "", "Exit")]);
    var msg = new botBuilder.Message(session).attachments([cards]);
    session.send(msg);
    bot.beginDialogAction('startAction', '/');
    bot.beginDialogAction('exit', 'exit');
    bot.beginDialogAction('addNameAction', 'name');
    bot.beginDialogAction('addPhoneNumber', 'phoneNumber');

}).triggerAction({
    matches: /^help$/i,

});

bot.dialog('name', [function (session) {
    session.userData.contactInfo.bool = true;
    session.beginDialog('askName', session.userData.contactInfo);
},
function (session, result) {
    session.endDialog();

}]);
bot.dialog('phoneNumber', [function (session) {
    session.userData.contactInfo.bool = true;
    session.beginDialog('number', session.userData.contactInfo);
},
function (session, result) {
    session.endDialog();
}
]);

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
                        .buttons([botBuilder.CardAction.dialogAction(session, " ", "", "Hi")]);
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

//middleware
// bot.use({
//     botbuilder: function (session, next) {
//         console.log("commming" + session.message.text);
//         if (session.message.text === 'catering') {
//             bot.beginDialog('/', 'catering');
//         }
//         next();
//     },
//     sent: function (session, next) {
//         console.log("sennt" + session.message.text);
//         next();
//     }
// });

exports.getBotListener = function () {
    return connector.listen();
}
