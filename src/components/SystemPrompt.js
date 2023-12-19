import { TextField } from "@mui/material";
import styles from "./SystemPrompt.module.scss";

export default function SystemPrompt({
  className,
  systemPrompt,
  setSystemPrompt,
}) {
  return (
    <div className={className}>
      <h3>System Instruct Prompt</h3>
      <TextField
        className={styles.textField}
        multiline
        rows={32}
        value={systemPrompt}
        onChange={(e) => setSystemPrompt(e.target.value)}
        id="standard-basic"
        variant="standard"
        placeholder="You are a helpful assistant."
      />
    </div>
  );
}
