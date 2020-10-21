//Global Variabes
//variable for loading the first image
let firstbackimg;
//adding gameState
let gameState;
//variable for loading the background image of create and join room
let main;
//variable for join button
let joinbut;
//variable for creat room button
let createbut;
//selection for tv variable
let select;
//variable for join button in tv
let jointv;
//variable for creat room button for tv
let createtv;
//variable for stroing the device type
let deviceType = "";
//variable for creting input of naming the room
let roomnameInp;
//variable for making the player name input while creating room
let playernameInp;
function setup() {
    createCanvas(windowWidth, windowHeight);
    gameState = "select";
    joinbut = new Button("images/join.png", width - width / 4, height / 2, width / 3, height / 2);
    createbut = new Button("images/create.png", width / 4, height / 2, width / 3, height / 2);
    jointv = new Button("images/jointv.png", width - width / 4, height / 2, width / 3, height / 2);
    createtv = new Button("images/createtv.png", width / 4, height / 2, width / 3, height / 2);
    select = new Select(createtv, jointv);
    roomnameInp=createInput("Room Name");
    playernameInp=createInput("Your Name");
    roomnameInp.hide();
    playernameInp.hide();
    roomnameInp.position(width/2-width/11,height/3);
    playernameInp.position(width/2-width/11,height-height/2.7);
    playernameInp.style("font-size",width/45+"px");
    playernameInp.style("background",color(153,255,255));
    roomnameInp.style("font-size",width/45+"px");
    roomnameInp.style("background",color(153,255,255))
}

function preload() {
    //loading the first welcome image
    firstbackimg = loadImage("images/first.png");

    //background where create and join room is there
    main = loadImage("images/backdrop.png");

}

function draw() {
    background(255);
    //ig gameState is select then
    if (gameState === "select") {
        push();
        imageMode(CENTER);
        //IMAGE FOR THE FIRST WELOCOME SCREEN
        image(firstbackimg, width / 2, height / 2, width - width / 2, height - height / 2);
        pop();
        push();
        textFont(BOLD);
        textAlign(CENTER);
        textSize(40);
        //first screen text tap for mobile ond press ok for tv
        text("Tap to Begin for Mobile", width / 2, height - height / 5);
        text("Press Center Button for TV", width / 2, height / 5);
        pop();
    }
    if (gameState === "android") {
        push();
        imageMode(CENTER);
        image(main, width / 2, height / 2, width, height);
        createbut.display();
        joinbut.display();
        pop();
    }
    if (gameState === "tv") {
        push();
        imageMode(CENTER);
        image(main, width / 2, height / 2, width, height);
        createtv.display();
        jointv.display();
        pop();
        select.display();
    }
    if (gameState === "create" && deviceType === "mobile") {
        playernameInp.show();
        roomnameInp.show();
    }
}

function keyPressed() {
    //RELOADING THE PAGE ON ENTER FOR MY EASE
    // console.log(keyCode);
    select.move();
    if (keyCode === 13) {
        location.reload();
    }
    //making gameState tv after keypress
    //remember to play sound when player chooses his device as a tv
    //change keyCode as per the tv
    if (keyCode === 32 && gameState === "select") {
        gameState = "tv";
        deviceType = "tv";
    }
    //dertmining if the selecter is create or join
    if (keyCode === 65 && gameState === "tv") {

        if (select.i === 0) {
            //making gameStaate create for tv
            gameState = "create"
        }
        if (select.i === 1) {
            //making gameState join for tv
            gameState = "join";
        }
    }
}

function mousePressed() {
    if (gameState === "select") {
        setTimeout(()=>{
            gameState = "android";
            deviceType = "mobile";
        },100);
        
    }
    if (buttonpressed(createbut) && gameState==="android") {
        //making gameState create for mobile
        gameState = "create";
    }
    if (buttonpressed(joinbut) && gameState==="android") {
        //making gameState join for mobile
        gameState = "join";
    }
}

function buttonpressed(obj) {
    if (mouseX - obj.x <= obj.width / 2 &&
        obj.x - mouseX <= obj.width / 2 &&
        obj.y - mouseY <= obj.height / 2 &&
        mouseY - obj.y <= obj.height / 2) {
        return true;
    }else{
        return false;
    }
}