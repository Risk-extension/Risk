function isMultiChoice(question) {
    return question.querySelector('.freebirdFormviewerComponentsQuestionRadioChoicesContainer') ? true : false;
}

function isCheckBox(question) {
    return question.querySelector('.freebirdFormviewerComponentsQuestionCheckboxRoot') ? true: false;
}