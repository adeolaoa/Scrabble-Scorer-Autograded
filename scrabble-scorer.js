// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n` 
		 }
 
	  }
	}
   //console.log(letterPoints);
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   console.log("Let's play some Scrabble! ");
   console.log(" ");
   word = input.question("Please enter a word to score: ");
   return word;
};
// Call the function to dispaly the word entered and score
//initialPrompt();

 //oldScrabbleScorer(word);


// Define a function that takes a word as a parameter and returns a numerical score. 
// Each letter within the word is worth 1 point.

const onePoint = {
   1: ['A','B', 'C','D','E', 'F','G','H','I','J','K', 'L','M', 'N','O','P','Q', 'R', 'S', 'T','U','V',
    'W', 'X','Y','Z']
 };

function simpleScorer(word){
   word = word.toUpperCase()
   let wordCount = 0;
   for (let i = 0; i < word.length; i++){
      for (item in onePoint){
         if (onePoint[item].includes(word[i])){
            wordCount += Number(item);
         }
      }
   }
   console.log(wordCount);
   return wordCount
}
//simpleScorer(word);

// Define a function that takes a word as a parameter and returns a score. 
// Each vowel within the word is worth 3 points, and each consonant is worth 1 point.
const vowel = {
   1: ['B', 'C','D', 'F','G','H','J','K', 'L','M', 'N','P','Q', 'R', 'S', 'T','V',
    'W', 'X','Y','Z'],
   3: ['A','E', 'I', 'O', 'U']
 };
 function vowelBonusScorer(word) {
   word = word.toUpperCase();
   let wordCount = 0;
   for (let i = 0; i < word.length; i++) {
       for (item in vowel) {
           if (vowel[item].includes(word[i])) {
               //console.log(pointValue);
               wordCount += Number(item); // number turns the value from string to integer
           }
       }
   }
   return wordCount;
}

// Write the rest of the transform() function. It will need to take an object as a parameter - 
// specifically the oldPointStructure object. Calling transform(oldPointStructure) will return an 
// object with lowercase letters as keys. The value for each key will be the points assigned to that 
// letter.

function transform(oldPointStructure) {
   let newPointStructure = {};
   for (item in oldPointStructure){
      //console.log(oldPointStructure[item])
      key = oldPointStructure[item]
      for (let i = 0; i < key.length; i++){
         newKey = key[i].toLowerCase();
         //console.log(newKey)
         newPointStructure[newKey] = Number(item);
      }  
   }
   return newPointStructure;
};
//console.log(transform(oldPointStructure));

let newPointStructure = transform(oldPointStructure);
//console.log(newPointStructure);

function scrabbleScorer(word){
   word = word.toLowerCase();
   let newPointStructure = transform(oldPointStructure);
   let wordCount = 0;
   for (let i = 0; i < word.length; i++){
      wordCount += newPointStructure[word[i]]
   }
   return wordCount;
};
//console.log(scrabbleScorer(word));

// taking all the three functions into 1
const scoringAlgorithms = [
   {
      name: "Simple Scorer",
      description: "Each letter is worth 1 point.",
      scorerFunction: function simpleScorer(word){
         word = word.toUpperCase()
         let wordCount = 0;
         for (let i = 0; i < word.length; i++){
            for (item in onePoint){
               if (onePoint[item].includes(word[i])){
                  wordCount += Number(item);
               }
            }
         }
         return `Score for ${word} is: ${wordCount}`;
      }
   },
   {
      name: "Bonus Vowels",
      description: "Vowels are 3 points, consonants are 1 point.",
      scorerFunction: function vowelBonusScorer(word) {
         word = word.toUpperCase();
         let wordCount = 0;
         for (let i = 0; i < word.length; i++) {
             for (item in vowel) {
                 if (vowel[item].includes(word[i])) {
                     //console.log(pointValue);
                     wordCount += Number(item); // number turns the value from string to integer
                 }
             }
         }
         return `Score for ${word} is: ${wordCount}`;
      }
   },
   {
      name: "Scrabble",
      description: "The new scoring algorithm",
      scorerFunction:function scrabbleScorer(word){
         word = word.toLowerCase();
         let wordCount = 0;
         for (let i = 0; i < word.length; i++){
            wordCount += newPointStructure[word[i]]
         }
         return `Score for ${word} is: ${wordCount}`;
      }
   }
];

//console.log(scoringAlgorithms[0]);


function scorerPrompt() {
   console.log("Let's play some Scrabble! ");
   console.log(" ");

   console.log("Which scoring algorithm would you like to use?\n");
   console.log("0 - Simple Score: Each letter is worth 1 point.");
   console.log("1 - Bonus Vowels: Vowels are worth 3 points, and consonants are worth 1 point.");
   console.log("2 - Scrabble: Uses the traditional Scrabble scoring system.");
   console.log("")

   word = input.question("Please enter a word to score: ");
   console.log("")
   // Prompt the user to enter the number they want
   choice = input.question("Please enter 0,1, or 2: ");

   // selecting the scoring algorithm based on the choice of the user
   selectedAlgorithm = scoringAlgorithms[choice];
   console.log("algorithm name: ", selectedAlgorithm.name);
   return `Score for ${word}:`+ selectedAlgorithm.scorerFunction(word);
}

console.log(scorerPrompt());

function runProgram() {
   //initialPrompt();
   //oldScrabbleScorer(word);
   //scoringAlgorithms
   //scorerPrompt();
   //transform(oldPointStructure);
   //scrabbleScorer(word);
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   //scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
