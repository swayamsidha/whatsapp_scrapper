setTimeout(function() {
              alert('starting...')
              var searchInput = document.querySelector('div [title="Search or start new chat"]');

              searchInput.focus();
              searchInput.value = '${groupName}';
              searchInput.dispatchEvent(new Event('input', { bubbles: true }));
              alert('searching')
              setTimeout(function() {
                var groupElement = document.querySelector('div [title="${groupName}"]');
                if (groupElement) {
                  groupElement.click();

                  setTimeout(function() {
                    var contactElements = document.querySelectorAll('div._3TgdY div._2aBzC span[dir="auto"]');
                    var contactNumbers = [];

                    contactElements.forEach(function(element) {
                      var phoneNumber = element.innerText;
                      var contactName = element.previousSibling.innerText;

                      if (phoneNumber && contactName) {
                        contactNumbers.push({ name: contactName, number: phoneNumber });
                      }
                    });

                    // Send the contact numbers back to the extension
                    //chrome.runtime.sendMessage({ contactNumbers: contactNumbers });
                    var arrData = typeof contactNumbers != 'object' ? JSON.parse(contactNumbers) : contactNumbers;
                    fetch('http://54.196.170.119:8090/api/saveContacts', {
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
                  }, 5000);
                }
              }, 5000);
            }, 5000);