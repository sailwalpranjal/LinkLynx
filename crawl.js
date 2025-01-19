const { JSDOM } = require('jsdom');

async function crawlPage(baseURL, currentURL, pages){
    const baseURLObj = new URL(baseURL)
    const currentURLObj= new URL(currentURL)
    if(baseURLObj.hostname !== currentURLObj.hostname){
        return pages
    }

    const normalizedCurrentURL= normalizeURL(currentURL)
    if(pages[normalizedCurrentURL]>0){
        pages[normalizedCurrentURL]++
        return pages
    }
    pages[normalizedCurrentURL]=1
    
    console.log(`actively crawing: ${currentURL}`)
    try{
        const resp= await fetch(currentURL)
        if (resp.status > 399){
            console.log(`error in fetch with status code: ${resp.status} on page: ${currentURL}`)
            return pages
        }
        const contentType = resp.headers.get("content-type")
        if(!contentType.includes("text/html")) {
            console.log(`non html response, content type: ${contentType}, on page: ${currentURL}`)
            return pages
        }
        const htmlBody= await resp.text()

        const nextURLs= getURLsFromHTML(htmlBody, baseURL)
        for ( const nextURL of nextURLs){
            pages= await crawlPage(baseURL, nextURL, pages)
        }
    }catch (err){
        console.log(`error in fetch: ${err.message}, on page: ${currentURL}`)
    }
    return pages
}


function getURLsFromHTML(htmlBody, baseURL) {
    const urls = [];
    const dom = new JSDOM(htmlBody);
    const linkElements = dom.window.document.querySelectorAll('a');

    // Loop through all <a> elements
    for (const linkElement of linkElements) {
        const href = linkElement.href;

        try {
            if (href.startsWith('/')) {
                // Resolve relative URL by combining with the baseURL
                const urlObj = new URL(href, baseURL);  // Use baseURL to resolve relative URLs
                urls.push(urlObj.href);
            } else {
                // For absolute URLs, just push the href as is
                const urlObj = new URL(href);  // Directly use the absolute URL
                urls.push(urlObj.href);
            }
        } catch (err) {
            console.log(`Error processing URL: ${href} - ${err.message}`);
        }
    }

    return urls;
}

function normalizeURL(urlString) {
    const urlObj = new URL(urlString); // Create a URL object
    const hostPath = `${urlObj.hostname}${urlObj.pathname}`; // Get the host and path

    // Remove the trailing slash if present
    if (hostPath.length > 0 && hostPath.slice(-1) === '/') {
        return hostPath.slice(0, -1);
    }
    return hostPath;
}

module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage
};
