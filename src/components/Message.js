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
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Reader gives you a Base64 string on reader.result
        const base64String = reader.result
          .replace("data:", "")
          .replace(/^.+,/, "");

        setContent(`data:image/jpeg;base64,${base64String}`);
      };
      reader.onerror = () => {
        console.error("Error occurred while reading file");
      };
      reader.readAsDataURL(file);
    }
  };

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
      {type === "Text" ? (
        <TextField
          id="outlined-basic"
          placeholder={`Enter a ${origin} message here.`}
          variant="outlined"
          fullWidth
          maxRows={256}
          multiline
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
        />
      ) : (
        <input type="file" accept="image/*" onChange={handleImageChange} />
      )}
      <Button onClick={onDelete} color="error">
        Delete
      </Button>
    </div>
  );
}
