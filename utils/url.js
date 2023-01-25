export const getQueryParam = (param) => {
	var rx = new RegExp('[?&]' + param + '=([^&]+).*$');
	var returnVal = window.location.search.match(rx);
	return returnVal === null ? '' : returnVal[1];
};