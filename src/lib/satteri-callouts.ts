import type { Properties } from "hast";
import type { Blockquote, BlockContent, DefinitionContent } from "mdast";
import { defineMdastPlugin } from "satteri";

// Satteri renders `data.hName` and `data.hProperties` the way mdast-util-to-hast
// does, but @types/mdast only declares them when that package's types load.
declare module "mdast" {
  interface Data {
    hName?: string;
    hProperties?: Properties;
  }
}

type FlowContent = BlockContent | DefinitionContent;

const calloutTypes = new Set(["note", "tip", "warning"]);

function calloutTitle(type: string, children: FlowContent[]): FlowContent[] {
  const [firstChild, ...remainingChildren] = children;

  if (firstChild?.type === "paragraph" && firstChild.data?.directiveLabel) {
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
      children: [{ type: "text", value: type[0].toUpperCase() + type.slice(1) }],
    },
    ...children,
  ];
}

export default function calloutsPlugin() {
  return defineMdastPlugin({
    name: "blog-callouts",
    containerDirective(node): Blockquote | undefined {
      if (!calloutTypes.has(node.name)) return;

      return {
        type: "blockquote",
        data: {
          hName: "aside",
          hProperties: {
            className: ["callout", `callout-${node.name}`],
            role: "note",
          },
        },
        children: calloutTitle(node.name, node.children),
      };
    },
  });
}
