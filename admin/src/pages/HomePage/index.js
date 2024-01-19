import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useFetchClient, usePersistentState } from "@strapi/helper-plugin";
import { HeaderLayout, Icon, LinkButton } from "@strapi/design-system";
import { Question, Search, Drag } from "@strapi/icons";
import { useTheme } from "styled-components";
import {
  SmartBezierEdge,
  SmartStepEdge,
  SmartStraightEdge,
} from "@tisoap/react-flow-smart-edge";
import CustomNode from "../../components/CustomNode";
import {
  createEdegs,
  createNodes,
  updateEdges,
  updateNodes,
} from "../../utils/dataUtils";
import {
  Background,
  ControlButton,
  Controls,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from "reactflow";
import { getBackgroundColor } from "../../utils/themeUtils";
import OptionsBar from "../../components/OptionsBar";

import "reactflow/dist/style.css";
import "./styles.css";

const HomePage = () => {
  const theme = useTheme();
  const { get } = useFetchClient();
  const [contentTypesData, setContentTypesData] = useState([]);

  const [options, setOptions] = usePersistentState(
    "content-type-explorer-options",
    {
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
    }
  );

  function toggleOption(optionName, optionValue = null) {
    setOptions({
      ...options,
      [optionName]: optionValue || !options[optionName],
    });
  }

  const nodeTypes = useMemo(() => ({ special: CustomNode }), []);
  const edgeTypes = useMemo(
    () => ({
      smartbezier: SmartBezierEdge,
      smartstep: SmartStepEdge,
      smartstraight: SmartStraightEdge,
    }),
    []
  );

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  // get (and filter) content-types
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await get(`/strapi-content-type-explorer/get-types`);
      let allTypes = data;
      if (!options.showAdminTypes) {
        allTypes = allTypes.filter((x) => !x.name.startsWith("admin::"));
      }
      if (!options.showPluginTypes) {
        allTypes = allTypes.filter((x) => !x.name.startsWith("plugin::"));
      }
      setContentTypesData(allTypes);
    };

    fetchData();
  }, [options.showAdminTypes, options.showPluginTypes]);

  // create nodes & edges
  useEffect(() => {
    if (contentTypesData.length > 0) {
      let newNodes = createNodes(contentTypesData, options);
      setNodes(newNodes);
      let newEdges = createEdegs(contentTypesData, options);
      setEdges(newEdges);
    }
  }, [contentTypesData]);

  useEffect(() => {
    let newEdges = updateEdges(edges, options);
    setEdges(newEdges);
  }, [setEdges, options.edgeType, options.showEdges]);

  useEffect(() => {
    let newNodes = updateNodes(nodes, options);
    setNodes(newNodes);
  }, [
    setNodes,
    options.showTypes,
    options.showIcons,
    options.showRelationsOnly,
    options.showDefaultFields,
  ]);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <HeaderLayout
        title="Content-Type Explorer"
        // primaryAction={<Button>Download as Image</Button>}
        secondaryAction={
          <LinkButton
            variant="secondary"
            startIcon={<Question />}
            href="https://github.com/shahriarkh/strapi-content-type-explorer"
          >
            Help
          </LinkButton>
        }
      />
      <OptionsBar options={options} toggleOption={toggleOption} />
      <div
        style={{
          height: "100%",
          borderTop: `1px solid ${theme.colors.neutral150}`,
        }}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          fitView
          minZoom={0}
          preventScrolling={!options.scrollMode}
          snapGrid={[20, 20]}
          snapToGrid={options.snapToGrid}
          fitViewOptions={{
            maxZoom: 1,
          }}
        >
          <Controls
            position="top-left"
            showInteractive={false}
            className="cte-plugin-controls"
            style={{
              "--button-background": theme.colors.neutral150,
              "--button-foreground": theme.colors.neutral1000,
              "--button-hover": theme.colors.buttonPrimary500,
            }}
          >
            <ControlButton
              onClick={() => toggleOption("scrollMode")}
              title="Toggle Mouse Wheel Behavior (Zoom/Scroll)"
            >
              <Icon
                color="neutral1000"
                as={options.scrollMode ? Drag : Search}
              />
            </ControlButton>
          </Controls>
          <Background
            variant={options.backgroundPattern}
            color={getBackgroundColor(options.backgroundPattern, theme)}
          />
        </ReactFlow>
      </div>
    </div>
  );
};

export default HomePage;
