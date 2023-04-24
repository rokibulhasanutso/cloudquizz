const timmingFormat = secs => {
    let minute;
    let second;

    minute = parseInt(secs / 60).toString().padStart(2, 0);
    second = parseInt(secs % 60).toString().padStart(2, 0);
    return `${minute}:${second}`
}

export {timmingFormat}