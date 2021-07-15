export function getHighscoreOfLevel(level_id) {
    return localStorage.getItem(`pacman${level_id}`);
}

export function setHighscoreOfLevel(level_id, value) {
    localStorage.setItem(`pacman${level_id}`, value);
}