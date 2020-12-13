const inquirer = require("inquirer");
const fs = require("fs");
const axios = require("axios");

const questions = [
	{
		type: "input",
		name: "gitHubUserName",
		message: "What is your github user name?",
	},
	{
		type: "input",
		name: "title",
		message: "What is your project title?",
	},
	{
		type: "input",
		name: "description",
		message: "Describe your project?",
	},
	{
		type: "input",
		name: "tableOfContents",
		message: "Enter your Table of content?",De
	{
		type: "input",
		name: "installation",
		message: "How to install your project?",
	},
	{
		type: "input",
		name: "usage",
		message: "How to use your project?",
	},
	{
		type: "input",
		name: "licence",
		message: "Please provide your license information?",
	},
	{
		type: "input",
		name: "contributing",
		message: "who contributed on this project?",
	},
	{
		type: "input",
		name: "tests",
		message: "What is the testing method for your project?",
	},
];

//  write file function
function writeReadmeFile(file, answ) {
	fs.writeFile(file, answ.join(""), function (err) {
		if (err) {
			console.log(err);
		}
		console.log("readMeFile created");
	});
}
function ask() {
	inquirer.prompt(questions).then(function (data) {
		let gitHubUserName = data.gitHubUserName;
		const queryUrl = `https://api.github.com/users/${gitHubUserName}`;
		axios.get(queryUrl).then(function (res) {
			writeReadmeFile("README.md", [
				"# " + data.title + "\n",
				"## Developer bio" +
					"\n" +
					`![alt text](${res.data.avatar_url} "Profile picture")` +
					"\n\n",
				res.data.bio + "\n",
				"## Project description" + "\n\n" + data.description + "\n\n",
				"## Table of content" + "\n" + data.tableOfContents + "\n\n",
				"## Installation" + "\n" + data.installation + "\n\n",
				"## Usage" + "\n" + data.usage + "\n\n",
				"## License" + "\n" + data.licence + "\n\n",
				"## Contributing" + "\n" + data.contributing + "\n\n",
				"## Tests" + "\n" + data.tests,
			]);
		});
	});
}
ask();
