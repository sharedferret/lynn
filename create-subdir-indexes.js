#! /usr/bin/env node

/**
 * This is a hack to create multiple index.html entry points to the CRA, so that
 * link previews to those URLs contain the correct meta tags.
 */

const fs = require('fs');

const directories = ['ba', 'forecast', 'reference', 'portals'];

// Fetch the generated React include headers from the webpack-generated index.html
const mainIndex = fs.readFileSync('build/index.html').toString();
const regex = /(<script defer="defer" src="\/static\/js\/main)(.*)(rel="stylesheet">)/gm;
const reactIncludes = mainIndex.match(regex).join('');


for (let i = 0; i < directories.length; i++) {
  // For each subdirectory:
  // 1. Create if it doesn't exist already
  // 2. Load subdirectory's index.html from public/
  // 3. Inject React include headers
  // 4. Write to file

  if (!fs.existsSync('build/' + directory[i])) {
    fs.mkdirSync('build/' + directory[i]);
  }

  let unmodifiedSubdirIndex = fs.readFileSync('public/' + directory[i] + '/index.html').toString();
  const indexToInsert = unmodifiedSubdirIndex.indexOf('<meta name="end-tags" />');
  const modifiedIndexFile = unmodifiedSubdirIndex.slice(0, indexToInsert) + reactIncludes + unmodifiedSubdirIndex.slice(indexToInsert);
  
  // Write new file
  fs.writeFileSync('build/' + directory[i] + '/index.html', modifiedIndexFile);
}