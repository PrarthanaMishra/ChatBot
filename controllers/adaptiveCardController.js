var path = require('path');
var botBuilder = require('botbuilder');
var config = require('../config');
var BlankCard = require('../adaptiveCards/blankCard');
var TextFieldCard = require('../adaptiveCards/textFieldCard');
var TextBlockCard = require('../adaptiveCards/textBlock');
var serviceButtons = require('../dialogs/serviceButtons');
var cateringDialog = require('../dialogs/cateringDialog');
var photographyDialog = require('../dialogs/photographyDialog');
var decorationDialog = require('../dialogs/decorationDialog');
var entertainmentDialog = require('../dialogs/entertainmentDialog');
var mehndiDialog = require('../dialogs/mehndiDialog');
var venueDialog = require('../dialogs/venueDialog');
var confirmDialog = require('../dialogs/confirmDialog');
var contactFormDialog = require('../dialogs/contactFormDialog');
var tollFreeContactDialog = require('../dialogs/tollFreeContactDialog');
var thanksMsgDialog = require('../dialogs/thanksMsgDialog');
var contactDetails = require('../dialogs/contactDetails');
var editContactDetailsDialog = require('../dialogs/editContactDetailsDialog');
var otherInfoDialog = require('../dialogs/otherInfoDialog');
var cateringQueryFormDialog = require('../dialogs/cateringQueryFormDialog');
var cateringButtons = require('../dialogs/cateringButtonsDialog.js');
var textFieldDialog = require('../dialogs/textFieldDialog.js');
var weddingMenuDialog = require('../dialogs/weddingMenuDialog.js');
var decorationButtons = require('../dialogs/decorationButtonsDialog.js');
var decorationQueryFormDialog = require('../dialogs/decorationFormDialog.js');


var connector = new botBuilder.ChatConnector({
    appId: config.appId,
    appPassword: config.password
});

var bot = new botBuilder.UniversalBot(connector, function (session) {
    if (session.message && session.message.value) {

        session.userData.serviceButtons = session.userData.serviceButtons || {};
        session.userData.contactInfo = session.userData.contactInfo || {};
        session.userData.contactInfo.serviceChoosed = session.userData.contactInfo.serviceChoosed || [];

        // A Card's Submit Action obj was received
        console.error(new Error(session.message.value.type));

        switch (session.message.value.type) {

            case 'catering':
                session.userData.serviceButtons = 'catering';
                session.beginDialog('cateringQueryFormDialog'); break;
            case 'cateringSubmit':
                cateringSubmitAction(session, session.message.value, session.userData.clientInfo, session.userData.serviceButtons); break;
            case 'others':
                session.beginDialog('textFieldDialog'); break;
            case 'weddingmenu':
                session.beginDialog('weddingMenuDialog');
                session.beginDialog('contactFormDialog');
                break;
            case 'photography':
                session.userData.serviceButtons = 'photography';
                if (session.userData.contactInfo.serviceChoosed.indexOf('photography') < 0) {
                    session.userData.contactInfo.serviceChoosed.push('photography');
                }
                session.beginDialog('confirmDialog', session.userData.serviceButtons); break;
            case 'decoration':
                session.userData.serviceButtons = 'decoration';
                console.log("+++++++++++++++++++++++++", 'Decor');
                session.beginDialog('cateringQueryFormDialog'); break;
            // session.beginDialog('decorationQueryFormDialog'); break;
            case 'entertainment':
                session.userData.serviceButtons = 'entertainment';
                if (session.userData.contactInfo.serviceChoosed.indexOf('entertainment') < 0) {
                    session.userData.contactInfo.serviceChoosed.push('entertainment');
                }
                session.beginDialog('confirmDialog', session.userData.serviceButtons); break;
            case 'venue':
                session.userData.serviceButtons = 'venue';
                if (session.userData.contactInfo.serviceChoosed.indexOf('venue') < 0) {
                    session.userData.contactInfo.serviceChoosed.push('venue');
                }
                session.beginDialog('confirmDialog', session.userData.serviceButtons); break;
            case 'mehndi':
                session.userData.serviceButtons = 'mehndi';
                if (session.userData.contactInfo.serviceChoosed.indexOf('mehndi') < 0) {
                    session.userData.contactInfo.serviceChoosed.push('mehndi');
                }
                session.beginDialog('confirmDialog', session.userData.serviceButtons); break;
            case 'yes':
                serviceSubmitAction(session, session.userData.serviceButtons, session.userData.contactInfo); break;
            case 'no':
                session.userData.contactInfo.serviceChoosed.pop();
                session.beginDialog('otherInfoDialog', session.userData.contactInfo); break;
            //  session.beginDialog('thanksMsgDialog', session.userData.contactInfo); break;
            //   session.beginDialog('serviceButtons'); break;
            case 'submit':
                formSubmitAction(session, session.message.value, session.userData.contactInfo, session.userData.serviceChoosed); break;
            case 'cancel':
                //  session.beginDialog('tollFreeContactDialog');
                //  session.beginDialog('details', session.userData.contactInfo, session.userData.serviceChoosed);
                // session.beginDialog('thanksMsgDialog'); break;
                session.beginDialog('serviceButtons'); break;
            case 'goback':
                session.beginDialog('serviceButtons'); break;
            case 'updatecontact':
                session.beginDialog('editContactDetailsDialog', session.userData.contactInfo); break;
            case 'update':
                formSubmitAction(session, session.message.value, session.userData.contactInfo, session.userData.updateFlag); break;
            case 'updatecancel':
                session.beginDialog('details', session.userData.contactInfo, session.userData.serviceChoosed);
                session.beginDialog('thanksMsgDialog'); break;
        }
    }
});

function serviceSubmitAction(session, serviceButtons, args, serviceChoosed) {
    session.userdata = session.userData || {};
    session.userdata.contactInfo = args || {};
    session.userData.serviceChoosed = serviceChoosed || [];

    if (serviceButtons) {
        if (serviceButtons === 'catering') {
            session.beginDialog('catering');
            if (session && session.userdata && session.userdata.contactInfo.phone) {
                // session.beginDialog('tollFreeContactDialog');
                session.beginDialog('details', session.userData.contactInfo);
                session.beginDialog('thanksMsgDialog');
                return;
            }
            session.beginDialog('contactFormDialog');
        }
        else if (serviceButtons === 'photography') {
            session.beginDialog('photography');
            if (session && session.userdata && session.userdata.contactInfo.phone) {
                session.beginDialog('details', session.userData.contactInfo);
                session.beginDialog('thanksMsgDialog');
                return;
            }
            session.beginDialog('contactFormDialog');
        }
        else if (serviceButtons === 'decoration') {
            session.beginDialog('decoration');
            if (session && session.userdata && session.userdata.contactInfo.phone) {
                session.beginDialog('details', session.userData.contactInfo);
                session.beginDialog('thanksMsgDialog');
                return;
            }
            session.beginDialog('contactFormDialog');
        }
        else if (serviceButtons === 'entertainment') {
            session.beginDialog('entertainment');
            if (session && session.userdata && session.userdata.contactInfo.phone) {
                session.beginDialog('details', session.userData.contactInfo);
                session.beginDialog('thanksMsgDialog');
                return;
            }
            session.beginDialog('contactFormDialog');
        }
        else if (serviceButtons === 'venue') {
            session.beginDialog('venue');
            if (session && session.userdata && session.userdata.contactInfo.phone) {
                session.beginDialog('details', session.userData.contactInfo);
                session.beginDialog('thanksMsgDialog');
                return;
            }
            session.beginDialog('contactFormDialog');
        }
        else if (serviceButtons === 'mehndi') {
            session.beginDialog('mehndi');
            if (session && session.userdata && session.userdata.contactInfo.phone) {
                session.beginDialog('details', session.userData.contactInfo);
                session.beginDialog('thanksMsgDialog');
                return;
            }
            session.beginDialog('contactFormDialog');
        }

    }
}

function formSubmitAction(session, value, args, flag, serviceChoosed) {

    session.userdata = session.userData || {};
    session.userdata.contactInfo = args || {};
    session.userData.updateFlag = flag || {};
    session.userData.serviceChoosed = serviceChoosed || [];
    if (session && session.userdata && session.userdata.contactInfo &&
        session.userdata.contactInfo.name && session.userdata.contactInfo.phone && !session.userData.updateFlag) {
        if (session.userData.contactInfo.other) {
            session.userData.contactInfo.other = value.lookingfor;
        }
        // else {
        //     return;
        // }
        session.beginDialog('details', session.userData.contactInfo);
        return session.beginDialog('thanksMsgDialog');
    }


    if (value.name) {
        session.userdata.contactInfo.name = value.name;
    }
    if (value.phone) {
        session.userdata.contactInfo.phone = value.phone;
    }
    session.beginDialog('details', session.userData.contactInfo);
    session.beginDialog('thanksMsgDialog');
}

function cateringSubmitAction(session, value, clientInfo, serviceButtons) {
    session.userData = session.userData || {};
    session.userData.clientInfo = value || {};
    session.userData.serviceButtons = serviceButtons || {};
    console.log("+++++++++++++" + session.userData.serviceButtons);
    if (value.date) {
        session.userData.clientInfo.date = value.date;
    }
    if (value.packs) {
        session.userData.clientInfo.packs = value.packs;
    }
    if (value.location) {
        session.userData.clientInfo.location = value.location;
    }
    if (value.budget) {
        session.userData.clientInfo.budget = value.budget;
    }
    if (session.userData.serviceButtons === 'catering') {
        session.beginDialog('cateringButtons');
    }
    else if (session.userData.serviceButtons === 'decoration') {
        session.beginDialog('decorationbuttons');
    }
}

//Dialog definitions
bot.dialog('serviceButtons', serviceButtons);
bot.dialog('catering', cateringDialog);
bot.dialog('decoration', decorationDialog);
bot.dialog('entertainment', entertainmentDialog);
bot.dialog('mehndi', mehndiDialog);
bot.dialog('venue', venueDialog);
bot.dialog('photography', photographyDialog);
bot.dialog('confirmDialog', confirmDialog);
bot.dialog('contactFormDialog', contactFormDialog);
bot.dialog('tollFreeContactDialog', tollFreeContactDialog);
bot.dialog('thanksMsgDialog', thanksMsgDialog);
bot.dialog('details', contactDetails);
bot.dialog('editContactDetailsDialog', editContactDetailsDialog);
bot.dialog('otherInfoDialog', otherInfoDialog);
//bot.dialog('cateringQueryFormDialog', cateringQueryFormDialog);
bot.dialog('cateringButtons', cateringButtons);
bot.dialog('textFieldDialog', textFieldDialog);
bot.dialog('weddingMenuDialog', weddingMenuDialog);
bot.dialog('decorationQueryFormDialog', decorationQueryFormDialog);
bot.dialog('decorationbuttons', decorationButtons);


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
                    var blankCard = new BlankCard();
                    blankCard.setBody(textBlock);
                    var msg = new botBuilder.Message(session).addAttachment(blankCard);
                    session.send(msg);
                    session.beginDialog('serviceButtons');
                });
            }
            else {
                // var reply = new botBuilder.Message()
                //     .address(message.address)
                //     .text("Welcome to unoBridge! One stop shop for all your event needs!, Please say Hi");
                // User is joining conversation (they sent message)
                // var address = Object.create(message.address);
                // address.user = identity;
                // bot.loadSession(message.address, function (err, session) {
                //     if (err) {
                //         return console.log(err);
                //     }

                //     var textCard = new TextFieldCard();
                //     var textBlock = new TextBlockCard();
                //     textBlock
                //         .setWrap(true)
                //         .setType("TextBlock")
                //         .setText("Welcome to unoBridge! One stop shop for all your event needs!")
                //         .setWeight('bolder');
                //     var blankCard = new BlankCard();
                //     blankCard.setBody(textBlock);
                //     var msg = new botBuilder.Message(session).addAttachment(blankCard);
                //     session.send(msg);
                //     session.beginDialog('serviceButtons');
                // });
            }

        });

    }

});

bot.dialog('clear', function (session) {
}).triggerAction({
    matches: /^clear$/i,
    onSelectAction: function (session) {
        session.send("hello");
        session.userData.contactInfo = {};
        session.userData.serviceChoosed = [];
    }
});


exports.getBotListener = function () {
    return connector.listen();
}