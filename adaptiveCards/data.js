var Data = function () {

}
Data.prototype.getType = function getType() {
    return this.type;
}
Data.prototype.setType = function setType(type) {
    this.type = type;
    return this;
}

module.exports = Data;