const characterAmountRange = document.getElementById('characterAmountRange')
const characterAmountNumber = document.getElementById('characterAmountNumber')
const includeUppercaseElement = document.getElementById('includeUppercase')
const includeNumberElement = document.getElementById('includeNumber')
const includeSpecCharElement = document.getElementById('includeSpecChar')
const form = document.getElementById('passwordGeneratorForm')
const DisplayPassword = document.getElementById('displayPassword')

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

characterAmountNumber.addEventListener('input', syncCharacterAmount);
characterAmountRange.addEventListener('input', syncCharacterAmount);

form.addEventListener('submit', e=> {
    e.preventDefault()
    const characterAmount = characterAmountNumber.value
    const includeUppercase = includeUppercaseElement.checked
    const includeNumber = includeNumberElement.checked
    const includeSpecChar = includeSpecCharElement.checked
    const password = generatePassword(characterAmount, includeUppercase, includeNumber, includeSpecChar)
    DisplayPassword.innerText = password
})

function generatePassword(characterAmount, includeUppercase, includeNumber, includeSpecChar) {
    let charCodes = LOWERCASE_CHAR_CODE
    if (includeUppercase) charCodes = charCodes.concat(UPPERCASE_CHAR_CODE)
    if (includeNumber) charCodes = charCodes.concat(NUMBER_CHAR_CODE)
    if (includeSpecChar) charCodes = charCodes.concat(SPECIAL_CHAR_CODE)

    const passwordCharacters = []
    for (let i = 0; i < characterAmount; i++) {
        const characterCode = charCodes[Math.floor(Math.random() * charCodes.length)]
        passwordCharacters.push(String.fromCharCode(characterCode))
    }
    return passwordCharacters.join('')
}

function arrayFromLowToHigh (low, high) {
    const array = []
    for (let i = low; i <= high; i++) {
        array.push(i)
    }
    return array;
}

function syncCharacterAmount(e) {
    const value = e.target.value
    characterAmountNumber.value = value
    characterAmountRange.value = value
}