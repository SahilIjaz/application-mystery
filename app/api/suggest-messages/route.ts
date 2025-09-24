import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.AI_STUDIO_API_KEY!,
});

export const runtime = "edge";

export async function POST(request: Request) {
  try {
    const { messages = [] } = await request.json();

    const systemPrompt = `Create exactly 3 engaging and fun questions perfect for social media posts (Instagram, Twitter, etc.). 
    Each question should:
    - Be conversation starters that encourage comments and engagement
    - Be relatable to a diverse, global audience
    - Avoid controversial, sensitive, or personal topics
    - Be short enough for social media (under 280 characters each)
    - Make people want to share their opinions or experiences
    
    Examples of good social media questions:
    - "What's a movie you can watch over and over again?"
    - "Coffee or tea person? ☕"
    - "What's your go-to comfort food when you're having a rough day?"
    
    Format: Separate each question with '||' and nothing else. No numbering, no extra text.`;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      max_tokens: 200,
      temperature: 0.9, // Higher creativity for varied questions
      stream: true,
      messages: [{ role: "system", content: systemPrompt }, ...messages],
    });

    // Create a custom readable stream
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of response) {
            const content = chunk.choices[0]?.delta?.content;
            if (content) {
              controller.enqueue(new TextEncoder().encode(content));
            }
          }
          controller.close();
        } catch (error) {
          controller.error(error);
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
      },
    });
  } catch (err) {
    console.error("Error in POST /api:", err);
    return Response.json(
      {
        success: false,
        message: "Issue while generating social media questions.",
      },
      { status: 500 }
    );
  }
}
