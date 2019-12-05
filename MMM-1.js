/* Magic Mirror
 * Module: MMM-1
 *
 * By Mykle1
 * MIT Licensed.
 */
Module.register("MMM-1", {
	// Default module config.
	defaults: {
		updateInterval: 5 * 60 * 1000, // set in config.js
		animationSpeed: 3000,
	},
	wrapper: null,
	currentWord :0,
	timer:null,
	words:null,
	first:true,

	start: function() {
		self = this;
		this.url = "https://media.giphy.com/media/l9eTgC1GpyEZq/giphy.gif";

		/*    // ADDED: Schedule update timer
        var self = this;
        setInterval(function() {
            self.updateDom(self.config.animationSpeed || 0);
        }, this.config.updateInterval); */

	},

	getStyles: function() {
		return ["MMM-1.css"];
	},

	// Override dom generator.
	getDom: function() {
		if(this.wrapper==null){
			this.wrapper = document.createElement("div");
			this.wrapper.id="wrapper";
			this.wrapper.innerHTML="<div class=\"text\">"+
					"<p>Nachos are</p> "+
					"<p> "+
						"<span class=\"word wisteria\">tasty.</span>"+
						"<span class=\"word belize\">wonderful.</span>"+
						"<span class=\"word pomegranate\">fancy.</span>"+
						"<span class=\"word green\">beautiful.</span>"+
						"<span class=\"word midnight\">cheap.</span>"+
					"</p>"+
				"</div>";
		}

		if(this.timer==null)
		{this.timer=setInterval(()=>{this.getWords();}, 4000);}

		return this.wrapper;
	},
	getWords: function (){

		this.words = this.wrapper.getElementsByClassName("word");
		if(this.words.length>0 && this.first){
			this.first=false;
			let theWord=this.words[this.currentWord];
			theWord.style.opacity = 1;
			for (let word of  this.words) {
				this.splitLetters(word);
			}
		}
		this.changeWord(this.words.length>0);

	}	,
	changeWord: function (haveWords) {
		if(haveWords){
			var cw = this.words[this.currentWord];
			var nw = (this.currentWord == this.words.length-1 )? this.words[0] : this.words[this.currentWord+1];
			for (var i = 0; i < cw.childElementCount; i++) {
				this.animateLetterOut(cw, i);
			}

			for (var i = 0; i < nw.childElementCount; i++) {
				nw.childNodes[i].className = "letter behind";
				nw.childNodes[0].parentElement.style.opacity = 1;
				this.animateLetterIn(nw, i);
			}

			this.currentWord = (this.currentWord == this.words.length-1) ? 0 : this.currentWord+1;

		}
	},

	animateLetterOut: function (cw, i) {
		setTimeout(() => {
			cw.childNodes[i].className = "letter out";
		}, i*80);
	},

	animateLetterIn: function (nw, i) {
		setTimeout(function() {
			nw.childNodes[i].className = "letter in";
		}, 340+(i*80));
	},

	splitLetters: function (word) {
		var content = word.innerHTML;
		word.innerHTML = "";
		for (var i = 0; i < content.length; i++) {
			var letter = document.createElement("span");
			letter.className = "letter";
			letter.innerHTML = content.charAt(i);
			word.appendChild(letter);
		}
	},

});
