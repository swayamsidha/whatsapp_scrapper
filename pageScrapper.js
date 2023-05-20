document.addEventListener('DOMContentLoaded', function() {
  var scrapeButton = document.getElementById('scrapeButton');

  scrapeButton.addEventListener('click', function() {
    var groupName = document.getElementById('groupInput').value;
    alert(groupName)
    if (groupName) {
      chrome.tabs.create({ url: 'https://web.whatsapp.com/' }, function(tab) {
        alert(tab.id)
        chrome.tabs.executeScript(tab.id, { file: 'automateScrape.js' }, function() {
          // Pass the group name to the injected script
          chrome.tabs.sendMessage(tab.id, { groupName: groupName });
        });
      });
    }
  });
});
