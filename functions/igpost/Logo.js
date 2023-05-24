// import React from "react";

// const logoXSize = logoSize => (logoSize * 24) / 35;
// const logoXOffsetY = logoSize => (logoSize * 2.94) / 35;
// const logoXOffsetX = logoSize => (logoSize * 1.42) / 35;

// export const Logo = ({ size, top, left }) => {
//   return (
//     <div
//       style={{
//         display: "none";
//         position: "absolute",
//         top,
//         left,
//         transform: `translateX(-100%) translateY(-100%)`,
//         fontSize: size,
//         lineHeight: 0.975,
//         letterSpacing: "-0.005em"
//       }}
//     >
//       <span>AI</span>
//       <br />
//       <span>DESIGN</span>
//       <svg
//         style={{
//           display: "none";
//           position: "absolute",
//           top: logoXOffsetY(size),
//           right: logoXOffsetX(size)
//         }}
//         viewBox="0 0 115 115"
//         width={logoXSize(size)}
//         height={logoXSize(size)}
//       >
//         <path
//           clipRule="evenodd"
//           d="M12.6572 0.694299L114.734 102.771L104.157 113.349L2.07981 11.2717L12.6572 0.694299Z"
//           fill="black"
//         />
//         <path
//           clipRule="evenodd"
//           d="M112.654 12.1677L10.5774 114.245L0 103.667L102.077 1.59032L112.654 12.1677Z"
//           fill="black"
//         />
//       </svg>
//     </div>
//   );
// };
