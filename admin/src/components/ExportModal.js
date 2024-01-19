import {
  ModalLayout,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  Typography,
  SingleSelect,
  SingleSelectOption,
  NumberInput,
} from "@strapi/design-system";
import { toJpeg, toPng, toSvg } from "html-to-image";
import { useCallback, useState } from "react";
import { useDigramStore } from "../store";
import { useTheme } from "styled-components";

export function ExportModal({ imageRef }) {
  const theme = useTheme();

  const { setShowModal } = useDigramStore();

  const [format, setFormat] = useState("png");
  const [quality, setQuality] = useState(0.95);

  function downloadImage(dataUrl, fileExtension) {
    const link = document.createElement("a");
    link.download = `strapi-diagram-${new Date()
      .toISOString()
      .replace(/[-:T.]/g, "")
      .slice(0, -5)}.${fileExtension}`;
    link.href = dataUrl;
    link.click();
  }

  const exportDiagram = useCallback(() => {
    if (imageRef.current === null) {
      return;
    }

    const filter = (node) => {
      const exclusionClasses = ["cte-plugin-controls"];
      return !exclusionClasses.some((classname) =>
        node.classList?.contains(classname)
      );
    };

    if (format == "png") {
      toPng(imageRef.current, {
        cacheBust: true,
        filter: filter,
        style: {
          background: theme.colors.neutral100,
        },
      })
        .then((dataUrl) => {
          downloadImage(dataUrl, "png");
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (format == "svg") {
      toSvg(imageRef.current, {
        cacheBust: true,
        filter: filter,
        style: {
          background: theme.colors.neutral100,
        },
      })
        .then((dataUrl) => {
          downloadImage(dataUrl, "svg");
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (format == "jpeg") {
      toJpeg(imageRef.current, {
        cacheBust: true,
        filter: filter,
        quality: quality,
        style: {
          background: theme.colors.neutral100,
        },
      })
        .then((dataUrl) => {
          downloadImage(dataUrl, "jpeg");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [imageRef, quality, format]);

  return (
    <ModalLayout onClose={() => setShowModal(false)}>
      <ModalHeader>
        <Typography fontWeight="bold" textColor="neutral800" as="h2" id="title">
          Export Diagram
        </Typography>
      </ModalHeader>
      <ModalBody>
        <SingleSelect
          label="Format"
          onClear={() => {
            setFormat(undefined);
          }}
          value={format}
          onChange={setFormat}
        >
          <SingleSelectOption value="svg">SVG</SingleSelectOption>
          <SingleSelectOption value="png">PNG</SingleSelectOption>
          <SingleSelectOption value="jpeg">JPEG</SingleSelectOption>
        </SingleSelect>
        <span style={{ height: "16px", display: "block" }} />
        {format == "jpeg" && (
          <NumberInput
            label="Quality"
            name="quality"
            hint="0.0 - 1.0"
            onValueChange={(value) => setQuality(value)}
            value={quality}
          />
        )}
      </ModalBody>
      <ModalFooter
        endActions={<Button onClick={exportDiagram}>Export</Button>}
      />
    </ModalLayout>
  );
}
