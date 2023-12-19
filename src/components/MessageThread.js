import { useState } from "react";
import Message from "./Message";
import styles from "./MessageThread.module.scss";
import { Button } from "@mui/material";
import classNames from "classnames";

const defaultMessage = {
  origin: "user",
  type: "Text",
  content: "",
};

const updateMessages = (idx, messages, key, value) => {
  const messagesCopy = JSON.parse(JSON.stringify(messages));
  messagesCopy[idx][key] = value;
  return messagesCopy;
};

export default function MessageThread({
  className,
  messages,
  setMessages,
  onSubmit,
}) {
  return (
    <div className={classNames(styles.container, className)}>
      <div>
        <div className={styles.messagesContainer}>
          {messages.map(({ origin, type, content }, idx) => (
            <Message
              key={`message-${idx}`}
              origin={origin}
              setOrigin={(newOrigin) =>
                setMessages(updateMessages(idx, messages, "origin", newOrigin))
              }
              content={content}
              setContent={(newContent) =>
                setMessages(
                  updateMessages(idx, messages, "content", newContent)
                )
              }
              type={type}
              setType={(newType) =>
                setMessages(updateMessages(idx, messages, "type", newType))
              }
              onDelete={() => {
                const messagesClone = JSON.parse(JSON.stringify(messages));
                messagesClone.splice(idx, 1);
                setMessages(messagesClone);
              }}
            />
          ))}
        </div>

        <br />
        <hr />
        <br />
        <div
          className={styles.button}
          onClick={() => {
            if (!messages.length) {
              setMessages([defaultMessage]);
            } else {
              setMessages([
                ...messages,
                {
                  ...defaultMessage,
                  origin:
                    messages[messages.length - 1].origin === "user"
                      ? "assistant"
                      : "user",
                },
              ]);
            }
          }}
        >
          Add Message
        </div>
      </div>
      <div className={styles.footer}>
        <Button onClick={onSubmit} variant="contained">
          Submit
        </Button>
      </div>
    </div>
  );
}
