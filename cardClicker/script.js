const data = {
    cards: 0,
    totalCPS: 0,
    powerUps: [{
            id: 'add-card',
            name: "Additional Card:",
            price: 5,
            cps: 1,
            qty: 0,
        },
        {
            id: 'booster-pack',
            name: "New Booster Pack:",
            price: 20,
            cps: 5,
            qty: 0,
        },
        {
            id: 'deck-box',
            name: "Deck Box:",
            price: 100,
            cps: 10,
            qty: 0,
        },
        {
            id: 'elite-trainer',
            name: "Elite Trainer Box:",
            price: 1000,
            cps: 100,
            qty: 0,
        },
        {
            id: 'shelf-display',
            name: "Entire Shelf Display:",
            price: 5000,
            cps: 500,
            qty: 0,
        },
        {
            id: 'redditor',
            name: "Redditor's Card Collection:",
            price: 10000,
            cps: 1250,
            qty: 0,
        },
    ],
};
const powerUpCont = document.getElementById('power-ups')
const gameArea = document.getElementById('game-area')
const number = document.getElementById('score');
const cardsPerSec = document.getElementById('cards-per-sec')
const pokemonCard = document.getElementById('poke-card')

pokemonCard.addEventListener('click', function() {
    clickCard(data)
})
powerUpCont.addEventListener('click', function(event) {
    handleBuy(event, data)
})
setInterval(() => inc(data), 1000)

function clickCard(data) {
    data.cards++;
    updateCardCount(data.cards);
}

function updateCardCount(cardQty) {
    number.innerText = cardQty
}

function makePowerUp(powerUp) {
    const powerUpDiv = document.createElement('div');
    powerUpDiv.className = "power-up";
    const currentCost = powerUp.price;
    const html = `
    <div class="store-column">
        <div>${powerUp.name}</div>
        <div>Quantity: ${powerUp.qty}</div>
        <div>Cards Per Second: ${powerUp.cps}</div>
        <div>Cost: ${currentCost} cards</div>
        <button class="buy-button" type="button" id="buy_${powerUp.id}">Buy</button>
    </div>
    `
    powerUpDiv.innerHTML = html;
    return powerUpDiv
}

function getPowerUpById(data, powerUpId) {
    return data.powerUps.find(powerUp => powerUpId === powerUp.id);
};

function canBuyPowerUp(data, powerUpId) {
    if (getPowerUpById(data, powerUpId).price <= data.cards) {
        return true;
    } else {
        return false;
    };
}

function updateCPSView(cps) {
    cardsPerSec.innerText = cps;
}

function updatePrice(oldPrice) {
    const newPrice = parseInt(oldPrice);
    return (Math.floor(newPrice * 1.25));
}

function tryToBuy(data, powerUpId) {
    if (canBuyPowerUp(data, powerUpId)) {
        const powerUp = getPowerUpById(data, powerUpId);
        data.cards -= powerUp.price;
        powerUp.qty++;
        powerUp.price = updatePrice(powerUp.price);
        data.totalCPS += powerUp.cps;
        return true;
    } else {
        return false;
    }
}

function handleBuy(event, data) {
    if (event.target.className === "buy-button") {
        const powerUpId = event.target.id.slice(4);
        const result = tryToBuy(data, powerUpId);
        if (!result) {
            window.alert("Not enough cards!");
        } else {
            renderPowerUps(data);
            updateCardCount(data.cards);
            updateCPSView(data.totalCPS);
        }
    }
}

function deleteAllKids(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function renderPowerUps(data) {
    deleteAllKids(powerUpCont)
    data.powerUps.forEach(powerUp => {
        powerUpCont.appendChild(makePowerUp(powerUp))
    })
}

function inc(data) {
    data.cards += data.totalCPS;
    updateCardCount(data.cards);
    renderPowerUps(data);
}

