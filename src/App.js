import OpenAI from "openai";
import VisionPage from "./pages/VisionPage";

const openai = new OpenAI({
  apiKey: process.env["REACT_APP_OPENAI_API_KEY"],
  dangerouslyAllowBrowser: true,
});

function App() {
  return <VisionPage openai={openai} />;
}

export default App;
