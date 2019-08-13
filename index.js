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
// -- одна и таже карта не была выдана дважды (физически невозможно)
// -- у одного из игроков есть как минимум одна пара (дополнительная проверка)
// 3. Подсчитать количество пар у каждого игрока (не больше 2х)
// 4. Победителю добавить класс css и подсветить парные карты

// собрать 5 карт.  в цикле до 5 повторяем
    // 1. генерим одну карту объектом
    // 2. добавляем в массив
    // 3. проверяем, если ли такая карта по масти и числу, если есть, делаем пункт 1

Poker = (function($) {

    var cardBaseURL = "http://h3h.net/images/cards/{suit}_{card}.svg";
    const suits = ['spade', 'heart', 'diamond', 'club'];
    const cards = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

    const cardsForEachPlayer = 5;

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

    const randomSuiteOrCard = arr => {
        return arr[randomNumber(0, arr.length - 1)];
    };

    const getOneCard = () => {        
        return { [randomSuiteOrCard(suits)]: randomSuiteOrCard(cards) };
    };

    const getCardArray = (arr, numbersOfCard) => {
        if (numbersOfCard === 0) return arr;
        if (numbersOfCard >=1) { 

            const newCard = getOneCard();
            // console.log('newCard', newCard);            

            if (arr.length === 0) {                
                arr.push(newCard);
                
            } else {
                const result = arr.find(elem => {                    
                    
                    return Object.keys(newCard).every(key => {                        
                        return elem[key] === newCard[key];
                    });
                });

                if (result === undefined) {
                    arr.push(newCard);
                } else {
                    numbersOfCard += 1;
                }
            }
            return getCardArray(arr, numbersOfCard - 1);
        }   
    };

    const createElement = tag => {
        return document.createElement(tag);
    };

    const appendCards = (id, data) => {
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
                    image.src = `http://h3h.net/images/cards/${key}_${elem[key]}.svg`;
                }
            }
                       
            card.append(image);
        });
    };

    const findPairs = (arr) => {
        console.log(arr)
        const aaa = Object.values(arr);
        console.log(aaa);
    }


    // *-* event methods *-*

    var eventPlayAgainClicked = function() {
        let hand1 = makeHand();
        let hand2 = makeHand();
        
        let cardArray = getCardArray(hand1, cardsForEachPlayer*2);

        // console.log('hand1', cardArray);

        const cardArrayHand1 = cardArray.slice(0, cardsForEachPlayer);
        const cardArrayHand2 = cardArray.slice(cardsForEachPlayer);

        appendCards("hand1", cardArrayHand1);
        appendCards("hand2", cardArrayHand2);

        findPairs(cardArrayHand1);
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
