const CONTROLLER_PATH = `${import.meta.env.VITE_SERVER_LOCATION}/api/ai21`

export const generateAI21Response = async (messages: object[]) => {
  try {
    const response = await fetch(`${CONTROLLER_PATH}/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ input: messages }),
    })
    const data = await response.json()

    return data.completions[0].data.text;
  } catch(error) {
    console.error(error)
  }
}
