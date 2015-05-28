var textarray = [
    "Student at University of Illinois at Urbana Champaign",
    "Applications Development intern at Calamos Investments",
    "Avid Website Designer",
    "Tennis Enthusiast",
    "Chicago Bulls Fanatic"
];

function RndText() 
{
    var rannum = Math.floor(Math.random() * textarray.length);

    $('#random_text').fadeOut('fast', function() { 
        $(this).text(textarray[rannum]).fadeIn('fast');
    });
}

$(function() {
    // Call the random function when the DOM is ready:
    RndText(); 
});

var inter = setInterval(function() { RndText(); }, 3000);
