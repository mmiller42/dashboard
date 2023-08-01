import { memo } from "react";

const alarmIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
    <g>
      <path
        fill="currentcolor"
        fillRule="evenodd"
        d="M3.854.44A1.5 1.5 0 0 1 4.914 0h4.172a1.5 1.5 0 0 1 1.06.44l3.415 3.414A1.5 1.5 0 0 1 14 4.914v4.172a1.5 1.5 0 0 1-.44 1.06l-3.414 3.415a1.5 1.5 0 0 1-1.06.439H4.914a1.5 1.5 0 0 1-1.06-.44L.439 10.147A1.5 1.5 0 0 1 0 9.086V4.914c0-.398.158-.78.44-1.06L3.853.439ZM7 3.124a.75.75 0 0 1 .75.75v3.25a.75.75 0 0 1-1.5 0v-3.25a.75.75 0 0 1 .75-.75Zm1 6.75a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"
        clipRule="evenodd"
      />
    </g>
  </svg>
);

export const AlarmIcon = memo(function AlarmIcon() {
  return alarmIcon;
});
