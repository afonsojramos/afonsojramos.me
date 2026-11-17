import type { MarkdownHeading } from "astro";
import type { Element } from "hast";
import { defineHastPlugin } from "satteri";

function tableOfContentsItem(heading: MarkdownHeading): Element {
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
        properties: { href: `#${heading.slug}`, title: heading.text },
        children: [{ type: "text", value: heading.text }],
      },
    ],
  };
}

export default function tableOfContentsPlugin() {
  let inserted = false;

  return defineHastPlugin({
    name: "blog-table-of-contents",
    element: {
      filter: ["h2"],
      visit(node, context): void {
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
  });
}
