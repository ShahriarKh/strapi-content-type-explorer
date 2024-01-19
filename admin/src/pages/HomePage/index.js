import React, { useEffect, useMemo, useState } from "react";
import { useFetchClient } from "@strapi/helper-plugin";
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
  Background,
  ControlButton,
  Controls,
  ReactFlow,
  useReactFlow,
} from "reactflow";
import { getBackgroundColor } from "../../utils/themeUtils";
import OptionsBar from "../../components/OptionsBar";
import "reactflow/dist/style.css";
import "./styles.css";
import { useDigramStore } from "../../store";
// import { shallow } from "zustand/shallow";

const HomePage = () => {
  const theme = useTheme();
  const { get } = useFetchClient();
  // const { setViewport } = useReactFlow();
  const [diagram, setDiagram] = useState(null);

  const {
    nodes,
    redrawEdges,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    redrawNodes,
    drawDiagram,
    toggleOption,
    options,
  } = useDigramStore();

  const nodeTypes = useMemo(() => ({ special: CustomNode }), []);
  const edgeTypes = useMemo(
    () => ({
      smartbezier: SmartBezierEdge,
      smartstep: SmartStepEdge,
      smartstraight: SmartStraightEdge,
    }),
    []
  );

  // const saveDiagram = useCallback(() => {
  //   if (diagram) {
  //     const flow = diagram.toObject();
  //     localStorage.setItem(
  //       "content-type-explorer-diagram",
  //       JSON.stringify(flow)
  //     );
  //   }
  // }, [diagram]);

  // const restoreDiagram = useCallback(() => {
  //   const restoreFlow = async () => {
  //     const flow = JSON.parse(
  //       localStorage.getItem("content-type-explorer-diagram")
  //     );

  //     if (flow) {
  //       const { x = 0, y = 0, zoom = 1 } = flow.viewport;
  //       setNodes(flow.nodes || []);
  //       setEdges(flow.edges || []);
  //       setViewport({ x, y, zoom });
  //     }
  //   };

  //   restoreFlow();
  // }, [setNodes, setViewport]);

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

      drawDiagram(allTypes);
    };

    fetchData();
  }, [options.showAdminTypes, options.showPluginTypes]);

  useEffect(() => {
    redrawEdges();
  }, [options.edgeType, options.showEdges]);

  useEffect(() => {
    redrawNodes();
  }, [
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
      <OptionsBar />
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
          onInit={setDiagram}
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
            {/* <button onClick={saveDiagram}>save</button>
            <button onClick={restoreDiagram}>restore</button>  */}
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
