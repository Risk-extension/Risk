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
    const ad = document.createElement('h3');
    const verify = document.createElement('div');
    verify.classList.add('verify');

    document.getElementsByClassName("freebirdThemedFilledButtonM2")[0].style.backgroundColor = bg_color;
    submit.style.marginRight = '445px'

    ad.innerHTML = 'Risk extension created by Pedro Queiroz & Lucca Nunes';
    footer.appendChild(ad);

    verify.textContent = 'Verificar';
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
            if (radios[i].classList.contains('isChecked') && buttons[i].textContent == 'Desfazer') {
                wrong = true;
                alert(`Opa! A questão ${Math.floor(i / questionsPerSection) + 1} está respondida mas a alternativa escolhida está riscada...`)
            }
        }
        if (!wrong) {
            if (count === sections.length) {
                alert('Tudo certo!');
            } else {
                string = '';
                for (let i = 0; i < sections.length; i++) {
                    if (typeof (answered[i]) == 'undefined') {
                        string += i + 1 + ', ';
                    }
                }
                string = string.substring(0, string.length - 2);
                alert(`As seguintes questões não foram respondidas: ${string}`);
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
        button.textContent = 'Riscar';
        button.style.backgroundColor = bg_color;
        button.classList.add('button')
        let risked = false; // i know it's not a word
        button.onclick = () => {
            if (!risked) {
                risked = true;
                texts[i].style.textDecoration = 'line-through';
                texts[i].style.opacity = '0.5';
                button.textContent = 'Desfazer'
            } else {
                risked = false;
                texts[i].style.textDecoration = 'initial';
                texts[i].style.opacity = '1';
                button.textContent = 'Riscar';
            }
        }
        divs[i].appendChild(button);
    }
}



