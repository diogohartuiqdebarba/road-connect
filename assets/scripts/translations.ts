const translations = Object.freeze({
    "en": {
        play: "Play",
        levelSelect: "Level Select",
        level: "Level",
    },
    "pt-PT": {
        play: "Jogar",
        levelSelect: "Seleção de Nível",
        level: "Nível",
    },
    "pt-BR": {
        play: "Jogar",
        levelSelect: "Seleção de Nível",
        level: "Nível",
    },
    "es": {
        play: "Jugar",
        levelSelect: "Selección de Nivel",
        level: "Nivel",
    },
})

const allowedLangs = (lang: string) => Object.keys(translations).find(k => k === lang)

export const t = (key: string) => {
    // @ts-ignore
    const userLang = navigator.language || navigator.userLanguage
    const lang = allowedLangs(userLang) || "en"
    return translations[lang][key]
}
