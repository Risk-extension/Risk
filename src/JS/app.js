const divs = document.getElementsByClassName("freebirdFormviewerComponentsQuestionRadioChoice");
const texts = document.getElementsByClassName("docssharedWizToggleLabeledLabelText");
const sections = document.getElementsByClassName('freebirdFormviewerComponentsQuestionBaseRoot');
const bottomDiv = document.querySelector('.freebirdFormviewerViewNavigationButtonsAndProgress');
const footer = document.querySelector('.freebirdFormviewerViewFooterDisclaimer');
const statements = document.getElementsByClassName('freebirdFormviewerComponentsQuestionBaseHeader');
const questionsPerSection = divs.length / sections.length;
const stripe = document.querySelector(".freebirdSolidBackground");
const bg_color = getComputedStyle(stripe).backgroundColor;
const submit = document.querySelector('.freebirdFormviewerViewNavigationButtons');
const content = document.querySelector('.freebirdFormviewerViewFormContent');

const interval = setInterval(() => {
    if (texts) {
        setup();
        clearInterval(interval);
    }
}, 1000);

/* Function to create the "Riscar" buttons, set their onclick function to risk/unrisk the text and enumerate the questions */

function setup() {
    const language = submit.innerText.toLowerCase() == 'enviar' ? 'pt' : 'en';

    const ad = document.createElement('h3');
    const verify = document.createElement('div');
    verify.classList.add('verify');

    document.getElementsByClassName("freebirdThemedFilledButtonM2")[0].style.backgroundColor = bg_color;
    submit.style.marginRight = '445px'

    let ptAd = 'Extensão Risk criada por Pedro Queiroz & Lucca Nunes';
    let enAd = 'Risk extension created by Pedro Queiroz & Lucca Nunes';
    ad.innerHTML = language == 'pt' ? ptAd : enAd;
    footer.appendChild(ad);

    verify.textContent = language == 'pt' ? 'Verificar' : 'Verify';
    verify.style.backgroundColor = bg_color;
    verify.classList.add('button');
    verify.style.alignSelf = 'flex-start';
    // bottomDiv.appendChild(verify);
    bottomDiv.insertBefore(verify, submit);

    const buttons = document.getElementsByClassName('button');
    const radios = document.getElementsByClassName('appsMaterialWizToggleRadiogroupEl');

    verify.onclick = () => {
        let count = 0;
        let answered = new Array(sections.length);
        for (let i = 0; i < radios.length; i++) {
            if (radios[i].classList.contains('isChecked')) {
                count++;
                answered[Math.floor(i / questionsPerSection)] = 1;
            }
        }
        let wrong = false;
        for (let i = 0; i < radios.length; i++) {
            if (radios[i].classList.contains('isChecked') && (buttons[i].textContent == 'Undo' || buttons[i].textContent == 'Desfazer')) {
                wrong = true;
                let ptErr = `Opa! A questão ${Math.floor(i / questionsPerSection) + 1} está respondida mas a alternativa escolhida está riscada...`;
                let enErr = `Oops! Question ${Math.floor(i / questionsPerSection) + 1} is answered but the chosen option is risked...`;
                let error = language == 'pt' ? ptErr : enErr;
                alert(error);
            }
        }
        if (!wrong) {
            if (count === sections.length) {
                let ptErr = `Tudo certo!`;
                let enErr = `All good!`;
                let error = language == 'pt' ? ptErr : enErr;
                alert(error);
            } else {
                string = '';
                for (let i = 0; i < sections.length; i++) {
                    if (typeof (answered[i]) == 'undefined') {
                        string += i + 1 + ', ';
                    }
                }
                string = string.substring(0, string.length - 2);
                let ptErr = `As seguintes questões não foram respondidas: ${string}`
                let enErr = `The following questions haven't been answered: ${string}`
                let error = language == 'pt' ? ptErr : enErr;
                alert(error);
            }
        }
    }

    for (let i = 0; i < divs.length; i++) {
        if (i % questionsPerSection == 0) {
            let index = Math.floor(i / questionsPerSection);
            let n = document.createElement('div');
            n.textContent = index + 1;
            n.classList.add('numeration');
            n.style.backgroundColor = bg_color;
            n.style.border = `1px solid ${bg_color}`;
            sections[index].insertBefore(n, statements[index]);
        }
        let button = document.createElement('div');
        button.textContent = language == 'pt' ? 'Riscar' : 'Risk';
        button.style.backgroundColor = bg_color;
        button.classList.add('button')
        let risked = false; // i know it's not a word
        button.onclick = () => {
            if (!risked) {
                risked = true;
                texts[i].style.textDecoration = 'line-through';
                texts[i].style.opacity = '0.5';
                button.textContent = language == 'pt' ? 'Desfazer' : 'Undo';
            } else {
                risked = false;
                texts[i].style.textDecoration = 'initial';
                texts[i].style.opacity = '1';
                button.textContent = language == 'pt' ? 'Riscar' : 'Risk';
            }
        }
        divs[i].appendChild(button);
    }
    // * RESPONSIVITY JS EH AKI OH  
    window.onresize = () => {
        if (window.innerWidth <= 503) {
            submit.style.marginRight = `${260 * window.innerWidth / 503}px`;
        } else if (window.innerWidth <= 519) {
            submit.style.marginRight = `${280 * window.innerWidth / 519}px`;
        } else if (window.innerWidth <= 545) {
            submit.style.marginRight = `${300 * window.innerWidth / 545}px`;
        } else if (window.innerWidth <= 564) {
            submit.style.marginRight = `${320 * window.innerWidth / 564}px`;
        } else if (window.innerWidth <= 588) {
            submit.style.marginRight = `${340 * window.innerWidth / 588}px`;
        } else if (window.innerWidth <= 617) {
            submit.style.marginRight = `${365 * window.innerWidth / 617}px`;
        } else if (window.innerWidth <= 660) {
            submit.style.marginRight = `${400 * window.innerWidth / 660}px`;
        } else if (window.innerWidth <= 696) {
            submit.style.marginRight = `${435 * window.innerWidth / 696}px`;
        } else {
            submit.style.marginRight = '445px'
        }
    }
}



