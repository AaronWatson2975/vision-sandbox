import { useEffect, useMemo, useState } from "react";
import SystemPrompt from "../components/SystemPrompt";
import styles from "./VisionPage.module.scss";
import RightSidebar from "../components/RightSidebar";
import MessageThread from "../components/MessageThread";

export default function VisionPage({ openai }) {
  const [systemPrompt, setSystemPrompt] = useState("");
  const [model, setModel] = useState("gpt-4-1106-preview");
  const [temperature, setTemperature] = useState(1.0);
  const [maxTokens, setMaxTokens] = useState(2048);
  const [messages, setMessages] = useState([]);
  const [models, setModels] = useState([]);

  const prompt = useMemo(() => {
    return {
      model,
      messages: [
        ...(systemPrompt.length
          ? [
              {
                role: "system",
                content: systemPrompt,
              },
            ]
          : []),
        ...messages.map((message) => ({
          role: message.origin,
          content: message.content,
        })),
      ],
    };
  }, [messages, model, systemPrompt]);

  useEffect(() => {
    openai.models.list().then((res) => {
      const newModels = res.data.map(({ id }) => id);
      setModels(newModels.sort());
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = () => {
    openai.chat.completions.create(prompt).then((res) => {
      const message = res.choices[0].message;
      const messagesClone = JSON.parse(JSON.stringify(messages));
      messagesClone.push({
        origin: message.role,
        type: "Text",
        content: message.content,
      });
      setMessages(messagesClone);
    });
  };

  return (
    <div className={styles.container}>
      <SystemPrompt
        systemPrompt={systemPrompt}
        setSystemPrompt={setSystemPrompt}
        className={styles.leftSidebar}
      />
      <MessageThread
        messages={messages}
        setMessages={setMessages}
        className={styles.center}
        onSubmit={handleSubmit}
      />
      <RightSidebar
        className={styles.rightSidebar}
        models={models}
        maxTokens={maxTokens}
        setMaxTokens={setMaxTokens}
        temperature={temperature}
        setTemperature={setTemperature}
        model={model}
        setModel={setModel}
      />
    </div>
  );
}
