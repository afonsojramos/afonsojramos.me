import { defineHastPlugin } from "satteri";

export default function headingAnchorsPlugin() {
  return defineHastPlugin({
    name: "blog-heading-anchors",
    element: {
      filter: ["h2", "h3", "h4", "h5", "h6"],
      visit(node, context): void {
        const sourcePath = context.fileURL?.pathname.replaceAll("\\", "/");
        if (!sourcePath?.includes("/src/content/blog/")) return;

        const id = node.properties.id;
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
  });
}
