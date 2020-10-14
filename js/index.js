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

do {//додає гравців у гру
    numberOfPlayer++;//номерує гравців
    name = prompt(`Гравець ${numberOfPlayer}, як вас звати?`);//вводить ім'я кожного гравця
    resultsOfGame.players.push(`${name[0].toUpperCase()}${name.slice(1).toLowerCase()}`);//додає ім'я гравця в базу
    resultsOfGame.score.push(10);//задає початковий рахунок гравця у базу
    addNewPlayers = confirm(`Хочете добавити ще одного гравця?`)//запитує чи потрібно додати ще гравця
} while (addNewPlayers);//додає гравців у гру
//Відгадуємо загадані слова--------------------------------------------------------------------------------------------
do{
    wordIsGuessed=false;
    listedLetters=[];
    gessingWord = randomWords[Math.floor(Math.random()*randomWords.length)].toUpperCase().split('');//обирає рандомне слово
    console.log(gessingWord);
    for (let i=0; i<gessingWord.length;i++){
        secretWord.push('__');
    };
    console.log(secretWord.join('  '));
    let z = 0;


// -------------------------------------------------------------------------------------------------------------------------

    while (!wordIsGuessed){
        letterIsGuessed=true;
        while(letterIsGuessed){
            letter = prompt(`${secretWord.join('  ')}\n${resultsOfGame.players[z]}, введіть вашу літеру:`).toUpperCase();
            if (letter.length>1||letter.length<1){
                letter = prompt(`${secretWord.join('  ')}\n${resultsOfGame.players[z]}, введіть одну літеру:`).toUpperCase();
                letterIsCorrect=false;
            }else if(listedLetters.indexOf(letter)!==-1){
                letter = prompt(`${secretWord.join('  ')}\n${resultsOfGame.players[z]}, ця буква вже використовувалася, введіть іншу букву:`).toUpperCase();
                letterIsCorrect=false;
            }else{
                listedLetters.push(letter);
                if(gessingWord.indexOf(letter)===-1){
                    resultsOfGame.score[z]-=1;
                    letterIsGuessed=false;
                }else{
                    for (let i=0; i<gessingWord.length;i++){
                        if (gessingWord[i]===letter){
                            secretWord[i]=letter;
                            resultsOfGame.score[z]+=1;
                            letterIsGuessed=true;
                        };
                    };
                    if(secretWord.indexOf('__')===-1){
                        resultsOfGame.score[z]+=3;
                        wordIsGuessed=true;
                        letterIsGuessed=false;
                    };
                };
                letterIsCorrect=true;

            };

            while(!letterIsCorrect){
                if (letter.length>1||letter.length<1){
                    letter = prompt(`${secretWord.join('  ')}\n${resultsOfGame.players[z]}, введіть одну літеру:`).toUpperCase();
                    letterIsCorrect=false;
                }else if(listedLetters.indexOf(letter)!==-1){
                    letter = prompt(`${secretWord.join('  ')}\n${resultsOfGame.players[z]}, ця буква вже використовувалася, введіть іншу букву:`).toUpperCase();
                    letterIsCorrect=false;
                }else{
                    listedLetters.push(letter);
                    if(gessingWord.indexOf(letter)===-1){
                        resultsOfGame.score[z]-=1;
                        letterIsGuessed=false;
                    }else{
                        for (let i=0; i<gessingWord.length;i++){
                            if (gessingWord[i]===letter){
                                secretWord[i]=letter;
                                resultsOfGame.score[z]+=1;
                                letterIsGuessed=true;
                            };
                        };
                    };
                    letterIsCorrect=true;
                    if(secretWord.indexOf('__')===-1){
                        wordIsGuessed=true;
                        letterIsGuessed=false;
                        resultsOfGame.score[z]+=3;
                    };
                };
            };
        };


        if (z!==resultsOfGame.players.length-1){
            z++;
        } else {
            z=0;
            alert(score());
        };
    };
  
    


// -----------------------------------------------------------------------------------------
    alert(score());
    anotherGame=confirm(`Хочете зіграти ще одну гру?`);
    secretWord=[];
    gessingWord=[];
}while(anotherGame);
alert(score());
alert(`${resultsOfGame.players[0]}, вітаю! Ви переможець!!!`);

// ---------------------------------------------------------------------------------------------------------------------
// Результати

function score(){
    results = "Результати гри:"
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
    return(results);//повертає результати
};