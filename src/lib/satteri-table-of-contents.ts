type HastNode = {
  type: string;
  tagName?: string;
  properties?: Record<string, unknown>;
  children?: HastNode[];
  value?: string;
};

type MarkdownHeading = {
  depth: number;
  slug: string;
  text: string;
};

type HastContext = {
  fileURL?: URL;
  data: {
    astro?: {
      headings?: MarkdownHeading[];
    };
  };
  insertBefore(node: HastNode, content: HastNode): void;
};

function tableOfContentsItem(heading: MarkdownHeading): HastNode {
  return {
    type: "element",
    tagName: "li",
    properties: {
      className: ["table-of-contents-item", `table-of-contents-depth-${heading.depth}`],
    },
    children: [
      {
        type: "element",
        tagName: "a",
        properties: { href: `#${heading.slug}` },
        children: [{ type: "text", value: heading.text }],
      },
    ],
  };
}

export default function tableOfContentsPlugin() {
  let inserted = false;

  return {
    name: "blog-table-of-contents",
    element: {
      filter: ["h2"],
      visit(node: HastNode, context: HastContext): void {
        if (inserted) return;

        const sourcePath = context.fileURL?.pathname.replaceAll("\\", "/");
        if (!sourcePath?.includes("/src/content/blog/")) return;

        const headings = context.data.astro?.headings?.filter(
          (heading) => heading.depth === 2 || heading.depth === 3,
        );
        if (!headings?.length) return;

        context.insertBefore(node, {
          type: "element",
          tagName: "nav",
          properties: {
            className: ["table-of-contents"],
            ariaLabel: "On this page",
          },
          children: [
            {
              type: "element",
              tagName: "ol",
              properties: {},
              children: headings.map(tableOfContentsItem),
            },
          ],
        });

        inserted = true;
      },
    },
  };
}
