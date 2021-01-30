function button(shift) {
  var num = parseInt(document.getElementById("number").value) + shift;
  var url = document.getElementById("urlText").value;
  url = url.replace("{}", String(num));
  document.getElementById("number").value = num;
  chrome.tabs.update({
    url: url
  });
}

window.onload = function() {
  chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    var url = tabs[0].url;
    var match = url.match(/(\d+)\D*$/)[1];
    url = url.replace(/\d+(\D*)$/, "{}$1");
    document.getElementById("number").value = match;
    document.getElementById("urlText").value = url;
  });

  document.getElementById("plusButton").addEventListener("click", function() {
    button(1);
  });
  document.getElementById("goButton").addEventListener("click", function() {
    button(0);
  });
  document.getElementById("minusButton").addEventListener("click", function() {
    button(-1);
  });
}
