import { marked } from 'marked';
import { Highlight } from 'prism-react-renderer';
import { renderToStaticMarkup } from 'react-dom/server';
import { format } from 'prettier';

import linkStyles from '../components/link/link.module.scss';

const renderer = new marked.Renderer();

renderer.heading = (text, level, _raw, slugger) => {
  const id = slugger.slug(text);
  const Component = `h${level}` as keyof JSX.IntrinsicElements;

  return renderToStaticMarkup(
    <Component>
      <a href={`#${id}`} id={id} className="header-link">
        {text}
      </a>
    </Component>
  );
};

renderer.link = (href, _, text) =>
  `<a href=${href} target="_blank" rel="noopener noreferrer" class="${linkStyles.underline}">${text}</a>`;

renderer.checkbox = () => '';
renderer.listitem = (text, task, checked) => {
  if (task) {
    return `<li class="checkbox"><span class="check">&#8203;<input type="checkbox" disabled ${
      checked ? 'checked' : ''
    } /></span><span>${text}</span></li>`;
  }

  return `<li>${text}</li>`;
};
renderer.code = (code, options: string) => {
  const opts = options.split(' ').map((o) => o.trim());
  const language = opts[0];
  const highlight = opts
    .filter((o) => o.startsWith('highlight='))
    .pop()
    ?.replace('highlight=', '')
    .trim();
  const raw = options.includes('raw');
  let formattedCode = code;

  if (!raw) {
    try {
      formattedCode = format(code, {
        semi: false,
        singleQuote: true,
        parser: language === 'jsx' ? 'babel' : language
      });
      // eslint-disable-next-line no-empty
    } catch (e) {} // Don't really mind if it fails
  }
  return renderToStaticMarkup(
    <pre>
      <Code language={language} code={formattedCode} highlight={highlight} />
    </pre>
  );
};

marked.setOptions({
  gfm: true,
  breaks: true,
  headerIds: true,
  renderer
});

const renderMarkdown = (markdown: string) => marked(markdown);

export default renderMarkdown;

const Code = ({
  code,
  language,
  highlight,
  ...props
}: {
  code: string;
  language: string;
  highlight?: string;
}) => {
  if (!language)
    return <code {...props} dangerouslySetInnerHTML={{ __html: code }} />;

  const highlightedLines = highlight
    ? highlight.split(',').reduce((lines, h) => {
        if (h.includes('-')) {
          // Expand ranges like 3-5 into [3,4,5]
          const [start, end] = h.split('-').map(Number);
          const x = Array(end - start + 1)
            .fill(start, end)
            .map((_, i) => (i + start).toString());
          return [...lines, ...x];
        }

        return [...lines, h];
      }, new Array<string>())
    : [];

  return (
    <Highlight code={code.trim()} language={language}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <code className={className} style={{ ...style }}>
          {tokens.map((line, i) => (
            <div
              key={i}
              {...getLineProps({ line, key: i })}
              style={
                highlightedLines.includes((i + 1).toString())
                  ? {
                      background: 'var(--highlight)',
                      margin: '0 -1rem',
                      padding: '0 1rem'
                    }
                  : {}
              }
            >
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </code>
      )}
    </Highlight>
  );
};
