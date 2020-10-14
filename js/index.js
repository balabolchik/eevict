let randomWords =["кінь", "преса", "ефект", "гроші", "теорія", "черга", "удар", "кодекс", "жовтень", "наявність", "очікування", "канал", "дума", "відкриття", "визначення", "стіна", "варіант", "контакт", "сезон", "театр", "поїздка", "випуск", "реєстрація", "костюм", "проблема", "автомобіль", "розум", "жах", "квартира", "темп", "послуга", "хлопчик", "порядок", "груди", "вимога", "договір", "образ", "порядок", "сенс", "читач", "назва", "біль", "література", "спільнота", "село", "справа", "режисер", "колега", "виставка", "зміна", "криза", "інтернет", "вершина", "недостача", "водій", "дійсність", "плече", "компанія", "висота", "свідок", "банк", "номер", "дозвіл", "дорога", "список", "зброя", "почуття", "власник", "різниця", "людство", "гідроелектростанція", "учень", "монастир", "спеціаліст", "спогади", "живіт", "штаб", "вийняток", "вересень", "бажання", "схід", "сторона", "інститут", "ознака", "матеріал", "пісок", "наявність", "власник", "кандидат", "темрява", "міст", "проведення", "техніка", "грудень", "збір", "політика", "умова", "сніг", "розробка", "висновок", "вирок", "підготовка"];

let name;
let addNewPlayers;
let anotherGame;
let numberOfPlayer = 0;
let gessingWord;
let secretWord = [];
let results;
let resultsOfGame = {
    players : [],
    score : []
};
let letter;
let letterIsCorrect;
let listedLetters=[];
let wordIsGuessed;
let letterIsGuessed;
let unusedLetters = ["А","Б","В","Г","Д","Е","Є","Ж","З","И","І","Ї","Й","К","Л","М","Н","О","П","Р","С","Т","У","Ф","Х","Ц","Ч","Ш","Щ","Ь","Ю","Я"];
document.getElementById('unused_letters').innerHTML=unusedLetters.join("  |  ");
do {
    addPlayers();
} while (addNewPlayers);
//Відгадуємо загадані слова--------------------------------------------------------------------------------------------
do{
    printResults();
    game();
}while(anotherGame);
printResults();
alert(`${resultsOfGame.players[0]}, вітаю! Ви переможець!!!`);

// ---------------------------------------------------------------------------------------------------------------------
// Результати
function score(){
    results = ""
    for (let i=0; i<resultsOfGame.players.length; i++){
        let min = resultsOfGame.score[0];
        let playerWithMinScore = resultsOfGame.players[0];
        for (let j = 1; j<resultsOfGame.players.length-i; j++){
            if(resultsOfGame.score[j]>min){
                resultsOfGame.score[j-1]=resultsOfGame.score[j];
                resultsOfGame.players[j-1]=resultsOfGame.players[j];
                resultsOfGame.score[j]=min;
                resultsOfGame.players[j]=playerWithMinScore;
            }else{
                min=resultsOfGame.score[j];
                playerWithMinScore=resultsOfGame.players[j];
            };
        };
    };
    for (let i=0; i<resultsOfGame.players.length; i++){
        results += `\n${resultsOfGame.players[i]}: ${resultsOfGame.score[i]}`;
    };
    return(results);
};

//Додаємо гравців
function addPlayers(){
    numberOfPlayer++;
    name = prompt(`Гравець ${numberOfPlayer}, як вас звати?`);
    resultsOfGame.players.push(`${name[0].toUpperCase()}${name.slice(1).toLowerCase()}`);
    resultsOfGame.score.push(10);
    addNewPlayers = confirm(`Хочете добавити ще одного гравця?`);
};

//гра
function game(){
    wordIsGuessed=false;
    listedLetters=[];
    gessingWord = randomWords[Math.floor(Math.random()*randomWords.length)].toUpperCase().split('');
    console.log(gessingWord);
    secretWord=createASecretWord();
    console.log(secretWord.join('  '));
    numberOfPlayer = 0;
    startTheGame();
    anotherGame=confirm(`Хочете зіграти ще одну гру?`);
    secretWord=[];
    gessingWord=[];
};


//створюємо масив з закритими літерами
function createASecretWord(){
    let arr=[];
    for (let i=0; i<gessingWord.length;i++){
        arr.push('__');
    };
    return arr;
};

//починаємо гру
function startTheGame(){
    while (!wordIsGuessed){
        letterIsGuessed=true;
        playerAttempt();
        if (numberOfPlayer!==resultsOfGame.players.length-1){
            numberOfPlayer++;
        } else {
            numberOfPlayer=0;
        };
    };
};

//вгадує один гравець поки не помилиться
function playerAttempt(){
    while(letterIsGuessed){
        letter = prompt(`${secretWord.join('  ')}\n${resultsOfGame.players[numberOfPlayer]}, введіть вашу літеру:`).toUpperCase();
        checkedTheCorrectnesOfTheEnteredLetter();

        while(!letterIsCorrect){
            checkedTheCorrectnesOfTheEnteredLetter();
        };
    };
};

//перевірка чи введена літера є коректною
function checkedTheCorrectnesOfTheEnteredLetter (){
    if (letter.length>1||letter.length<1){
        letter = prompt(`${secretWord.join('  ')}\n${resultsOfGame.players[numberOfPlayer]}, введіть одну літеру:`).toUpperCase();
        letterIsCorrect=false;
    }else if(listedLetters.indexOf(letter)!==-1){
        letter = prompt(`${secretWord.join('  ')}\n${resultsOfGame.players[numberOfPlayer]}, ця буква вже використовувалася, введіть іншу букву:`).toUpperCase();
        letterIsCorrect=false;
    }else{
        listedLetters.push(letter);
        checkOrLetterIsGuess();
        letterIsCorrect=true;
        if(secretWord.indexOf('__')===-1){
            resultsOfGame.score[numberOfPlayer]+=3;
            wordIsGuessed=true;
            letterIsGuessed=false;
        };
    };
};

//перевіряєм чи введена літера присутня в загаданому слові
function checkOrLetterIsGuess(){
    unusedLetters.splice(unusedLetters.indexOf(letter),1);
    printUnusedLetters();
    if(gessingWord.indexOf(letter)===-1){
        resultsOfGame.score[numberOfPlayer]-=1;
        letterIsGuessed=false;
    }else{
        for (let i=0; i<gessingWord.length;i++){
            if (gessingWord[i]===letter){
                secretWord[i]=letter;
                resultsOfGame.score[numberOfPlayer]+=1;
                letterIsGuessed=true;

            };
        };
    };
    printResults();
};

//виводимо невикористані літери на екран
function printUnusedLetters(){
    document.getElementById('unused_letters').innerHTML=unusedLetters.join('  |  ');
};

//виводимо результати
function printResults(){
    document.getElementById('score').innerHTML = score();
};