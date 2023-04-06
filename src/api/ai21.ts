import axios from 'axios';

const CONTROLLER_PATH = `${import.meta.env.VITE_SERVER_LOCATION}/api/ai21`

export const generateAI21Response = async (messages: string) => {
  try {
    const { data } = await axios.post(`${CONTROLLER_PATH}/generate`,
      {
        input: messages,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      })
    return data.completions[0].data.text;
  } catch(error) {
    console.error(error)
  }
}
