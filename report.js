function printReport(pages) {
    console.log("------------------------------------");
    console.log("Report");
    console.log("------------------------------------");
    
    // Call sortPages to get the sorted array
    const sortedPages = sortPages(pages);

    // Iterate over sortedPages instead of sortPages
    for (const sortedPage of sortedPages) {
        const url = sortedPage[0];
        const hits = sortedPage[1];
        console.log(`Found ${hits} links to page: ${url}`);
    }

    console.log("------------------------------------");
    console.log("End Report");
    console.log("------------------------------------");
}

function sortPages(pages) {
    const pagesArr = Object.entries(pages);
    pagesArr.sort((a, b) => {
        return b[1] - a[1]; // Sort by the second element (hit count) in descending order
    });
    return pagesArr;
}

module.exports = {
    sortPages,
    printReport
};
