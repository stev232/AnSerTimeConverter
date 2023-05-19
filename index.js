const dayjs = require('dayjs');
const url_string = window.location;
const url = new URL(url_string);
const timeStamp = url.searchParams.get("timeStamp");

function converter(timeStamp) {
    return dayjs(timeStamp);
}

converter(timeStamp);