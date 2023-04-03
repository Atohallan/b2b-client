import axios from 'axios';

const CONTROLLER_PATH = `${import.meta.env.VITE_SERVER_LOCATION}/api/open-ai`

export const generateOpenAIResponse = async (messages: object[]) => {
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

        return data.choices[0].message.content
    } catch(error) {
        console.error(error)
    }
}

export const moderate = async (input: string) => {
    try {
        const { data } = await axios.post(`${CONTROLLER_PATH}/moderate`,
          {
            input
            },
          {
              headers: {
                  "Content-Type": "application/json",
              },
          })

        return data.results[0].flagged
    } catch(error) {
        console.error(error)
    }
}
