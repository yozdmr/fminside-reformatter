console.log("FMInside Modifier - Version 0.1.0");

var playerType = document.getElementById('');

var block = document.getElementById('player_stats');  // Get div with attributes
var columns = block.getElementsByClassName('column');  // Get columns of table containing attributes
var result = {};  // To store the attributes
var id_name = {};

console.log("Getting attributes...")
for (var i = 0; i < columns.length; i++) {  // Loop through columns
    var column = columns[i];  // Get individual column based on i
    var stats = column.getElementsByTagName('tr');  // Get table rows from column

    for (var j = 0; j < stats.length; j++) {  // Loop through rows
        var stat = stats[j];  // Get individual row based on j
        var name = stat.getElementsByClassName('name')[0].innerText;  // Get name
        var id = name.replaceAll(" ", "-").toLowerCase().replace("(", "").replace(")", "");  // Convert name to id format
        var value = Number(stat.getElementsByClassName('stat')[0].innerText) / 5;  // Get value, convert it into fm scale
        value = value.toFixed(0);  // Round it to the nearest value in case it is not dividible by 5
        result[id] = value;  // Add value to dictionary with id as key
        id_name[id] = name
    }
}

console.log(result);
console.log(id_name);
console.log("Done.");

// Creates a row in the correct format
function createRow(id, title, value) {
    return `
    <tr id="${id}">
        <td class="name"><acronym title="${title}">${id_name[id]}</acronym></td>
        <td class="stat value_${value}">${value}</td>
    </tr>
    `;
}

function generateAttributeRows(attributeDict) {
    return Object.keys(attributeDict).map(id => createRow(id, attributeDict[id], result[id] || '0')).join('');
}


const technicalAttributes = {
    'corners': 'How well a player is at taking corners',
    'crossing': 'How accurately a player is able to cross the ball from the wide areas on the pitch',
    'dribbling': 'How well a player can run with the ball in his feet',
    'finishing': 'How well a player can shoot the ball at the target area of the goal',
    'first-touch': 'How well a goalkeeper is able to control a ball when he receives it and then set it up for his next action',
    'free-kick-taking': 'How accurate a player can take a free kick either directly, indirectly or into the goal',
    'heading': 'How well a player can head the ball and how well he can head the ball into his intended area',
    'long-shots': 'How well a player can shoot at goal from outside the penalty area or longer distances',
    'long-throws': 'How well and how far a player can throw the ball when taking a throw-in',
    'marking': 'How well a player is able to cover an opponent to make him a less viable option to pass the ball to',
    'passing': 'How accurately a goalkeeper can pass the ball',
    'penalty-taking': 'How well and how accurately a player can take a penalty',
    'tackling': 'How well a player can win the ball from an opponent without committing a foul',
    'technique': 'How good a players basic technique is. The higher this attribute, the better the player is at controlling the ball after a pass or keep the ball when making a dribble. But, this area also includes the quality of passing, long passes, shooting, volley’s and traits'
};

const mentalAttributes = {
    'aggression': 'How likely a player will choose to get involved in a physical situation',
    'anticipation': 'How well a player can predict movements of his teammates and his opponents',
    'bravery': 'Determines if a player is willing to perform an action that risks pain or even an injury',
    'composure': 'The extent to which a player is not affected by mental pressure when he has to make a decision or make an action',
    'concentration': 'How well a player is able to keep his focus during a game or training',
    'decisions': 'How well and how quickly a player can evaluate the available options and then choose which action he will perform',
    'determination': 'How well and how good a player will try to succeed in his actions during a game and training in mentally exhausting situations',
    'flair': 'The ability to do the unexpected when he is on the ball',
    'leadership': 'How well a player can inspire and motivate his teammates',
    'off-the-ball': 'How well a player moves around the pitch without having the ball',
    'positioning': 'How well a player is able to position himself in defensive situations if your opponent has the ball',
    'teamwork': 'How well a player is able to follow tactical and team instructions',
    'vision': 'How well a player is able to see available options to him when he has the ball',
    'work-rate': 'How much effort a player will put into a match or a training'
};

const physicalAttributes = {
    'acceleration': 'How quickly a player can reach his maximum speed while starting to run',
    'agility': 'How agile a player is, meaning how well he can start, stop and turn',
    'balance': 'How well a player can stay on his feet while he is put under physical pressure',
    'jumping-reach': 'How high a player’s head can reach while jumping',
    'natural-fitness': 'How well a player recovers when injured or not training and when recovering between matches',
    'pace': 'How fast a player can run when he is at his maximum speed',
    'stamina': 'How well a player can retain his fitness while exerting during a match or team training',
    'strength': 'How well a player is able to exert physical force on an opposition player'
};

const goalkeepingAttributes = {
    'aerial-reach': 'How high a goalkeeper can reach when jumping for the ball',
    'command-of-area': 'How likely a goalkeeper will attempt to claim high balls played into the box',
    'communication': 'How well a goalkeeper is able to communicate with his defenders and organise the defence',
    'eccentricity': 'How likely a goalkeeper will perform risky actions or do the unexpected',
    'first-touch': 'How well a goalkeeper is able to control a ball when he receives it and then set it up for his next action',
    'handling': 'How well a goalkeeper can hold the ball when he is attempting to catch it',
    'kicking': 'How well and how far a goalkeeper is able to kick the ball',
    'one-on-ones': 'How well a goalkeeper is able to deal with a one-on-one situation against an opponent',
    'passing': 'How accurately a goalkeeper can pass the ball',
    'punching-tendency': 'How likely it is a goalkeeper will decide to punch the ball rather than catching it',
    'reflexes': 'How quick a goalkeeper can react. This will help him save shots from close range',
    'rushing-out-tendency': 'How likely it is a goalkeeper will rush out from his line to catch a forward or loose ball behind the defense',
    'throwing': 'How accurately a goalkeeper can throw a ball to a fellow teammate'
};



console.log("Rewriting tables...")
// HTML code in the style that I want
var newHTML = `
    <h1>Attributes</h1>
    <div class="column"><h3>${'eccentricity' in result ? 'Goalkeeping' : 'Technical'}</h3><table border="0" cellpadding="0" cellspacing="0">
    <tbody>
    ${'eccentricity' in result ? generateAttributeRows(goalkeepingAttributes) : generateAttributeRows(technicalAttributes)}
    </tbody></table></div>
    <div class="column"><h3>Mental</h3><table border="0" cellpadding="0" cellspacing="0">
    <tbody>
    ${generateAttributeRows(mentalAttributes)}
    </tbody></table></div>
    <div class="column"><h3>Physical</h3><table border="0" cellpadding="0" cellspacing="0">
    <tbody>
    ${generateAttributeRows(physicalAttributes)}
    </tbody></table></div>
`;

// Rewrite HTML inside the block containing attributes with the new HTML
block.innerHTML = newHTML;
console.log("Done.")