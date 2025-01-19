function normalizeURL(urlString) {
    const urlObj = new URL(urlString); // Ensure you're using the correct variable name `urlString` here
    const hostPath = `${urlObj.hostname}${urlObj.pathname}`; // Use backticks for string interpolation
    if (hostPath.length > 0 && hostPath.slice(-1) === '/') {
        return hostPath.slice(0, -1); // Remove the trailing slash if present
    }
    return hostPath;
}

module.exports = {
    normalizeURL
};
