var TextBlock = function () {
}

TextBlock.prototype.getType = function getType() {
    return this.type;
}

TextBlock.prototype.setType = function setType(type) {
    this.type = type;
    return this;
}
TextBlock.prototype.getWeight = function getWeight() {
    return this.weight;
}

TextBlock.prototype.setWeight = function setWeight(weight) {
    this.weight = weight;
    return this;
}

TextBlock.prototype.getIsSubtle = function getIsSubtle() {
    return this.isSubtle;
}
TextBlock.prototype.setIsSubtle = function setIsSubtle(isSubtle) {
    this.isSubtle = isSubtle;
    return this;
}
TextBlock.prototype.getWrap = function getWrap() {
    return this.wrap;
}
TextBlock.prototype.setWrap = function setWrap(wrap) {
    this.wrap = wrap;
    return this;
}
TextBlock.prototype.getText = function getText() {
    return this.Text;
}
TextBlock.prototype.setText = function setText(text) {
    this.text = text;
    return this;
}
module.exports = TextBlock;