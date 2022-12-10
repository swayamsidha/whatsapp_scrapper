//open the group info
var openWAGroup = document.evaluate('//*[@id="main"]/header/div[2]', document, null,  XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue
var checkGroupInfoOpen = document.evaluate('//*[@id="app"]//div[contains(text(), "Group info")]', document, null,  XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue
if (!checkGroupInfoOpen){
    openWAGroup.click()
}
//Click the more Contacts button
var btnClick_more = document.evaluate('//*[@id="app"]//span[@data-icon="down"]', document, null,  XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue
if(btnClick_more) {
    btnClick_more.click()
}

//SELECT ALL PARTICIPANTS ELEMENT
var obj = document.querySelector('[title="Exit group"]').parentNode.previousSibling.lastChild.firstChild.firstChild.childNodes
console.log('started getting data')
console.log(obj)
var data = [];

setTimeout(function() {
	for (var i = 0; i < obj.length; i++) {

        //GET PHONE NUMBER OR NAME IF ALREADY IN CONTACT
		var namenum = obj[i].querySelector('[dir="auto"]').innerText;
		console.log(namenum)	
		
		//get screen name 
		var screenName = '';
		try { screenName = obj[i].querySelector('[tabindex="-1"]').firstChild.lastChild.lastChild.lastChild.querySelector('[dir="auto"]').outerText; }
		catch (err) { 
			screenName = 'IN_CONTACTS'; 
            }
		data[i] = [screenName, namenum];
	}

	var arrData = typeof data != 'object' ? JSON.parse(data) : data;
	fetch('http://localhost:8080/api/saveContacts', {
		method: 'POST',
		mode: 'cors',
		cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
		credentials: 'same-origin', // include, *same-origin, omit
		headers: {
		'Content-Type': 'application/json'
		// 'Content-Type': 'application/x-www-form-urlencoded',
		},
		redirect: 'follow', // manual, *follow, error
		referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
		body: JSON.stringify(arrData)
	}).then((res) => {
		console.log(res)
	}).catch(err => console.log(err.message))
	console.log(arrData)
}, 5000);