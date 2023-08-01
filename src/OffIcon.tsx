import { memo } from "react";

const offIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
    <g transform="matrix(0.9,0,0,0.9,0.7000500000000001,0.6999869503528569)">
      <g>
        <path
          fill="currentcolor"
          fillRule="evenodd"
          d="M8 1a1 1 0 0 0-2 0v5.077a1 1 0 1 0 2 0V1ZM3.923 3.059a1 1 0 0 0-1.23-1.577 7 7 0 1 0 8.615 0 1 1 0 0 0-1.231 1.577 5 5 0 1 1-6.154 0Z"
          clipRule="evenodd"
        />
      </g>
    </g>
  </svg>
);

export const OffIcon = memo(function OffIcon() {
  return offIcon;
});
