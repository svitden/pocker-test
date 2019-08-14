/* 
  # Programming Proficiency Test

  Assumes basic JavaScript knowledge; jQuery knowledge helps a lot.

  ## Exercises

  1. Clicking the button should generate two random hands in memory (console.log).
  2. Clicking the button should render two random hands on the page as cards.
  3. Determine the winning hand by its number of pairs, add class="winning" to hand.
  4. Determine winning pairs and add class="pair0" (or "pair1" for 2nd pair) to cards.
  5. [Extra Credit] Ensure that 90% of hands have at least one pair.

*/


Poker = (function($) {

    var cardBaseURL = "http://h3h.net/images/cards/{suit}_{card}.svg";
    const suits = ['spade', 'heart', 'diamond', 'club'];
    const cards = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

    const cardsForEachPlayer = 5;
    const amountOfPlayers = 2;
    let mainCardArray = getMainCardArray(suits, cards);

    // *-* public methods *-*

    var init = function() {     
        $(".buttons button").on("click", eventPlayAgainClicked);
    };

    // *-* utility methods *-*

    var makeHand = function() {
        return [];
    };

    const randomNumber = (m, n) => { 
        return m + Math.floor(Math.random() * (n - m + 1));
    };

    function getMainCardArray (arr1, arr2) {
        const mainCardArray = [];
        for (let i = 0; i < arr1.length; i += 1) {
            for (let j = 0; j < arr2.length; j += 1) {
                mainCardArray.push({
                    suit: arr1[i],
                    card: arr2[j]
                })
            }
        }
        return mainCardArray;
    }

    const getNinetyPercentOfPlayers = (number) => {
        return Math.round(number /100 * 90);
    };

    const getRandomCard = (arr) => {
        const indexOfElem = randomNumber(0, arr.length - 1);
        const [ randomCard ] = arr.splice(indexOfElem, 1);
        mainCardArray = arr;
        return randomCard; // return object
    }

    const getCardsPair = (arr) => {        
        const indexOfElem1 = randomNumber(0, arr.length - 1);
        const [ firstCard ] = arr.splice(indexOfElem1, 1);

        const tempArr = arr.filter((elem) => {
            return elem.card === firstCard.card;
        });

        const indexOfElem2 = randomNumber(0, tempArr.length - 1);
        const [ secondCard ] = tempArr.splice(indexOfElem2, 1);
        
        mainCardArray = arr.filter(elem => {
            return elem !== secondCard;
        });

        return [firstCard, secondCard];
    }


    const createElement = tag => {
        return document.createElement(tag);
    };


    const findPairs = (arr) => {
        console.log('arr', arr)
        const cardPairsArray = arr.map(elem => {            
            return elem.reduce((acc, cur) => {                
                acc.push(cur.card);                                        
                return acc;
            }, [])
            .reduce((accum, el) => {                
                accum[el] = (accum[el] || 0) + 1;                
                return accum;
            }, {})
        });
        console.log('cardPairsArray', cardPairsArray);
        return cardPairsArray;  
    }


    const appendCards = (id, data, pairs) => {
        console.log(pairs);
        const pairsKeys = Object.keys(pairs);
        

        const constainer = document.getElementById(id);
        const mainDiv = createElement("div");
        mainDiv.classList.add("card-container");
        constainer.append(mainDiv);
                
        data.forEach(elem => {
                               
            const card = createElement("div");            
            mainDiv.append(card);

            const image = createElement('img');
            image.classList.add("card");
            image.setAttribute('data-id', `${elem.card}`);

            for (let key in elem) {
                if (elem.hasOwnProperty(key)) {                    
                    image.src = `http://h3h.net/images/cards/${elem.suit}_${elem.card}.svg`;
                }
            }
                       
            card.append(image);
        });        
    };

    const colorCards = (id, pairs) => {
        const pairsKeys = Object.keys(pairs);

        const constainer = document.getElementById(id);
        const elements = constainer.querySelectorAll('img');
        console.log(pairsKeys)

        let color1 = 0;
        let color2 = 0;

        for (let elem of elements) {
            const cardData = elem.getAttribute('data-id');
                        
            if (pairs[cardData] >=2 && pairs[cardData] < 4 && color1 < 2) {
                
                elem.classList.add(`pair0`);
                color1 += 1;
            } else if (pairs[cardData] >=2 && pairs[cardData] !== 3 && pairs[cardData] < 4 && color2 < 2) {
                elem.classList.add(`pair1`);
                color2 += 1;
            }
        }
    }

    const showTheWinner = (pairsArray) => {
        console.log(pairsArray);
        const numOfPairs = pairsArray.map(elem => {
            return Object.values(elem).filter(item => item >= 2);             
        });
        const [ firstPlayer, secondPlayer ] = numOfPairs;
        if (firstPlayer.length > secondPlayer.length) {
            document.getElementById('hand1').classList.add("winning");
        } else if (firstPlayer.length < secondPlayer.length) {
            document.getElementById('hand2').classList.add("winning");
        } 
    }

    const clear = () => {
        if (document.getElementByClassName('hand')) {
            document.getElementById('hand1').innerHtml ='';
            document.getElementById('hand2').innerHtml ='';
        }   
    }

    // *-* event methods *-*

    var eventPlayAgainClicked = function() {
                  
        let hands = [];
        // создаем массивы для карт по количеству игроков
        for (let i = 0; i < amountOfPlayers; i += 1) {
            hands.push(makeHand());            
        }

        // 90% игроков - это
        const ninetyPercentOfPlayers = getNinetyPercentOfPlayers(amountOfPlayers);
        

        //остаток игроков - это
        const restOfPlayers = amountOfPlayers - ninetyPercentOfPlayers;
        
        
        // выдаем по паре карт для 90 процентов игроков 

        for (let i = 0; i < ninetyPercentOfPlayers; i += 1) {
            hands[i] = getCardsPair(mainCardArray);
        }

        // выдаем оставшиеся карты 90 процентам 

        for (let i = 0; i < ninetyPercentOfPlayers; i += 1) {
            for (let j = 0; j < (cardsForEachPlayer - 2); j += 1) {
                hands[i].push(getRandomCard(mainCardArray))
            }
            // console.log('ninetyPercentOfPlayers', hands[i]);
        }

        // выдаем оставшиеся карты restOfPlayers

        if (restOfPlayers > 0) {
            for (let i = ninetyPercentOfPlayers; i < amountOfPlayers; i += 1) {
                for (let j = 0; j < cardsForEachPlayer; j += 1) {
                    hands[i].push(getRandomCard(mainCardArray))
                }
                // console.log('rest', hands[i]);
            }
        }
        
        // console.log(mainCardArray);

        // находим совпадающие пары
        const pairs = findPairs(hands);

        // Вставляем карты на поле
        for (let i = 0; i < amountOfPlayers; i += 1) {
            appendCards(`hand${i+1}`, hands[i], pairs[i]);
            colorCards(`hand${i+1}`, pairs[i]);
        }

        // Определить победителя
        showTheWinner(pairs);

    };

    // expose public methods
    return {
        init: init
    };
})(jQuery);

$(document).ready(Poker.init);

/*

The MIT License

Copyright (c) 2012 Brad Fults.

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

*/
