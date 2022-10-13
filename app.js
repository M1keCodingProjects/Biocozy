// Hooray! (derogatory)
const aaNamesSelectorsContainer = document.getElementById('nameSelectors-container');
const namesSelect               = aaNamesSelectorsContainer.children[0];
const acronymSelect             = aaNamesSelectorsContainer.children[1];
const letterSelect              = aaNamesSelectorsContainer.children[2];

const shuffleSelectOptions = selectObj => {
    const options = Array.from(selectObj.options);
    options.forEach(option => {
        const randomOption = options[Math.floor(Math.random() * options.length)];
        selectObj.insertBefore(randomOption, option);
    });
};

const shuffleNames = _=> {
    shuffleSelectOptions(namesSelect);
    shuffleSelectOptions(acronymSelect);
    shuffleSelectOptions(letterSelect);
};