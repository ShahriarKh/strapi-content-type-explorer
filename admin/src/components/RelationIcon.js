import React from "react";
import "./RelationIcon.css";

export function RelationIcon({ theme, children }) {
  return (
    <span
      style={{
        background: theme.colors.neutral0,
        "--cte-plugin-relation-color": theme.colors.buttonPrimary500,
      }}
      className="cte-plugin-relation-icon"
    >
      {children}
    </span>
  );
}
