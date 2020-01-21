function showDetails(item) {
    item1 = document.getElementById("h4-1")
    item2 = document.getElementById("h4-2")
    item3 = document.getElementById("h4-3")
        // console.log("className"+item1.className)
    if (item == 1) {
        if (item1.className == "") {
            item1.className = "d-none"
        } else {
            item1.className = ""
            item2.className = "d-none"
            item3.className = "d-none"
        }
    } else if (item == 2) {
        if (item2.className == "") {
            item2.className = "d-none"
        } else {
            item1.className = "d-none"
            item2.className = ""
            item3.className = "d-none"
        }
    } else {
        if (item3.className == "") {
            item3.className = "d-none"
        } else {
            item1.className = "d-none"
            item2.className = "d-none"
            item3.className = ""
        }
    }
}
id = document.getElementById("message")

function voiceRecord() {
    $.ajax({
        url: "/speechToText",
        type: "GET",
    }).done((res) => {
        messages.push(res.ques);
        messages.push(res.ans);

        var html1 = "<div class='right'>	<div>" + res.ques + " </div>	</div>";
        var html2 = "<div class='left'>	<div> " + res.ans + " </div>	</div>";
        $(".message").append(html1);
        $(".message").append(html2);

        id.scrollTop = id.scrollHeight;
        console.log("message", messages)

    });

}
var messages = [];

function myFunction() {

    var text = $("#text").val();
    messages.push(text);
    document.getElementById("text").value = "";
    // console.log("text",text)
    if (text == "") {
        return
    }
    $.ajax({
        url: "/send_and_receive",
        type: "POST",
        data: { text: text }
    }).done((res) => {
        messages.push(res);

        for (i = messages.length - 2; i < messages.length; i++) {
            if (i % 2 == 1) {
                var html = "<div class='left'>	<div>" + messages[i] + " </div>	</div>";
            } else {
                var html = "<div class='right'>	<div> " + messages[i] + " </div>	</div>";
            }
            $(".message").append(html);
            id.scrollTop = id.scrollHeight;
        }
    });
}