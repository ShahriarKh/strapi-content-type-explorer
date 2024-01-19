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
  persist((set, get) => ({
    nodes: [],
    edges: [],
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
    drawDiagram: (contentTypesData) => {
      let newNodes = createNodes(contentTypesData, get().options);
      let newEdges = createEdegs(contentTypesData, get().options);
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
  })),
  {
    name: "strapi-content-type-explorer",
  }
);
