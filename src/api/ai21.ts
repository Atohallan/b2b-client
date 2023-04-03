import axios from 'axios';

const CONTROLLER_PATH = `${import.meta.env.VITE_SERVER_LOCATION}/api/ai21`

export const generateAI21Response = async (messages: object[]) => {
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
    console.log('The data:', data)
    return data.completions[0].data.text;
  } catch(error) {
    console.error(error)
  }
}
