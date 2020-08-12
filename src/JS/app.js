const divs = document.getElementsByClassName("freebirdFormviewerComponentsQuestionRadioChoice");
const checkBoxDivs = document.getElementsByClassName("freebirdFormviewerComponentsQuestionCheckboxCheckbox");
const texts = document.getElementsByClassName("docssharedWizToggleLabeledLabelText");
const sections = document.getElementsByClassName("freebirdFormviewerComponentsQuestionBaseRoot");
const bottomDiv = document.querySelector(".freebirdFormviewerViewNavigationLeftButtons");
// const bottomDiv = document.querySelector('.freebirdFormviewerViewNavigationButtonsAndProgress');
//const bottomDiv = document.querySelector('.freebirdFormviewerViewNavigationButtons');
const footer = document.querySelector(".freebirdFormviewerViewFooterDisclaimer");
const statements = document.getElementsByClassName("freebirdFormviewerComponentsQuestionBaseHeader");
const questionsPerSection = Math.round(divs.length / sections.length);
const stripe = document.querySelector(".freebirdSolidBackground");
const bg_color = getComputedStyle(stripe).backgroundColor;
// const submit = document.querySelector('.freebirdFormviewerViewNavigationButtons');
const submit = document.querySelector(".freebirdFormviewerViewNavigationSubmitButton");
const content = document.querySelector(".freebirdFormviewerViewFormContent");
const pt_buttons = ["enviar", "próxima", "voltar"];
const language = pt_buttons.includes(bottomDiv.innerText.toLowerCase().split("\n")[0]) ? "pt" : "en";

const interval = setInterval(() => {
    if (texts) {
        clearInterval(interval);
        setup();
    }
}, 1000);

/* Function to create the "Riscar" buttons, set their onclick function to risk/unrisk the text and enumerate the questions */

function setup() {
    console.log("starting setup");
    const ad = document.createElement("h3");
    const verify = document.createElement("div");
    verify.classList.add("verify");
    if (document.querySelector(".freebirdThemedFilledButtonM2")) {
        document.querySelector(".freebirdThemedFilledButtonM2").style.backgroundColor = bg_color;
    }

    // submit.style.marginRight = '445px'
    bottomDiv.style.display = "flex";
    bottomDiv.style.justifyContent = "center";
    bottomDiv.style.alignItems = "center";
    verify.style.marginRight = "15px";
    verify.style.marginBottom = "0";

    let ptAd = "Extensão Risk criada por Pedro Queiroz & Lucca Nunes";
    let enAd = "Risk extension created by Pedro Queiroz & Lucca Nunes";
    ad.innerHTML = language == "pt" ? ptAd : enAd;
    footer.appendChild(ad);

    verify.textContent = language == "pt" ? "Verificar" : "Verify";
    verify.style.backgroundColor = bg_color;
    verify.classList.add("button");
    verify.style.alignSelf = "flex-start";
    // bottomDiv.insertBefore(verify, submit);
    bottomDiv.insertBefore(verify, submit);

    verify.onclick = verify_f;

    for (let i = 0; i < divs.length; i++) {
        let button = document.createElement("div");
        button.textContent = language == "pt" ? "Riscar" : "Risk";
        button.style.backgroundColor = bg_color;
        button.classList.add("button");
        let risked = false; // i know it's not a word
        button.onclick = () => {
            if (!risked) {
                risked = true;
                texts[i].style.textDecoration = "line-through";
                texts[i].style.opacity = "0.5";
                button.textContent = language == "pt" ? "Desfazer" : "Undo";
            } else {
                risked = false;
                texts[i].style.textDecoration = "initial";
                texts[i].style.opacity = "1";
                button.textContent = language == "pt" ? "Riscar" : "Risk";
            }
        };
        divs[i].appendChild(button);
    }
    for (let i = 0; i < checkBoxDivs.length; i++) {
        let button = document.createElement("div");
        button.textContent = language == "pt" ? "Riscar" : "Risk";
        button.style.backgroundColor = bg_color;
        button.classList.add("button");
        let risked = false; // i know it's not a word
        button.onclick = async () => {
            if (!risked) {
                risked = true;
                checkBoxDivs[i].querySelector(".docssharedWizToggleLabeledLabelWrapper").style.textDecoration = "line-through";
                checkBoxDivs[i].querySelector(".docssharedWizToggleLabeledLabelWrapper").style.opacity = "0.5";
                await new Promise((r) => setTimeout(r, 100));
                checkBoxDivs[i].querySelector(".quantumWizTogglePapercheckboxInnerBox").click();
                button.textContent = language == "pt" ? "Desfazer" : "Undo";
            } else {
                risked = false;
                checkBoxDivs[i].querySelector(".docssharedWizToggleLabeledLabelWrapper").style.textDecoration = "initial";
                checkBoxDivs[i].querySelector(".docssharedWizToggleLabeledLabelWrapper").style.opacity = "1";
                await new Promise((r) => setTimeout(r, 100));
                checkBoxDivs[i].querySelector(".quantumWizTogglePapercheckboxInnerBox").click();
                button.textContent = language == "pt" ? "Riscar" : "Risk";
            }
        };
        checkBoxDivs[i].appendChild(button);
    }
    (function enumerate() {
        for (let i = 0; i < sections.length; i++) {
            let n = document.createElement("div");
            n.textContent = i + 1;
            n.classList.add("numeration");
            n.style.backgroundColor = bg_color;
            n.style.border = `1px solid ${bg_color}`;
            try {
                sections[i].insertBefore(n, statements[i]);
            } catch (e) {
                console.log(e);
            }
        }
        const nums = document.querySelectorAll(".numeration");
        if (nums[0].innerText != 1) {
            for (let i = 0; i < nums.length; i++) {
                nums[i].innerText = i + 1;
            }
        }
    })();
    // * RESPONSIVITY JS EH AKI OH
    // window.onresize = () => {
    //     if (window.innerWidth <= 503) {
    //         submit.style.marginRight = `${260 * window.innerWidth / 503}px`;
    //     } else if (window.innerWidth <= 519) {
    //         submit.style.marginRight = `${280 * window.innerWidth / 519}px`;
    //     } else if (window.innerWidth <= 545) {
    //         submit.style.marginRight = `${300 * window.innerWidth / 545}px`;
    //     } else if (window.innerWidth <= 564) {
    //         submit.style.marginRight = `${320 * window.innerWidth / 564}px`;
    //     } else if (window.innerWidth <= 588) {
    //         submit.style.marginRight = `${340 * window.innerWidth / 588}px`;
    //     } else if (window.innerWidth <= 617) {
    //         submit.style.marginRight = `${365 * window.innerWidth / 617}px`;
    //     } else if (window.innerWidth <= 660) {
    //         submit.style.marginRight = `${400 * window.innerWidth / 660}px`;
    //     } else if (window.innerWidth <= 696) {
    //         submit.style.marginRight = `${435 * window.innerWidth / 696}px`;
    //     } else {
    //         submit.style.marginRight = '445px'
    //     }
    // }
}
