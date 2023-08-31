import { NextResponse } from "next/server";
import {HfInference} from "@huggingface/inference"

const inference = new HfInference(process.env.HUGGING_FACE_API_KEY)
export async function POST(
  req: Request,
) {
  try {
    const body = await req.json();
    console.log(body);
    const { text, language  } = body;
    const languageModels: Record<string, string> = {
      "en-es": "Helsinki-NLP/OPUS-mt-en-es",
      "en-de": "Helsinki-NLP/OPUS-mt-en-de",
      "en-fr": "Helsinki-NLP/OPUS-mt-en-fr",
      "en-hi": "Helsinki-NLP/OPUS-mt-en-hi",
    };

    const translation = await inference.translation({
      model: languageModels[language],
      inputs: text as string,
    });

    // const audio = await inference.textToSpeech({
    //   model: 'espnet/kan-bayashi_ljspeech_vits',
    //   inputs: text as string
    // })

    return NextResponse.json({translation, status: 200});
  } catch (error) {
    console.log('[CONVERSATION_ERROR]', error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
