const { normalizeURL, getURLsFromHTML } = require('./crawl.js')
const { test, expect } = require('@jest/globals')

test('normalizeURL strip protocol', () => {
    const input = 'https://blog.boot.dev/path'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('normalizeURL strip trailing slash', () => {
    const input = 'https://blog.boot.dev/path/'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('normalizeURL strip capitals', () => {
    const input = 'https://BLOG.boot.dev/path'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'  // Ensure the domain is normalized to lowercase
    expect(actual).toEqual(expected)
})

test('normalizeURL strip http', () => {
    const input = 'http://blog.boot.dev/path';
    const actual = normalizeURL(input);
    const expected = 'blog.boot.dev/path';
    expect(actual).toEqual(expected);
});

test('getURLsFromHTML absolute', () => {
    const html = `
<html>
    <body>
        <a href="https://blog.boot.dev/">
            Boot.dev Blog
        </a>
    </body>
</html>
    `;
    const baseURL = 'https://blog.boot.dev'; // Base URL for the test
    const actual = getURLsFromHTML(html, baseURL);  // Pass the baseURL to the function
    const expected = ['https://blog.boot.dev/'];  // Expected absolute URL
    expect(actual).toEqual(expected);
});

test('getURLsFromHTML relative', () => {
    const html = `
<html>
    <body>
        <a href="/path/">
            Boot.dev Blog
        </a>
    </body>
</html>
    `;
    const baseURL = 'https://blog.boot.dev';  // Base URL for the test
    const actual = getURLsFromHTML(html, baseURL);  // Pass the baseURL to the function
    const expected = ['https://blog.boot.dev/path/']; // Expected full URL after resolving the relative path
    expect(actual).toEqual(expected);
});


test('getURLsFromHTML both', () => {
    const inputHTMLBody = `
<html>
    <body>
        <a href="https://blog.boot.dev/path1/">Boot.dev Blog Path One</a>
        <a href="/path2/">Boot.dev Blog Path Two</a>
    </body>
</html>
    `;
    const inputBaseURL = 'https://blog.boot.dev';  // Base URL for the test
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);  // Pass the baseURL to the function
    
    // Expected full URL after resolving the relative path
    const expected = ["https://blog.boot.dev/path1/", "https://blog.boot.dev/path2/"];  
    
    // Assert that the actual result matches the expected output
    expect(actual).toEqual(expected);
});

test('getURLsFromHTML invalid', () => {
    const inputHTMLBody = `
<html>
    <body>
        <a href="invalid">
            Invalid URL
        </a>
    </body>
</html>
    `;
    const inputBaseURL = 'https://blog.boot.dev';  // Base URL for the test
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);  // Pass the baseURL to the function
    
    // Since "invalid" is not a valid URL, the expected result should be an empty array
    const expected = []; 
    
    // Assert that the actual result matches the expected output (empty array for invalid URL)
    expect(actual).toEqual(expected);
});
