import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Alert from '@mui/material/Alert';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkToc from 'remark-toc';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeRaw from 'rehype-raw';
import { useNavigate } from 'react-router-dom';

/**
 * Notes on react-markdown so far:
 * - Tables work, but they're not styled well - they have no border.
 * - TOC plugin does not respect dark mode.
 */

/**
 * React Markdown code to handle links internally
 */
function NavigateLink({ href, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
    >
      {children}
    </a>
  );
}

const createComponents = () => ({
  a: (props) => <NavigateLink href={props.href}>{props.children}</NavigateLink>,
  alert: ({ severity, children }) => <Alert severity={severity || 'warning'}>{children}</Alert>,
});

/**
 * Render function
 */

export default function DRSAnyprogGuideMain({ guidePage }) {
  const navigate = useNavigate();

  const [content, setContent] = useState('');

  const components = createComponents(navigate);

  useEffect(() => {
    const pageToFetch = guidePage || 'main';
    import(`./guide/${pageToFetch}.md`)
      .then((res) => {
        fetch(res.default)
          .then((response) => response.text())
          .then((text) => {
            setContent(text);
          });
      });
  }, [guidePage]);

  return (
    <Container maxWidth="lg">

      <Box sx={{
        pl: 4, pt: 4, pr: 4, alignItems: 'flex-start', textAlign: 'left',
      }}
      >
        <Paper sx={{ p: 2, minHeight: '700px', maxWidth: '750px' }}>
          <ReactMarkdown
            rehypePlugins={[rehypeSlug, rehypeAutolinkHeadings, rehypeRaw]}
            remarkPlugins={[remarkGfm, remarkToc]}
            components={components}
          >
            { content }
          </ReactMarkdown>
        </Paper>
      </Box>
    </Container>
  );
}
