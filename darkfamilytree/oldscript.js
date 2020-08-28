document.addEventListener("keydown", onkeydown);

window.oncontextmenu = function(event) {
     event.preventDefault();
     event.stopPropagation();
     return false;
};

episode = 1;

window.onload = function ()
{
    changeEpisode();
}

var tree;
var oldPan;
var oldZoom;

function changeEpisode()
{
    var season = 1;
    var episodeOfSeason = episode;
    if (episode > 18) {
        season = 3;
        episodeOfSeason = episode - 18;
    } else if (episode > 10) {
        season = 2;
        episodeOfSeason = episode - 10;
    };
    document.getElementById("title").textContent =
        `Dark’s Family Tree: Season ${season} Episode ${episodeOfSeason}`;

    loadEpisode(episode);
    computePositions();
    initSVG();
    generateSVG();
}

function onkeydown(e)
{
    if (e.key === "ArrowRight") {
        e.preventDefault();
        if (episode <= 25)
            episode++;
        changeEpisode();
    } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        if (episode >= 2)
            episode--;
        changeEpisode();
    }
}

// Generates all the data of the corresponding episode
function loadEpisode(episode)
{
    data = {};
    data.globaldx = 0;
    
    // Season 1, episode 1
    
    addCharacter("franziska", ["Franziska Doppler"], "Franziska.jpg", 150, {position: "first"});
    addCharacter("charlotte", ["Charlotte Doppler", "(police officer)"], "Charlotte.png", 250,
                 {position: "parent", side: "left", children: ["franziska"]});
    addCharacter("peter", ["Peter Doppler", "(psychologist)"], "Peter.jpg", 150,
                 {position: "parent", side: "right", children: ["franziska"]});
    addCharacter("helge", ["Helge Doppler"], "Helge.jpg", 350, {position: "parent", side: "left", children: ["peter"]});
    
    addRelation("charlotte", "peter");
    addChild("charlottepeter", "franziska");

    addCharacter("magnus", ["Magnus Nielsen"], "Magnus.jpg", 150, {position: "after", who: "franziska", dx: 3});
    addCharacter("martha", ["Martha Nielsen"], "Martha.jpg", 150, {position: "after", who: "magnus"});
    addCharacter("mikkel", ["Mikkel Nielsen"], "Mikkel.png", 150, {position: "after", who: "martha"});
    addCharacter("katharina", ["Katharina Nielsen", "(school rector)"], "Katharina.png", 250,
                 {position: "parent", side: "left", children: ["martha"]});
    addCharacter("ulrich", ["Ulrich Nielsen", "(police officer)"], "Ulrich.jpg", 250,
                 {position: "parent", side: "right", children: ["martha"]});

    addRelation("ulrich", "katharina");
    addChild("ulrichkatharina", "magnus");
    addChild("ulrichkatharina", "martha");
    addChild("ulrichkatharina", "mikkel");

    addCharacter("mads", ["Mads Nielsen"], {year: 1986, image: "Mads.png"}, 150, {position: "after", who: "ulrich"});
    addCharacter("jana", [], "Jana.jpg", 250, {position: "parent", side: "middle", children: ["ulrich", "mads"]});

    addRelation("jana", "jana");
    addChild("janajana", "ulrich");
    addChild("janajana", "mads");

    addCharacter("jonas", ["Jonas Kahnwald"], "Jonas.jpg", 350, {position: "after", who: "mikkel", dx: 5.5});
    addCharacter("michael", ["Michael Kahnwald"], "Michael.jpg", 150,
                 {position: "parent", side: "left", children: ["jonas"]});
    addCharacter("hannah", ["Hannah Kahnwald", "(massage therapist)"], "Hannah.jpg", 250,
                 {position: "parent", side: "right", children: ["jonas"]});
    // addCharacter("michaelfather", [], "Unknown.png", {position: "parent", side: "right", children: ["michael"]});
    addCharacter("ines", [], "Ines.jpg", 250, {position: "parent", side: "middle", children: ["michael"]});

    addRelation("michael", "hannah");
    addChild("michaelhannah", "jonas");

    addRelation("ines", "ines");
    addChild("inesines", "michael");


    addRelation("ulrich", "hannah", 30, 20, -20, "relationship");

    addCharacter("bartosz", ["Bartosz Tiedemann"], "Bartosz.png", 150, {position: "after", who: "jonas", dx: 5});
    addCharacter("regina", ["Regina Tiedemann", "(hotel owner)"], "Regina.jpg", 250,
                 {position: "parent", side: "left", children: ["bartosz"]});
    addCharacter("aleksander", [], "Unknown.png", 250, {position: "parent", side: "right", children: ["bartosz"]});
//    data.aleksander.differentWidth = 210;

    addRelation("regina", "aleksander");
    addChild("reginaaleksander", "bartosz");
    addRelation("martha", "bartosz", 20, 0, 0, "relationship");

    data.mikkel.missing = true;
    data.mads.missing = true;
    data.michael.dead = true;

    // addCharacter("erik", ["Erik Obendorf"], "Erik.jpg", {position: "after", who: "bartosz", dx: 3});
    // addCharacter("jurgen", [], "Jurgen.png", {position: "parent", side: "right", children: ["erik"]});
    // addCharacter("ulla", [], "Ulla.jpg", {position: "parent", side: "left", children: ["erik"]});

    // addRelation("jurgen", "ulla");
    // addChild("jurgenulla", "erik");
    
    // addCharacter("deadboy", [], "DeadBoy.png", {position: "after", who: "erik", dx: 0.5});
    
    // data.erik.missing = true;
    // data.deadboy.dead = true;

    ////
    
    if (episode <= 1)
        return;

    // Season 1, episode 2

    addCharacter("tronte", [], "Tronte.jpg", 250, {position: "parent", side: "right", children: ["ulrich", "mads"]});

    data.jana.side = "left";
    
    delete data.janajana;
    delete data.janajanaulrich;
    delete data.janajanamads;

    addRelation("jana", "tronte");
    addChild("janatronte", "ulrich");
    addChild("janatronte", "mads");

    addCharacter("stranger", ["The Stranger"], "TheStranger.jpg", 150, {position: "parent", side: "middle", children: ["aleksander"], dx: -1, dy: -2});

    data.aleksander.names = ["Aleksander Tiedemann", "(nuclear plant director)"];
    data.aleksander.images[0].image = "Aleksander.png";

    // data.erik.dx += 0.5;
    // data.jurgen.names = ["Jürgen Obendorf", "(truck driver at the plant)"];
    
    data.mikkel.missing = false;
    data.mikkel.comment = "in 1986";

    addPhotoBefore("ulrich", "UlrichYoung.jpg");
    addPhotoBefore("katharina", "KatharinaYoung.jpg");
    // data.magnus.dx += 1.5;
    // data.jonas.dx += 1.5;

    // data.globaldx -= 3;

    ////
    
    if (episode <= 2)
        return;
    
    // Season 1, episode 3
    
    addPhotoBefore("charlotte", "CharlotteYoung.jpg");
    addPhotoBefore("helge", "HelgeAdult.jpg");
    addCharacter("bernd", ["Bernd Doppler", "(nuclear plant old director)"], {year: 1986, image: "Bernd.png"}, 150,
                 {position: "parent", side: "middle", children: ["helge"]});
    
    data.jana.names = ["Jana Nielsen"];
    addPhotoBefore("jana", "JanaAdult.jpg");
    data.tronte.names = ["Tronte Nielsen"];
    addPhotoBefore("tronte", "TronteAdult.jpg");

    data.ines.names = ["Ines Kahnwald", "(nurse)"];
    addPhotoBefore("ines", "InesYoung.jpg");
    addPhotoBefore("hannah", "HannahYoung.jpg");

    addPhotoBefore("regina", "ReginaYoung.png");
    addCharacter("claudia", ["Claudia Tiedemann", "(nuclear plant new director)"], {year: 1986, image: "Claudia.png"}, 250,
                 {position: "parent", side: "middle", children: ["regina"]});
    // addCharacter("claudiahusband", [], "Unknown.png",
    //              {position: "parent", side: "right", children: ["regina"]});

    addRelation("claudia", "claudia");
    addChild("claudiaclaudia", "regina");
    addCharacter("egon", ["Egon Tiedemann", "(police officer)"], {year: 1986, image: "Egon.png"}, 250,
                 {position: "parent", side: "middle", children: ["claudia"]});
//    data.bartosz.dx += 4;

//    data.stranger.who = "claudiahusband";
//    data.stranger.dx = 1;

    ////
    
    if (episode <= 3)
        return;
    
    // Season 1, episode 4

    addCharacter("elisabeth", ["Elisabeth Doppler"], "", 250,
                 {position: "after", who: "franziska", dx: -8});
    data.charlotte.children = ["franziska", "elisabeth"];
    data.peter.children = ["franziska", "elisabeth"];
    data.franziska.dx = 2;
    data.magnus.dx -= 2;
    addChild("charlottepeter", "elisabeth");

    addRelation("helge", "helge");
    addChild("helgehelge", "peter");

    // addCharacter("yasin", ["Yasin"], "", {position: "after", who: "mikkel", dx: 2});
    // addRelation("elisabeth", "yasin", 40, 0, 0, "relationship");

    addRelation("magnus", "franziska", 20, 0, 0, "relationship");

    ////
    
    if (episode <= 4)
        return;
    
    // Season 1, episode 5

    addCharacter("noah", ["Noah"], "Unknown.png", 150,
                 {position: "parent", side: "middle", children: ["stranger"]});

    data.stranger.comment = "away";

    delete data.ulrichhannah;

    addPhotoAfter("mikkel", {year: 2019, image: "Michael.jpg"});
    data.mikkel.dx = 4;
    data.mikkel.dy = -0.5;
    data.mikkel.names = ["Mikkel Nielsen", "Michael Kahnwald"];
    data.jonas.dy = 0.5;

    delete data.michael;
    delete data.inesinesmichael;
    delete data.michaelhannah;
    delete data.michaelhannahjonas;
    
    data.ines.children = ["mikkel"];
    data.ines.side = "right";

    addRelation("mikkel", "hannah");
    addChild("mikkelhannah", "jonas");
    addChild("inesines", "mikkel");
    
    // delete data.michael;
    // delete data.inesmichael;
    
    ////
    
    if (episode <= 5)
        return;
    
    // Season 1, episode 6

    data = {}; // Not implemented yet
}

// TODO list
//
// - better computation of the size of blocks?
// - child lines when one parent has two pictures (e.g. Jonas/Franziska/Bartosz S1E3)
// - implement NIY
// - implement spoiler hiding
// - remember page

imageSize = 100;
horizontalPadding = imageSize/2;
verticalPadding = imageSize * 1.5;
defaultWidth = Math.max(250, imageSize);

function initSVG()
{
    document.getElementById("treeContents").innerHTML = "";

    var left = 0;
    var right = 0;
    var top = 1000;
    var bottom = 0;
    for (var i in data) {
        var d = data[i];
        if (d.type !== "character")
            continue;

        left = Math.min(left, d.x - d.width / 2 - horizontalPadding / 2);
        right = Math.max(right, d.x + d.width / 2 + horizontalPadding / 2);
        top = Math.min(top, d.y - imageSize/2 - horizontalPadding / 2);
        bottom = Math.max(bottom, d.y + imageSize/2 + horizontalPadding * 1.5);
    }
    
    document.getElementById("tree").setAttribute("viewBox", `-100 -125 2225 950`);
    // document.getElementById("tree").setAttribute("viewBox", `${left} ${top} ${right - left} ${bottom - top}`);


    display(`<rect width="${right - left}" height="${bottom - top}" x="${left}" y="${top}"
                   stroke="black" fill="none"/>`);

    var viewportBBox = calculateViewport(document.getElementById("tree"));
    var additionalWidth = viewportBBox.width - (right - left);
    var additionalHeight = viewportBBox.height - (bottom - top);
    
    data.left = left - additionalWidth / 2;
    data.right = right + additionalWidth / 2;
    data.top = top - additionalHeight / 2;
    data.bottom = bottom + additionalHeight / 2;
    data.totalWidth = right - left;
    data.totalHeight = bottom - top;
}

function addCharacter(label, names, image, size, position)
{
    if (typeof(image) === "string")
        image = {year:2019, image: image};
    
    data[label] = {type: "character", names: names, images: [image], differentWidth: size};
    Object.assign(data[label], position);
}

function addRelation(label1, label2, z = 20, dx1 = 0, dx2 = 0, marriage = "married")
{
    data[label1+label2] = {type: "relation", label1: label1, label2: label2, z: z, dx1: dx1, dx2: dx2,
                           marriage: marriage};
}

function addChild(parents, child)
{
    data[parents+child] = {type: "child", parents: parents, child: child}
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
        // Compute the width
        if (d.images.length == 1)
            d.width = d.differentWidth || defaultWidth;
        else
            d.width = d.images.length * imageSize + horizontalPadding;

        // Compute the height
        d.bottomHeight = 10 + 20 * d.names.length;

        // Compute the position
        if (d.position === "first") {
            d.x = 200 + data.globaldx * horizontalPadding;
            d.y = 700;
        } else if (d.position === "after") {
            computePosition(d.who);
            d.x = data[d.who].x + d.width / 2 + data[d.who].width / 2;
            d.y = data[d.who].y;
        } else if (d.position === "parent") {
            for (var child in d.children)
                computePosition(d.children[child]);
            var x = average(d.children);
            var y = maxY(d.children);
            if (d.side === "left")
                d.x = x - d.width/2;
            else if (d.side === "right")
                d.x = x + d.width/2;
            else
                d.x = x;
            d.y = y - verticalPadding - imageSize;
        } else {
            d.x = d.ax * 100;
            d.y = d.ay * 100;
        }
        if (d.dx)
            d.x += d.dx * horizontalPadding;
        if (d.dy)
            d.y += d.dy * horizontalPadding;
    } else if (d.type === "relation") {
        computePosition(d.label1);
        computePosition(d.label2);
        d.x1 = data[d.label1].x + d.dx1;
        d.x2 = data[d.label2].x + d.dx2;
        d.y1 = data[d.label1].y + imageSize / 2 + data[d.label1].bottomHeight;
        d.y2 = data[d.label2].y + imageSize / 2 + data[d.label2].bottomHeight;
        d.yM = Math.max(d.y1, d.y2) + d.z;

        d.x = (d.x1 + d.x2)/2;
    } else if (d.type === "child") {
        computePosition(d.parents);
        computePosition(d.child);
        d.x1 = data[d.parents].x;
        d.y1 = data[d.parents].yM || data[d.parents].y + imageSize / 2;
        d.x2 = data[d.child].x;
        d.y2 = data[d.child].y - imageSize / 2 - 10;
    }
    
    // if (d.images) {
    //     if (d.images.length == 1)
    //         d.width = defaultWidth;
    //     else
    //         d.width = d.images.length * 100 + 50;
    // }

    // if (d.type === "firstYoung") {
    //     d.x = d.initialX;
    //     d.y = 700;
    // } else if (d.type === "nextTo") {
    //     if (data[d.previous].width == undefined)
    //         computePosition(d.previous);
    //     d.x = data[d.previous].x + data[d.previous].width/2 + d.width/2 + d.separation * 50;
    //     d.y = data[d.previous].y;
    // } else if (d.type === "parent1") {
    //     var x = average(d.children);
    //     var y = maxY(d.children);
    //     d.x = x - d.width/2;
    //     d.y = y - 250;
    // } else if (d.type === "parent2") {
    //     var x = average(d.children);
    //     var y = maxY(d.children);
    //     d.x = x + d.width/2;
    //     d.y = y - 250;
    // } else if (d.type === "relation") {
    //     if (data[d.label1].width == undefined)
    //         computePosition(d.label1);
    //     if (data[d.label2].width == undefined)
    //         computePosition(d.label2);
    //     d.x1 = data[d.label1].x;
    //     d.x2 = data[d.label2].x;
    //     d.y1 = data[d.label1].y;
    //     d.y2 = data[d.label2].y;
    // } else if (d.type === "child") {
    //     if (data[d.parent1].width == undefined)
    //         computePosition(d.parent1);
    //     if (data[d.parent2].width == undefined)
    //         computePosition(d.parent2);
    //     if (data[d.child].width == undefined)
    //         computePosition(d.child);
    //     d.xP = (data[d.parent1].x + data[d.parent2].x)/2;
    //     d.xC = data[d.child].x;
    //     d.y = data[d.parent1].y;
    // }
}

function computePositions()
{
    for (label in data)
        computePosition(label);
}

function generateSVG()
{
    for (label in data) {
        var d = data[label];
        if (d.type === "relation")
            displayRelation(d.x1, d.x2, d.y1, d.y2, d.yM, d.marriage);
        else if (d.type === "child")
            displayChild(d.x1, d.x2, d.y1, d.y2);
        else if (d.type === "character")
            displayPerson(d.x, d.y, d.width, imageSize + d.bottomHeight,
                          d.names, d.images, d.missing, d.dead, d.comment);
    }
}

function display(str)
{
    var tree = document.getElementById("treeContents");
    
    tree.innerHTML += str;
}

function average(children)
{
    var total = 0;
    for (var i = 0; i < children.length; i++) {
        total += data[children[i]].x;
    }
    return (total / children.length);
}   

function maxY(children)
{
    var result = 0;
    for (var i = 0; i < children.length; i++) {
        if (result < data[children[i]].y)
            result = data[children[i]].y;
    }
    return result;
}

function enlarge(obj)
{
    var scaleFactor = data.totalWidth / 750;

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

dasharrays = {2019: "",
              1986: "4"}

function displayPerson(x, y, width, height, names, images, missing, dead, comment)
{
    var result = "";
    
    result += `<g onmousedown="enlarge(this)" ontouchstart="enlarge(this)" transform-origin="${x} ${y}">`;
    
    for (var i in images) {
        var currentX = x - images.length * 50 + i * 100;
        var color = "white";
        result += `<image x="${currentX}" y="${y - 50}" width="100" height="100" preserveAspectRatio="none"
                          href="photos/${images[i].image}"/>`;

        var commentColor = "blue";
        if (missing) {
            comment = "missing";
            commentColor = "darkred";
//            result += `<rect x="${currentX}" y="${y - 50}" width="100" height="100" fill="url(#diagonalHatch)"/>`;
        }
        if (dead) {
            comment = "dead";
            commentColor = "red";
            // result += `<path d="M ${currentX} ${y - 50} l 100 100 m 0 -100 l -100 100" stroke-width="3"
            //                  stroke="red"/>`;
        }

        da = dasharrays[images[i].year];

        result += `<rect x="${currentX}" y="${y - 50}" width="100" height="100" rx="3" stroke-dasharray="${da}"
                         fill="none" stroke-width="3" stroke="${color}"/>`;

        if (comment) {
            result += `<rect x="${currentX - 30 + 50}" y="${y + imageSize/2 - 20}" width="60" height="20" rx="5"
                             stroke-width="3" stroke="${commentColor}" fill="darkgrey">${comment}</rect>`;
            result += `<text x="${currentX + 50}" y="${y + imageSize/2 - 10}" text-anchor="middle"
                             font-family="sans" font-weight="bold" fill="black" font-size="12"
                             dominant-baseline="central">${comment}</text>`;
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
    var w = 3;
    if (marriage === "relationship") {
        dasharray = "stroke-dasharray=\"6 4\"";
        w = 3;
    }
    if (marriage === "broke up") {
        dasharray = "stroke-dasharray=\"4 10\"";
        w = 2;
    }
    display(`<path d="M ${x1} ${y1} V ${yM} H ${x2} V ${y2}"
                   stroke="lightgrey" stroke-width="${w}" fill="none" ${dasharray}></path>`);
}

function displayChild(x1, x2, y1, y2)
{
    display(`<path d="M ${x1} ${y1} v 20 H ${x2} V ${y2}" stroke="lightgrey" stroke-width="3" fill="none"/>`);
}

// Given an <svg> element, returns an object with the visible bounds
// expressed in local viewBox units, e.g.
// { x:-50, y:-50, width:100, height:100 }
function calculateViewport(svg){ // http://phrogz.net/JS/_ReuseLicense.txt
  var style    = getComputedStyle(svg),
      owidth   = parseInt(style.width,10),
      oheight  = parseInt(style.height,10),
      viewBox  = svg.viewBox.baseVal,
      width    = viewBox && viewBox.width  || owidth,
      height   = viewBox && viewBox.height || oheight,
      x        = viewBox ? viewBox.x : 0,
      y        = viewBox ? viewBox.y : 0;
  if (!width || !height || !owidth || !oheight) return;
  if (!viewBox || !viewBox.height){
    return {x:x,y:y,width:width,height:height};
  }else{
      var inRatio  = viewBox.width / viewBox.height,
        outRatio = owidth / oheight;
      var fillAxis = outRatio>inRatio ? 'y' : 'x';
    if (fillAxis=='x'){
      height = width/outRatio;
      var diff = viewBox.height - height;
          y += diff/2;
    }
    else{
      width = height*outRatio;
      var diff = viewBox.width - width;
          x += diff/2;
    }
    return {x:x,y:y,width:width,height:height};
  }
}
