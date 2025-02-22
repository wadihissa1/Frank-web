import endent from 'endent';
import {
  createParser,
  ParsedEvent,
  ReconnectInterval,
} from 'eventsource-parser';

const createPrompt = (inputCode) => {
  const data = (inputCode) => {
    return endent`${inputCode}`;
  };

  if (inputCode) {
    return data(inputCode);
  }
};

export const OpenAIStream = async (inputCode) => {
  const prompt = createPrompt(inputCode);

  const askQuestion = async (question) => {
    try {
      const response = await fetch('https://20.49.30.0/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }),
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      return data.response;
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const questionResponse = await askQuestion(prompt);

  if (!questionResponse) {
    throw new Error('No response from the API');
  }

  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  const stream = new ReadableStream({
    start(controller) {
      const onParse = (event) => {
        if (event.type === 'event') {
          const data = event.data;

          if (data === '[DONE]') {
            controller.close();
            return;
          }

          try {
            (async () => {
              for (let i = 0; i < data.length; i++) {
                const text = data[i];
                const queue = encoder.encode(text);
                controller.enqueue(queue);
                await new Promise((r) => setTimeout(r, 50)); // Simulating letter-by-letter typing effect
              }
            })();
          } catch (e) {
            controller.error(e);
          }
        }
      };

      const parser = createParser(onParse);

      parser.feed(questionResponse);

      controller.close();
    },
  });

  return stream;
};
