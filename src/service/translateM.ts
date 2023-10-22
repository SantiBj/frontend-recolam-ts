import translate from "translate";

export async function translateM(message: string): Promise<string> {
    try {
        const translation = await translate(message, { to: 'es' })
        return translation
    } catch (error) {
        return message
    }
}