const STORAGE_KEY = 'user'

export const setUserStorage = ({ username, token }) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ username, token }))
}

export const getUserStorage = () => {
    const cached = localStorage.getItem(STORAGE_KEY)

    if (cached) {
        return JSON.parse(cached)
    }

    return {};
}

export const resetUserStorage = () => {
    localStorage.removeItem(STORAGE_KEY)
}