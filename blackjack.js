
//Main Global Variables and Init

var deck = createDeck();

var drawed = new Array();

var playerValues = new Array();

var dealerValues = new Array();

var bet = 5;

var money = 50;

hideShow("hit");

hideShow("double");

hideShow("stand");



//Utility functions

function draw(name) {
	
	var i = rndm52();
	while (drawed[i]) {
		i = rndm52();
	}
	console.log(i);
	var s = document.getElementById(name);
	s.appendChild(deck[i].image);
	
	return deck[i].value;
}

function hideShow(name) {
  var x = document.getElementById(name);
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

function rndm52 () {
	var random = Math.floor(Math.random()*(52));
	return random;
}

function deleteChild(name) { 
        var e = document.getElementById(name);  
        var child = e.lastElementChild;  
        while (child) { 
            e.removeChild(child); 
            child = e.lastElementChild; 
        } 
} 

function count(hand) {
    var i, count = 0, aces = 0;
    for (i=0; i<hand.length; i++) {
        if (hand[i] == 1) {
            aces++;
        }
        else {
            count += hand[i];
        }
    }
    count += aces * 11;
    for (i=0; i<aces; i++) {
        if (count > 21) {
            count -= 10;
        }
    }
    return count;
}

function updateWrite(val, name) {
      document.getElementById(name).innerHTML = val;
    }
	
function raiseBet() {
	if (bet < money) {
		bet++;
		updateWrite(bet, "bet");
	}
}

function decreaseBet() {
	if (bet > 0) {
		bet--;
		updateWrite(bet, "bet");
	}
}
	
function dealerInit() {
	
	deleteChild("dealer");
	var b = document.createElement("img");
	b.src = "cards/RED_BACK.svg";
	b.className = "card";
	
	var s = document.getElementById("dealer");
	s.appendChild(b);
	
	dealerValues.push(draw("dealer"));
	
	updateWrite(count(dealerValues), "dealerCount");
}	
	
//Game Functions

function start() {
	if (money > 0) {
		initializePlayerValues();
		initializeDealerValues();
		drawed = initializeDeck();
		deleteChild("player");
		playerValues[0] = draw("player");
		playerValues[1] = draw("player");
		dealerInit();
		updateWrite("", "busted");
		if (money < 5 ) bet = money;
		updateWrite(count(playerValues), "count");
		updateWrite(money, "money");
		updateWrite(bet, "bet");
		hideShow("raise");
		hideShow("decrease");
		hideShow("hit");
		hideShow("stand");
		hideShow("start");
	}
	else {
		while (true) {
			alert("Looser!");
		}
	}
}	

function hit() {
	playerValues.push(draw("player"));
	var c = count(playerValues);
	updateWrite(c, "count");
	if (c > 21) {
		updateWrite("  Busted!", "busted");
		lost();
	}
}

function wait(ms){
   var start = new Date().getTime();
   var end = start;
   while(end < start + ms) {
     end = new Date().getTime();
  }
}

function stand() {
	var e = document.getElementById("dealer");  
    var child = e.firstElementChild; 
	e.removeChild(child);
	dealerValues.push(draw("dealer"));
	var c = count(dealerValues);
	updateWrite(c, "dealerCount");
	//wait(5000);
	//alert("dealer draws");
	while (count(dealerValues) < count(playerValues)) {
		dealerValues.push(draw("dealer"));
		c = count(dealerValues);
		updateWrite(c, "dealerCount");
		//wait(5000);
		//alert("dealer draws");

	}
	if (count(dealerValues) > count(playerValues) && count(dealerValues) < 21) {
		lost();
	}
	else {
		win();
	}
}

function lost() {
	money -= bet;
	end();
}

function win() {
	money += bet;
	end();
}

function end() {
	bet = 5;
	updateWrite(money, "money");
	updateWrite(bet, "bet");
	hideShow("hit");
	hideShow("stand");
	hideShow("start");
	hideShow("raise");
	hideShow("decrease");
}


//Cards and Deck initialization

function card(i, v) {
	this.image = i;
	this.value = v;
}

function initializePlayerValues () {
		playerValues = new Array();
}

function initializeDealerValues () {
		dealerValues = new Array();
}

function initializeDeck() {
	var drawed = new Array();
	for (var i=0;i<52;i++) {
		drawed[i] = false;
	}
	return drawed;
}

function createDeck() {
	var deck = new Array();
	var img = new Array();
	var i = 0, v = 1;
	
	img[i] = document.createElement("img");
	img[i].src = "cards/AC.svg";
	img[i].className = "card";
	
	deck[i] = new card(img[i], v);
	
	i++;
	
	img[i] = document.createElement("img");
	img[i].src = "cards/AD.svg";
	img[i].className = "card";
	
	deck[i] = new card(img[i], v);
	
	i++;
	
	img[i] = document.createElement("img");
	img[i].src = "cards/AH.svg";
	img[i].className = "card";
	
	deck[i] = new card(img[i], v);
	
	i++;
	
	img[i] = document.createElement("img");
	img[i].src = "cards/AS.svg";
	img[i].className = "card";
	
	deck[i] = new card(img[i], v);
	
	i++;
	
	v = 2;
	
	img[i] = document.createElement("img");
	img[i].src = "cards/2C.svg";
	img[i].className = "card";
	
	deck[i] = new card(img[i], v);
	
	i++;
	
	img[i] = document.createElement("img");
	img[i].src = "cards/2D.svg";
	img[i].className = "card";
	
	deck[i] = new card(img[i], v);
	
	i++;
	
	img[i] = document.createElement("img");
	img[i].src = "cards/2H.svg";
	img[i].className = "card";
	
	deck[i] = new card(img[i], v);
	
	i++;
	
	img[i] = document.createElement("img");
	img[i].src = "cards/2S.svg";
	img[i].className = "card";
	
	deck[i] = new card(img[i], v);
	
	i++;
	
	v = 3;
	
	img[i] = document.createElement("img");
	img[i].src = "cards/3C.svg";
	img[i].className = "card";
	
	deck[i] = new card(img[i], v);
	
	i++;
	
	img[i] = document.createElement("img");
	img[i].src = "cards/3D.svg";
	img[i].className = "card";
	
	deck[i] = new card(img[i], v);
	
	i++;
	
	img[i] = document.createElement("img");
	img[i].src = "cards/3H.svg";
	img[i].className = "card";
	
	deck[i] = new card(img[i], v);
	
	i++;
	
	img[i] = document.createElement("img");
	img[i].src = "cards/3S.svg";
	img[i].className = "card";
	
	deck[i] = new card(img[i], v);
	
	i++;
	
	v = 4;
	
	img[i] = document.createElement("img");
	img[i].src = "cards/4C.svg";
	img[i].className = "card";
	
	deck[i] = new card(img[i], v);
	
	i++;
	
	img[i] = document.createElement("img");
	img[i].src = "cards/4D.svg";
	img[i].className = "card";
	
	deck[i] = new card(img[i], v);
	
	i++;
	
	img[i] = document.createElement("img");
	img[i].src = "cards/4H.svg";
	img[i].className = "card";
	
	deck[i] = new card(img[i], v);
	
	i++;
	
	img[i] = document.createElement("img");
	img[i].src = "cards/4S.svg";
	img[i].className = "card";
	
	deck[i] = new card(img[i], v);
	
	i++;
	
	v = 5;
	
	img[i] = document.createElement("img");
	img[i].src = "cards/5C.svg";
	img[i].className = "card";
	
	deck[i] = new card(img[i], v);
	
	i++;
	
	img[i] = document.createElement("img");
	img[i].src = "cards/5D.svg";
	img[i].className = "card";
	
	deck[i] = new card(img[i], v);
	
	i++;
	
	img[i] = document.createElement("img");
	img[i].src = "cards/5H.svg";
	img[i].className = "card";
	
	deck[i] = new card(img[i], v);
	
	i++;
	
	img[i] = document.createElement("img");
	img[i].src = "cards/5S.svg";
	img[i].className = "card";
	
	deck[i] = new card(img[i], v);
	
	i++;
	
	v = 6;
	
	img[i] = document.createElement("img");
	img[i].src = "cards/6C.svg";
	img[i].className = "card";
	
	deck[i] = new card(img[i], v);
	
	i++;
	
	img[i] = document.createElement("img");
	img[i].src = "cards/6D.svg";
	img[i].className = "card";
	
	deck[i] = new card(img[i], v);
	
	i++;
	
	img[i] = document.createElement("img");
	img[i].src = "cards/6H.svg";
	img[i].className = "card";
	
	deck[i] = new card(img[i], v);
	
	i++;
	
	img[i] = document.createElement("img");
	img[i].src = "cards/6S.svg";
	img[i].className = "card";
	
	deck[i] = new card(img[i], v);
	
	i++;
	
	v = 7;
	
	img[i] = document.createElement("img");
	img[i].src = "cards/7C.svg";
	img[i].className = "card";
	
	deck[i] = new card(img[i], v);
	
	i++;
	
	img[i] = document.createElement("img");
	img[i].src = "cards/7D.svg";
	img[i].className = "card";
	
	deck[i] = new card(img[i], v);
	
	i++;
	
	img[i] = document.createElement("img");
	img[i].src = "cards/7H.svg";
	img[i].className = "card";
	
	deck[i] = new card(img[i], v);
	
	i++;
	
	img[i] = document.createElement("img");
	img[i].src = "cards/7S.svg";
	img[i].className = "card";
	
	deck[i] = new card(img[i], v);
	
	i++;
	
	v = 8;
	
	img[i] = document.createElement("img");
	img[i].src = "cards/8C.svg";
	img[i].className = "card";
	
	deck[i] = new card(img[i], v);
	
	i++;
	
	img[i] = document.createElement("img");
	img[i].src = "cards/8D.svg";
	img[i].className = "card";
	
	deck[i] = new card(img[i], v);
	
	i++;
	
	img[i] = document.createElement("img");
	img[i].src = "cards/8H.svg";
	img[i].className = "card";
	
	deck[i] = new card(img[i], v);
	
	i++;
	
	img[i] = document.createElement("img");
	img[i].src = "cards/8S.svg";
	img[i].className = "card";
	
	deck[i] = new card(img[i], v);
	
	i++;
	
	v = 9;
	
	img[i] = document.createElement("img");
	img[i].src = "cards/9C.svg";
	img[i].className = "card";
	
	deck[i] = new card(img[i], v);
	
	i++;
	
	img[i] = document.createElement("img");
	img[i].src = "cards/9D.svg";
	img[i].className = "card";
	
	deck[i] = new card(img[i], v);
	
	i++;
	
	img[i] = document.createElement("img");
	img[i].src = "cards/9H.svg";
	img[i].className = "card";
	
	deck[i] = new card(img[i], v);
	
	i++;
	
	img[i] = document.createElement("img");
	img[i].src = "cards/TS.svg";
	img[i].className = "card";
	
	deck[i] = new card(img[i], v);
	
	i++;
	
	v = 10;
	
	img[i] = document.createElement("img");
	img[i].src = "cards/TC.svg";
	img[i].className = "card";
	
	deck[i] = new card(img[i], v);
	
	i++;
	
	img[i] = document.createElement("img");
	img[i].src = "cards/TD.svg";
	img[i].className = "card";
	
	deck[i] = new card(img[i], v);
	
	i++;
	
	img[i] = document.createElement("img");
	img[i].src = "cards/TH.svg";
	img[i].className = "card";
	
	deck[i] = new card(img[i], v);
	
	i++;
	
	img[i] = document.createElement("img");
	img[i].src = "cards/TS.svg";
	img[i].className = "card";
	
	deck[i] = new card(img[i], v);
	
	i++;
	
	img[i] = document.createElement("img");
	img[i].src = "cards/JC.svg";
	img[i].className = "card";
	
	deck[i] = new card(img[i], v);
	
	i++;
	
	img[i] = document.createElement("img");
	img[i].src = "cards/JD.svg";
	img[i].className = "card";
	
	deck[i] = new card(img[i], v);
	
	i++;
	
	img[i] = document.createElement("img");
	img[i].src = "cards/JH.svg";
	img[i].className = "card";
	
	deck[i] = new card(img[i], v);
	
	i++;
	
	img[i] = document.createElement("img");
	img[i].src = "cards/JS.svg";
	img[i].className = "card";
	
	deck[i] = new card(img[i], v);
	
	i++;

	img[i] = document.createElement("img");
	img[i].src = "cards/QC.svg";
	img[i].className = "card";
	
	deck[i] = new card(img[i], v);
	
	i++;
	
	img[i] = document.createElement("img");
	img[i].src = "cards/QD.svg";
	img[i].className = "card";
	
	deck[i] = new card(img[i], v);
	
	i++;
	
	img[i] = document.createElement("img");
	img[i].src = "cards/QH.svg";
	img[i].className = "card";
	
	deck[i] = new card(img[i], v);
	
	i++;
	
	img[i] = document.createElement("img");
	img[i].src = "cards/QS.svg";
	img[i].className = "card";
	
	deck[i] = new card(img[i], v);
	
	i++;
	
	img[i] = document.createElement("img");
	img[i].src = "cards/KC.svg";
	img[i].className = "card";
	
	deck[i] = new card(img[i], v);
	
	i++;
	
	img[i] = document.createElement("img");
	img[i].src = "cards/KD.svg";
	img[i].className = "card";
	
	deck[i] = new card(img[i], v);
	
	i++;
	
	img[i] = document.createElement("img");
	img[i].src = "cards/KH.svg";
	img[i].className = "card";
	
	deck[i] = new card(img[i], v);
	
	i++;
	
	img[i] = document.createElement("img");
	img[i].src = "cards/KS.svg";
	img[i].className = "card";
	
	deck[i] = new card(img[i], v);
	
	i++;
	
	return deck;
}