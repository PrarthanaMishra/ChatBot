var Action = function () {

}
Action.prototype.getType = function getType() {
    return this.type;
}
Action.prototype.setType = function setType(type) {
    this.type = type;
    return this;
}
Action.prototype.getTitle = function getTitle() {
    return this.title;
}
Action.prototype.setTitle = function setTitle(title) {
    this.title = title;
    return this;
}
Action.prototype.getData = function getData() {
    return this.getData;
}
Action.prototype.setData = function (data) {
    this.data = data;
    return this;
}

module.exports = Action;
