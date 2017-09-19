var botBuilder = require('botbuilder');
var BlankCard = require('../adaptiveCards/blankCard.js');

module.exports = function (session, data) {
    var arrayOfImage = Array.isArray(data.arrayOfImage) ? data.arrayOfImage : [data.arrayOfImage];
    var pa = 'https://bot.eventgeni.com';
    var card =
        {
            'type': 'Container',
            'items': [
                {
                    "type": "ColumnSet",
                    "columns": [
                        {
                            "type": "Column",
                            "size": "large",
                            "items": [
                                {
                                    "type": "TextBlock",
                                    "text": data.heading,
                                    "weight": "Strong"
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "ColumnSet",
                    "columns": [
                        {
                            "type": "Column",
                            "size": "large",
                            "items": [
                                {
                                    "type": "Image",
                                    "url": pa + arrayOfImage[0],
                                    "selectAction": {
                                        "type": "Action.OpenUrl",
                                        "url": pa + arrayOfImage[0]

                                    }

                                }
                            ]
                        },
                        {
                            "type": "Column",
                            "size": "large",
                            "items": [
                                {
                                    "type": "Image",
                                    "url": pa + arrayOfImage[1],
                                    "selectAction": {
                                        "type": "Action.OpenUrl",
                                        "url": pa + arrayOfImage[1]

                                    }

                                }
                            ]
                        },
                        {
                            "type": "Column",
                            "size": "large",
                            "items": [
                                {
                                    "type": "Image",
                                    "url": pa + arrayOfImage[2],
                                    "selectAction": {
                                        "type": "Action.OpenUrl",
                                        "url": pa + arrayOfImage[2]

                                    }

                                }
                            ]
                        }
                    ]
                }
            ]
        }




    var blankCard = new BlankCard();
    // getgrid(arrayOfImage, pa).every(function (tmp) {
    //     console.log(tmp);
    //     card.items.push(tmp);
    // })
    blankCard.setBody(card);
    // console.log(JSON.stringify(card, null, 2))

    var msg = new botBuilder.Message(session)
        .addAttachment(blankCard);
    session.send(msg);
    session.endDialog();
}


// function getgrid(images, pa) {
//     var colSet = [];
//     for (var i = 0; i < Math.ceil(images.length / 3); i++) {
//         var x = {
//             "type": "ColumnSet",
//             "columns":
//             (function (images) {
//                 var x = {
//                     "type": "Column",
//                     "size": "large",
//                     "items":
//                     images.map(function (image) {
//                         return {
//                             "type": "Image",
//                             "url": pa + image,
//                             "selectAction": {
//                                 "type": "Action.OpenUrl",
//                                 "title": "cool link",
//                                 "url": pa + image
//                             }
//                         };
//                     })
//                 }
//                 return [x];
//             })(images.splice(0, 3))
//         }
//         colSet.push(x);
//     }
//     return colSet;
// }

