const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
export const applyCypher = (text: string, offset: number): string => {
    while (offset > 26) offset -= 26;
    while (offset < -26) offset += 26;

    return text
        .split("")
        .map(char => {
            const index = alphabet.indexOf(char.toLowerCase());
            if (index === -1) {
                return char;
            }
            return alphabet[(index + offset) % alphabet.length];
        })
        .join("");
};
export const removeCypher = (text: string, offset: number): string => {
    while (offset > 26) offset -= 26;
    while (offset < -26) offset += 26;

    return text
        .split("")
        .map(char => {
            const index = alphabet.indexOf(char.toLowerCase());
            if (index === -1) {
                return char;
            }
            return alphabet[(index - offset + alphabet.length) % alphabet.length];
        })
        .join("");
};
