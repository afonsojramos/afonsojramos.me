type MdastNode = {
  type: string;
  name?: string;
  data?: Record<string, unknown>;
  children?: MdastNode[];
};

const calloutTypes = new Set(["note", "tip", "warning"]);

function calloutTitle(type: string, children: MdastNode[]): MdastNode[] {
  const [firstChild, ...remainingChildren] = children;

  if (firstChild?.data?.directiveLabel) {
    return [
      {
        ...firstChild,
        data: {
          hName: "div",
          hProperties: { className: ["callout-title"] },
        },
      },
      ...remainingChildren,
    ];
  }

  return [
    {
      type: "paragraph",
      data: {
        hName: "div",
        hProperties: { className: ["callout-title"] },
      },
      children: [{ type: "text", value: type[0].toUpperCase() + type.slice(1) } as MdastNode],
    },
    ...children,
  ];
}

export default function calloutsPlugin() {
  return {
    name: "blog-callouts",
    containerDirective(node: MdastNode): MdastNode | undefined {
      if (!node.name || !calloutTypes.has(node.name)) return;

      return {
        type: "blockquote",
        data: {
          hName: "aside",
          hProperties: {
            className: ["callout", `callout-${node.name}`],
            role: "note",
          },
        },
        children: calloutTitle(node.name, node.children ?? []),
      };
    },
  };
}
