import {googleAI} from "@genkit-ai/googleai";
import {genkit, z} from "genkit";
import * as cheerio from "cheerio";
import { convert }from "html-to-text";

const ai = genkit({
    plugins: [googleAI()]
});

export const webSummarizerFlow = ai.defineFlow(
    {
        name: 'webSummarizerFlow',
        inputSchema: z.object({ url: z.string() }),
        outputSchema: z.object({ summary: z.string() }),
    },
    async ({ url }) => {
        const loader = await cheerio.fromURL(url);
        const body = convert(loader('#qG2Z-Xk9YE-').text());
        console.log(body);
        const { text } = await ai.generate({
            model: googleAI.model('gemini-2.0-flash'),
            prompt: `Give me the list of the organizers.
            Context: ${body}`
        });
        return { summary:text };
    },
);