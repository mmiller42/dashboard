import axios from "axios";
import { Mode, State } from "./ModeSelect";

type UpdateModeArgs = { mode: Mode; pin?: string | undefined } & (
  | { mode: "on"; pin?: undefined }
  | { mode: "off"; pin: string }
);

type AlarmInfo = {
  mode: Mode;
  state: State;
};

let secret: string | null = null;

function getSecret(): string {
  if (secret) {
    return secret;
  }

  secret = localStorage.getItem("secret");

  if (!secret) {
    secret = prompt("Secret:");
    localStorage.setItem("secret", secret!);
  }

  return secret!;
}

export async function updateMode(params: UpdateModeArgs) {
  await axios.post("http://192.168.1.188:8079/api/mode", params, {
    headers: {
      "x-secret": getSecret(),
    },
  });
}

export async function fetchInfo(): Promise<AlarmInfo> {
  const { data } = await axios.get("http://192.168.1.188:8079/api/info", {
    headers: {
      "x-secret": getSecret(),
    },
  });

  return {
    mode: data.metrics.level === "off" ? "off" : "on",
    state: data.metrics.level === "alarmed" ? "alarmed" : "normal",
  };
}
