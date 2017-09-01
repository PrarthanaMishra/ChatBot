var Button = function () {

}

Button.prototype.getType = function getType() {
    return this.type;
}
Button.prototype.setType = function setType(type) {
    this.type = type;
    return this;
}
Button.prototype.getTitle = function getTitle() {
    return this.title;
}
Button.prototype.setTitle = function setTitle(title) {
    this.title = title;
    return this;
}
Button.prototype.getCard = function getCard() {
    return this.card;
}
Button.prototype.setCard = function setCard(card) {
    // if (!this.actions) {
    //     this.actions = {};
    // }
    this.card = card;
    return this;
}

module.exports = Button;