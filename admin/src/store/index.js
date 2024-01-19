import { create } from "zustand";
import { persist } from "zustand/middleware";
import { addEdge, applyNodeChanges, applyEdgeChanges } from "reactflow";
import {
  createEdegs,
  createNodes,
  updateEdges,
  updateNodes,
} from "../utils/dataUtils";

export const useDigramStore = create(
  persist(
    (set, get) => ({
      nodes: [],
      edges: [],
      data: [],
      showModal: false,
      options: {
        snapToGrid: false,
        showTypes: true,
        showIcons: true,
        showRelationsOnly: false,
        showAdminTypes: false,
        showDefaultFields: false,
        showPluginTypes: false,
        showEdges: false,
        scrollMode: true,
        edgeType: "smartbezier",
        backgroundPattern: "dots",
      },
      setData: (contentTypesData) => {
        set({
          data: contentTypesData,
        });
      },
      setShowModal: (bool) => {
        set({
          showModal: bool,
        });
      },
      toggleOption: (optionName, optionValue = null) => {
        let newOptions = {
          ...get().options,
          [optionName]: optionValue || !get().options[optionName],
        };
        set({
          options: newOptions,
        });
      },
      onNodesChange: (changes) => {
        set({
          nodes: applyNodeChanges(changes, get().nodes),
        });
      },
      onEdgesChange: (changes) => {
        set({
          edges: applyEdgeChanges(changes, get().edges),
        });
      },
      onConnect: (connection) => {
        set({
          edges: addEdge(connection, get().edges),
        });
      },
      drawDiagram: () => {
        const options = get().options;
        let typesToDraw = get().data;
        if (!options.showAdminTypes) {
          typesToDraw = typesToDraw.filter(
            (x) => !x.name.startsWith("admin::")
          );
        }
        if (!options.showPluginTypes) {
          typesToDraw = typesToDraw.filter(
            (x) => !x.name.startsWith("plugin::")
          );
        }
        let newNodes = createNodes(typesToDraw, options);
        let newEdges = createEdegs(typesToDraw, options);
        set({
          nodes: newNodes,
          edges: newEdges,
        });
      },
      redrawNodes: () => {
        let newNodes = updateNodes(get().nodes, get().options);
        set({
          nodes: newNodes,
        });
      },
      redrawEdges: () => {
        let newEdges = updateEdges(get().edges, get().options);
        set({
          edges: newEdges,
        });
      },
    }),
    {
      name: "strapi-content-type-explorer",
    }
  )
);
