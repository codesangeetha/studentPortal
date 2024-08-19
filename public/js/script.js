function btnFn() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    var flag = 0;

    if (username == "") {
        document.getElementById("div1").innerHTML = "Enter Username";
        flag =1;
    }else{
        document.getElementById("div1").innerHTML = "";
    }

    if (password == "") {
        document.getElementById("div2").innerHTML = "Enter Password";
        flag = 1;
    }else{
        document.getElementById("div2").innerHTML = "";
    }

    if(flag == 1){
        return false;
    }
    return true;
}
