/* director.js - Theatre blocking JavaScript */
"use strict";
console.log('director.js') // log to the JavaScript console.

/* UI functions below - DO NOT change them */

// Function to remove all blocking parts from current window
function removeAllBlocks() {
	blocks.innerHTML = '';
	setScriptNumber('');
}

/* This function returns a JavaScript array with the information about blocking displayed
in the browser window.*/
function getBlockingDetailsOnScreen() {
	
	// this array will hold 
	const allBlocks = []

	// go through all of the script parts and scrape the blocking informatio on the screen
	for (let i = 0; i < blocks.children.length; i++) {
		const block = {};  const blockElement = blocks.children[i]
		block.part = i + 1;
		block.text = blockElement.children[1].textContent;
		block.actors = []
		const actors = blockElement.children[2].children
		for (let j = 0; j < actors.length; j++) {
			block.actors.push([actors[j].textContent, actors[j].children[0].value])
		}
		allBlocks.push(block)
	}

	// Look in the JavaScript console to see the result of calling this function
	return allBlocks;
}

function setScriptNumber(num) {
	const scriptNum = document.querySelector('#scriptNum')
	scriptNum.innerHTML = `${num}`
}

function getScriptNumber(num) {
	return document.querySelector('#scriptNum').innerHTML
}

/* Function to add the blocking parts to browser window */
function addBlockToScreen(scriptText, startChar, endChar, actors, positions) {

	const scriptPartText = scriptText.slice(startChar, endChar + 1);
	const html = `<h4>Part ${blocks.children.length + 1}</h4>
      <p><em>"${scriptPartText}"</em></p>
      <div class='actors'></div>`

    const block = document.createElement('div')
    block.className = 'col-lg-12'
    block.innerHTML = html;
    for (let j = 0; j < actors.length; j++) {
    	const actorHtml = `${actors[j]}<input id='scriptText' style="width: 40px;" type="text" name="" value="${positions[j]}">`
    	const actorContainer = document.createElement('p');
    	actorContainer.innerHTML = actorHtml;
    	block.children[2].appendChild(actorContainer)
	} 

    console.log(block)
    blocks.appendChild(block)

}

/* UI functions above */


// Adding example script blocking 
// (the blocks should be removed from the screen when getting a script from the server)
addBlockToScreen(`That's it Claudius, I'm leaving!Fine! Oh..he left already..`, 0, 31, ['Hamlet', 'Claudius'], [5, 2])
addBlockToScreen(`That's it Claudius, I'm leaving!Fine! Oh..he left already..`, 32, 58, ['Hamlet', 'Claudius'], ['', 3])
setScriptNumber('example')
console.log(getBlockingDetailsOnScreen())

//////////////
// The two functions below should make calls to the server
// You will have to edit these functions.

function getBlocking() {
	const scriptNumber = scriptNumText.value;
	setScriptNumber(scriptNumber)
	console.log(`Get blocking for script number ${scriptNumber}`)

	console.log('Getting ')
	/// Make a GET call (using fetch()) to get your script and blocking info from the server,
	// and use the functions above to add the elements to the browser window.
	// (similar to actor.js)
    /* Add code below to get JSON from the server and display it appropriately. */
    const url = '/script/'+scriptNumber.toString();
    // A 'fetch' AJAX call to the server.
    fetch(url)
        .then((res) => {
            //// Do not write any code here
            return res.json()
            //// Do not write any code here
        })
        .then((jsonResult) => {
            // This is where the JSON result (jsonResult) from the server can be accessed and used.
            console.log('Result:', jsonResult)
            // Use the JSON to add a script part
            removeAllBlocks()
            for (var i = 0; i < jsonResult.start_char.length; i++) {
                var namelist= []
                var poslist= []
                console.log(jsonResult.actor_postion[i])
                var a=Object.keys(jsonResult.actor_postion[i])
                var result=jsonResult
                for(var j = 0; j < a.length; j++){
                    //console.log(result.actor_table[a[j]])
                    namelist.push(result.actor_table[a[j]])
                    //console.log(result.actor_postion[i][a[j]])
                    poslist.push(result.actor_postion[i][a[j]])
                }
                //console.log(namelist)
                //console.log(poslist)
                //console.log()
                addBlockToScreen(jsonResult.script_text, jsonResult.start_char[i], jsonResult.end_char[i], namelist,poslist)
            }
        }).catch((error) => {
        // if an error occured it will be logged to the JavaScript console here.
        console.log("An error occured with fetch:", error)
        })

}

function changeScript() {
	// You can make a POST call with all of the 
	// blocking data to save it on the server

	const url = '/script';
    var detail=getBlockingDetailsOnScreen()
    var  blocking=[]
    var script=''
    for(var i=0;i<detail.length;i++) {
        console.log(detail[i].actors)
        blocking.push(detail[i].actors)
        console.log(detail[i]["text"])
        script=script.concat(detail[i]["text"])
    }
    console.log(blocking)
    console.log(script)
    // The data we are going to send in our request
    // It is a Javascript Object that will be converted to JSON
    let data = {
    	scriptNum: getScriptNumber(),
    	// What else do you need to send to the server?
        script  : script,
        blocking: blocking

    }

    // Create the request constructor with all the parameters we need
    const request = new Request(url, {
        method: 'post', 
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
    });

    // Send the request
    fetch(request)
    	.then((res) => { 
    		//// Do not write any code here
    		// Logs success if server accepted the request
    		//   You should still check to make sure the blocking was saved properly
    		//   to the text files on the server.
    		console.log('Success') 
	        return res.json()
	        ////
	    })
	    .then((jsonResult) => {
	    	// Although this is a post request, sometimes you might return JSON as well
	        console.log('Result:', jsonResult)

	    }).catch((error) => {
	    	// if an error occured it will be logged to the JavaScript console here.
	        console.log("An error occured with fetch:", error)
	    })
}


