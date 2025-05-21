const key = 'myAppToken'

export function getToken(): string | null {
    try {
        return localStorage.getItem(key);
    } catch {
        return null
    }
}

export function setToken(token: string): void {
    try {
        localStorage.setItem(key, token)
    } catch {
        // quota exceeded или другие ошибки — можно логировать
    }
}

export function clearToken(): void {
    try {
        localStorage.removeItem(key)
    } catch { }
}