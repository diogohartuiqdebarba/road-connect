const translations = Object.freeze({
    "en": {
        play: "Play",
        levelSelect: "Level Select",
        level: "Level",
        allLevelsCleared: "All levels cleared!",
    },
    "pt": {
        play: "Jogar",
        levelSelect: "Selecao de Nivel",
        level: "Nivel",
        allLevelsCleared: "Todos os niveis finalizados!",
    },
    "es": {
        play: "Jugar",
        levelSelect: "Seleccion de Nivel",
        level: "Nivel",
        allLevelsCleared: "Todos los niveles superados!",
    },
})

const allowedLangs = (lang: string) => Object.keys(translations).find(key => {
    if (lang.includes('-')) {
        return lang.includes(key)
    } else {
        return lang === key
    }
})

export const t = (key: string) => {
    // @ts-ignore
    const userLang = navigator.language || navigator.userLanguage
    const lang = allowedLangs(userLang) || "en"
    return translations[lang][key]
}
