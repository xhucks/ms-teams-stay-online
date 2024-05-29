const mouse = require("robotjs");
const readline = require("readline");


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


function promptForDelay() {
    rl.question("Enter the delay between movements in seconds: ", (input) => {
        const delayInSeconds = parseFloat(input);
        if (isNaN(delayInSeconds) || delayInSeconds <= 0) {
            console.log("Please enter a valid number greater than 0.");
            promptForDelay();
        } else {
            const delay = delayInSeconds * 1000;
            moveMouseHumanLike(delay);
            rl.close();
        }
    });
}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function moveMouseHumanLike(delay) {
    console.log("Staying online...");
    console.log("Press Ctrl+C to exit");

    const moveDelay = 1;
    const steps = 100;
    const screenRes = mouse.getScreenSize();
    const centerX = screenRes.width / 2;
    const centerY = screenRes.height / 2;
    const radius = Math.sqrt(centerX * centerX + centerY * centerY);

    while (true) {
        const mousePos = mouse.getMousePos();
        const dist = Math.sqrt((centerX - mousePos.x) * (centerX - mousePos.x) + (centerY - mousePos.y) * (centerY - mousePos.y));
        const angle = Math.atan2(centerY - mousePos.y, centerX - mousePos.x);
        const targetAngle = angle + Math.random() * Math.PI * 2;
        const targetX = centerX + Math.cos(targetAngle) * radius * Math.random();
        const targetY = centerY + Math.sin(targetAngle) * radius * Math.random();

        for (let i = 0; i <= steps; i++) {
            const t = i / steps;
            const newX = mousePos.x + (targetX - mousePos.x) * t + (Math.random() - 0.5) * 5;
            const newY = mousePos.y + (targetY - mousePos.y) * t + (Math.random() - 0.5) * 5;
            mouse.moveMouse(newX, newY);
            await sleep(moveDelay);
        }

        await sleep(delay);
    }
}


promptForDelay();
