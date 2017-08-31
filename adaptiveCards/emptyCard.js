var EmptyCard = function () {

}

EmptyCard.prototype.getType = function getType() {
    return this.type;
}
EmptyCard.prototype.setType = function setType(type) {
    this.type = type;
    return this;
}
EmptyCard.prototype.getActions = function getActions() {
    return this.actions;
}
EmptyCard.prototype.setActions = function setActions(action) {
    if (!Array.isArray(this.actions)) {//typee of action is not defined yet
        this.actions = [];
    }
    this.actions.push(action);
    return this;
}
module.exports = EmptyCard;