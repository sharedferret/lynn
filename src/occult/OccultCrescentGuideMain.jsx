import React, { useEffect, useState } from 'react';
import { Box, Paper } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkToc from 'remark-toc';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { useNavigate } from 'react-router-dom';

/**
 * Notes on react-markdown so far:
 * - Tables work, but they're not styled well - they have no border.
 * - TOC plugin does not respect dark mode.
 */

/**
 * React Markdown code to handle links internally
 */
function NavigateLink({ navigate, href, children }) {
  return (
    <a
      href={href}
      onClick={(e) => {
        e.preventDefault();
        navigate(href);
      }}
    >
      {children}
    </a>
  );
}

const createComponents = (navigate) => ({
  a: (props) => <NavigateLink navigate={navigate} href={props.href}>{props.children}</NavigateLink>,
});

/**
 * Render function
 */

export default function OccultCrescentGuideMain({ guidePage }) {
  const navigate = useNavigate();

  const [content, setContent] = useState('');

  // Get components with the navigate function
  const components = createComponents(navigate);

  useEffect(() => {
    const pageToFetch = guidePage || 'main';
    import(`./guide/${pageToFetch}.md`)
      .then((res) => {
        fetch(res.default)
          .then((response) => response.text())
          .then((text) => {
            // Do something with the text
            setContent(text);
          });
      });
  });

  return (
    <Box sx={{
      pl: 4, pt: 4, pr: 4, width: '90%', minWidth: '400px', maxWidth: '1000px', alignItems: 'flex-start', textAlign: 'left',
    }}
    >
      <Paper sx={{ p: 2, minHeight: '700px' }}>
        <ReactMarkdown
          rehypePlugins={[rehypeSlug, rehypeAutolinkHeadings]}
          remarkPlugins={[remarkGfm, remarkToc]}
          components={components}
        >
          { content }
        </ReactMarkdown>
      </Paper>
    </Box>
  );
}
