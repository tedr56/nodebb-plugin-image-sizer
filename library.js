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
    sizeImages: function(data, callback) {
	if (!data || !data.postData || !data.postData.content) {
	    return callback(null, data);
	}

        percentRegex = /<img src="([^@]*)@([0-9]+)%(25)?"/g; // TODO: figure out why "25" gets appended on v0.5.2
        absoluteRegex = /<img src="([^@]*)@([0-9]*)x([0-9]*)"/g;
        multiplyRegex = /<img src="([^@]*)@([0-9]*\.?[0-9]*)"/g;

        var tmp = data.postData.content;

        tmp = tmp.replace(percentRegex, getPercentString);
        tmp = tmp.replace(multiplyRegex, getMultString);
        tmp = tmp.replace(absoluteRegex, getSetString);

        callback(null, tmp);
    }
};

module.exports = ImageSizer;