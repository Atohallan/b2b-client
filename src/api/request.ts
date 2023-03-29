const SERVER_LOCATION = `${import.meta.env.VITE_SERVER_LOCATION}/api`;

export const generateResponse = async (userInput: string) => {
    try {
        const response = await fetch(`${SERVER_LOCATION}/generate`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ input: userInput }),
        })
        const data = await response.json();

        return data.choices[0].text
    } catch(error) {
        console.error(error);
    }
}
