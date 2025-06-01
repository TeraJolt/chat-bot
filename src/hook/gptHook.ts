import { Message } from "@/@types/openaiMemory";

const isValidJson = (str: string): boolean => {
  try {
    JSON.parse(str);
    return true; 
  } catch {
    return false;
  }
};

const cleanJsonString = (str: string): string => {
  return str
    .replace(/^```json\s*/g, '') // Remove marcações de markdown
    .replace(/\s*```$/g, '') // Remove marcações finais
    .replace(/[\r\n\t]+/g, '') // Remove quebras de linha e tabulações
    .trim(); // Remove espaços em branco
};
type Props = {
  historic: Message[];
}
export const fetchApiChat = async <T> ({historic}:Props) => {
    try {
        const response = await fetch("/api/openai/chatgpt",{
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                messages: historic
            })
        });

        if(!response.ok) {
            throw new Error(`Erro na requisição: ${response.statusText}`);
        };

        const rawData = await response.json();

        let parsedData: T;
        if ( typeof rawData === "string") {
            const cleanedString = cleanJsonString(rawData);

            if( !isValidJson(cleanedString)) {
                return { success: false, error: "Resposta não é um JSON válido."}
            }
            parsedData = JSON.parse(cleanedString);
        } else if (typeof rawData === "object" && rawData !== null) {
          if (typeof rawData.result === "string" && isValidJson(rawData.result)) {
            parsedData = JSON.parse(rawData.result);
          } else {
            parsedData = rawData.result;
          }
        } else {
          return { success: false, error: "Formato de resposta inesperado."}
        }
        return { success: true, data: parsedData };
    } catch(error) {
      return {
        sucess: false,
        error: error instanceof Error ? error.message : 'Erro desconhecido.',
      };
    }
}