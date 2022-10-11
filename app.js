// Hooray! (derogatory)
const lateralChainTextContainer = document.getElementById('lateralChainStructure');
const lateralChainStructure = [];
const groupAddingButtons = document.getElementsByClassName('btn-addGroup'); //dunno if needed

const addGroup = (groupName) => {
    lateralChainTextContainer.innerHTML += `-${groupName}`;
    lateralChainStructure.push(groupName);
};

const removeGroup = () => {
    lateralChainStructure.pop();
    lateralChainTextContainer.innerHTML = lateralChainStructure.length ? "-" : "";
    lateralChainTextContainer.innerHTML += lateralChainStructure.join("-");
}