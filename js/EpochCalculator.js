const ProcessEpochInput = function(){
	
	// Would've used querySelector but no jQuery
	let inputEpochValue = document.getElementById('epochInput').value;
	
	//Even if nothing is entered by the user, this ensures that inputEpochValue defaults to 0
	if(inputEpochValue == ""){ inputEpochValue = 0; }
		
	//This is the current epoch time without milliseconds
	const nowEpochTime = Math.floor(new Date().getTime() / 1000.0);
	
	//Use this to test "Very soon"
	//inputEpochValue = nowEpochTime + 59;
		
	//Use this to test "Just now"
	//inputEpochValue = nowEpochTime - 59;	
	
	let output = "";	

	if(inputEpochValue > nowEpochTime){

		if((inputEpochValue - nowEpochTime) < 60){ 
			output += `Very soon`;
		}
		else {		
			ConvertTimes(inputEpochValue - nowEpochTime);
			output += `In ${FormatResult()}`;
		}
	}
	else if(inputEpochValue <= nowEpochTime){

		if((nowEpochTime - inputEpochValue) < 60){ 
			output += `Just now`;
		}
		else {
			ConvertTimes(nowEpochTime - inputEpochValue);	
			output += `${FormatResult()} ago`;
		}
	}
	document.getElementById("epochOutput").innerHTML = `${output}.`;
}

let secs, mins, hours, days, weeks;

// Packed all math into one function to reduce redundancy
const ConvertTimes = function(calculation){

	//This is easier and cleaner than flooring, flooring and more flooring 
	mins =  Math.floor(calculation / 60);
	hours = Math.floor(mins / 60);
	days = Math.floor(hours / 24);
	weeks = Math.floor(days / 7);
		
	secs = calculation - (mins * 60);
	mins = mins - (hours * 60);
	hours = hours - (days * 24);
	days = days - (weeks * 7);

	//console.log(`${OutputAll()}`);
}

const FormatResult = function(){
	
	if(weeks > 0){
		if(weeks == 1){	return `${weeks} week`;		}
		else{			return `${weeks} weeks`;	}
	}
	else if(days > 0){
		if(days == 1){	return `${days} day`;		}
		else{			return `${days} days`;		}
	}
	else if(hours > 0){
		if(hours == 1){	return `${hours} hours`;	}
		else{			return `${hours} hours`;	}
	}
	else {
		if(mins == 1){	return `${mins} minute`;	}
		else{			return `${mins} minutes`;	}
	}
}

// Testing function to see if this returns the same results as epoch101.com
const OutputAll = function(){
	return `${weeks} weeks, ${days} days, ${hours} hours, ${mins} minutes, ${secs} seconds.`;
}
