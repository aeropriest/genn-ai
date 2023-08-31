import { NextResponse } from "next/server";
// import {HfInference} from "@huggingface/inference"

// const inference = new HfInference(process.env.HUGGING_FACE_API_KEY)
/*
async function query(data) {
	const response = await fetch(
		"https://api-inference.huggingface.co/models/Voicemod/fastspeech2-en-male1",
		{
			headers: { Authorization: "Bearer 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" },
			method: "POST",
			body: JSON.stringify(data),
		}
	);
	const result = await response.json();
	return result;
}

query({"inputs": "The answer to the universe is 42"}).then((response) => {
	console.log(JSON.stringify(response));
});

*/
export async function POST(
  req: Request,
) {
  try {
    const body = await req.json();
    console.log(body);
    const { inputs, model  } = body;
    // const response = await inference.textToSpeech({
    //   model,
    //   inputs,
    // });

    const response = await fetch(
      "https://api-inference.huggingface.co/models/Voicemod/fastspeech2-en-male1",
      {
        headers: { Authorization: `Bearer ${process.env.HUGGING_FACE_API_KEY}` },
        method: "POST",
        body: JSON.stringify({inputs}),
      }
    );
    const audio = await response.arrayBuffer();

    return new Response(audio, {
      headers:{
        "Content-Type":"audio/mpeg"
      }
    })
  } catch (error) {
    console.log('[CONVERSATION_ERROR]', error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
