javascript: (function () {
  const canCopyConClipboard = navigator?.clipboard?.writeText != null;
  const openimagesUrl =
    "https://storage.googleapis.com/openimages/web/visualizer/index.html?type=segmentation";

  if (window.location.href.split("?")[0] !== openimagesUrl.split("?")[0]) {
    window.open(openimagesUrl, "_blank");
  }

  const svgString = document.getElementById("viewer_svg").outerHTML;
  const pathSvgString = document.getElementById("viewer_im_segm0");
  const existingModal = document.getElementById("modal");

  if (existingModal) {
    let body = document.getElementsByTagName("body")[0];
    body.removeChild(modalContainer);
  }

  const modalContainer = document.createElement("div");
  modalContainer.id = "modal";
  modalContainer.style = "position: fixed;inset: 0;z-index: 1000;";

  const backdrop = document.createElement("div");
  backdrop.style = "width: 100%;height: 100%;background: rgba(0,0,0,0.5);";
  modalContainer.appendChild(backdrop);

  const dialog = document.createElement("div");
  dialog.style =
    "position: absolute; top: 50%; left: 50%; transform: translateX(-50%) translateY(-50%); min-width: 500px; padding: 2em; background: #fff; display: flex; flex-direction: column; justify-content: center; border-radius: 12px; font-family: sans-serif; border: 1px solid black;";
  modalContainer.appendChild(dialog);

  let textContent =
    "Copy the text in the textarea below and paste it in the toolkit!";

  if (!pathSvgString) {
    textContent =
      "Couldn't detect a blob preview. Make sure you click on the blob before calling the helper!";
  } else if (canCopyConClipboard) {
    navigator.clipboard.writeText(svgString);
    textContent =
      "The blob code was just copied into your clipboard. Go paste it in the toolkit : )";
  }

  const mainMessage = document.createElement("p");
  mainMessage.textContent = textContent;
  mainMessage.style = "margin: 1em 0; font-weight: 500; font-size: medium;";
  dialog.appendChild(mainMessage);

  if (pathSvgString) {
    const copyInstructions = document.createElement("p");
    copyInstructions.textContent =
      "If you want to copy it again, you can get it from the textarea below. Just triple click and copy.";
    copyInstructions.style = "margin: 1em 0; font-size: smaller;";
    dialog.appendChild(copyInstructions);

    const textarea = document.createElement("textarea");
    textarea.onclick = "this.focus();this.select()";
    textarea.readOnly = true;
    textarea.value = svgString;
    textarea.rows = 1;
    textarea.style = "font-size: smaller; resize: none;";
    dialog.appendChild(textarea);
  }

  const body = document.getElementsByTagName("body")[0];

  const closeModal = () => {
    body.removeChild(modalContainer);
  };

  const closeButton = document.createElement("button");
  closeButton.style =
    "position: absolute; top: 1em; right: 1em; display: flex; justify-content: center; align-items: center; background: transparent; border: none; cursor: pointer;";

  const closeSVG = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
  );
  const closePath1 = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "path"
  );
  const closePath2 = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "path"
  );
  closeSVG.setAttribute("width", "20px");
  closeSVG.setAttribute("viewBox", "0 0 20 20");
  closeSVG.setAttribute("style", "cursor: pointer;");
  closePath1.setAttribute(
    "d",
    "M14.776,10c0,0.239-0.195,0.434-0.435,0.434H5.658c-0.239,0-0.434-0.195-0.434-0.434s0.195-0.434,0.434-0.434h8.684C14.581,9.566,14.776,9.762,14.776,10 M18.25,10c0,4.558-3.693,8.25-8.25,8.25c-4.557,0-8.25-3.691-8.25-8.25c0-4.557,3.693-8.25,8.25-8.25C14.557,1.75,18.25,5.443,18.25,10 M17.382,10c0-4.071-3.312-7.381-7.382-7.381C5.929,2.619,2.619,5.93,2.619,10c0,4.07,3.311,7.382,7.381,7.382C14.07,17.383,17.382,14.07,17.382,10"
  );
  closePath1.setAttribute("transform", "rotate(45 10 10)");
  closePath2.setAttribute(
    "d",
    "M14.776,10c0,0.239-0.195,0.434-0.435,0.434H5.658c-0.239,0-0.434-0.195-0.434-0.434s0.195-0.434,0.434-0.434h8.684C14.581,9.566,14.776,9.762,14.776,10 M18.25,10c0,4.558-3.693,8.25-8.25,8.25c-4.557,0-8.25-3.691-8.25-8.25c0-4.557,3.693-8.25,8.25-8.25C14.557,1.75,18.25,5.443,18.25,10 M17.382,10c0-4.071-3.312-7.381-7.382-7.381C5.929,2.619,2.619,5.93,2.619,10c0,4.07,3.311,7.382,7.381,7.382C14.07,17.383,17.382,14.07,17.382,10"
  );
  closePath2.setAttribute("transform", "rotate(135 10 10)");

  closeSVG.appendChild(closePath1);
  closeSVG.appendChild(closePath2);
  closeButton.appendChild(closeSVG);

  closeButton.addEventListener("click", closeModal);
  backdrop.addEventListener("click", closeModal);

  dialog.appendChild(closeButton);

  body.appendChild(modalContainer);
});
