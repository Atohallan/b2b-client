const SERVER_LOCATION = `${import.meta.env.VITE_SERVER_LOCATION}/api`

export const generateResponse = async (messages: object[]) => {
    try {
        const response = await fetch(`${SERVER_LOCATION}/generate`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ input: messages }),
        })
        const data = await response.json()

        return data.choices[0].message.content
    } catch(error) {
        console.error(error)
    }
}

export const moderate = async (input: string) => {
    try {
        const response = await fetch(`${SERVER_LOCATION}/moderate`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ input }),
        })
        const data = await response.json()

        return data.results[0].flagged
    } catch(error) {
        console.error(error)
    }
}
