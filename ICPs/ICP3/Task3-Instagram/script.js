function getGithubInfo(user) {
    //1. Create an instance of XMLHttpRequest class and send a GET request using it. The function should finally return the object(it now contains the response!)
    var xhttp = new XMLHttpRequest();
    var url = "https://www.instagram.com/web/search/topsearch/?context=user&count=1&query="+user;
    xhttp.overrideMimeType("application/json");
    xhttp.open('GET', url, true);
    xhttp.onload = function () {
        //if the response is successful show the user's details
        if (xhttp.status == 200) {
            showUser(JSON.parse(xhttp.responseText));
            //else display suitable message
        } else {
            noSuchUser(user);
        }
    };
    xhttp.send();
}

function showUser(user) {
    $("#h2id").text(user.users[0].user.username);
    $(".avatar").html("<img height='200' width='200' src='"+ user.users[0].user.profile_pic_url+"'/>");
    $("#profile").show();
}

function noSuchUser(username) {
    //3. set the elements such that a suitable message is displayed
    $("#h2id").text("Sorry, No Such User '"+username +"' Exists");
    $(".avatar").text('');
    $("#profile").show();
}


$(document).ready(function(){
    $(document).on('keypress', '#username', function(e){
        $("#profile").hide();
        //check if the enter(i.e return) key is pressed
        if (e.which == 13) {
            //get what the user enters
            username = $(this).val();
            //reset the text typed in the input
            $(this).val("");
            //get the user's information and store the respsonse
            getGithubInfo(username);
        }
    })
});
