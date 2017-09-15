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
var photographyFormDialog = require('../dialogs/photographyFormDialog.js');
var imageDialog = require('../dialogs/imageDialog.js');
var venueFormDialog = require('../dialogs/venueFormDialog.js');
var entertainmentFormDialog = require('../dialogs/entertainmentFormDialog.js');
var mehndiFormDialog = require('../dialogs/mehndiFormDialog');

var connector = new botBuilder.ChatConnector({
    appId: config.appId,
    appPassword: config.password
});

function getImages(folder, subFolder) {
    return ['/images/' + folder + '/' + subFolder + '/' + '1.jpg', '/images/' + folder + '/' + subFolder + '/' + '2.jpg', '/images/' + folder + '/' + subFolder + '/' + '3.jpg']
}

function getCateringImage(folder, subFolder) {
    return ['/images/' + folder + '/' + subFolder + '/' + '1.JPG', '/images/' + folder + '/' + subFolder + '/' + '2.JPG', '/images/' + folder + '/' + subFolder + '/' + '3.JPG'];
}

var bot = new botBuilder.UniversalBot(connector, function (session) {
    if (session.message && session.message.value) {

        session.userData.serviceButtons = session.userData.serviceButtons || {};
        session.userData.contactInfo = session.userData.contactInfo || {};
        session.userData.contactInfo.serviceChoosed = session.userData.contactInfo.serviceChoosed || [];

        // A Card's Submit Action obj was received

        switch (session.message.value.type) {

            // catering and it's sub buttons
            case 'catering':
                session.userData.serviceButtons = 'catering';
                session.beginDialog('cateringQueryFormDialog'); break;
            case 'babyShower':
                session.beginDialog('imageDialog', getCateringImage('Catering', 'weddingMenu'));
                session.beginDialog('contactFormDialog'); break;
            case 'birthday':
                session.beginDialog('imageDialog', getImages('Catering', 'birthday')[0]);
                session.beginDialog('contactFormDialog'); break;
            case 'engagement':
                session.beginDialog('imageDialog', getCateringImage('Catering', 'weddingMenu'));
                session.beginDialog('contactFormDialog'); break;
            case 'houseWarming':
                session.beginDialog('imageDialog', getCateringImage('Catering', 'weddingMenu'));
                session.beginDialog('contactFormDialog'); break;
            case 'namingceremony':
                session.beginDialog('imageDialog', getCateringImage('Catering', 'weddingMenu'));
                session.beginDialog('contactFormDialog'); break;
            case 'weddingMenu':
                session.beginDialog('imageDialog', getCateringImage('Catering', 'weddingMenu'));
                session.beginDialog('contactFormDialog'); break;
            case 'cateringSubmit':
                cateringSubmitAction(session, session.message.value, session.userData.clientInfo, session.userData.serviceButtons, session.userData.contactInfo);
                break;

            //decoration and it's sub buttons
            case 'decoration':
                session.userData.serviceButtons = 'decoration';
                session.beginDialog('decorationQueryFormDialog'); break;
            case 'decobirthday':
                session.beginDialog('imageDialog', getImages('Decoration', 'birthday'));
                session.beginDialog('contactFormDialog'); break;
            case 'cardecoration':
                session.beginDialog('imageDialog', getImages('Decoration', 'carDecoration'));
                session.beginDialog('contactFormDialog'); break;
            case 'mantap':
                session.beginDialog('imageDialog', getImages('Decoration', 'mantapaDecoration'));
                session.beginDialog('contactFormDialog'); break;
            case 'nameBoard':
                session.beginDialog('imageDialog', getImages('Decoration', 'nameBoard'));
                session.beginDialog('contactFormDialog'); break;
            case 'deconamingCeremony':
                session.beginDialog('imageDialog', getImages('Decoration', 'namingCeremony'));
                session.beginDialog('contactFormDialog'); break;
            case 'stagedecoration':
                session.beginDialog('imageDialog', getImages('Decoration', 'stageDecoration'));
                session.beginDialog('contactFormDialog'); break;
            case 'others':
                session.beginDialog('textFieldDialog'); break;
            case 'photography':
                session.userData.serviceButtons = 'photography';
                session.beginDialog('photographyFormDialog'); break;
            case 'entertainment':
                session.userData.serviceButtons = 'entertainment';
                session.beginDialog('entertainmentFormDialog'); break;
            case 'entertainmentSubmit':
                showEntertainmentImages(session, session.message.value);
                isContactInfo(session, session.userData.contactInfo); break;
                break;
            case 'venue':
                session.userData.serviceButtons = 'venue';
                session.beginDialog('venueFormDialog'); break;
            case 'venuSubmit':
                session.beginDialog('venueDialog');
                isContactInfo(session, session.userData.contactInfo); break;
            case 'mehndi':
                session.userData.serviceButtons = 'mehndi';
                session.beginDialog('mehndiFormDialog'); break;
            case 'mehndiSubmit':
                isContactInfo(session, session.userData.contactInfo); break;
            case 'submit':
                formSubmitAction(session, session.message.value, session.userData.contactInfo, session.userData.serviceChoosed); break;
            case 'cancel':
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
            case 'photosubmit':
                session.beginDialog('contactFormDialog'); break;
        }
    }
});

function showEntertainmentImages(session, values) {
    var entertainment = values.entertainmentType
    console.log(values.entertainmentType);
    var array = values.entertainmentType.split(';');
    for (var i = 0; i < array.length; i++) {
        console.log(array[i]);
        switch (array[i]) {
            case 'magician': session.beginDialog('imageDialog', getImages('Entertainment', 'magician')); break;
            case 'MC': session.beginDialog('imageDialog', getImages('Entertainment', 'MC')); break
            case 'Nadaswaram': session.beginDialog('imageDialog', getImages('Entertainment', 'Nadaswaram')); break;
            case 'choreographer': session.beginDialog('imageDialog', getImages('Entertainment', 'choreographer')); break;
            case 'DJ': session.beginDialog('imageDialog', getImages('Entertainment', 'DJ')); break;

            // case 'Nadaswaram': session.beginDialog('imageDialog', getImages('Entertainment', 'Nadaswaram')); break

        }
    }
}

function isContactInfo(session, contactInfo) {
    session.userData = session.userData || {};
    session.userData.contactInfo = contactInfo || {};
    if (session && session.userData && session.userData.contactInfo.phone) {
        session.beginDialog('details', session.userData.contactInfo);
        session.beginDialog('thanksMsgDialog');
        return;
    }
    session.beginDialog('contactFormDialog');
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
        session.beginDialog('details', session.userData.contactInfo);
        return session.beginDialog('thanksMsgDialog');
    }
    if (value.name) {
        session.userdata.contactInfo.name = value.name;
    }
    if (value.phone) {
        session.userdata.contactInfo.phone = value.phone;
    }
    if (session.userData && session.userData.contactInfo.name && session.userData.contactInfo.phone) {
        session.beginDialog('details', session.userData.contactInfo);
    }
    session.beginDialog('thanksMsgDialog');
}

function cateringSubmitAction(session, value, clientInfo, serviceButtons, contactInfo) {
    session.userData = session.userData || {};
    session.userData.clientInfo = value || {};
    session.userData.serviceButtons = serviceButtons || {};
    session.userData.contactInfo = contactInfo || {};

    console.log("+++++++++++++" + session.userData.serviceButtons);
    console.log(session.userData.contactInfo.name + session.userData.contactInfo.phone);
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
bot.dialog('venueDialog', venueDialog);
bot.dialog('photography', photographyDialog);
bot.dialog('confirmDialog', confirmDialog);
bot.dialog('contactFormDialog', contactFormDialog);
bot.dialog('tollFreeContactDialog', tollFreeContactDialog);
bot.dialog('thanksMsgDialog', thanksMsgDialog);
bot.dialog('details', contactDetails);
bot.dialog('editContactDetailsDialog', editContactDetailsDialog);
bot.dialog('otherInfoDialog', otherInfoDialog);
bot.dialog('cateringQueryFormDialog', cateringQueryFormDialog);
bot.dialog('cateringButtons', cateringButtons);
bot.dialog('textFieldDialog', textFieldDialog);
bot.dialog('weddingMenuDialog', weddingMenuDialog);
bot.dialog('decorationQueryFormDialog', decorationQueryFormDialog);
bot.dialog('decorationbuttons', decorationButtons);
bot.dialog('photographyFormDialog', photographyFormDialog);
bot.dialog('imageDialog', imageDialog);
bot.dialog('venueFormDialog', venueFormDialog);
bot.dialog('entertainmentFormDialog', entertainmentFormDialog);
bot.dialog('mehndiFormDialog', mehndiFormDialog);

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