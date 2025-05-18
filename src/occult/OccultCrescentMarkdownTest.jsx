import React from 'react';
import { Box } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkToc from 'remark-toc';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

/**
 * Notes on react-markdown so far:
 * - Standard links need to use the React link components
 * - Tables work, but they're not styled well - they have no border.
 * - TOC plugin does not respect dark mode.
 */

const markdown = `
# Test
Testing this out for reasons.

## Contents

## Tests

* Option 1
* Option 2
* Option 3

Writing a really long line. "According to a January 2025 interview with Naoki Yoshida and pre-patch 7.2 Live Letters, players will be able to equip and level up 
secondary jobs known as Phantom Jobs, giving access to additional actions and traits within the field operation. These jobs appear to be directly based on FFV jobs, 
including some that are existing FFXIV jobs (e.g. monk, bard) and others that were not suitable for implementation as a full job in FFXIV (e.g. chemist). However, 
this does not necessarily rule out the possibility that some jobs may receive a full implementation in the future."

## Heading 2

### Heading 3

> Consider not doing this.

---

Does this include images as well? ![image](/assets/eureka/baldesion_arsenal.png)

My guess is if I want to include links I'll need to override the component this is using [DRS Link](/drs/holster). <- Yes, this triggers a full rerender.

| Syntax | Description |
| ----------- | ----------- |
| Header | Title |
| Paragraph | Text | 

\`\`\`
{
  "firstName": "John",
  "lastName": "Smith",
  "age": 25
}
\`\`\` 

Here's a sentence with a footnote. [^1]

[^1]: This is the footnote. 

term
: definition 

~~The world is flat.~~

- [x] Write the press release
- [ ] Update the website
- [ ] Contact the media 

I need to highlight these ==very important words==. 

X^2^ 

## Pluto

Pluto is a dwarf planet in the Kuiper belt.


## History

### Discovery

In the 1840s, Urbain Le Verrier used Newtonian mechanics to predict the
position of…

### Name and symbol

The name Pluto is for the Roman god of the underworld, from a Greek epithet for
Hades…

### Planet X disproved

Once Pluto was found, its faintness and lack of a viewable disc cast doubt…

## Orbit

Pluto’s orbital period is about 248 years…

`;

export default function OccultCrescentMarkdownTest() {
  return (
    <Box sx={{
      pl: 4, pt: 4, pr: 4, minWidth: '400px', maxWidth: '1000px', alignItems: 'flex-start', textAlign: 'left',
    }}
    >
      <ReactMarkdown
        rehypePlugins={[rehypeSlug, rehypeAutolinkHeadings]}
        remarkPlugins={[remarkGfm, remarkToc]}
      >
        { markdown }
      </ReactMarkdown>
    </Box>
  );
}
