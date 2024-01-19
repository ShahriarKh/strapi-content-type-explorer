import "reactflow/dist/style.css";
import "./styles.css";
import React, { useEffect, useMemo, useRef } from "react";
import { useFetchClient } from "@strapi/helper-plugin";
import { HeaderLayout, Icon, Button } from "@strapi/design-system";
import { Search, Drag, Download, Refresh } from "@strapi/icons";
import { useTheme } from "styled-components";
import {
  SmartBezierEdge,
  SmartStepEdge,
  SmartStraightEdge,
} from "@tisoap/react-flow-smart-edge";
import { Background, ControlButton, Controls, ReactFlow } from "reactflow";
import { getBackgroundColor } from "../../utils/themeUtils";
import { useDigramStore } from "../../store";
import { CustomNode } from "../../components/CustomNode";
import { OptionsBar } from "../../components/OptionsBar";
import { ExportModal } from "../../components/ExportModal";

const useEffectSkipInitial = (func, deps) => {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) func();
    else didMount.current = true;
  }, deps);
};

const HomePage = () => {
  const theme = useTheme();
  const { get } = useFetchClient();
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
    setData,
    showModal,
    setShowModal,
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

  const regenrate = async () => {
    const { data } = await get(`/strapi-content-type-explorer/get-types`);
    setData(data);
    drawDiagram();
  };

  useEffectSkipInitial(() => {
    regenrate();
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

  const ref = useRef(null);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <HeaderLayout
        title="Content-Type Explorer"
        primaryAction={
          <Button
            variant="primary"
            startIcon={<Download />}
            onClick={() => setShowModal(true)}
          >
            Export Diagram
          </Button>
        }
        secondaryAction={
          <Button
            variant="secondary"
            startIcon={<Refresh />}
            onClick={regenrate}
          >
            Regenrate
          </Button>
        }
      />
      <OptionsBar />
      <div
        ref={ref}
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
        {showModal && <ExportModal imageRef={ref} />}
      </div>
    </div>
  );
};

export default HomePage;
