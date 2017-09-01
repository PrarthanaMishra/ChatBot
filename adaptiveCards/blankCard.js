var blankCard = {
    'contentType': 'application/vnd.microsoft.card.adaptive',
    'content': {
        '$schema': 'http://adaptivecards.io/schemas/adaptive-card.json',
        'type': 'AdaptiveCard',
        'version': '1.0',
        "body": [
        ],
        "actions": [

        ]
    }
};

var BlankCard = function () {
    this.contentType = 'application/vnd.microsoft.card.adaptive';
    this.content = {};
    this.content.$schema = 'http://adaptivecards.io/schemas/adaptive-card.json';
    this.content.type = 'AdaptiveCard';
    this.content.version = '1.0';
}

BlankCard.prototype.setBody = function (body) {
    if (!Array.isArray(this.content.body)) {
        this.content.body = [];
    }
    this.content.body.push(body);
    return this;
}

BlankCard.prototype.setAction = function (actions) {
    if (!Array.isArray(this.content.actions)) {
        this.content.actions = [];
    }
    this.content.actions.push(actions);
    return this;
}

module.exports = BlankCard;