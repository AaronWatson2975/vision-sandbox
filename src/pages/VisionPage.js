import { useEffect, useMemo, useState } from "react";
import SystemPrompt from "../components/SystemPrompt";
import styles from "./VisionPage.module.scss";
import RightSidebar from "../components/RightSidebar";
import MessageThread from "../components/MessageThread";

export default function VisionPage({ openai }) {
  const [systemPrompt, setSystemPrompt] = useState("");
  const [model, setModel] = useState("gpt-4-vision-preview");
  const [temperature, setTemperature] = useState(1.0);
  const [maxTokens, setMaxTokens] = useState(2048);
  const [messages, setMessages] = useState([]);
  const [models, setModels] = useState([]);

  const prompt = useMemo(() => {
    // This array will accumulate the formatted messages
    const formattedMessages = [];

    // Loop through all messages
    messages.forEach((message) => {
      // Check the type of message and format accordingly
      if (message.type === "Text") {
        // For text messages, just include the text in the content property
        formattedMessages.push({
          role: message.origin,
          content: [{ type: "text", text: message.content }],
        });
      } else if (message.type === "Image") {
        // For image messages, check the previous message type
        // If it is also from the user, merge the content with the previous message
        if (
          formattedMessages.length > 0 &&
          formattedMessages[formattedMessages.length - 1].role === "user"
        ) {
          // Append to the array of the last 'user' message
          formattedMessages[formattedMessages.length - 1].content.push({
            type: "image_url",
            image_url: { url: message.content },
          });
        } else {
          // If not adjacent or not 'user', create a new message with the image content
          formattedMessages.push({
            role: message.origin,
            content: [
              {
                type: "image_url",
                image_url: { url: message.content },
              },
            ],
          });
        }
      }
    });

    return {
      model,
      messages: [
        ...(systemPrompt.length
          ? [{ role: "system", content: systemPrompt }]
          : []),
        ...formattedMessages,
      ],
      max_tokens: maxTokens,
      temperature,
    };
  }, [maxTokens, messages, model, temperature]);

  useEffect(() => {
    openai.models.list().then((res) => {
      const newModels = res.data.map(({ id }) => id);
      setModels(newModels.sort());
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async () => {
    // Append an object to indicate the system is typing
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        origin: "assistant",
        type: "Text",
        content: "",
      },
    ]);

    // Start the streaming
    const stream = await openai.chat.completions.create({
      ...prompt,
      stream: true,
    });

    // Keep a running total of the content that has been streamed back
    let streamedContent = "";

    for await (const chunk of stream) {
      if (chunk.choices && chunk.choices[0]?.delta?.content) {
        // Append the new chunk to the running total content
        streamedContent += chunk.choices[0].delta.content;
        // Use function form of setState to ensure we have the latest state
        // eslint-disable-next-line no-loop-func
        setMessages((prevMessages) => {
          // Create a new array for the messages
          const updatedMessages = [...prevMessages];
          // Update only the last message, which should be the one showing the streamed content
          if (updatedMessages.length > 0) {
            updatedMessages[updatedMessages.length - 1].content =
              streamedContent;
          }
          return updatedMessages;
        });
      }
    }
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
