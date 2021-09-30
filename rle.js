let fs = require("fs");
let arg = process.argv;
let i = 0, n = 1, x = 0;
let encodingString = "", decodeString = "";

fs.readFile(arg[2], (err, data) =>{
	if (err){
		console.error(err);
		return;
	}
	let line = data.toString();
	console.log("input data:" + line);
	while (i < line.length) 
	{
		while (line.charAt(i) == line.charAt(i + n))
			n++;
		let n1 = n;
		while (n > 255) 
		{
			n -= 255;
			encodingString += "#" + String.fromCharCode(255) + line.charAt(i);
		}
		if (n > 3) 
			encodingString += "#" + String.fromCharCode(n) + line.charAt(i);
		else if (line.charAt(i) == "#")
				encodingString += "#" + String.fromCharCode(n) + line.charAt(i);
		else 
		{
			while (x < n) 
			{
				encodingString += line.charAt(i);
				x += 1;
			}
		}
		i += n1;
		n = 1;
	}
	console.log("encoded string:" + encodingString);
	fs.writeFile("code.txt", encodingString, (err) => {
		if (err){
			console.err(err);
			return;
		}
	});
	i = 0;
	while (i < encodingString.length) 
	{
		if (encodingString[i] == "#") 
		{
			for (j = 0; j < encodingString[i+1].charCodeAt(0); j++) 
				decodeString += encodingString[i+2];
			i += 3;
		}
		else 
		{
			decodeString += encodingString[i];
			i += 1;
		}
	}
	console.log("dencoded string:" + decodeString);
	fs.writeFile("decode.txt", decodeString, (err) => {
		if (err){
			console.err(err);
			return;
		}
	});
});