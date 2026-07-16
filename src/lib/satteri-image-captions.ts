type HastNode = {
  type: string;
  tagName?: string;
  properties?: Record<string, unknown>;
  children?: HastNode[];
  value?: string;
};

type HastContext = {
  fileURL?: URL;
};

function imageFrom(node: HastNode): HastNode | undefined {
  if (node.type === "element" && node.tagName === "img") return node;

  if (node.type === "element" && node.tagName === "a") {
    return node.children?.find((child) => child.type === "element" && child.tagName === "img");
  }
}

function imageOnlyChild(node: HastNode): HastNode | undefined {
  const meaningfulChildren = node.children?.filter(
    (child) => child.type !== "text" || child.value?.trim(),
  );

  if (meaningfulChildren?.length !== 1) return;
  return imageFrom(meaningfulChildren[0]);
}

export default function imageCaptionsPlugin() {
  return {
    name: "blog-image-captions",
    element: {
      filter: ["p"],
      visit(node: HastNode, context: HastContext): HastNode | undefined {
        const sourcePath = context.fileURL?.pathname.replaceAll("\\", "/");
        if (!sourcePath?.includes("/src/content/blog/")) return;

        const image = imageOnlyChild(node);
        const alt = image?.properties?.alt;
        if (typeof alt !== "string" || !alt.trim()) return;

        return {
          type: "element",
          tagName: "figure",
          properties: {},
          children: [
            ...(node.children ?? []),
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
  };
}
