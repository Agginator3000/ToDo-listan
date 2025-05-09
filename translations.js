const currentLanguage = "sv";

const translations = {
    sv: {
        placeholder: "Att göra",
        estimatedTime: "Beräknad tid",
        todo: `Kvar att göra: $1 st ($2 färdiga)`,
        delete: "ta bort"

    },
        en: {
        placeholder: "To Do",
        estimatedTime: "Estimated time",
        todo: `Left to do: $1 st ($2 finished)`,
        delete: "delete"
    }
};

export function translate(key, ...props) {
    if (!translations[currentLanguage][key]) {
        return "Ej översatt";
    }

    if (props.length > 0) {
        let replacedString = translations[currentLanguage][key];
        
        props.forEach((prop, index) => {
            replacedString = replacedString.replace(`$${index + 1}`, prop);
        });

        return replacedString;
    }

    return translations[currentLanguage][key];
}
