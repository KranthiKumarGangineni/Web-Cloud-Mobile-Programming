function getGithubInfo(user) {
    //1. Create an instance of XMLHttpRequest class and send a GET request using it. The function should finally return the object(it now contains the response!)
    var xhttp = new XMLHttpRequest();
    var url = "https://api.github.com/users/"+user;
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
    //2. set the contents of the h2 and the two div elements in the div '#profile' with the user content
    $("#h2id").text(user.login);
    $(".avatar").html("<img height='200' width='200' src='"+ user.avatar_url+"'/>");
    var link = "<a target='_blank' href='"+user.html_url+"'> URL </a>";
    $(".information").html("<label><u><strong>User Information</strong></u></label>" +
        "<br/><br/><label style='color: #4c4066'>Login Name : </label>"+ user.login
        +"<br/><label style='color: #4c4066'> Login ID : </label>"+ user.id
        +"<br/> <label style='color: #4c4066'>GitHub URL : </label>"+link
        +"<br/> <label style='color: #4c4066'>GitHub Public Repos Count : </label>"+ user.public_repos);
    $("#profile").show();
}

function noSuchUser(username) {
    //3. set the elements such that a suitable message is displayed
    $("#h2id").text("Sorry, No Such User '"+username +"' Exists");
    $(".avatar").text('');
    $(".information").html('');
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
