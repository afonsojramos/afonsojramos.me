import type { Element, ElementContent } from "hast";
import { defineHastPlugin } from "satteri";

function imageFrom(node: ElementContent): Element | undefined {
  if (node.type !== "element") return;
  if (node.tagName === "img") return node;

  if (node.tagName === "a") {
    return node.children.find(
      (child): child is Element => child.type === "element" && child.tagName === "img",
    );
  }
}

function imageOnlyChild(node: Readonly<Element>): Element | undefined {
  const meaningfulChildren = node.children.filter(
    (child) => child.type !== "text" || child.value.trim(),
  );

  if (meaningfulChildren.length !== 1) return;
  return imageFrom(meaningfulChildren[0]);
}

export default function imageCaptionsPlugin() {
  return defineHastPlugin({
    name: "blog-image-captions",
    element: {
      filter: ["p"],
      visit(node, context): Element | undefined {
        const sourcePath = context.fileURL?.pathname.replaceAll("\\", "/");
        if (!sourcePath?.includes("/src/content/blog/")) return;

        const image = imageOnlyChild(node);
        const alt = image?.properties.alt;
        if (typeof alt !== "string" || !alt.trim()) return;

        return {
          type: "element",
          tagName: "figure",
          properties: {},
          children: [
            ...node.children,
            {
              type: "element",
              tagName: "figcaption",
              properties: {},
              children: [{ type: "text", value: alt }],
            },
          ],
        };
      },
    },
  });
}
