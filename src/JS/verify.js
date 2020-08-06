function verify_f() {
    let notAnswered = [];
    let wrong = false;
    for (let i = 0; i < sections.length; i++) {
        if (isMultiChoice(sections[i])) {
            let isAnswered = false;
            let options = sections[i].getElementsByClassName("freebirdFormviewerComponentsQuestionRadioChoice");
            for (let option of options) {
                if (option.querySelector('.appsMaterialWizToggleRadiogroupEl').classList.contains('isChecked')) {
                    isAnswered = true;   
                    if (option.querySelector(".button").innerText == 'Undo' || option.querySelector(".button").innerText == 'Desfazer') {
                        wrong = true;
                        let ptErr = `Opa! A questão ${i+1} está respondida mas a alternativa escolhida está riscada...`;
                        let enErr = `Oops! Question ${i+1} is answered but the chosen option is risked...`;
                        let error = language == 'pt' ? ptErr : enErr;
                        alert(error);
                    }
                }                
            } 
            if (!isAnswered) 
                notAnswered.push(i+1);
        } else if (isCheckBox(sections[i])) {
            let isAnswered = false;
            let options = sections[i].getElementsByClassName('freebirdFormviewerComponentsQuestionCheckboxCheckbox');
            for (let option of options) {
                if (option.querySelector('.quantumWizTogglePapercheckboxEl').classList.contains('isChecked')) {
                    isAnswered = true;
                    if (option.querySelector(".button").innerText == 'Undo' || option.querySelector(".button").innerText == 'Desfazer') {
                        wrong = true;
                        let ptErr = `Opa! A questão ${i+1} está respondida mas uma das alternativas escolhidas está riscada...`;
                        let enErr = `Oops! Question ${i+1} is answered but one of the chosen options is risked...`;
                        let error = language == 'pt' ? ptErr : enErr;
                        alert(error);
                    }
                }
            }
            if (!isAnswered) 
                notAnswered.push(i+1);
        }
    }
    if (!wrong) {
        if (notAnswered.length == 0) 
            alert(language == 'pt' ? 'Todas as questões de múltipla escolha respondidas!' : 'All multiple choice questions are answered!');
        else {
            string = '';
            for (let q of notAnswered) {
                string += `${q}, `
            }
            string = string.substring(0, string.length - 2);
            let ptErr = `As seguintes questões de múltipla escolha não foram respondidas: ${string}`
            let enErr = `The following multiple choice questions haven't been answered: ${string}`
            let error = language == 'pt' ? ptErr : enErr;
            alert(error);
        }
    }
}