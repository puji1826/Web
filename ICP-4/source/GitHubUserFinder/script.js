function getGithubInfo(gituser) {
    //1. Create an instance of XMLHttpRequest class and send a GET request using it.
    // The function should finally return the object(it now contains the response!)
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            showUser(JSON.parse(this.responseText));
        } else if (this.status == 404) {
            noSuchUser(gituser);
        }
    };
    xhttp.open("GET", "https://api.github.com/users/" + gituser, true);
    xhttp.send();
}

function showUser(gituser) {
    //2. set the contents of the h2 and the two div elements in the div '#profile' with the user content
    var link = "<a target='_blank' href='" + gituser.html_url + "'> URL </a>";
    $('.profilePic').attr("src", gituser.avatar_url);
    $('.card-title').html('<span>Name: </span>' + gituser.name +
        '</br><span>Id: </span>' +gituser.id +
        '</br><span>Public Repos: </span>' + gituser.public_repos +
        '</br><span>Created At: </span>' + gituser.created_at +
        '</br><span>Github URL: </span>' + link +
        '</br><span>Prof last Updated on: </span>' + gituser.updated_at +
        '</br><span>Bio: </span>' + gituser.bio +
        '</br><span>Blog: </span>' + gituser.blog + '</br><span>Location: </span>' + gituser.location)
    $('#profile').show();
}

function noSuchUser(username) {
    //3. set the elements such that a suitable message is displayed
    $("#error").text("Sorry, The user '" + username + "' does not exist");
    $('#profile').hide();
    $('#error').show();
}

$(document).ready(function () {
    $('#error').hide();
    $("#profile").hide();
    $("#find").click(function () {
        var gituser = $('#usr').val();
        getGithubInfo(gituser);
    })
});
