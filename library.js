function getSetString(match, src, width, height)
{
    if (width == "" && height === "")
        return match;

    var onload = "";
    if (height !== "")
        onload += "this.style.maxHeight = '" + height + "px';";
    else if (width !== ""){
        onload += "this.style.maxHeight = (" + width + " / this.width) * this.height + 'px';";
    }

    return "<img src=\"" + src + "\" onload=\"" + onload + "\"";
}

function getPercentString(match, src, percent) {
    return getMultString(match, src, percent/100);
}

function getMultString(match, src, mult)
{
    if (mult == "")
        return match;
    var onload =
        "var height = this.height * " + mult + ";" +
        "this.style.width = 'auto';" +
        "this.style.maxHeight = height + 'px';";
    return "<img src=\"" + src + "\" onload=\"" + onload + "\"";
}

var ImageSizer = {
    sizeImages: function(postData, callback) {
        percentRegex = /<img src="([^@]*)@([0-9]+)%(25)?"/g; // TODO: figure out why "25" gets appended on v0.5.2
        absoluteRegex = /<img src="([^@]*)@([0-9]*)x([0-9]*)"/g;
        multiplyRegex = /<img src="([^@]*)@([0-9]*\.?[0-9]*)"/g;

        data.postData.content = data.postData.content.replace(percentRegex, getPercentString);
        data.postData.content = data.postData.content.replace(multiplyRegex, getMultString);
        data.postData.content = data.postData.content.replace(absoluteRegex, getSetString);

        callback(null, data);
    }
};

module.exports = ImageSizer;
