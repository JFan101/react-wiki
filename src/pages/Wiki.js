import React, { Component }  from 'react';

class WikiPage extends React.Component {

    state = {
        pig_data: []
    }

    componentDidMount() {
        // Get the current wikipedia page from the url
        let currentWiki = this.getCurrentWikiPage();
        // Make the wikipedia API call then pass it along to get cleaned up and translated.
        fetch('https://en.wikipedia.org/w/api.php?&origin=*&format=json&action=query&prop=extracts&explaintext&redirects=1&limit=1&titles='+currentWiki)
        .then((response) => response.json())
        .then(wikiContent => {
            // Get the returned data from the Wikipedia API 
            let pages = wikiContent.query.pages;
            // Check if the API returned a page and if not warn the user
            if(wikiContent.query.pages['-1']){
                let error = [{'title' : 'No Page Found', 'main' : 'Please check that the URL exists on wikipedia.'}];
                this.setState({ pig_data: error});
                return;
            }
            // Get the key | Note we are limiting our return to 1 so this will return the single key
            let propertyName = Object.keys(pages);
            // Get the key | Note we are limiting our return to 1 so this will return the single key
            let actual_page = pages[Object.keys(pages)];
            // Clean up the returned data some
            let pig_data = [{'title' : actual_page.title, 'main' : actual_page.extract}];
            // **** trasnlate
            this.prepareStringForPigLatin(pig_data);
        });
    }

    /**
     * 
     * @returns string
     * @description returns the url slug that with a capitalized first letter to match wikipedia
     */
    getCurrentWikiPage(){
        // Get the current url path and remove the forward slash - we will use this value as our title value 
        let currentLocation = window.location.pathname.substring(1);
        // Wikipedia uses a capitalized first letter
        return this.capitalizeFirstLetter(currentLocation);
    }

    /**
     * 
     * @param {*} string 
     * @returns string 
     * @description Capitalizes the first letter of a string.
     */
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    /**
     * 
     * @param {object} pig_data 
     * @description Sets the strings words to an array so each word can get translated and cleans up some formatting from the API
     */
    prepareStringForPigLatin(pig_data){
        // Remove the "=" which comes from the wikipedia API for the demo
        let main_content = pig_data[0].main.split('=').join('');
        // Put each word into an array
        main_content = main_content.split(' ');
        let title = pig_data[0].title.split(' ');
        // Setup the data
        let clean_data = [{'title': title, 'main_content': main_content}]
        // Send the data for translation
        this.convertToPigLatin(clean_data);
    }
    
    /**
     * 
     * @param {object} pig_data 
     * @description Conversts an array of workds to pig latin then puts them back to a string.
     */
    convertToPigLatin(pig_data){
        // empty array to build the 
        let pigLatin = [];
        // loop the main contnet and start to convert each word
        for(let word of pig_data[0].main_content){
            word = word.toLowerCase(); // set everything to lowercase to make detecting easier
            let vowel = word.search(/[aeiuo]/); // search for vowels using regex - this brings the index of the first letter found
            switch (vowel){
                // If the word starts with a vowel (Index 0) add way to the word.
                case 0: 
                    word = word+"way"; 
                break;
                // If no vowels are found just add "ay" to the end of the string
                case -1: 
                    word = word+"ay"; 
                break;
                // For everything else get all the letters up until the first vowl and move them to the end of the string and add "ay"
                default :
                console.log('case else');
                    // Use regex to grah all of the letters before the first vowl the add them at the end plus "ay"
                    word = word.replace(/([^aeiou]*)([aeiou])(\w+)/, "$2$3$1ay");
                break;
            }
            pigLatin.push(word);
        }
        // Setup the view data and join the pigLatin array 
        let view_data = [{'title': pig_data[0].title, 'main' : pigLatin.join(" ")}];
        // set the state
        this.setState({ pig_data: view_data});
    }

    render() {
        return (
            <div>
                {this.state.pig_data.map((pig) => (
                    <div key={1}>
                        <h1>{pig.title}</h1><br></br>
                        <p>{pig.main}</p>
                    </div>
                ))}
            </div>
        )
    }
}

export default WikiPage;