import { useState } from "react";
import axios from "axios";

function App() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const API_KEY = import.meta.env.VITE_API_KEY; // 🔥 my real api 🙈 gotta hide this thing

  const handleExplain = async () => {
    if (!input) return;

    setLoading(true);
    setResponse("");

    try {
      const res = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: "You are a helpful tutor. Explain clearly and simply."
            },
            {
              role: "user",
              content: input
            }
          ]
        },
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            "Content-Type": "application/json"
          }
        }
      );

      setResponse(res.data.choices[0].message.content);
    } catch (error) {
      setResponse("Something went wrong 😢");
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <div className="p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4">🧠 AI Study Buddy</h1>

      {/* Input */}
      <textarea
        className="w-full max-w-xl p-3 border rounded mb-4"
        rows="4"
        placeholder="Ask a question..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      {/* Button */}
      <button
        onClick={handleExplain}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Explain
      </button>

      {/* Loading */}
      {loading && <p>Thinking... 🤔</p>}

      {/* Response */}
      {response && (
        <div className="w-full max-w-xl p-4 bg-white shadow rounded mt-4">
          <h2 className="font-bold mb-2">📘 Answer:</h2>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}

export default App;