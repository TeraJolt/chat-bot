export const runtime = "edge";

export default async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!messages) {
      return new Response(JSON.stringify({ error: "Prompt, data de início e lista de dados são obrigatórios" }), { 
        status: 400, 
        headers: { "Content-Type": "application/json" } 
      });
    }

    // Requisição direta para a API da OpenAI
    const openaiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: messages,
        max_tokens: 3000,
      }),
    });

    if (!openaiResponse.ok) {
      return new Response(JSON.stringify({ error: "Erro ao processar a resposta da API do ChatGPT" }), { 
        status: 500, 
        headers: { "Content-Type": "application/json" } 
      });
    }

    const responseData = await openaiResponse.json();
    return new Response(JSON.stringify({ result: responseData.choices[0].message?.content }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Erro ao comunicar com a API do ChatGPT:", error);
    return new Response(JSON.stringify({ error: "Erro na comunicação com o ChatGPT" }), { 
      status: 500, 
      headers: { "Content-Type": "application/json" } 
    });
  }
}