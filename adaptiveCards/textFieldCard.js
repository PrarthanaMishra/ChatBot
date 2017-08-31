
var TextCard = function () {
}

TextCard.prototype.getType = function getType() {
    return this.type;
}

TextCard.prototype.setType = function setType(type) {
    this.type = type;
    return this;
}
TextCard.prototype.getPlaceholder = function getPlaceholder() {
    return this.placeholder
}
TextCard.prototype.setPlaceHolder = function setPlaceHolder(placeholder) {
    this.placeholder = placeholder;
    return this;
}
TextCard.prototype.getId = function getId() {
    return this.getId;
}
TextCard.prototype.setId = function setId(id) {
    this.id = id;
    return this;
}

module.exports = TextCard;
