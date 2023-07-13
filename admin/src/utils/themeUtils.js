import React from "react";
import { darkTheme } from "@strapi/design-system";

import {
  Text,
  Email,
  Password,
  Number,
  Enumeration,
  Date,
  Media,
  Boolean,
  Json,
  Relation,
  Uid,
  OneToMany,
  OneToOne,
  ManyToMany,
  ManyToOne,
  OneWay,
  ManyWays,
  RichText,
} from "@strapi/icons";

export function getBackgroundColor(variant, theme) {
  switch (variant) {
    case "cross":
      return theme.colors.neutral200;
    case "dots":
      return darkTheme.colors.neutral300;
    case "lines":
      return theme.colors.neutral150;
    case "none":
      return theme.colors.neutral100;
  }
}

export function getIcon(attrType) {
  switch (attrType.toLowerCase()) {
    case "string":
    case "text":
      return <Text />;
    case "email":
      return <Email />;
    case "enumeration":
      return <Enumeration />;
    case "password":
      return <Password />;
    case "boolean":
      return <Boolean />;
    case "relation":
      return <Relation />;
    case "datetime":
    case "date":
    case "time":
      return <Date />;
    case "integer":
    case "decimal":
    case "biginteger":
    case "float":
      return <Number />;
    case "json":
      return <Json />;
    case "uid":
      return <Uid />;
    case "richtext":
      return <RichText />;
    case "media":
      return <Media />;

    case "onetomany": //
      return <OneToMany />;
    case "oneway":
      return <OneWay />;
    case "onetoone": //
      return <OneToOne />;
    case "manytomany": //
      return <ManyToMany />;
    case "manytoone": //
      return <ManyToOne />;
    case "manyways":
    // Not sure
    case "morphtomany":
      return <ManyWays />;
  }
}
