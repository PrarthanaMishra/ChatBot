var path = require('path');
var botBuilder = require('botbuilder');
var config = require('../config');
var BlankCard = require('../adaptiveCards/blankCard');
var TextFieldCard = require('../adaptiveCards/textFieldCard');
var TextBlockCard = require('../adaptiveCards/textBlock');
var serviceButtons = require('../dialogs/serviceButtons');
var contactFormDialog = require('../dialogs/contactFormDialog');
var tollFreeContactDialog = require('../dialogs/tollFreeContactDialog');
var thanksMsgDialog = require('../dialogs/thanksMsgDialog');
var contactDetails = require('../dialogs/contactDetails');
var editContactDetailsDialog = require('../dialogs/editContactDetailsDialog');
var otherInfoDialog = require('../dialogs/otherInfoDialog');
var cateringQueryFormDialog = require('../dialogs/cateringQueryFormDialog');
var cateringButtons = require('../dialogs/cateringButtonsDialog.js');
var textFieldDialog = require('../dialogs/textFieldDialog.js');
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

function getImages(folder, subFolder, subSubFolder, numOfImg) {
    subSubFolder = subSubFolder || {};
    numOfImg = numOfImg || 3;
    if (subSubFolder) {
        var img = [];
        for (var i = 1; i <= numOfImg; i++)
            img.push('/images/' + folder + '/' + subFolder + '/' + subSubFolder + '/' + i + '.jpg');
        return img;
    }
    var img = [];
    for (var i = 1; i <= numOfImg; i++)
        img.push('/images/' + folder + '/' + subFolder + '/' + i + '.jpg');
    return img;
}

function getCateringImage(folder, subFolder, numOfImg) {
    numOfImg = numOfImg || 3;
    var img = [];
    for (var i = 1; i <= numOfImg; i++)
        img.push('/images/' + folder + '/' + subFolder + '/' + i + '.JPG');
    return img;

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
                session.beginDialog('cateringQueryFormDialog', session.userData.clientInfo); break;
            case 'babyshower':
                session.beginDialog('imageDialog', { arrayOfImage: getCateringImage('Catering', 'weddingMenu'), heading: "Some of the samples are:" });
                session.beginDialog('contactFormDialog'); break;
            case 'birthday':
                session.beginDialog('imageDialog', { arrayOfImage: [getImages('Catering', 'birthday')[0]], heading: "Some of the samples are:" });
                session.beginDialog('contactFormDialog'); break;
            case 'engagement':
                session.beginDialog('imageDialog', { arrayOfImage: getCateringImage('Catering', 'weddingMenu'), heading: "Some of the samples are:" });
                session.beginDialog('contactFormDialog'); break;
            case 'housewarming':
                session.beginDialog('imageDialog', { arrayOfImage: getCateringImage('Catering', 'weddingMenu'), heading: "Some of the samples are:" });
                session.beginDialog('contactFormDialog'); break;
            case 'namingceremony':
                session.beginDialog('imageDialog', { arrayOfImage: getCateringImage('Catering', 'weddingMenu'), heading: "Some of the samples are:" });
                session.beginDialog('contactFormDialog'); break;
            case 'weddingmenu':
                session.beginDialog('imageDialog', { arrayOfImage: getCateringImage('Catering', 'weddingMenu'), heading: "Some of the samples are:" });
                session.beginDialog('contactFormDialog'); break;
            case 'cateringSubmit':
                cateringSubmitAction(session, session.message.value, session.userData.clientInfo, session.userData.serviceButtons, session.userData.contactInfo);
                break;

            //decoration and it's sub buttons
            case 'decoration':
                session.userData.serviceButtons = 'decoration';
                session.beginDialog('decorationQueryFormDialog', session.userData.clientInfo); break;
            case 'decobirthday':
                session.beginDialog('imageDialog', { arrayOfImage: getImages('Decoration', 'birthday'), heading: "Some of the samples are:" });
                session.beginDialog('contactFormDialog'); break;
            case 'cardecoration':
                session.beginDialog('imageDialog', { arrayOfImage: getImages('Decoration', 'carDecoration'), heading: "Some of the samples are:" });
                session.beginDialog('contactFormDialog'); break;
            case 'mantap':
                mantapImagesByBudget(session, session.userData.clientInfo, session.userData.serviceButtons);
                session.beginDialog('imageDialog', { arrayOfImage: getImages('Decoration', 'mantapaDecoration'), heading: "Some of the samples are:" });
                session.beginDialog('contactFormDialog'); break;
            case 'nameboard':
                session.beginDialog('imageDialog', { arrayOfImage: getImages('Decoration', 'nameBoard'), heading: "Some of the samples are:" });
                session.beginDialog('contactFormDialog'); break;
            case 'deconamingceremony':
                session.beginDialog('imageDialog', { arrayOfImage: getImages('Decoration', 'namingCeremony'), heading: "Some of the samples are:" });
                session.beginDialog('contactFormDialog'); break;
            case 'stagedecoration':
                session.beginDialog('imageDialog', { arrayOfImage: getImages('Decoration', 'stageDecoration'), heading: "Some of the samples are:" });
                session.beginDialog('contactFormDialog'); break;
            case 'others':
                session.beginDialog('textFieldDialog'); break;
            case 'photography':
                session.userData.serviceButtons = 'photography';
                session.beginDialog('photographyFormDialog', session.userData.clientInfo); break;
            case 'entertainment':
                session.userData.serviceButtons = 'entertainment';
                session.beginDialog('entertainmentFormDialog', session.userData.clientInfo); break;
            case 'entertainmentSubmit':
                showImages(session, session.message.value, session.userData.serviceButtons);
                isContactInfo(session, session.userData.contactInfo); break;
                break;
            case 'venue':
                session.userData.serviceButtons = 'venue';
                session.beginDialog('venueFormDialog', session.userData.clientInfo); break;
            case 'venuSubmit':
                showImages(session, session.message.value, session.userData.serviceButtons);
                isContactInfo(session, session.userData.contactInfo); break;
            case 'mehndi':
                session.userData.serviceButtons = 'mehndi';
                session.beginDialog('mehndiFormDialog', session.userData.clientInfo); break;
            case 'mehndiSubmit':
                showImages(session, session.message.value, session.userData.serviceButtons);
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
            case 'submits':
                isContactInfo(session, session.userData.contactInfo); break;

        }
    }
});

function mantapImagesByBudget(session, clientInfo, serviceButtons) {
    session.userData = session.userData || {};
    session.userData.clientInfo = clientInfo || {};
    if (serviceButtons === 'mantap') {
        if (session.userData.clientInfo.budget === 50000) {
            session.beginDialog('imageDialog', { arrayOfImage: getImages('Decoration', 'mantapa', '50000'), heading: "Mantap with 50000 budget" });
        }
        else if (50000 <= session.userData.clientInfo.budget <= 75000) {
            session.beginDialog('imageDialog', { arrayOfImage: getImages('Decoration', 'mantapa', '50000-75000'), heading: "Mantap with 75000 budget" });

        }
        else if (50000 <= session.userData.clientInfo.budget <= 75000) {
            session.beginDialog('imageDialog', { arrayOfImage: getImages('Decoration', 'mantapa', '50000-75000'), heading: "Mantap with 75000 budget" });

        }
        else if (75000 <= session.userData.clientInfo.budget <= 100000) {
            session.beginDialog('imageDialog', { arrayOfImage: getImages('Decoration', 'mantapa', '75000-100000'), heading: "Mantap with 100000 budget" });

        }
    }
    else if (serviceButtons === 'stagedecoration') {
        if (70000 <= session.userData.clientInfo.budget <= 100000) {
            session.beginDialog('imageDialog', { arrayOfImage: getImages('Decoration', 'stagedecoration', '70000-100000'), heading: "Stage with 50000 budget" });
        }
        else if (100000 <= session.userData.clientInfo.budget <= 150000) {
            session.beginDialog('imageDialog', { arrayOfImage: getImages('Decoration', 'stagedecoration', '100000-150000'), heading: "Stage with 10000 budget" });

        }
        else if (150000 <= session.userData.clientInfo.budget <= 200000) {
            session.beginDialog('imageDialog', { arrayOfImage: getImages('Decoration', 'stagedecoration', '150000-200000'), heading: "Stage with 150000 budget" });
        }


    }
}
function showImages(session, values, service) {
    switch (service) {
        case 'entertainment':
            var entertainment = values.entertainmentType
            if (values.entertainmentType) {
                var array = values.entertainmentType.split(';');
                for (var i = 0; i < array.length; i++) {
                    console.log(array[i]);
                    switch (array[i]) {
                        case 'magician': session.beginDialog('imageDialog', { arrayOfImage: getImages('Entertainment', 'magician'), heading: "Magician" }); break;
                        case 'MC': session.beginDialog('imageDialog', { arrayOfImage: getImages('Entertainment', 'MC'), heading: "MC" }); break
                        case 'Nadaswaram': session.beginDialog('imageDialog', { arrayOfImage: getImages('Entertainment', 'nadaswaram'), heading: "Nadaswaram" }); break;
                        case 'choreographer': session.beginDialog('imageDialog', { arrayOfImage: getImages('Entertainment', 'choreographer'), heading: "Choreographer" }); break;
                        case 'DJ': session.beginDialog('imageDialog', { arrayOfImage: getImages('Entertainment', 'DJ'), heading: "DJ" }); break;
                    }
                }
            }
        case 'mehndi':
            var entertainment = values.mehndiType
            console.log(values.mehndiType);
            if (values.mehndiType) {
                var array = values.mehndiType.split(';');

                for (var i = 0; i < array.length; i++) {
                    console.log(array[i]);
                    switch (array[i]) {
                        case 'bride': session.beginDialog('imageDialog', { arrayOfImage: getImages('mehndi', 'bride', 2), heading: "Bridal Makeup" }); break;
                        case 'guest': session.beginDialog('imageDialog', { arrayOfImage: getImages('mehndi', 'guest', 1), heading: 'Makeup for wedding' }); break;
                    }
                }
            }

        case 'venue':
            var entertainment = values.venueType
            console.log(values.venueType);
            if (values.venueType) {
                var array = values.venueType.split(';');

                for (var i = 0; i < array.length; i++) {
                    console.log(array[i]);
                    switch (array[i]) {
                        case 'KBH': session.beginDialog('imageDialog', { arrayOfImage: getCateringImage('Venubooking', 'banquetHall', 1), heading: "Banquet Hall" }); break;
                        case 'GPH': session.beginDialog('imageDialog', { arrayOfImage: getCateringImage('Venubooking', 'grandPartyHall', 1), heading: "Party hall" }); break;
                        case 'KM': session.beginDialog('imageDialog', { arrayOfImage: getCateringImage('Venubooking', 'kalyanaMantapa', 1), heading: "KalyanaMantapa" }); break

                    }
                }
            }

    }
}

function isContactInfo(session, contactInfo) {
    console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++");
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
    validateDetails(session, session.userData.contactInfo);
    // session.beginDialog('thanksMsgDialog');
}

function validateDetails(session, values) {
    session.userData = session.userData || {};
    session.userData.contactInfo = values || {};
    if (session.userData && session.userData.contactInfo && session.userData.contactInfo.name && session.userData.contactInfo.phone) {
        session.beginDialog('thanksMsgDialog');
        return;
    }
    session.userData.contactInfo.flag = "y";
    session.beginDialog('contactFormDialog', session.userData.contactInfo);
}

function cateringSubmitAction(session, value, clientInfo, serviceButtons, contactInfo) {
    session.userData = session.userData || {};
    session.userData.clientInfo = value || {};
    session.userData.serviceButtons = serviceButtons || {};
    session.userData.contactInfo = contactInfo || {};

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
bot.dialog('contactFormDialog', contactFormDialog);
bot.dialog('tollFreeContactDialog', tollFreeContactDialog);
bot.dialog('thanksMsgDialog', thanksMsgDialog);
bot.dialog('details', contactDetails);
bot.dialog('editContactDetailsDialog', editContactDetailsDialog);
bot.dialog('otherInfoDialog', otherInfoDialog);
bot.dialog('cateringQueryFormDialog', cateringQueryFormDialog);
bot.dialog('cateringButtons', cateringButtons);
bot.dialog('textFieldDialog', textFieldDialog);
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