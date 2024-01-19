import {
  Checkbox,
  SingleSelect,
  SingleSelectOption,
} from "@strapi/design-system";
import React from "react";
import { useDigramStore } from "../store";

export function OptionsBar() {
  const { options, toggleOption } = useDigramStore();
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        padding: "0 56px 24px",
        gap: "24px",
      }}
    >
      <Checkbox
        name="show-type-names"
        onValueChange={() => {
          toggleOption("showTypes");
        }}
        value={options.showTypes}
      >
        Data Types
      </Checkbox>
      <Checkbox
        name="show-icons"
        onValueChange={() => toggleOption("showIcons")}
        value={options.showIcons}
      >
        Data Type Icons
      </Checkbox>
      <Checkbox
        name="show-default-fields"
        onValueChange={() => toggleOption("showDefaultFields")}
        value={options.showDefaultFields}
      >
        Default Fields
      </Checkbox>
      <Checkbox
        name="show-relations-only"
        onValueChange={() => toggleOption("showRelationsOnly")}
        value={options.showRelationsOnly}
      >
        Relational Fields Only
      </Checkbox>
      <Checkbox
        name="show-admin-types"
        onValueChange={() => toggleOption("showAdminTypes")}
        value={options.showAdminTypes}
      >
        admin:: Types
      </Checkbox>
      <Checkbox
        name="show-plugin-types"
        onValueChange={() => toggleOption("showPluginTypes")}
        value={options.showPluginTypes}
      >
        plugin:: Types
      </Checkbox>
      <Checkbox
        name="show-edges"
        onValueChange={() => toggleOption("showEdges")}
        value={options.showEdges}
      >
        Edges
      </Checkbox>
      <Checkbox
        name="snap-to-grid"
        onValueChange={() => toggleOption("snapToGrid")}
        value={options.snapToGrid}
      >
        Snap To Grid
      </Checkbox>
      <div style={{ flexGrow: 1 }} />
      <SingleSelect
        // label="Edge Type"
        value={options.edgeType}
        onChange={(type) => toggleOption("edgeType", type)}
      >
        <SingleSelectOption value="smartbezier">
          Smart Bezier
        </SingleSelectOption>
        <SingleSelectOption value="smartstraight">
          Smart Straight
        </SingleSelectOption>
        <SingleSelectOption value="smartstep">Smart Step</SingleSelectOption>
        <SingleSelectOption value="default">Bezier</SingleSelectOption>
        <SingleSelectOption value="simplebezier">
          Simple Bezier
        </SingleSelectOption>
        <SingleSelectOption value="straight">Straight</SingleSelectOption>
        <SingleSelectOption value="step">Step</SingleSelectOption>
        <SingleSelectOption value="smoothstep">Smooth Step</SingleSelectOption>
      </SingleSelect>
      <SingleSelect
        // label="Background"
        value={options.backgroundPattern}
        onChange={(pattern) => toggleOption("backgroundPattern", pattern)}
      >
        <SingleSelectOption value="dots">Dots</SingleSelectOption>
        <SingleSelectOption value="lines">Lines</SingleSelectOption>
        <SingleSelectOption value="cross">Cross</SingleSelectOption>
        <SingleSelectOption value="none">None</SingleSelectOption>
      </SingleSelect>
    </div>
  );
}
