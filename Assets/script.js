// Const is used for absolute values of variables. They are primarily used in the global scope, but they can be used in the local scope.
// Let is used instead of var to declare values. Let variables are used in the local scope.

// These variables get the values from the password generator form. 
// So it gets the values of the number of characters selected, if numbers are included, if uppercase is included, and if special characters are included.
const characterAmountRange = document.getElementById('characterAmountRange')
const characterAmountNumber = document.getElementById('characterAmountNumber')
const includeUppercaseElement = document.getElementById('includeUppercase')
const includeNumberElement = document.getElementById('includeNumber')
const includeSpecCharElement = document.getElementById('includeSpecChar')
const form = document.getElementById('passwordGeneratorForm')
const DisplayPassword = document.getElementById('displayPassword')

// This syncs up the slider and the character number textbox in the number of characters section.
function syncCharacterAmount(e) {
    const value = e.target.value
    characterAmountNumber.value = value
    characterAmountRange.value = value
}
// This function generates an array from the low number to the high number. The loop starts from low and continues until it hits the high number.
// This function is used for the ASCII code arrays to put characters in the password that apply.
function arrayFromLowToHigh (low, high) {
    const array = []
    for (let i = low; i <= high; i++) {
        array.push(i)
    }
    return array;
}
// These values are for the ASCII character codes. It's simpler to gather all your characters by using the ASCII code system. 
// The numbers in the parentheses are the range of codes for lowercase letters, uppercase letters, and numbers.
// The Special Character section looks a little confusing, BUT the special characters in ASCII have multiple code ranges. 
// So to get all the special characters we concatenate all the ranges together.
const UPPERCASE_CHAR_CODE = arrayFromLowToHigh(65, 90)
const LOWERCASE_CHAR_CODE = arrayFromLowToHigh(97, 122)
const NUMBER_CHAR_CODE = arrayFromLowToHigh(48, 57)
const SPECIAL_CHAR_CODE = arrayFromLowToHigh(33, 47).concat(
    arrayFromLowToHigh(58, 64)
).concat(
    arrayFromLowToHigh(91, 96)
).concat(
    arrayFromLowToHigh(123,126)
)
// This event listener is looking for the input of the number of characters and the range the user selects.
characterAmountNumber.addEventListener('input', syncCharacterAmount);
characterAmountRange.addEventListener('input', syncCharacterAmount);
// This event triggers when you hit the select button. It looks for values that were checked, or not, in the checkboxes and the number of characters that was selected by the user.
// Then it generates the password.
// The lowercase e is a reference to an event object. So I use the first e for the event object of the entire event listener for the form submission. 
// I use e one more time to prevent the default so the page doesn't refresh when the generate password button is pushed.
form.addEventListener('submit', e => {
    e.preventDefault()
    const characterAmount = characterAmountNumber.value
    const includeUppercase = includeUppercaseElement.checked
    const includeNumber = includeNumberElement.checked
    const includeSpecChar = includeSpecCharElement.checked
    const password = generatePassword(characterAmount, includeUppercase, includeNumber, includeSpecChar)
    DisplayPassword.innerText = password
})
// this function generates the random password for the user.
function generatePassword(characterAmount, includeUppercase, includeNumber, includeSpecChar) {
    let charCodes = LOWERCASE_CHAR_CODE
    if (includeUppercase) charCodes = charCodes.concat(UPPERCASE_CHAR_CODE)
    if (includeNumber) charCodes = charCodes.concat(NUMBER_CHAR_CODE)
    if (includeSpecChar) charCodes = charCodes.concat(SPECIAL_CHAR_CODE)
// This loop runs each time based on the amount of characters that was selected by the user.
    const passwordCharacters = []
    for (let i = 0; i < characterAmount; i++) {
        const characterCode = charCodes[Math.floor(Math.random() * charCodes.length)]
        passwordCharacters.push(String.fromCharCode(characterCode))
    }
    return passwordCharacters.join('')
}
// This function resets the password generator back to 10 characters being selected by default, all checkboxes unchecked, and no text in the output box.
document.getElementById("reset").onclick = function() {
    document.getElementById('displayPassword').innerHTML = "";
 };