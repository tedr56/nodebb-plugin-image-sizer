function getSetString(match, src, width, height)
{
    if (width == "" && height === "")
        return match;

    var onload = ""
    if (width == "")
        onload += "var width = (" + height + "/this.height)*this.width;";
    else
        onload += "var width = " + width + ";";

    if (height == "")
        onload += "var height = (" + width + "/this.width)*this.height;";
    else
        onload += "var height = " + height + ";";


    onload +=
        "this.style.width = width + 'px';" +
        "this.style.height = height + 'px';";
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
        "var width = this.width * " + mult + ";" +
        "var height = this.height * " + mult + ";" +
        "this.style.width = width + 'px';" +
        "this.style.height = height + 'px';";
    return "<img src=\"" + src + "\" onload=\"" + onload + "\"";
}

var ImageSizer = {
    sizeImages: function(postData, callback) {
        percentRegex = /<img src="([^@]*)@([0-9]+)%"/g;
        absoluteRegex = /<img src="([^@]*)@([0-9]*)x([0-9]*)"/g;
        multiplyRegex = /<img src="([^@]*)@([0-9]*\.?[0-9]*)"/g;

        var tmp = postData;

        tmp = tmp.replace(percentRegex, getPercentString);
        tmp = tmp.replace(multiplyRegex, getMultString);
        tmp = tmp.replace(absoluteRegex, getSetString);

        console.log("uhhh");

        return tmp;
    }
};

module.exports = ImageSizer;