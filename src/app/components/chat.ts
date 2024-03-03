import axios from 'axios';

interface FailedGptResponse {
  success: false;
  finish_reason: string;
}

interface SuccessfulGptResponse {
  success: true;
  message: string;
}

export type GptResponse = FailedGptResponse | SuccessfulGptResponse;

export async function runGPTQuery(query: string): Promise<GptResponse> {
  const { data } = await axios.post(
    'https://api.openai.com/v1/chat/completions', {
      model: 'gpt-3.5-turbo',
      messages: [{
        role: 'user',
        content: query,
      }],
    }, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer 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`,
      },
    });

  const result = data.choices[0];

  if (result.finish_reason !== 'stop') {
    return {
      success: false,
      finish_reason: result.finish_reason,
    };
  }

  return {
    success: true,
    message: result.message.content,
  };
}