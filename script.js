var textarray = [ 
    "Student at University of Illinois at Urbana Champaign", 
    "Applications Development intern at Calamos Investments", 
    "Avid Website Designer", 
    "Tennis Enthusiast", 
    "Chicago Bulls Fanatic" 
]; 


function RndText() {
    var rannum= Math.floor(Math.random()*textarray.length);
    document.getElementById('random_text').innerHTML=textarray[rannum];
}

onload = function() { RndText(); }
var inter = setInterval(function() { RndText(); }, 3000);