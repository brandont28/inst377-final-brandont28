//Fetch Weapons
function getWeapons () {
    fetch(`https://valorant-api.com/v1/weapons/{weaponUuid}`)
    .then((resp) => resp.json())
    .then((data) => {
    });
}


//Fetch Competitive Ranks API
function getRanks () {
    fetch(`https://valorant-api.com/v1/competitivetiers`)
    .then((resp) => resp.json())
    .then((data) => {
        const tiers = data.data[data.data.length - 1].tiers;
        const tierNames = tiers.slice(3);
        const ranks = document.getElementById('ranks');

        tierNames.forEach(tier => {
            const div = document.createElement('div');
            const rankName = tier.tierName;
            const img = document.createElement('img');
            const rankIcon = tier.smallIcon;
            console.log(tier.smallIcon);

            img.src = rankIcon;

            const text = document.createElement('span');
            text.textContent = rankName;


            div.appendChild(img);
            div.appendChild(text);

            ranks.appendChild(div);

        });
    });
}


window.onload = function(){
    getRanks();
}