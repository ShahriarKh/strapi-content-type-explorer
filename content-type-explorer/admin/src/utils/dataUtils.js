const CARDS_PER_ROW = 6;

export function createNodes(contentTypes, options) {
  let newNodes = [];
  contentTypes.map(
    (node, index) =>
      (newNodes = [
        ...newNodes,
        {
          id: node.key,
          position: {
            x: (index % CARDS_PER_ROW) * 320,
            y: ((index - (index % CARDS_PER_ROW)) / CARDS_PER_ROW) * 560,
          },
          type: "special",

          data: {
            ...node,
            options: options,
          },
        },
      ])
  );
  return newNodes;
}

export function createEdegs(contentTypes, options) {
  let newEdges = [];

  contentTypes.map((contentType) => {
    Object.keys(contentType.attributes).map((attr) => {
      if (contentType.attributes[attr].type == "relation") {
        // only add edge if target node is not excluded (not hidden)
        if (
          contentTypes.some(
            (node) => node.key === contentType.attributes[attr].target
          )
        ) {
          newEdges = [
            ...newEdges,
            {
              id: `${contentType.attributes[attr].target}-${contentType.key}.${attr}`,
              source: contentType.key,
              target: contentType.attributes[attr].target,
              type: options.edgeType,
              sourceHandle: attr,
            },
          ];
        }
      }
    });
  });
  return newEdges;
}
