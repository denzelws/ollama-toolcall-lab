type ChatChunk = {
  message?: { content?: string };
  done?: boolean;
};

export async function streamContent(prompt: string): Promise<void> {
  const response = await fetch("http://localhost:11434/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "llama3.2:3b",
      messages: [{ role: "user", content: prompt }],
      stream: true,
    }),
  });

  if (!response.ok || !response.body) {
    throw new Error(`Ollama request failed: ${response.status}`);
  }

  const reader = response.body.pipeThrough(new TextDecoderStream()).getReader();
  let buffer = "";

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;

    buffer += value;
    const lines = buffer.split("\n");
    buffer = lines.pop() ?? "";

    for (const line of lines) {
      const chunk: ChatChunk = JSON.parse(line);
      process.stdout.write(chunk.message?.content ?? "");
    }
  }

  process.stdout.write("\n");
}

const prompt = process.argv.slice(2).join(" ");
if (prompt) {
  await streamContent(prompt);
}
