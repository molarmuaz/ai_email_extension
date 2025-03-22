const observer = new MutationObserver(() => {
    Array.from(document.getElementsByClassName("aoT"))
        .filter(commentBox => !commentBox.hasAttribute("data-mutated"))
        .forEach(commentBox => {
            commentBox.setAttribute("data-mutated", "true");
            ai_button(commentBox);  // Add button to the commentBox (subject container)
        });
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});

const ai_button = (commentBox) => {
    clicked = false;
    const button = document.createElement("button");
    button.innerHTML = "AI";
    button.style.position = "absolute";  // Optional: make the button stick to the right side
    button.style.right = "10px";  // Optional: align the button to the right
    button.style.marginLeft = "10px";  // Optional: add some spacing
    button.addEventListener("click", () => {
        const suggestion = "<b>To:<br>Relation:<br>From:<br>Subject:<br>Mood:<br>What to include:<br>What not to include:<br><br></b>";
        if (!clicked)
        {
            const messageBody = document.querySelector('div[aria-label="Message Body"]');
            if (messageBody) {
                messageBody.innerHTML = `<p>${suggestion}</p>`;
            } else {
                console.error("Message body not found");
            }
            clicked = true;
        }
        else
        {
            //get text content and compare with suggestion and if its the same then display an error
            if (commentBox.textContent === suggestion)
            {
                alert("Fill in the fields before using the AI button");
                clicked = false;
            }
        }

    });

    // Instead of appending the button to the input field, append it to the subject line's container
    const subjectContainer = commentBox.closest(".aoD");  // The container around the subject line
    if (subjectContainer) {
        subjectContainer.appendChild(button);  // Append the button after the subject input
    } else {
        console.error("Subject container not found");
    }
};
