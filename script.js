// Scene content for the seven-part narrative activity.
const scenes = [
    {id: 1,
     narrative: "I cried aloud, shaking my head all the while, until I felt the cold blades of the scissors against my neck, and heard them gnaw off one of my thick braids; they cut my hair and humiliated me, and in that anguish I knew I had lost my spirit.",
     source: "Zitkála-Šá, The School Days of an Indian Girl",
     tell: "Tell her she'll make many new friends.",
     hide: "Tell her she'll never go back home."},
    {id: 2,
     narrative: "I see the world being slowly transformed into a wilderness, I hear the approaching thunder that, one day, will destroy us too; yet I must lie here in the dark holding my breath every time heavy boots strike the cobblestones outside.",
     source: "Anne Frank, The Diary of a Young Girl",
     tell: "Tell her it's a game.",
     hide: "Tell her we are in danger."},
    {id: 3,
     narrative: "One day everybody is themselves, and the next day people are Muslim, Hindu, Sikh, or Christian, and the gutter in front of our garden runs red with blood while the smoke smells of roasted cumin and human flesh.",
     source: "Bapsi Sidhwa, Cracking India",
     tell: "Tell her we are going home.",
     hide: "Tell her why we had to leave home."},
    {id: 4,
     narrative: "The men on the motorcycles stopped at our doorway before sundown, and when the shots rang out in the alley, Father's pocket notebook was the only thing left lying open in the rain.",
     source: "Héctor Abad Faciolince, Oblivion: A Memoir",
     tell: "Tell her not to worry about what she saw.",
     hide: "Tell her what happened to the people she saw."},
    {id: 5,
     narrative: "War was like a shadow that entered our garden without making a sound; one day the radio told our neighbors to go to work, and the boy who used to climb our mango tree was carrying a machete instead of a football.",
     source: "Gaël Faye, Small Country",
     tell: "Don't tell her she can't play with them.",
     hide: "Tell her why they won't let her play with them."},
    {id: 6,
     narrative: "You learned that cratered bomb sites were not swimming holes, that the sky doesn't rain water but gray dust, and we slept in our shoes so we wouldn't lose seconds running when the roof caved in.",
     source: "Khaled Hosseini, Sea Prayer",
     tell: "Tell her not to come out even if she hears shouting.",
     hide: "Tell her why she must stay inside."},
    {id: 7,
     narrative: "We walked into the thorn forest with nothing but the dust on our skin; when hunger hollowed our bellies, Mother boiled wild leaves in a tin cup, blew out the lantern so we wouldn't see the dirt inside, and promised us we would eat tomorrow.",
     source: "Dave Eggers, What Is the What",
     tell: "Tell her we will eat again tomorrow.",
     hide: "Tell her we don't know when we'll eat again."},
    {id: 8,
     narrative: "Why do I have to eat the leftovers of the landlord? Why can't I have a whole fish to myself? Why? Why?",
     source: "Mahasweta Devi, The Why-Why Girl",
     tell: "Tell her to be grateful for what she gets.",
     hide: "Tell her she deserves an equal share, too."},
    {id: 9,
     narrative: "The Sundarbans has a thousand eyes, Neel. Some belong to animals, some to people, and some to the forest itself. You must learn to see them all.",
     source: "Mitali Perkins, Tiger Boy",
     tell: "Tell him to stay focused on what he already knows.",
     hide: "Encourage him to notice every life and perspective around him."},
    {id: 10,
     narrative: "He was a composite of all the children he had met, or dreamt of, or seen in the streets.",
     source: "Ruskin Bond, Children of India",
     tell: "Let her think every child has the same story.",
     hide: "Help her see the many different lives children lead."},
    {id: 11,
     narrative: "Swami: “Oh, what a monster!”\nMani: “Who?”\nSwami: “The teacher... he gave me zero for my sums.”\nMani: “Serves you right. Why did you do them?”",
     source: "R. K. Narayan, Malgudi Days (Swami and Friends)",
     tell: "Tell her the teacher is always right and she should not question him.",
     hide: "Let her question authority and share the child's point of view."}
];

let currentSceneIndex = 0;
let shieldScore = 0;
let exposeScore = 0;

const sceneView = document.getElementById("scene-view");
const summaryView = document.getElementById("summary-view");
const meter = document.getElementById("meter");
const progressFooter = document.getElementById("progress-footer");

// Render the current scene and refresh the progress display.
function showScene() {
    const scene = scenes[currentSceneIndex];

    document.getElementById("scene-number").textContent = scene.id;
    document.getElementById("scene-quote").textContent = `“${scene.narrative}”`;
    document.getElementById("scene-source").textContent = `— ${scene.source}`;
    document.getElementById("shield-description").textContent = `“${scene.tell}”`;
    document.getElementById("expose-description").textContent = `“${scene.hide}”`;
    document.getElementById("progress-label").textContent = `SCENE ${scene.id} / ${scenes.length}`;

    updateMeter();
    updateProgress();

    sceneView.classList.remove("hidden");
    summaryView.classList.add("hidden");
    meter.classList.remove("hidden");
    progressFooter.classList.remove("hidden");

    // Re-run the small entrance animation whenever a new scene is shown.
    sceneView.style.animation = "none";
    void sceneView.offsetWidth;
    sceneView.style.animation = "";
}

// Update scores, bar lengths, and the narrative stance label.
function updateMeter() {
    document.getElementById("shield-score").textContent = shieldScore;
    document.getElementById("expose-score").textContent = exposeScore;
    document.getElementById("shield-meter").style.width = `${(shieldScore / scenes.length) * 100}%`;
    document.getElementById("expose-meter").style.width = `${(exposeScore / scenes.length) * 100}%`;

    const stance = document.getElementById("stance");
    stance.classList.remove("balanced", "shield", "expose");

    if (shieldScore === exposeScore) {
        stance.textContent = "BALANCED";
        stance.classList.add("balanced");
    } else if (shieldScore > exposeScore) {
        stance.textContent = "PROTECTION & MYTH";
        stance.classList.add("shield");
    } else {
        stance.textContent = "EXPOSURE & TRUTH";
        stance.classList.add("expose");
    }
}

// Draw one progress dot per scene and highlight the current scene.
function updateProgress() {
    const progressDots = document.getElementById("progress-dots");
    progressDots.innerHTML = "";

    scenes.forEach((scene, index) => {
        const dot = document.createElement("span");
        dot.className = "progress-dot";
        dot.setAttribute("aria-label", `Scene ${scene.id}`);

        if (index < currentSceneIndex) {
            dot.classList.add("done");
        } else if (index === currentSceneIndex) {
            dot.classList.add("current");
        }

        progressDots.appendChild(dot);
    });
}

// Handle either of the two choices and advance to the next scene.
function handleChoice(choice) {
    if (choice === "shield") {
        shieldScore++;
    } else {
        exposeScore++;
    }

    if (currentSceneIndex < scenes.length - 1) {
        currentSceneIndex++;
        showScene();
    } else {
        showSummary();
    }
}

// Select the reflection that matches the balance of choices made.
function showSummary() {
    let title = "";
    let description = "";

    if (shieldScore === scenes.length) {
        title = "The Child of Absolute Shelter";
        description = "You shielded her completely from every trauma. She inherits a spotless, curated mythology—safe from immediate sorrow, yet unarmed for historical reality.";
    } else if (exposeScore === scenes.length) {
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
    document.getElementById("score-total").textContent = scenes.length;
    document.getElementById("expose-total").textContent = scenes.length;

    sceneView.classList.add("hidden");
    summaryView.classList.remove("hidden");
    meter.classList.add("hidden");
    progressFooter.classList.add("hidden");
}

// Reset the activity so it can be played again.
function restart() {
    currentSceneIndex = 0;
    shieldScore = 0;
    exposeScore = 0;
    showScene();
}

document.getElementById("shield-button").addEventListener("click", function () {
    handleChoice("shield");
});

document.getElementById("expose-button").addEventListener("click", function () {
    handleChoice("expose");
});

document.getElementById("restart-button").addEventListener("click", restart);
showScene();
