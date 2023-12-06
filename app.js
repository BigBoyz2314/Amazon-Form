initMultiStepForm();

function initMultiStepForm() {
    const progressNumber = document.querySelectorAll(".step").length;
    const slidePage = document.querySelector(".slide-page");
    const giftField = document.querySelector("#gift-field");
    const submitBtn = document.querySelector(".submit");
    const next = document.querySelector("#next");
    const review = document.querySelector("#review");
    const progressText = document.querySelectorAll(".step p");
    const progressCheck = document.querySelectorAll(".step .check");
    const bullet = document.querySelectorAll(".step .bullet");
    const pages = document.querySelectorAll(".page");
    const nextButtons = document.querySelectorAll(".next");
    const prevButtons = document.querySelectorAll(".prev");
    const stepsNumber = pages.length;
    const lastStep = stepsNumber; // Store the last step number

    if (progressNumber !== stepsNumber) {
        console.warn(
            "Error, the number of steps in the progress bar does not match the number of pages"
        );
    }

    document.documentElement.style.setProperty("--stepNumber", stepsNumber);

    let current = 1;
    
    for (let i = 0; i < nextButtons.length-1; i++) {
        nextButtons[i].addEventListener("click", function (event) {
          event.preventDefault();
    
          // Get the selected radio value
          const selectedRadioValue = document.querySelector('input[name="satisfaction"]:checked').value;
    
          switch (current) {
            case 1:
              switch (selectedRadioValue) {
                case "Very Satisfied":
                case "SomeWhat Satisfied":
                  // Proceed as normal
                  inputsValid = validateInputs(this);

                  //Insert your link where https://www.amazon.com/ is
                  next.setAttribute("value", "https://www.amazon.com/")
                  submitBtn.setAttribute('value', 'CLICK TO POST A REVIEW ON AMAZON')
    
                  if (inputsValid) {
                    slidePage.style.marginLeft = `-${(100 / stepsNumber) * current}%`;
                    bullet[current - 1].classList.add("active");
                    progressCheck[current - 1].classList.add("active");
                    progressText[current - 1].classList.add("active");
                    current += 1;
    
                    if (current === lastStep) {
                      bullet[lastStep - 1].classList.add("active");
                      progressCheck[lastStep - 1].classList.add("active");
                      progressText[lastStep - 1].classList.add("active");
                    }
                  }
                  break;
    
                default:
                  inputsValid = validateInputs(this);
    
                  if (inputsValid) {
                    slidePage.style.marginLeft = `-${(100 / stepsNumber) * current}%`;
                    bullet[current - 1].classList.add("active");
                    progressCheck[current - 1].classList.add("active");
                    progressText[current - 1].classList.add("active");
                    giftField.remove();
                    review.innerHTML = "Review / Comments (Minimum 25 characters)";
                    current += 1;

    
                    if (current === lastStep) {
                      bullet[lastStep - 1].classList.add("active");
                      progressCheck[lastStep - 1].classList.add("active");
                      progressText[lastStep - 1].classList.add("active");
                    }
                  }
              }
              break;
    
            // Add more cases for other steps if needed
            default:
              // Proceed as normal for other steps
              inputsValid = validateInputs(this);
    
              if (inputsValid) {
                slidePage.style.marginLeft = `-${(100 / stepsNumber) * current}%`;
                bullet[current - 1].classList.add("active");
                progressCheck[current - 1].classList.add("active");
                progressText[current - 1].classList.add("active");
                current += 1;
    
                if (current === lastStep) {
                  bullet[lastStep - 1].classList.add("active");
                  progressCheck[lastStep - 1].classList.add("active");
                  progressText[lastStep - 1].classList.add("active");
                }
              }
              break;
          }
            
        });
      }

    for (let i = 0; i < prevButtons.length; i++) {
        prevButtons[i].addEventListener("click", function (event) {
            event.preventDefault();
            slidePage.style.marginLeft = `-${
                (100 / stepsNumber) * (current - 2)
            }%`;
            bullet[current - 2].classList.remove("active");
            progressCheck[current - 2].classList.remove("active");
            progressText[current - 2].classList.remove("active");
            current -= 1;
        });
    }

    submitBtn.addEventListener("click", function () {
      bullet[current - 1].classList.add("active");
      progressCheck[current - 1].classList.add("active");
      progressText[current - 1].classList.add("active");
      current += 1;
      const selectedRadioValue = document.querySelector('input[name="satisfaction"]:checked').value; // Moved the variable definition inside the function
      switch (selectedRadioValue) {
          case "Very Satisfied":
          case "SomeWhat Satisfied":
              alert("The Amazon gift card will be sent to the provided email address. Thank you for your feedback!");
              // window.open.href = ""; // Redirect to Google after showing the alert
              break;
          default:
              alert("Thank you for your feedback!");
              break;
      }
    });

    function validateInputs(ths) {
        let inputsValid = true;

        const inputs =
            ths.parentElement.parentElement.querySelectorAll("input");
        for (let i = 0; i < inputs.length; i++) {
            const valid = inputs[i].checkValidity();
            if (!valid) {
                inputsValid = false;
                inputs[i].classList.add("invalid-input");
            } else {
                inputs[i].classList.remove("invalid-input");
            }
        }
        return inputsValid;
    }
}
