export const generateResponse = async (userInput: string) => {
    try {
        const response = await fetch("http://localhost:3000/api/generate", {
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
