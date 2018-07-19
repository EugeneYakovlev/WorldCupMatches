$(document).ready(function () {
    let requestUrl = 'https://raw.githubusercontent.com/openfootball/world-cup.json/master/2018/worldcup.json';
    let request = new XMLHttpRequest();

    request.open('GET', requestUrl);
    request.responseType = 'json';
    request.send();

    let worldCup;
    request.onload = function () {
        worldCup = request.response;
        showMatches(worldCup, "all");
    };

    function showMatches(jsonObj, group) {
        let rounds = jsonObj['rounds'];
        for (let i = 0; i < rounds.length; i++) {
            let matches = rounds[i].matches;
            let round_name = rounds[i].name;
            for (let j = 0; j < matches.length; j++) {
                let homeTeam, awayTeam, result, homeTeamCode, awayTeamCode, stadium, stadiumCode, stage;
                let penalty_s = '';

                homeTeam = matches[j].team1['code'];
                awayTeam = matches[j].team2['code'];
                homeTeamCode = homeTeam.toLowerCase();
                awayTeamCode = awayTeam.toLowerCase();

                stadium = matches[j].stadium['key'];
                stadiumCode = stadium.toLowerCase();

                if(matches[j].knockout == true) {
                    stage = round_name;
                }
                else {
                    stage = matches[j].group;
                }
                if (matches[j].score1 == null && matches[j].score2 == null) {
                    result = matches[j].time;
                }
                else {
                    if(matches[j].knockout == true) {
                        if (matches[j].score1p !== null) {
                            penalty_s = ' (' + matches[j].score1p + ' : ' + matches[j].score2p + ')';
                        }
                        else {
                            penalty_s = '';
                        }
                    }
                    result = matches[j].score1 + ' - ' + matches[j].score2 + penalty_s;
                }
                let template =
                    "<div class='match'>" +
                    "<div class='matchContent'>" +
                    "<div class='matchData'>" +
                    "<div class='stagenPlace'>" +
                    stage +
                    ", <span class='stadium'>" + matches[j].stadium['name'] + "</span>" +
                    "</div>" +
                    "<div class='date'>" + matches[j].date + "</div>" +
                    "</div>" +
                    "<div class='teamInfo'>" +
                    "<div class='team_logo " + homeTeamCode + "'></div>" +
                    "<div class='count'>" + result + "</div>" +
                    "<div class='team_logo " + awayTeamCode + "'></div>" +
                    "</div>" +
                    "</div>" +
                    "<div class='bgPic " + stadiumCode + "'></div>" +
                    "</div>";
                if (group == "all") {
                    $('.matchWrapper').append(template);
                }
                else {
                    if (matches[j].group == group) {
                        $('.matchWrapper').append(template);
                    }
                }
            }
        }

        /*
        for (var i = 0; i < heroes.length; i++) {
            var myArticle = document.createElement('article');
            var myH2 = document.createElement('h2');
            var myPara1 = document.createElement('p');
            var myPara2 = document.createElement('p');
            var myPara3 = document.createElement('p');
            var myList = document.createElement('ul');

            myH2.textContent = heroes[i].name;
            myPara1.textContent = 'Secret identity: ' + heroes[i].secretIdentity;
            myPara2.textContent = 'Age: ' + heroes[i].age;
            myPara3.textContent = 'Superpowers:';

            var superPowers = heroes[i].powers;
            for (var j = 0; j < superPowers.length; j++) {
                var listItem = document.createElement('li');
                listItem.textContent = superPowers[j];
                myList.appendChild(listItem);
            }

            myArticle.appendChild(myH2);
            myArticle.appendChild(myPara1);
            myArticle.appendChild(myPara2);
            myArticle.appendChild(myPara3);
            myArticle.appendChild(myList);

            section.appendChild(myArticle);
        }
        */
    }

    $(document).on('click', '.groupSwitcher a', function (e) {
        e.preventDefault();
        $(this).addClass('active');
        $(this).siblings('a').removeClass('active');
        $('.matchWrapper').empty();
        var group = $(this).html();
        showMatches(worldCup, group);
    });
});
