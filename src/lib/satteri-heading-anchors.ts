type HastNode = {
  type: string;
  tagName?: string;
  properties?: Record<string, unknown>;
  children?: HastNode[];
  value?: string;
};

type HastContext = {
  fileURL?: URL;
  textContent(node: HastNode): string;
  appendChild(node: HastNode, child: HastNode): void;
};

export default function headingAnchorsPlugin() {
  return {
    name: "blog-heading-anchors",
    element: {
      filter: ["h2", "h3", "h4", "h5", "h6"],
      visit(node: HastNode, context: HastContext): void {
        const sourcePath = context.fileURL?.pathname.replaceAll("\\", "/");
        if (!sourcePath?.includes("/src/content/blog/")) return;

        const id = node.properties?.id;
        if (typeof id !== "string") return;

        const heading = context.textContent(node);
        context.appendChild(node, {
          type: "element",
          tagName: "a",
          properties: {
            className: ["heading-anchor"],
            href: `#${id}`,
            ariaLabel: `Permalink to ${heading}`,
          },
          children: [{ type: "text", value: "#" }],
        });
      },
    },
  };
}
