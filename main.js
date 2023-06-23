const moves = document.getElementById("moves-count");
// const timeValue = document.getElementById("time");
// const startButton = document.getElementById("start");
// const stopButton = document.getElementById("stop");
const gameContainer = document.querySelector(".game-container");
const result = document.getElementById("result");
const controls = document.querySelector(".controls-container");
let cards;
let interval;
let firstCard = false;
let secondCard = false;

const items = [
	{ name: "Brian", image: "afbeeldingen/Hoofdje-Brian.png" },
	{ name: "Max", image: "afbeeldingen/Hoofdje-Max.png" },
	{ name: "Simon", image: "afbeeldingen/Hoofdje-Simon.png" },
	{ name: "Alvian", image: "afbeeldingen/Hoofdje-Alvian.png" },
	{ name: "Sven", image: "afbeeldingen/Hoofdje-Sven.png" },
	{ name: "Mees", image: "afbeeldingen/Hoofdje-Mees.png" },
	{ name: "Ramyuel", image: "afbeeldingen/Hoofdje-Ramyuel.png" },
	{ name: "Rewind", image: "afbeeldingen/rewind-button.png" },
];

const generateRandom = () => {
	let tempArray = [...items];
	let cardValues = [];

	for (let i = 0; i < items.length; i++) {
		const randomIndex = Math.floor(Math.random() * tempArray.length);
		cardValues.push(tempArray[randomIndex]);
		tempArray.splice(randomIndex, 1);
	}
	return cardValues;
};

const matrixGenerator = (cardValues) => {
	gameContainer.innerHTML = "";
	cardValues = [...cardValues, ...cardValues];
	cardValues.sort(() => Math.random() - 0.5);
	for (let i = 0; i < items.length * 2; i++) {
		gameContainer.innerHTML += `
        <div class="card-container" data-card-value="${
			cardValues[i].name
		} style="--index ${i}"">
           <div class="card-before">${i + 1}</div> 
           <div class="card-after">
           <img src="${cardValues[i].image}" class="image"/></div>
        </div>
        `;
	}

	gameContainer.style.gridTemplateColumns = `repeat(${4},auto)`;

	cards = document.querySelectorAll(".card-container");
	cards.forEach((card) => {
		card.addEventListener("click", () => {
			if (!card.classList.contains("matched")) {
				card.classList.add("flipped");

				if (!firstCard) {
					firstCard = card;
					firstCard.style.pointerEvents = "none";
					firstCardValue = card.getAttribute("data-card-value");
				} else {
					// moveCounter();
					secondCard = card;
					let secondCardValue = card.getAttribute("data-card-value");
					if (firstCardValue === secondCardValue) {
						firstCard.classList.add("matched");
						secondCard.classList.add("matched");

						secondCard.classList.add("big");
						secondCard.addEventListener("click", () => {
							secondCard.classList.add("final-state");
							secondCard.classList.remove("big");
						});

						firstCard = false;
						firstCard.style.pointerEvents = "auto";
					} else {
						firstCard.style.pointerEvents = "auto";
						let [tempFirst, tempSecond] = [firstCard, secondCard];
						firstCard = false;
						secondCard = false;
						let delay = setTimeout(() => {
							tempFirst.classList.remove("flipped");
							tempSecond.classList.remove("flipped");
						}, 500);
					}
				}
			}
		});
	});
};

const initializer = () => {
	controls.classList.add("hide");
	// startButton.classList.add("hide");
	result.innerText = "";
	// winCount = 0;

	let cardValues = generateRandom();
	// console.log(cardValues);
	matrixGenerator(cardValues);
};
initializer();
