export function createKey() {
    var a = '';
    for (let i = 0; i < 3; i++) {
        if (i == 2) {
            a += Math.random().toString(36).substring(2, 5).toUpperCase();
            break;
        }
        a += `${Math.random().toString(36).substring(2, 5).toUpperCase()}-`
    }
    return a;
}