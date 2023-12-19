import classNames from "classnames";
import styles from "./Message.module.scss";
import { Button, TextField } from "@mui/material";

export default function Message({
  className,
  origin,
  setOrigin,
  type,
  setType,
  content,
  setContent,
  onDelete,
}) {
  return (
    <div className={classNames(className, styles.container)}>
      <div
        onClick={() => {
          setOrigin(origin === "user" ? "assistant" : "user");
        }}
        className={styles.button}
      >
        {origin}
      </div>
      <div
        onClick={() => {
          setType(type === "Text" ? "Image" : "Text");
        }}
        className={styles.button}
      >
        {type}
      </div>
      <TextField
        id="outlined-basic"
        placeholder={`Enter a ${origin} message here.`}
        variant="outlined"
        fullWidth
        maxRows={16}
        multiline
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
        }}
      />
      <Button onClick={onDelete} color="error">
        Delete
      </Button>
    </div>
  );
}
