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

// Проверки до вывода карт:
// 
// -- у 90%  игроков есть как минимум одна пара (дополнительная проверка)
// 3. Подсчитать количество пар у каждого игрока (не больше 2х)
// 4. Победителю добавить класс css и подсветить парные карты



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

    const appendCards = (id, data) => {
        console.log(id);
        const constainer = document.getElementById(id);
        const mainDiv = createElement("div");
        mainDiv.classList.add("card-container");
        constainer.append(mainDiv);
                
        data.forEach(elem => {            
            const card = createElement("div");            
            mainDiv.append(card);

            const image = createElement('img');
            image.classList.add("card");

            for (let key in elem) {
                if (elem.hasOwnProperty(key)) {                    
                    image.src = `http://h3h.net/images/cards/${elem.suit}_${elem.card}.svg`;
                }
            }
                       
            card.append(image);
        });
    };

    const findPairs = (arr) => {
        console.log(arr);        
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
        // console.log(ninetyPercentOfPlayers);

        //остаток игроков - это
        const restOfPlayers = amountOfPlayers - ninetyPercentOfPlayers;
        
        
        // выдаем по паре карт для 90 процентов игроков
 
        for (let i = 0; i < ninetyPercentOfPlayers; i += 1) {
            hands[i] = getCardsPair(mainCardArray);
        }

        // додаем оставшиеся карты 90 процентам
        
        console.log(mainCardArray)
        
        for (let i = 0; i < ninetyPercentOfPlayers; i += 1) {
            for (let j = 0; j < (cardsForEachPlayer - 2); j += 1) {
                hands[i].push(getRandomCard(mainCardArray))
            }
            console.log('ninetyPercentOfPlayers', hands[i]);
        }

        // додаем оставшиеся карты restOfPlayers

        if (restOfPlayers > 0) {
            for (let i = ninetyPercentOfPlayers; i < amountOfPlayers; i += 1) {
                for (let j = 0; j < cardsForEachPlayer; j += 1) {
                    hands[i].push(getRandomCard(mainCardArray))
                }
                console.log('rest', hands[i]);
            }
        }
        
        console.log(mainCardArray);

        for (let i = 0; i < amountOfPlayers; i += 1) {
            appendCards(`hand${i+1}`, hands[i]);
        }

        // findPairs(cardArrayHand1);
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
