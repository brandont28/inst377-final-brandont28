//Fetches Agents
function getAgents () {
    fetch(`https://valorant-api.com/v1/agents`)
        .then((resp) => resp.json())
        .then((data) => {
            const agents = data.data;
            //Removes duplicate Sova agent as recommended by API
            const filteredAgents = agents.filter(agent => agent.isPlayableCharacter);
            const agentSlides = document.getElementById('agentSlides');
            console.log(filteredAgents);

            filteredAgents.forEach(agent => {
                const div = document.createElement("div");
                const img = document.createElement("img");
                const name = document.createElement("h2");
                name.textContent = agent.displayName;
                img.src = agent.fullPortraitV2;
                div.appendChild(name);
                div.appendChild(img);
                agentSlides.appendChild(div);
            });

            const slider = simpleslider.getSlider( {
                container: agentSlides,
                delay: 4
            });

            document.getElementById('previousAgent').addEventListener('click', () => {
                slider.prev();
            });

            document.getElementById('nextAgent').addEventListener('click', () => {
                slider.next();
            });
        });
}

//Fetches Maps
function getMaps () {
    fetch(`https://valorant-api.com/v1/maps`)
        .then((resp) => resp.json())
        .then((data) => {
            const maps = data.data;
            //Filters out maps that are unused in traditional gameplay (A/B or A/B/C bomb site maps only)
            const filteredMaps = maps.filter(map => map.tacticalDescription);
            const mapSlides = document.getElementById('mapSlides');
            console.log(filteredMaps);

            filteredMaps.forEach(map => {
                const div = document.createElement("div");
                const img = document.createElement("img");
                const name = document.createElement("h2");
                name.textContent = map.displayName;
                img.src = map.splash;
                div.appendChild(name);
                div.appendChild(img);
                mapSlides.appendChild(div);
            });

            const slider = simpleslider.getSlider({
                container: mapSlides,
                delay: 6
            });

            document.getElementById('previousMap').addEventListener('click', () => {
                slider.prev();
            });

            document.getElementById('nextMap').addEventListener('click', () => {
                slider.next();
            });
        });
}

//Fetch Weapons
function getTopWeapons () {
    fetch(`https://valorant-api.com/v1/weapons`)
    .then((resp) => resp.json())
    .then((data) => {
        const vandal = "9c82e19d-4575-0200-1a81-3eacf00cf872";
        const phantom = "ee8e8d15-496b-07ac-e5f6-8fae5d4c7b1a";
        const operator = "a03b24d3-4319-996d-0f8c-94bbfba1dfc7";
        const weaponsList = document.getElementById('weapons');

        //Only selects these 3 weapons as they are the most known/used
        const top3Weapons = data.data.filter(weapon =>
        [vandal, phantom, operator].includes(weapon.uuid)
        );

        top3Weapons.forEach(weapon => {
            const div = document.createElement("div");
            const img = document.createElement("img");
            img.src = weapon.displayIcon;
            const name = document.createElement("span");

            name.textContent = weapon.displayName;
            div.appendChild(img);
            div.appendChild(name);
            weaponsList.appendChild(div);

        })
    });
}

//Fetch Competitive Ranks API
function getRanks () {
    fetch(`https://valorant-api.com/v1/competitivetiers`)
    .then((resp) => resp.json())
    .then((data) => {
        //Removes first 3 as they are non-ranks
        const tiers = data.data[data.data.length - 1].tiers;
        const tierNames = tiers.slice(3);
        const ranks = document.getElementById('ranks');

        //Creates elements to display rank names and their icons
        tierNames.forEach(tier => {
            const div = document.createElement('div');
            const rankName = tier.tierName;
            const img = document.createElement('img');
            const rankIcon = tier.smallIcon;

            img.src = rankIcon;

            const text = document.createElement('span');
            text.textContent = rankName;

            //Appends to sidebar
            div.appendChild(img);
            div.appendChild(text);
            ranks.appendChild(div);
        });
    });
}


window.onload = function(){
    getAgents();
    getMaps();
    getTopWeapons();
    getRanks();
}