/*
 *
 * HomePage
 *
 */

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Button, HeaderLayout, Icon, LinkButton } from "@strapi/design-system";
import explorerRequests from "../../api/explorer-api";
import { Question, Search, Drag } from "@strapi/icons";
import { useTheme } from "styled-components";
import {
  SmartBezierEdge,
  SmartStepEdge,
  SmartStraightEdge,
} from "@tisoap/react-flow-smart-edge";
import CustomNode from "../../components/CustomNode";
import { createEdegs, createNodes } from "../../utils/dataUtils";
import {
  Background,
  ControlButton,
  Controls,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from "reactflow";
import { getBackgroundColor } from "../../utils/themeUtils";
import "reactflow/dist/style.css";
import OptionsBar from "../../components/OptionsBar";
import "./styles.css";

const HomePage = () => {
  const theme = useTheme();

  const [contentTypes, setContentTypes] = useState([]);

  const [options, setOptions] = useState({
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
  });

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

  // Show/hide content types on options change
  useEffect(() => {
    const fetchData = async () => {
      let allTypes = await explorerRequests.getContentTypes();
      if (!options.showAdminTypes) {
        allTypes = allTypes.filter((x) => !x.name.startsWith("admin::"));
      }
      if (!options.showPluginTypes) {
        allTypes = allTypes.filter((x) => !x.name.startsWith("plugin::"));
      }
      setContentTypes(allTypes);
    };

    fetchData();
  }, [options.showAdminTypes, options.showPluginTypes]);

  // Create/update nodes & edges
  useEffect(() => {
    if (contentTypes.length > 0) {
      let newNodes = createNodes(contentTypes, options);
      setNodes(newNodes);
      if (options.showEdges) {
        let newEdges = createEdegs(contentTypes, options);
        setEdges(newEdges);
      } else {
        setEdges([]);
      }
    }
  }, [contentTypes, options]);

  return (
    <>
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
          height: "100vh",
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
    </>
  );
};

export default HomePage;
