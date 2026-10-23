const scenes = [
    {id: 1,
     narrative: "I cried aloud, shaking my head all the while, until I felt the cold blades of the scissors against my neck, and heard them gnaw off one of my thick braids; they cut my hair and humiliated me, and in that anguish I knew I had lost my spirit.",
     source: "Zitkála-Šá, The School Days of an Indian Girl",
     expose: "Tell her she'll make many new friends.",
     shield: "Tell her she'll never go back home."},
    {id: 2,
     narrative: "I see the world being slowly transformed into a wilderness, I hear the approaching thunder that, one day, will destroy us too; yet I must lie here in the dark holding my breath every time heavy boots strike the cobblestones outside.",
     source: "Anne Frank, The Diary of a Young Girl",
     expose: "Tell her it's a game.",
     shield: "Tell her we are in danger."},
    {id: 3,
     narrative: "One day everybody is themselves, and the next day people are Muslim, Hindu, Sikh, or Christian, and the gutter in front of our garden runs red with blood while the smoke smells of roasted cumin and human flesh.",
     source: "Bapsi Sidhwa, Cracking India",
     expose: "Tell her we are going home.",
     shield: "Tell her why we had to leave home."},
    {id: 4,
     narrative: "The men on the motorcycles stopped at our doorway before sundown, and when the shots rang out in the alley, Father's pocket notebook was the only thing left lying open in the rain.",
     source: "Héctor Abad Faciolince, Oblivion: A Memoir",
     expose: "Tell her not to worry about what she saw.",
     shield: "Tell her what happened to the people she saw."},
    {id: 5,
     narrative: "War was like a shadow that entered our garden without making a sound; one day the radio told our neighbors to go to work, and the boy who used to climb our mango tree was carrying a machete instead of a football.",
     source: "Gaël Faye, Small Country",
     expose: "Don't tell her she can't play with them.",
     shield: "Tell her why they won't let her play with them."},
    {id: 6,
     narrative: "You learned that cratered bomb sites were not swimming holes, that the sky doesn't rain water but gray dust, and we slept in our shoes so we wouldn't lose seconds running when the roof caved in.",
     source: "Khaled Hosseini, Sea Prayer",
     expose: "Tell her not to come out even if she hears shouting.",
     shield: "Tell her why she must stay inside."},
    {id: 7,
     narrative: "We walked into the thorn forest with nothing but the dust on our skin; when hunger hollowed our bellies, Mother boiled wild leaves in a tin cup, blew out the lantern so we wouldn't see the dirt inside, and promised us we would eat tomorrow.",
     source: "Dave Eggers, What Is the What",
     expose: "Tell her we will eat again tomorrow.",
     shield: "Tell her we don't know when we'll eat again."},
    {id: 8,
     narrative: "Why do I have to eat the leftovers of the landlord? Why can't I have a whole fish to myself? Why? Why?",
     source: "Mahasweta Devi, The Why-Why Girl",
     expose: "Tell her to be grateful for what she gets.",
     shield: "Tell her she deserves an equal share, too."},
    {id: 9,
     narrative: "The Sundarbans has a thousand eyes, Neel. Some belong to animals, some to people, and some to the forest itself. You must learn to see them all.",
     source: "Mitali Perkins, Tiger Boy",
     expose: "Tell him to stay focused on what he already knows.",
     shield: "Encourage him to notice every life and perspective around him."},
    {id: 10,
     narrative: "He was a composite of all the children he had met, or dreamt of, or seen in the streets.",
     source: "Ruskin Bond, Children of India",
     expose: "Let her think every child has the same story.",
     shield: "Help her see the many different lives children lead."},
    {id: 11,
     narrative: "Swami: “Oh, what a monster!”\nMani: “Who?”\nSwami: “The teacher... he gave me zero for my sums.”\nMani: “Serves you right. Why did you do them?”",
     source: "R. K. Narayan, Malgudi Days (Swami and Friends)",
     expose: "Tell her the teacher is always right and she should not question him.",
     shield: "Let her question authority and share the child's point of view."}
];

let sceneIndex = 0;
let shieldScore = 0;
let exposeScore = 0;

document.getElementById("start-button").addEventListener("click", function () {
    document.body.classList.add("journey-started");
    document.getElementById("landing").classList.add("hidden");
    showScene();
});

function showScene() {
    const scene = scenes[sceneIndex];

    document.getElementById("scene-number").textContent = sceneIndex + 1;
    document.getElementById("narrative").textContent = "“" + scene.narrative + "”";
    document.getElementById("source").textContent = "— " + scene.source;
    document.getElementById("shield-description").textContent = "“" + scene.shield + "”";
    document.getElementById("expose-description").textContent = "“" + scene.expose + "”";
    document.getElementById("progress-label").textContent = "SCENE " + (sceneIndex + 1) + " / 7";
    document.getElementById("shield-score").textContent = shieldScore;
    document.getElementById("expose-score").textContent = exposeScore;
    document.getElementById("shield-meter").style.width = shieldScore / 7 * 100 + "%";
    document.getElementById("expose-meter").style.width = exposeScore / 7 * 100 + "%";

    const stance = document.getElementById("stance");
    if (shieldScore === exposeScore) {
        stance.textContent = "BALANCED";
        stance.style.color = "#ddd";
    } else if (shieldScore > exposeScore) {
        stance.textContent = "PROTECTION & MYTH";
        stance.style.color = "#fbbf24";
    } else {
        stance.textContent = "EXPOSURE & TRUTH";
        stance.style.color = "#00b9ef";
    }

    const dots = document.getElementById("progress-dots");
    dots.innerHTML = "";
    for (let i = 0; i < scenes.length; i++) {
        const dot = document.createElement("span");
        dot.className = "dot";
        if (i < sceneIndex) dot.classList.add("done");
        if (i === sceneIndex) dot.classList.add("current");
        dots.appendChild(dot);
    }

    document.getElementById("scene").classList.remove("hidden");
    document.getElementById("summary").classList.add("hidden");
    document.getElementById("meter").classList.remove("hidden");
    document.getElementById("footer").classList.remove("hidden");
}

function choose(choice) {
    if (choice === "shield") shieldScore++;
    else exposeScore++;

    if (sceneIndex < scenes.length - 1) {
        sceneIndex++;
        showScene();
    } else {
        showSummary();
    }
}

function showSummary() {
    let title;
    let description;

    if (shieldScore === 7) {
        title = "The Child of Absolute Shelter";
        description = "You shielded her completely from every trauma. She inherits a spotless, curated mythology—safe from immediate sorrow, yet unarmed for historical reality.";
    } else if (exposeScore === 7) {
        title = "The Child of Total Truth";
        description = "You withheld nothing. She inherits the unvarnished weight of genocide, war, and displacement—burdened with adult grief before childhood could take root.";
    } else if (shieldScore > exposeScore) {
        title = "The Child of Defensive Memory";
        description = "You prioritized immediate comfort and protective myths. She learns that the world beyond home is fraught, inheriting defense before reconciliation.";
    } else if (exposeScore > shieldScore) {
        title = "The Child of Confrontational Reality";
        description = "You leaned toward unvarnished reality. She perceives the difficult truths of history early, bearing heavy witness to human conflict.";
    } else {
        title = "The Child of Fractured Realities";
        description = "You navigated between shielding and exposure in equal measure. She inherits a divided world where truth and sanctuary constantly contest one another.";
    }

    document.getElementById("summary-title").textContent = title;
    document.getElementById("summary-description").textContent = description;
    document.getElementById("final-shield").textContent = shieldScore;
    document.getElementById("final-expose").textContent = exposeScore;
    document.getElementById("scene").classList.add("hidden");
    document.getElementById("summary").classList.remove("hidden");
    document.getElementById("meter").classList.add("hidden");
    document.getElementById("footer").classList.add("hidden");
}

function restart() {
    sceneIndex = 0;
    shieldScore = 0;
    exposeScore = 0;
    showScene();
}

document.getElementById("shield-button").addEventListener("click", function () {
    choose("shield");
});
document.getElementById("expose-button").addEventListener("click", function () {
    choose("expose");
});
document.getElementById("restart-button").addEventListener("click", restart);

showScene();
