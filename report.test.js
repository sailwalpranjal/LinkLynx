// Importing required functions from report.js
const { normalizeURL, getURLsFromHTML, sortPages } = require('./report.js');
const { test, expect } = require('@jest/globals');

// Test Case 1: Sorting 2 pages
test('sortPages 2 pages', () => {
    const input = {
        'https://pranjalsailwal.vercel.app/path': 1,
        'https://pranjalsailwal.vercel.app/': 3
    };
    
    // Calling the sortPages function to get the sorted array
    const actual = sortPages(input);
    
    // Defining the expected sorted result
    const expected = [
        ['https://pranjalsailwal.vercel.app/', 3],
        ['https://pranjalsailwal.vercel.app/path', 1]
    ];
    
    // Comparing the actual and expected output
    expect(actual).toEqual(expected);
});

// Test Case 2: Sorting 5 pages
test('sortPages 5 pages', () => {
    const input = {
        'https://pranjalsailwal.vercel.app/path': 1,
        'https://pranjalsailwal.vercel.app/path2': 5,
        'https://pranjalsailwal.vercel.app/path3': 2,
        'https://pranjalsailwal.vercel.app/path4': 9,
        'https://pranjalsailwal.vercel.app/': 3
    };
    
    // Calling the sortPages function to get the sorted array
    const actual = sortPages(input);
    
    // Defining the expected sorted result
    const expected = [
        ['https://pranjalsailwal.vercel.app/path4', 9],
        ['https://pranjalsailwal.vercel.app/path2', 5],
        ['https://pranjalsailwal.vercel.app/', 3],
        ['https://pranjalsailwal.vercel.app/path3', 2],
        ['https://pranjalsailwal.vercel.app/path', 1]
    ];
    
    // Comparing the actual and expected output
    expect(actual).toEqual(expected);
});
