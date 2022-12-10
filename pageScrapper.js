chrome.runtime.onMessage.addListener(function(request, sender) {
  if (request.action == "getSource") {
    message.innerText = request.source;
  }
});

function onWindowLoad() {

  var message = document.evaluate('//*[@id="app"]/div/div/div[5]/span/div/span/div/div/section/div[6]/div[2]/div/div', document, null, XPathResult.ANY_TYPE, null)
  //document.querySelector('');
  chrome.tabs.executeScript(null, {
    file: "getWAContacts.js"
  }, function() {
    // If you try and inject into an extensions page or the webstore/NTP you'll get an error
    console.log('executing script');
    if (chrome.runtime.lastError) {
      message.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
    }else{
      message.innerText = 'Scrapped Group Contacts..'
    }
  });
  message.innerText = 'Scrapped Group Contacts..'
}

window.onload = onWindowLoad;