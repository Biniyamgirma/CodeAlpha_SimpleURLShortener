const urlRegex = /^(https?:\/\/)?[^\s/$.?#].[^\s]*$/i;

const checkURL = (url) => {
    if (!url) {
        return false;
    }
    if (url.length > 2048) {
        return false;
    }
    if (!urlRegex.test(url)) {
        return false;
    }
    return true;
}

module.exports = checkURL;