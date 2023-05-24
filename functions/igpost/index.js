import React from "react";
import { useSrcImage } from "../../hooks/useImage";

import { getGridDimensions, Grid } from "../../identity/grid";
// import { Logo } from "./Logo";

import * as css from "./styles.module.css";

const baseSizeReference = 816;
const getSize = (size, reference) => (size * reference) / baseSizeReference;
const titleSizeLarge = size => getSize(size, 77);
const titleSizeSmall = size => getSize(size, 54);
const logoSizeLarge = size => getSize(size, 35);
const logoSizeSmall = size => getSize(size, 24);
const dateSize = size => getSize(size, 18);

export const handler = ({ inputs, mechanic }) => {
  const {
    width,
    height,
    _ratio,

    title,
    subtitle,
    boldTitle,
    titleAlign,
    date,
    schedule,
    backgroundColor,

    showGrid,

    image,
    imageSize,
    imagePosition,

    blobBackground,
    showBlobPictures
  } = inputs;

  const { blobs, selected: selectedBlob } = blobBackground;

  const hideText = showBlobPictures || selectedBlob >= 0;

  const imageSrc = useSrcImage(image, mechanic);

  const showImage = !!image && imagePosition !== "don't show";

  const grid = getGridDimensions(
    width,
    height,
    showImage ? imagePosition : null,
    imageSize
  );

  const size = width;

  const titleFontSize =
    showImage && imageSize > 2 ? titleSizeSmall(size) : titleSizeLarge(size);
  const titleY =
    showImage && imageSize > 2 && ["top", "bottom"].includes(imagePosition)
      ? grid.rows[1]
      : grid.rows[2];
  const logoSize =
    showImage && imageSize > 2 ? logoSizeSmall(size) : logoSizeLarge(size);
  return (
    <div className={css.root} style={{ width: width, height: height }}>
      <svg className={css.background} width={width} height={height}>
        <rect width={width} height={height} fill={backgroundColor} />
        <g transform={`scale(${_ratio})`}>
          {blobs.map(
            ({ path, fill, stroke, strokeWidth = 2, href, transform }, index) =>
              // non-scaling-stroke prevents the stroke to change with the transforms
              // https://www.w3.org/TR/SVGTiny12/painting.html#NonScalingStroke
              !showBlobPictures ? (
                <path
                  key={index}
                  vectorEffect="non-scaling-stroke"
                  d={path}
                  fill={fill}
                  stroke={stroke}
                  strokeWidth={strokeWidth * _ratio}
                  transform={transform}
                />
              ) : (
                <React.Fragment key={index}>
                  <defs>
                    <clipPath id={`clip-${index}`}>
                      <path d={path} />
                    </clipPath>
                  </defs>
                  <image
                    xlinkHref={href}
                    clipPath={`url(#clip-${index})`}
                    transform={transform}
                  />
                </React.Fragment>
              )
          )}
        </g>
      </svg>
      {showImage && imageSrc && (
        <img
          src={imageSrc}
          style={{
            position: "absolute",
            objectFit: "cover",
            [imagePosition]: 0,
            width: ["left", "right"].includes(imagePosition)
              ? grid.colSize * imageSize
              : grid.width,
            height: ["top", "bottom"].includes(imagePosition)
              ? grid.rowSize * imageSize
              : grid.height
          }}
        />
      )}
      {showGrid && <Grid className={css.grid} grid={grid} opacity={0.5} />}

      {!hideText && (
        <div className={css.textLayer}>
          <h1
            style={{
              position: "absolute",
              top: titleY,
              left: grid.left,
              width: grid.right - grid.left,
              margin: 0,
              fontSize: titleFontSize,
              lineHeight: 0.9,
              textAlign: titleAlign
            }}
          >
            <span
              style={{ fontWeight: boldTitle === "title" ? "600" : "normal" }}
            >
              {title.toUpperCase()}
            </span>
            <br />
            <span
              style={{
                fontWeight: boldTitle === "subtitle" ? "600" : "normal"
              }}
            >
              {subtitle.toUpperCase()}
            </span>
          </h1>
          <div
            style={{
              position: "absolute",
              top: grid.top,
              left: grid.left,
              margin: 0,
              width: grid.width - 2 * grid.left,
              fontSize: dateSize(size),
              lineHeight: 1.2
            }}
          >
            {date.toUpperCase()}
            <br />
            {schedule.toUpperCase()}
          </div>

          <Logo size={logoSize} top={grid.bottom} left={grid.right} />
        </div>
      )}
    </div>
  );
};

export const inputs = {
  title: {
    type: "text",
    default: "Title"
  },
  subtitle: {
    type: "text",
    default: "Subtitle"
  },
  boldTitle: {
    type: "text",
    default: "title",
    options: ["title", "subtitle"]
  },
  titleAlign: {
    type: "text",
    default: "left",
    options: ["left", "right"]
  },
  date: {
    type: "text",
    default: "16th of September"
  },
  schedule: {
    type: "text",
    default: "6PM CEST /  9AM CEST"
  },
  backgroundColor: {
    type: "color-selector"
  },
  showGrid: {
    type: "boolean",
    default: false
  },
  image: {
    type: "image"
  },
  imagePosition: {
    type: "text",
    default: "don't show",
    options: ["don't show", "top", "bottom", "right", "left"]
  },
  imageSize: {
    type: "number",
    default: 2,
    options: [2, 3]
  },
  showBlobPictures: {
    type: "boolean",
    default: false
  },
  blobBackground: {
    type: "blobs"
  },
  width: {
    type: "number",
    default: 1080,
    editable: false
  },
  height: {
    type: "number",
    default: 1080,
    editable: false
  }
};

export const presets = {
  instagramPost: {
    width: 1080,
    height: 1080
  }
};

export const settings = {
  engine: require("@mechanic-design/engine-react"),
  hideNavigation: true,
  hidePresets: true,
  hideScaleToFit: true,
  hideGenerate: true,
  hideAutoRefresh: true
};
