// TODO list
//
// Design (2 hours)
// - landing page                         (30 minutes)

// Development (2 hours)
// - mobile support                       (30 minutes)

// Others
// - put online                           (30 minutes)

/*

8. Toshl                                (30 minutes)
9. Go through pictures                  (30 minutes)
10. Send some pictures                  (15 minutes)

*/

maxImplemented = 18

document.addEventListener("keydown", onkeydown);

window.onload = function ()
{
    var queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);

    lang           = urlParams.get("hl") || localStorage.getItem('lang') || "en";
    episodeOverall = urlParams.get("ep") || parseInt(localStorage.getItem('episode'), 10) || 0;
    spoilerLevel   = urlParams.get("sp") || parseInt(localStorage.getItem('spoiler'), 10) || 0;

    if (lang !== "fr" && lang !== "en")
        lang = "en";

    if (episodeOverall < 0)
        episodeOverall = 0;
    if (episodeOverall > 26)
        episodeOverall = 26;

    if (spoilerLevel < 0)
        spoilerLevel = 0;
    if (spoilerLevel > 26)
        spoilerLevel = 26;

    redrawPage();
}

job =
    {charlotte: {en: "(police officer)",
                 fr: "(policière)"},
     peter: {en: "(psychologist)",
             fr: "(psychologue)"},
     katharina: {en: "(school rector)",
                 fr: "(directrice d’école)"},
     ulrich: {en: "(police officer)",
              fr: "(policier)"},
     hannah: {en: "(massage therapist)",
              fr: "(masseuse)"},
     regina: {en: "(hotel owner)",
              fr: "(propriétaire d’hôtel)"},
     aleksander: {en: "(nuclear plant director)",
                  fr: "(directeur de la centrale)"},
     bernd: {en: "(old director of the nuclear plant)",
             fr: "(ancien directeur de la centrale)"},
     ines: {en: "(nurse)",
            fr: "(infirmière)"},
     claudia: {en: "(new director of the nuclear plant)",
               fr: "(nouvelle directrice de la centrale)"},
     egon: {en: "(police officer)",
            fr: "(policier)"},
     helge: {en: "(guard at the nuclear plant)",
             fr: "(garde à la centrale)"}}

stranger = {en: "The stranger", fr: "L’étranger"}
missing = {en: "missing", fr: "disparu"}
dead = {en: "dead", fr: "mort"}
deadF = {en: "dead", fr: "morte"}
inn = {en: "in", fr: "en"}
familyTree = {en: "Dark Family Tree",
              fr: "Arbre généalogique de Dark"}
seasonTxt = {en: "Season", fr: "Saison"}
episodeTxt = {en: "Episode", fr: "épisode"}

copyrightNetflix =  {en: "Images and characters by", fr: "Images et personnages par"}
copyrightMe = {en: "Design of this page by", fr: "Conception de cette page par"}

showSpoilersFor = {en: "Show spoilers for", fr: "Afficher les spoilers pour"}
thisEpisode = {en: {true: "this episode?", false: "this episode and those before?"},
               fr: {true: "cet épisode?", false: "cet épisode et les précédents?"}}

hideSpoilers = {en: "hide spoilers", fr: "cacher les spoilers"}

bgColor = [, "#0F2024", "#23250E", "#261C0D"];

titleText =
    {en:
     ["Welcome to my spoiler-free guide to the characters of the series Dark.",
      "You can navigate through the different episodes with the left/right arrow keys",
      "(or swipe on mobile) and unlock the spoilers for the episodes you have watched.",
      " ",
      "If you encounter some technical issue, or you believe that some spoiler appears",
      "too early or too late, or any other issue, let me know."],
     fr:
     ["Bienvenue sur mon guide sans spoilers des charactères de la série Dark.",
      "Vous pouvez naviguer d’un épisode à l’autre avec les touches droite et gauche",
      "du clavier (ou en faisant glisser le doigt sur le côté sur mobile) et débloquer",
      "les spoilers des épisodes que vous avez regardés.",
      " ",
      "Si vous rencontrez un problème technique, ou si vous pensez qu’un spoiler",
      "apparaît trop tôt ou trop tard, ou n’importe quel autre problème, contactez-moi."]}

window.onresize = redrawPage;

function redrawPage()
{
    var season = 1;
    var episode = episodeOverall;
    if (episodeOverall > 18) {
        season = 3;
        episode = episodeOverall - 18;
    } else if (episodeOverall > 10) {
        season = 2;
        episode = episodeOverall - 10;
    };

    document.title = familyTree[lang];
    document.body.setAttribute("style", `background-color:${bgColor[season]}`);

    loadEpisode(episodeOverall <= spoilerLevel ? episodeOverall : (spoilerLevel || 1));
    initSVG(season, episode);
    computePositions();

    spoilerPage(season, episode);

    generateSVG();
}

function spoilerPage(season, episode)
{
}

function showSpoiler()
{
    spoilerLevel = episodeOverall;
    localStorage.setItem('spoiler', spoilerLevel);
    redrawPage();
}

function hideSpoiler()
{
    spoilerLevel = episodeOverall - 1;
    localStorage.setItem('spoiler', spoilerLevel);
    redrawPage();
}

function onkeydown(e)
{
    if (e.key === "ArrowRight") {
        e.preventDefault();
        if (episodeOverall < 26)
            episodeOverall++;
        localStorage.setItem('episode', episodeOverall);
        redrawPage();
    } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        if (episodeOverall >= 1)
            episodeOverall--;
        localStorage.setItem('episode', episodeOverall);
        redrawPage();
    }
}

// Generates all the data of the corresponding episode
function loadEpisode(ep)
{
    data = {};


    if (ep <= 0)
        return;
    /* Season 1, episode 1 */

    addCharacter("franziska", ["Franziska Doppler"], "Franziska.jpg", {ax: 2.5, ay: 7});
    addCharacter("charlotte", ["Charlotte Doppler", job.charlotte[lang]], "Charlotte.png", {ax: 1.5, ay: 4});
    addCharacter("peter", ["Peter Doppler", job.peter[lang]], "Peter.jpg", {ax: 3.5, ay: 4});
    addCharacter("helge", ["Helge Doppler"], "Helge.jpg", {ax: 2.5, ay: 2});

    addRelation("charlotte", "peter");
    addChild("charlottepeter", "franziska");

    addCharacter("magnus", ["Magnus Nielsen"], "Magnus.jpg", {ax: 5.25, ay: 7});
    addCharacter("martha", ["Martha Nielsen"], "Martha.jpg", {ax: 6.75, ay: 7});
    addCharacter("mikkel", ["Mikkel Nielsen"], "Mikkel.png", {ax: 8.25, ay: 7});
    addCharacter("katharina", ["Katharina Nielsen", job.katharina[lang]], "Katharina.png", {ax: 5.5, ay: 4});
    addCharacter("ulrich", ["Ulrich Nielsen", job.ulrich[lang]], "Ulrich.jpg", {ax: 8, ay: 4});

    addRelation("ulrich", "katharina");
    addChild("ulrichkatharina", "magnus");
    addChild("ulrichkatharina", "martha");
    addChild("ulrichkatharina", "mikkel");

    addCharacter("mads", ["Mads Nielsen"], {year: 1986, image: "Mads.png"}, {ax: 10, ay: 4});
    addCharacter("jana", ["Jana Nielsen"], "Jana.jpg", {ax: 9, ay: 2});

    addChild("jana", "ulrich");
    addChild("jana", "mads");


    addRelation("ulrich", "hannah", {z: 30, dx1: 20, dx2: 20, marriage: "relationship"});

    addCharacter("bartosz", ["Bartosz Tiedemann"], "Bartosz.png", {ax: 18.5, ay: 7});
    addCharacter("regina", ["Regina Tiedemann", job.regina[lang]], "Regina.jpg", {ax: 18.5, ay: 4});

    addChild("regina", "bartosz");
    addRelation("martha", "bartosz", {z: 20, dx1: 10, marriage: "relationship"});

    addCharacter("jonas", ["Jonas Kahnwald"], "Jonas.jpg", {ax: 13, ay: 7});
    addCharacter("michael", ["Michael Kahnwald"], "Michael.jpg", {ax: 12, ay: 4});
    addCharacter("hannah", ["Hannah Kahnwald", job.hannah[lang]], "Hannah.jpg", {ax: 14, ay: 4});
    addCharacter("ines", ["Ines Kahnwald"], "Ines.jpg", {ax: 12, ay: 2});

    addRelation("michael", "hannah");
    addChild("michaelhannah", "jonas");

    addRelation("martha", "jonas", {z: 40, dx1: -10, marriage: "broke up"});

    addChild("ines", "michael");

    data.mikkel.images[0].comment = missing[lang];
    data.mads.images[0].comment = missing[lang];
    data.michael.images[0].comment = dead[lang];


    if (ep <= 1)
        return;
    /* Season 1, episode 2 */

    addCharacter("tronte", ["Tronte Nielsen"], "Tronte.jpg", {ax: 10, ay: 2});
    data.jana.ax = 7.5;

    delete data.janaulrich;
    delete data.janamads;

    addRelation("jana", "tronte");
    addChild("janatronte", "ulrich");
    addChild("janatronte", "mads");

    addCharacter("stranger", [stranger[lang]], "TheStranger.jpg", {ax: 20.25, ay: 6.25});

    addCharacter("aleksander", ["Aleksander Tiedemann", job.aleksander[lang]], "Aleksander.png", {ax: 20, ay: 4});
    data.regina.ax -= 1.5;

    delete data.reginabartosz;
    addRelation("regina", "aleksander");
    addChild("reginaaleksander", "bartosz");

    data.mikkel.images[0].comment = inn[lang] + " 1986";

    addPhotoBefore("ulrich", "UlrichYoung.jpg");
    addPhotoBefore("katharina", "KatharinaYoung.jpg");


    if (ep <= 2)
        return;
    /* Season 1, episode 3 */

    addPhotoBefore("charlotte", "CharlotteYoung.jpg");
    addPhotoBefore("helge", "HelgeAdult.jpg");
    addCharacter("bernd", ["Bernd Doppler", job.bernd[lang]], {year: 1986, image: "Bernd.png"}, {ax: 2.5, ay: 0});

    addPhotoBefore("jana", "JanaAdult.jpg");
    addPhotoBefore("tronte", "TronteAdult.jpg");

    data.ines.ax += 0.5;
    data.ines.names[1] = job.ines[lang];
    addPhotoBefore("ines", "InesYoung.jpg");
    addPhotoBefore("hannah", "HannahYoung.jpg");

    addPhotoBefore("regina", "ReginaYoung.png");
    addCharacter("claudia", ["Claudia Tiedemann", job.claudia[lang]], {year: 1986, image: "Claudia.png"}, {ax: 17, ay: 2});

    addChild("claudia", "regina");
    addCharacter("egon", ["Egon Tiedemann", job.egon[lang]], {year: 1986, image: "Egon.png"}, {ax: 17, ay: 0});


    if (ep <= 3)
        return;
    /* Season 1, episode 4 */

    addCharacter("elisabeth", ["Elisabeth Doppler"], "Elisabeth.jpg", {ax: 1.5, ay: 7});
    data.charlotte.children = ["franziska", "elisabeth"];
    data.peter.children = ["franziska", "elisabeth"];
    data.franziska.ax += 1;
    addChild("charlottepeter", "elisabeth");

    addChild("helge", "peter");

    addRelation("magnus", "franziska", {marriage: "relationship"});


    if (ep <= 4)
        return;
    /* Season 1, episode 5 */

    addCharacter("noah", ["Noah"], "Noah.jpg", {ax: 15.5, ay: 6.25});

    data.ulrichhannah.marriage = "broke up";
    data.ulrichhannah.z = 20;
    data.ulrichhannah.dx1 = 20;
    data.ulrichhannah.dx2 = -20;
    // delete data.ulrichhannah;

    delete data.michael;
    delete data.inesmichael;
    delete data.michaelhannah;
    delete data.michaelhannahjonas;

    addPhotoAfter("mikkel", {year: 2019, image: "Michael.jpg"});
    data.mikkel.names = ["Mikkel Nielsen", "Michael Kahnwald"];
    data.mikkel.ay -= 0.80;
    data.mikkel.ax += 2.75;
    data.mikkel.images[1].comment = dead[lang];
    data.mikkel.images[0].year = 1986;

    data.jonas.ax = 12.5;
    data.jonas.ay += 1.20;
    data.marthajonas.z = 20;
    data.martha.ax += 1;

    addRelation("mikkel", "hannah");
    addChild("mikkelhannah", "jonas");
    addChild("ines", "mikkel", {dy: 240, dx: 10});
    data.ulrichkatharinamikkel.dx = -10;


    if (ep <= 5)
        return;
    /* Season 1, episode 6 */

    data.mads.images[0].comment = dead[lang];
    data.jonas.images[0].comment = inn[lang] + " 1986";

    addRelation("tronte", "claudia", {dx1: 20, dx2: -20, marriage: "broke up"});


    if (ep <= 6)
        return;
    /* Season 1, episode 7 */

    data.helge.names[1] = job.helge[lang];
    addPhotoBefore("helge", {year: 1953, image: "HelgeYoung.jpg"});

    delete data.jonas.images[0].comment;


    if (ep <= 7)
        return;
    /* Season 1, episode 8 */

    addCharacter("greta", ["Greta Doppler"], {year: 1953, image: "Greta.jpg"}, {ax: 1, ay: 0});
    addPhotoBefore("bernd", {year: 1953, image: "Bernd.jpg"});
    data.bernd.ax += 1.5;
    addRelation("greta", "bernd");
    addChild("gretabernd", "helge");

    addCharacter("agnes", ["Agnes Nielsen"], {year: 1953, image: "Agnes.jpg"}, {ax: 10, ay: 0});
    addChild("agnes", "tronte");
    addPhotoBefore("tronte", {year: 1953, image: "TronteYoung.jpg"});
    data.jana.ax -= 0.5;
    data.ines.ax += 0.5;

    addPhotoBefore("egon", {year: 1953, image: "Egon.jpg"});
    addPhotoBefore("claudia", {year: 1953, image: "ClaudiaYoung.png"});
    addCharacter("doris", ["Doris Tiedemann"], {year: 1953, image: "Doris.png"}, {ax: 16, ay: 0});
    addRelation("doris", "egon");
    addChild("dorisegon", "claudia");
    data.egon.ax += 1;

    addCharacter("tannhaus", ["H.G. Tannhaus"], {year: 1986, image: "HGTannhaus.jpg"}, {ax: 13.5, ay: 0});
    addPhotoBefore("tannhaus", {year: 1953, image: "HGTannhausAdult.png"});

    data.ulrich.images[1].comment = inn[lang] + " 1953";

    data.inesmikkel.dx1 = -30;


    if (ep <= 8)
        return;
    /* Season 1, episode 9 */

    addPhotoBefore("aleksander", {year: 1986, image: "AleksanderYoung.jpg"});
    data.aleksander.names[0] = "Boris Niewald";
    data.aleksander.names[2] = data.aleksander.names[1];
    data.aleksander.names[1] = "Aleksander Tiedemann (Köhler)";

    addPhotoAfter("claudia", {year: 2019, image: "ClaudiaOld.jpg"});


    if (ep <= 9)
        return;
    /* Season 1, episode 10 */

    data.helge.images[2].comment = dead[lang];
    data.jonas.images[0].comment = inn[lang] + " 2052";
    addPhotoAfter("jonas", {year: 2019, image: "TheStranger.jpg"});
    delete data.stranger;


    if (ep <= 10)
        return;
    /* Season 2, episode 1 */

    data.marthabartosz.marriage = "broke up";

    addPhotoBefore("noah", {year: 1920, image: "NoahYoung.jpg"});
    data.noah.images[1].year = 1953;

    addCharacter("adam", ["Adam"], {year: 1920, image: "Adam.jpg"}, {ax: 20.25, ay: 1});

    addPhotoAfter("elisabeth", {year: 2052, image: "ElisabethAdult.jpg"});

    data.greta.names[0] = "Greta Doppler";
    data.doris.names[0] = "Doris Tiedemann";

    data.ulrich.images[1].comment = inn[lang] + " 1954";
    data.mikkel.images[0].comment = inn[lang] + " 1987";
    data.jonas.images[0].comment = inn[lang] + " 2053";

    // TODO: new picture Regina
    data.regina.images[1].image = "Regina2.jpg";


    if (ep <= 11)
        return;
    /* Season 2, episode 2 */

    data.tronteclaudia.dx1 = 120;

    addPhotoAfter("ulrich", {year: 1986, image: "UlrichOld.jpg"});
    data.ulrich.images[2].comment = inn[lang] + " 1987";
    data.ulrich.images[1].year = 1953;
    data.ulrich.ax += 0.5;
    data.mads.ax += 1;

    data.regina.images[0].image = "ReginaYoung2.png";


    if (ep <= 12)
        return;
    /* Season 2, episode 3 */

    addRelation("doris", "agnes", {dx1: -20, dx2: 20, marriage: "relationship"});

    data.noah.ay = 0;
    data.noah.ax = 7.25;
    addSiblings("agnes", "noah");

    data.claudia.images[2].comment = deadF[lang];


    if (ep <= 13)
        return;
    /* Season 2, episode 4 */

    data.jonas.images[0].comment = inn[lang] + " 1921";

    addPhotoBefore("agnes", {year: 1920, image: "AgnesYoung.png"});

    delete data.adam;
    addPhotoAfter("jonas", {year: 1920, image: "Adam.jpg"});
    data.jonas.names[1] = "Adam";


    if (ep <= 14)
        return;
    /* Season 2, episode 5 */

    addChild("noah", "charlotte", {dy: 230, showFirst: true});


    if (ep <= 15)
        return;
    /* Season 2, episode 6 */

    data.jonas.images[0].comment = "";

    addPhotoAfter("magnus", {year: 1920, image: "MagnusAdult.jpg"});
    addPhotoAfter("franziska", {year: 1920, image: "FranziskaAdult.jpg"});

    data.franziska.ax += 0.5;
    data.magnus.ax += 1.25;
    data.martha.ax += 1;


    if (ep <= 16)
        return;
    /* Season 2, episode 7 */

    data.hannah.images[1].comment = inn[lang] + " 1954";
    data.hannah.images[1].year = 1953;
    data.egon.images[1].comment = dead[lang];


    if (ep <= 17)
        return;
    /* Season 2, episode 8 */

    addRelation("noah", "elisabeth", {z: 40, dx1: 0, showFirst: true});
    delete data.noahcharlotte
    addChild("noahelisabeth", "charlotte", {dx: -125, dxx:0, showFirst: true});

    data.noah.images[1].comment = dead[lang];
    data.martha.images[0].comment = deadF[lang];
    data.claudia.images[1].comment = inn[lang] + " 2020";

    addPhotoAfter("martha", {year: 2019, image: "MarthaOther.png", otherworld: true});


    if (ep <= 18)
        return;
    /* Season 3, episode 1 */

    data = {}; // Not implemented yet
}

function changeLanguage()
{
    if (lang === "fr")
        lang = "en";
    else
        lang = "fr";

    localStorage.setItem('lang', lang);
    redrawPage();

    return false;
}

function initSVG(season, episode)
{
    document.getElementById("treeContents").setAttribute("filter", "");
    document.getElementById("tree").setAttribute("viewBox", `0 -190 2150 1140`);

    var bbox = calculateViewport(document.getElementById("tree"));
    var right = bbox.x + bbox.width - 25;
    hFactor = bbox.width/2150 * 100;

    svgCode = ``;
    // svgCode = `<rect x="${bbox.x + 5}" y="${bbox.y + 5}" width="${bbox.width - 10}" height="${bbox.height - 10}" stroke="black" stroke-width="2" fill="none"/>`;

    var lang2 = (lang == "en") ? "fr" : "en";

    if (episodeOverall >= 1)
        uiCode = `<text x="${bbox.width/2}" y="-140" font-size="40" class="title">${familyTree[lang]} : ${seasonTxt[lang]} ${season}, ${episodeTxt[lang]} ${episode}</text>`;
    else {
        uiCode = `<text x="${bbox.width/2}" y="-120" font-size="80" class="title">${familyTree[lang]}</text>`
        uiCode += `<text y="200" font-size="40" class="title2">`
        for (const line of titleText[lang])
            uiCode += `<tspan x="150" dy="50">${line}</tspan>`;
        uiCode += `</text>`
    }

    uiCode +=
        `<a href="#" onclick="changeLanguage();"><image href="photos/${lang2}.png" x="${bbox.width - 75}" y="-165" width="50"/></a>`
        + `<text x="${right}" y="910" text-anchor="end" fill="darkgrey" font-size="15" font-family="sans">${copyrightNetflix[lang]} <a fill="lightgrey" href="https://www.netflix.com/title/80100172">Netflix</a></text>`
        + `<text x="${right}" y="930" text-anchor="end" fill="darkgrey" font-size="15" font-family="sans">${copyrightMe[lang]} <a fill="lightgrey" href="https://guillaumebrunerie.github.io">Guillaume Brunerie</a></text>`;

    if (episodeOverall <= spoilerLevel && episodeOverall >= 1)
        uiCode += `<a href="#" onclick="hideSpoiler();"><text x="${bbox.width - 125}" y="-140" font-size="20" class="title" style="text-anchor:end">(${hideSpoilers[lang]})</text></a>`;

    data.left = bbox.x + 25;
    data.right = bbox.width + bbox.x - 25;
    data.top = bbox.y + 25;
    data.bottom = bbox.height + bbox.y - 25;

    if (episodeOverall > maxImplemented) {
        document.getElementById("treeContents").setAttribute("filter", "url(#blur)");
        uiCode +=
            `<text x="${bbox.width/2}" y="400" font-size="80" class="title" style="stroke-width:5px">Not implemented yet :(</text>`;
        return;
    }

    if (episodeOverall > spoilerLevel) {
        var immediateSpoiler = (episodeOverall == spoilerLevel + 1);
        document.getElementById("treeContents").setAttribute("filter", "url(#blur)");
        uiCode +=
            `<text x="${bbox.width/2}" y="150" font-size="80" class="title" style="stroke-width:5px">${showSpoilersFor[lang]}</text>
             <text x="${bbox.width/2}" y="250" font-size="80" class="title" style="stroke-width:5px">${thisEpisode[lang][immediateSpoiler]}</text>`;
        uiCode +=
            `<a href="#" onclick="showSpoiler();">
               <path d="M ${bbox.width/2 - 100} 470 a 200 350 0 0 1 200 0 a 200 350 0 0 1 -200 0 z" stroke="black" stroke-width="22" fill="lightgrey"/>
               <path d="M ${bbox.width/2 - 100} 470 a 200 350 0 0 1 200 0 a 200 350 0 0 1 -200 0 z" stroke="lightgrey" stroke-width="16" fill="lightgrey"/>
               <path d="M ${bbox.width/2 - 100} 470 a 200 350 0 0 1 200 0 a 200 350 0 0 1 -200 0 z" stroke="black" stroke-width="10" fill="lightgrey"/>
               <circle cx="${bbox.width/2}" cy="470" r="45" stroke="black" stroke-width="10" fill="darkgrey"/>
               <circle cx="${bbox.width/2}" cy="470" r="16" stroke="black" stroke-width="10" fill="black"/>
               <circle cx="${bbox.width/2 + 8}" cy="462" r="6" stroke="lightgrey" stroke-width="10" fill="lightgrey"/>
             </a>`
    }
}

function addCharacter(label, names, image, position)
{
    if (typeof(image) === "string")
        image = {year:2019, image: image};

    data[label] = {type: "character", names: names, images: [image]};
    Object.assign(data[label], position);
}

function addRelation(label1, label2, d = {})
{
    data[label1+label2] = {type: "relation", label1: label1, label2: label2, z: d.z || 20, dx1: d.dx1 || 0,
                           dx2: d.dx2 || 0, marriage: d.marriage || "married", showFirst: d.showFirst || false};
}

function addChild(parents, child, d = {})
{
    data[parents+child] = {type: "child", parents: parents, child: child, dy: d.dy || 20, dx: d.dx || 0,
                           showFirst: d.showFirst || false, dxx: d.dxx};
}

function addSiblings(label1, label2)
{
    data[label1+label2] = {type: "siblings", label1: label1, label2: label2};
}

function addPhotoBefore(label, image)
{
    if (typeof(image) === "string")
        image = {year: 1986, image: image};

    data[label].images.unshift(image);
}

function addPhotoAfter(label, image)
{
    if (typeof(image) === "string")
        image = {year: 1986, image: image};

    data[label].images.push(image);
}

function computePosition(label)
{
    // Computes the size and position of the element.
    // For characters: d.x, d.y, d.width, d.height
    // For relations and child relations: d.x1, d.x2, d.y1, d.y2
    var d = data[label];

    // Returns if the position has already been computed
    if (d.x !== undefined)
        return;

    if (d.type === "character") {
        // Compute the height
        d.bottomHeight = 10 + 20 * d.names.length;

        // Compute the position
        d.x = d.ax * hFactor; //100;
        d.y = d.ay * 100;

    } else if (d.type === "relation") {
        computePosition(d.label1);
        computePosition(d.label2);
        d.x1 = data[d.label1].x + d.dx1;
        d.x2 = data[d.label2].x + d.dx2;
        d.y1 = data[d.label1].y + 50 + data[d.label1].bottomHeight;
        d.y2 = data[d.label2].y + 50 + data[d.label2].bottomHeight;
        d.yM = Math.max(d.y1, d.y2) + d.z;

        d.x = (d.x1 + d.x2)/2;
    } else if (d.type === "child") {
        computePosition(d.parents);
        computePosition(d.child);
        d.x1 = data[d.parents].x + (d.dx1 || 0);
        d.y1 = data[d.parents].yM || data[d.parents].y + 50 + data[d.parents].bottomHeight;
        d.x2 = data[d.child].x + d.dx;
        d.y2 = data[d.child].y - 60;
        if (d.dxx !== undefined)
            d.x3 = data[d.child].x + d.dxx;

    } else if (d.type === "siblings") {
        computePosition(d.label1);
        computePosition(d.label2);
        d.x1 = data[d.label1].x;
        d.x2 = data[d.label2].x;
        d.y1 = data[d.label1].y - 60;
        d.y2 = data[d.label2].y - 50;
    }
}

function computePositions()
{
    for (label in data)
        computePosition(label);
}

function generateSVG()
{
    for (label in data)
        if (data[label].showFirst)
            displayElement(data[label]);

    for (label in data)
        if (!data[label].showFirst)
            displayElement(data[label]);

    document.querySelector("#treeContents").innerHTML = svgCode;
    document.querySelector("#treeUI").innerHTML = uiCode;

    for (const element of document.getElementsByClassName("comment")) {
        var bbox = element.getBBox();
        var rectangle = document.getElementById("R" + element.id);
        rectangle.setAttribute("width", bbox.width + 10);
        rectangle.setAttribute("x", bbox.x - 5);
    }
}

function displayElement(d)
{
    if (d.type === "relation")
        displayRelation(d.x1, d.x2, d.y1, d.y2, d.yM, d.marriage);
    else if (d.type === "child")
        displayChild(d.x1, d.x2, d.y1, d.y2, d.dy, d.x3);
    else if (d.type === "siblings")
        displaySiblings(d.x1, d.x2, d.y1, d.y2);
    else if (d.type === "character")
        displayPerson(d.x, d.y, d.names, d.images);
}

function display(str)
{
    svgCode += str;
}

function enlarge(obj)
{
    if (episodeOverall > spoilerLevel)
        return;

    var scaleFactor = 3;

    obj.setAttribute("transform", `scale(${scaleFactor})`);
    obj.setAttribute("id", "magnified");

    var magnifier = document.getElementById("magnifier");
    var bbox = magnifier.getBBox();
    var xTranslation = bbox.x < data.left ? data.left - bbox.x :
        (bbox.x + bbox.width > data.right ? data.right - bbox.x - bbox.width : 0);
    var yTranslation = bbox.y < data.top ? data.top - bbox.y :
        (bbox.y + bbox.height > data.bottom ? data.bottom - bbox.y - bbox.height : 0);

    obj.setAttribute("transform", `translate(${xTranslation}, ${yTranslation}) scale(${scaleFactor})`);

//    alert(`${data.totalWidth} ${document.getElementById("tree").getAttribute("viewBox")}`);
//    alert(`${bbox.x} ${bbox.y} ${bbox.width} ${bbox.height}`);
}

function diminish()
{
    var magnified = document.getElementById("magnified");

    if (magnified) {
        magnified.removeAttribute("transform");
        magnified.removeAttribute("id");
    }
}

dasharrays = {2085: "20 3",
              2052: "9 3",
              2019: "",
              1986: "6",
              1953: "3 9",
              1920: "3 19"}

function displayPerson(x, y, names, images)
{
    var result = "";

    result += `<g onmousedown="enlarge(this)" ontouchstart="enlarge(this)" transform-origin="${x} ${y}">`;

    result += `<rect x="${x - images.length * 53 - 1}" y="${y - 54}" width="${106 * images.length + 2}" height="${108}" fill="black" rx="6"/>`;

    for (var i in images) {
        var currentX = x - images.length * 53 + i * 106 + 3;
        var color = "lightgrey";
        result += `<image x="${currentX}" y="${y - 50}" width="100" height="100" preserveAspectRatio="none"
                          href="photos/${images[i].image}"/>`;

        var commentColor = "purple";
        if (images[i].comment === missing[lang])
            commentColor = "red";
        if (images[i].comment === dead[lang] || images[i].comment === deadF[lang])
            commentColor = "darkred";
        if (images[i].comment === inn[lang] + " 1921")
            commentColor = "black";
        if (images[i].comment === inn[lang] + " 1953")
            commentColor = "darkcyan";
        if (images[i].comment === inn[lang] + " 1954")
            commentColor = "darkcyan";
        if (images[i].comment === inn[lang] + " 1986")
            commentColor = "blue";
        if (images[i].comment === inn[lang] + " 1987")
            commentColor = "blue";
        if (images[i].comment === inn[lang] + " 2052")
            commentColor = "green";
        if (images[i].comment === inn[lang] + " 2053")
            commentColor = "green";

        da = dasharrays[images[i].year];

        if (images[i].otherworld)
            color = "purple";

        result += `<rect x="${currentX}" y="${y - 50}" width="100" height="100" rx="3" stroke-dasharray="${da}"
                         fill="none" stroke-width="3" stroke="${color}"/>`;

        if (images[i].comment) {
            result += `<rect x="${currentX - 30 + 50}" y="${y + 28}" width="60" height="18" rx="5"
                             stroke-width="2" stroke="${commentColor}" fill="darkgrey" id="${"R" + x + "_" + y + "_" + i}"/>`;
            result += `<text x="${currentX + 50}" y="${y + 37}" text-anchor="middle"
                             font-family="sans" font-weight="bold" fill="black" font-size="12"
                             dominant-baseline="central" class="comment" id="${x + "_" + y + "_" + i}">${images[i].comment}</text>`;
        }
    }

    for (var i in names) {
        var currentY = y + 70 + 20 * i;
        result += `<text x="${x}" y="${currentY}" text-anchor="middle" font-family="sans" font-weight="bold"
                         fill="lightgrey" stroke="black" stroke-width="2" paint-order="stroke">${names[i]}</text>`;
    }

    result += `</g>`;

    display(result);
}

function displayRelation(x1, x2, y1, y2, yM, marriage)
{
    var dasharray = "";
    var w = 2;
    if (marriage === "married")
        w = 3;
    if (marriage === "relationship")
        dasharray = `stroke-dasharray="7 3"`;
    if (marriage === "broke up")
        dasharray = `stroke-dasharray="2 8"`;

    // if (w == 3)
    //     display(`<path d="M ${x1} ${y1} V ${yM} H ${x2} V ${y2}"
    //                stroke="black" stroke-width="5" fill="none"></path>`);
    display(`<path d="M ${x1} ${y1} V ${yM} H ${x2} V ${y2}"
                   stroke="lightgrey" stroke-width="${w}" fill="none" ${dasharray}></path>`);
}

function displaySiblings(x1, x2, y1, y2)
{
    display(`<path d="M ${x1} ${y1} v -20 H ${x2} v 20"
                   stroke="lightgrey" stroke-width="3" fill="none"></path>`);
}

function displayChild(x1, x2, y1, y2, dy, x3)
{
    if (x3 != undefined)
        display(`<path d="M ${x1} ${y1} v ${dy} H ${x2} V ${y2 - 20} H ${x3} v 20"
                       stroke="lightgrey" stroke-width="3" fill="none"/>`);
    // display(`<path d="M ${x1} ${y1} v ${dy} H ${x2} V ${y2}" stroke="black" stroke-width="5" fill="none"/>`);
    display(`<path d="M ${x1} ${y1} v ${dy} H ${x2} V ${y2}" stroke="lightgrey" stroke-width="3" fill="none"/>`);
}

// Given an <svg> element, returns an object with the visible bounds
// expressed in local viewBox units, e.g.
// { x:-50, y:-50, width:100, height:100 }
function calculateViewport(svg){ // http://phrogz.net/JS/_ReuseLicense.txt
  var style    = getComputedStyle(svg),
      owidth   = parseInt(style.width,10),
      oheight  = parseInt(style.height,10),
      aspect   = svg.preserveAspectRatio.baseVal,
      viewBox  = svg.viewBox.baseVal,
      width    = viewBox && viewBox.width  || owidth,
      height   = viewBox && viewBox.height || oheight,
      x        = viewBox ? viewBox.x : 0,
      y        = viewBox ? viewBox.y : 0;
  if (!width || !height || !owidth || !oheight) return;
  if (aspect.align==aspect.SVG_PRESERVEASPECTRATIO_NONE || !viewBox || !viewBox.height){
    return {x:x,y:y,width:width,height:height};
  }else{
    var inRatio  = viewBox.width / viewBox.height,
        outRatio = owidth / oheight;
    var meetFlag = aspect.meetOrSlice != aspect.SVG_MEETORSLICE_SLICE;
    var fillAxis = outRatio>inRatio ? (meetFlag?'y':'x') : (meetFlag?'x':'y');
    if (fillAxis=='x'){
      height = width/outRatio;
      var diff = viewBox.height - height;
      switch (aspect.align){
        case aspect.SVG_PRESERVEASPECTRATIO_UNKNOWN:
        case aspect.SVG_PRESERVEASPECTRATIO_XMINYMID:
        case aspect.SVG_PRESERVEASPECTRATIO_XMIDYMID:
        case aspect.SVG_PRESERVEASPECTRATIO_XMAXYMID:
          y += diff/2;
        break;
        case aspect.SVG_PRESERVEASPECTRATIO_XMINYMAX:
        case aspect.SVG_PRESERVEASPECTRATIO_XMIDYMAX:
        case aspect.SVG_PRESERVEASPECTRATIO_XMAXYMAX:
          y += diff;
        break;
      }
    }
    else{
      width = height*outRatio;
      var diff = viewBox.width - width;
      switch (aspect.align){
        case aspect.SVG_PRESERVEASPECTRATIO_UNKNOWN:
        case aspect.SVG_PRESERVEASPECTRATIO_XMIDYMIN:
        case aspect.SVG_PRESERVEASPECTRATIO_XMIDYMID:
        case aspect.SVG_PRESERVEASPECTRATIO_XMIDYMAX:
          x += diff/2;
        break;
        case aspect.SVG_PRESERVEASPECTRATIO_XMAXYMID:
        case aspect.SVG_PRESERVEASPECTRATIO_XMAXYMIN:
        case aspect.SVG_PRESERVEASPECTRATIO_XMAXYMAX:
          x += diff;
        break;
      }
    }
    return {x:x,y:y,width:width,height:height};
  }
}
