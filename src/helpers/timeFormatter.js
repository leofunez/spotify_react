export const timeFormatter = (duration, type) => {
    let minutes = Math.floor(duration / 60000)
    let seconds = ((duration % 60000) / 1000).toFixed(0)
    let time = ""
    
    if (type === "long") {
        time = `${minutes} min ${(seconds < 10 ? '0' : '')} ${seconds} sec`
    } else {
        time = `${minutes}: ${(seconds < 10 ? '0' : '')} ${seconds}`
    }

    return time
}