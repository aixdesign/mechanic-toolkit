import React from "react";

import * as css from "./Handles.module.css";

export const updateBlobTransform = blob => {
  const { x, y, scaleX, scaleY, rotate, pathExtent } = blob;
  blob.transform = `translate(${x} ${y}) rotate(${rotate} ${
    pathExtent.x0 + (blob.scaleX * pathExtent.width) / 2
  } ${pathExtent.y0 + (blob.scaleY * pathExtent.height) / 2}) translate(${
    pathExtent.x0
  } ${
    pathExtent.y0
  }) scale(${scaleX} ${scaleY}) translate(${-pathExtent.x0} ${-pathExtent.y0})`;
};

const handleSize = 7;
const halfHandleSize = Math.floor(handleSize / 2);

const debug = false;

export const Handles = ({ blob }) => {
  if (blob == null) return null;

  const x0 = blob.pathExtent.x0 + blob.x;
  const y0 = blob.pathExtent.y0 + blob.y;
  const width = blob.scaleX * blob.pathExtent.width;
  const height = blob.scaleY * blob.pathExtent.height;

  return (
    <>
      <div
        id="handler-body"
        className={css.handle}
        style={{
          border: "1px dashed black",
          left: x0,
          top: y0,
          height: height,
          width: width,
          cursor: "move"
        }}
      />
      <div
        id="handle-n"
        className={css.handle}
        style={{
          border: debug ? "1px dashed black" : "",
          left: x0,
          top: y0 - halfHandleSize,
          height: handleSize,
          width: width,
          cursor: "ns-resize"
        }}
      />
      <div
        id="handle-e"
        className={css.handle}
        style={{
          border: debug ? "1px dashed black" : "",
          left: x0 + width - (halfHandleSize + 1),
          top: y0,
          height: height,
          width: handleSize,
          cursor: "ew-resize"
        }}
      />
      {/* <div
        id="handle-ne-rot"
        style={{
          position: "absolute",
          // border: "1px dashed black",
          left:
            blob.pathExtent.x0 +
            blob.x +
            width -
            4,
          top: y0 - 1handleSize,
          height: 20,
          width: 20,
          cursor: "nwse-resize"
        }}
      /> */}
      <div
        id="handle-ne"
        className={css.handle}
        style={{
          border: debug ? "1px dashed black" : "",
          left: x0 + width - (halfHandleSize + 1),
          top: y0 - halfHandleSize,
          height: handleSize,
          width: handleSize,
          cursor: "nesw-resize"
        }}
      />
      <div
        id="handle-s"
        className={css.handle}
        style={{
          border: debug ? "1px dashed black" : "",
          left: x0,
          top: y0 + height - (halfHandleSize + 1),
          height: handleSize,
          width: width,
          cursor: "ns-resize"
        }}
      />
      <div
        id="handle-se"
        className={css.handle}
        style={{
          border: debug ? "1px dashed black" : "",
          left: x0 + width - (halfHandleSize + 1),
          top: y0 + height - (halfHandleSize + 1),
          height: handleSize,
          width: handleSize,
          cursor: "nwse-resize"
        }}
      />
      <div
        id="handle-w"
        className={css.handle}
        style={{
          border: debug ? "1px dashed black" : "",
          left: x0 - halfHandleSize,
          top: y0,
          height: height,
          width: handleSize,
          cursor: "ew-resize"
        }}
      />
      <div
        id="handle-sw"
        className={css.handle}
        style={{
          border: debug ? "1px dashed black" : "",
          left: x0 - halfHandleSize,
          top: y0 + height - (halfHandleSize + 1),
          height: handleSize,
          width: handleSize,
          cursor: "nesw-resize"
        }}
      />
      <div
        id="handle-nw"
        className={css.handle}
        style={{
          border: debug ? "1px dashed black" : "",
          left: x0 - halfHandleSize,
          top: y0 - halfHandleSize,
          height: handleSize,
          width: handleSize,
          cursor: "nwse-resize"
        }}
      />
    </>
  );
};

export const HandleContainer = ({
  width,
  height,
  offset,
  children,
  onUpdateBlob
}) => {
  const [dragging, setDragging] = React.useState("");
  const [blobReference, setBlobReference] = React.useState(null);
  return (
    <div
      style={{
        position: "absolute",
        top: offset.top,
        left: offset.left,
        width: width,
        height: height,
        overflow: "hidden"
      }}
      onMouseDown={e => {
        if (e.target.id === "handler-body") {
          setDragging("body");
        }
        if (e.target.id === "handle-n") {
          setDragging("resize-n");
        }
        if (e.target.id === "handle-s") {
          setDragging("resize-s");
        }
        if (e.target.id === "handle-w") {
          setDragging("resize-w");
        }
        if (e.target.id === "handle-e") {
          setDragging("resize-e");
        }
        if (e.target.id === "handle-ne") {
          setDragging("resize-ne");
          // setBlobReference({x0: })
        }
        if (e.target.id === "handle-se") {
          setDragging("resize-se");
        }
        if (e.target.id === "handle-sw") {
          setDragging("resize-sw");
        }
        if (e.target.id === "handle-nw") {
          setDragging("resize-nw");
        }
        // if (e.target.id === "handle-ne-rot") {
        //   setDragging("rotate-ne");
        // }
      }}
      onMouseMove={e => {
        if (dragging === "body")
          onUpdateBlob(blob => ({
            x: blob.x + e.movementX,
            y: blob.y + e.movementY
          }));
        else if (dragging === "resize-n")
          onUpdateBlob(blob => {
            const newHeight =
              blob.pathExtent.height * blob.scaleY - e.movementY;
            const scaleY = newHeight / blob.pathExtent.height;
            return {
              y: blob.y + e.movementY,
              scaleY
            };
          });
        else if (dragging === "resize-s")
          onUpdateBlob(blob => {
            const newHeight =
              blob.pathExtent.height * blob.scaleY + e.movementY;
            const scaleY = newHeight / blob.pathExtent.height;
            return {
              scaleY
            };
          });
        else if (dragging === "resize-w")
          onUpdateBlob(blob => {
            const newWidth = blob.pathExtent.width * blob.scaleX - e.movementX;
            return {
              x: blob.x + e.movementX,
              scaleX: newWidth / blob.pathExtent.width
            };
          });
        else if (dragging === "resize-e")
          onUpdateBlob(blob => {
            const newWidth = blob.pathExtent.width * blob.scaleX + e.movementX;
            return {
              scaleX: newWidth / blob.pathExtent.width
            };
          });
        else if (dragging === "resize-ne")
          onUpdateBlob(blob => {
            // console.log({ x: e.nativeEvent.layerX, y: e.nativeEvent.layerY });
            // console.log({ n: e });
            // console.log(e.nativeEvent.originalTarget.getBoundingClientRect());
            const height = blob.pathExtent.height * blob.scaleY;
            const width = blob.pathExtent.width * blob.scaleX;
            const ratio = height / width;
            const dy = -e.movementY;
            const dx = e.movementX;
            let newHeight = height;
            let newWidth = width;
            let diff = 0;
            if (dy > dx) {
              newHeight = height + dy;
              newWidth = newHeight / ratio;
              diff = dy;
            } else if (dy < dx) {
              newWidth = width + dx;
              newHeight = newWidth * ratio;
              diff = dx * ratio;
            }

            const scaleY = newHeight / blob.pathExtent.height;
            const scaleX = newWidth / blob.pathExtent.width;
            return {
              y: blob.y - diff,
              scaleY,
              scaleX
            };
          });
        else if (dragging === "resize-se")
          onUpdateBlob(blob => {
            const newHeight =
              blob.pathExtent.height * blob.scaleY + e.movementY;
            const newWidth = blob.pathExtent.width * blob.scaleX + e.movementX;
            const scaleY = newHeight / blob.pathExtent.height;
            const scaleX = newWidth / blob.pathExtent.width;
            return {
              scaleY,
              scaleX
            };
          });
        else if (dragging === "resize-sw")
          onUpdateBlob(blob => {
            const newHeight =
              blob.pathExtent.height * blob.scaleY + e.movementY;
            const newWidth = blob.pathExtent.width * blob.scaleX - e.movementX;
            const scaleY = newHeight / blob.pathExtent.height;
            const scaleX = newWidth / blob.pathExtent.width;
            return {
              x: blob.x + e.movementX,
              scaleY,
              scaleX
            };
          });
        else if (dragging === "resize-nw")
          onUpdateBlob(blob => {
            const newHeight =
              blob.pathExtent.height * blob.scaleY - e.movementY;
            const newWidth = blob.pathExtent.width * blob.scaleX - e.movementX;
            const scaleY = newHeight / blob.pathExtent.height;
            const scaleX = newWidth / blob.pathExtent.width;
            return {
              x: blob.x + e.movementX,
              y: blob.y + e.movementY,
              scaleY,
              scaleX
            };
          });

        // // else if (dragging === "rotate-ne")
        // //
        // //   const newHeight =
        // //     newBlob.pathExtent.height * newBlob.scaleY - e.movementY;
        // //   const newWidth =
        // //     newBlob.pathExtent.width * newBlob.scaleX - e.movementX;
        // //   const rotation = newBlob.rotate + 10;
        // //   newBlob = {
        // //     rotate: rotation
        // //   };
        // //
      }}
      onMouseUp={e => {
        if (dragging) {
          setDragging("");
        }
      }}
    >
      {children}
    </div>
  );
};