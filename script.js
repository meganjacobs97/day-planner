//grab current date/time with moment 
var today = moment();

//set <p> tag with "#currentDay" as todays day of the week, month, and day 
$("#currentDay").text(today.format("dddd, MMMM Do")); 


//go through each text area box
$("textarea").each(function() {
    //get the id for the current parent div
    var idSubstr = $(this).parent().attr("id"); 
    
    //if the id is for 10am, 11am, or 12pm
    if(idSubstr.substr(0,2) === "10" || idSubstr.substr(0,2) === "11" || idSubstr.substr(0,2) === "12") {
        //we need the first four characters 
        idSubstr = idSubstr.substr(0,4); 
    }
    //otherwise 
    else {
        //we only need the first three characters 
        idSubstr = idSubstr.substr(0,3);
    }
    //call on functions to put text in and change the color of timeblocks accordingly 
    populatePlanner(idSubstr); 
    changeColors(idSubstr); 
}); 

//accesses local storage in order to populate each time block 
function populatePlanner(timeStr) {
    //grab text local storage 
    var text = localStorage.getItem(timeStr); 
    //if there is text saved 
    if(text) {
        //get textarea div 
        var textAreaID = "#" + timeStr + "TextArea"; 
        //get the textarea (child of textarea div)
        var textarea = $(textAreaID).find("textarea"); 
        //insert text 
        textarea.val(text); 
    }
}

//changes colors of the timeblock depending on what time it is 
function changeColors(timeStr) {
    var textAreaID = "#" + timeStr + "TextArea"; 

    //get current time via moment
    var currentTime = today.format("ha"); 
    currentTime = moment(currentTime,"ha"); 

    //get planner timeblock
    var plannerTime = moment(timeStr,"ha"); 

    //change color depending on if time block is before, after, or during current hour 
    if(currentTime.isBefore(plannerTime)) {
        $(textAreaID).addClass("future");
    }
    else if(plannerTime.isBefore(currentTime)) {
        $(textAreaID).addClass("past"); 
    }
    else {
        $(textAreaID).addClass("present"); 
    }
}

//save button action listener
$(".saveBtn").on("click",function() {
    //get the time via the id of the row that the button is in 
    var ancestor = $(this).parent().parent(); 
    var timeStr = ancestor.attr("id"); 

    //get text from textarea
    var text = ancestor.find("textarea").val(); 
    
    //write local storage
    localStorage.setItem(timeStr,text); 
}); 
