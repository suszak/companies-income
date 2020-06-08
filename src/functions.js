const readVh = () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    if(window.innerHeight <= 640) {
        return 4
    } else if(window.innerHeight <= 840) {
        return 5
    } else {
        return 6
    }
}



export default readVh