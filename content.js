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
    button.addEventListener("click", async () => {
        const suggestion = "<b>To:</b><br><b>Relation:<br>From:<br>Subject:<br>Mood:<br>How Long:<br>What to include(optional):<br>What not to include (optional):<br><br></b>";
        const compare = "To:Relation:From:Subject:Mood:How Long:What to include:What not to include:";
        const messageBody = document.querySelector('div[aria-label="Message Body"]');
        const subjBody = document.querySelector('input[name="subject"]');
        if (!clicked)
        {
            
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
            if (messageBody.textContent === compare)
            {
                console.log("Error: No changes made to the text");
                clicked = false;
            }
            else
            {
        
                try {
                    const email = await getEmailResponse(messageBody.textContent);
                    const { subject, emailContent } = extractEmailDetails(email);
                    messageBody.innerHTML = `<p>${emailContent}</p>`;
                    document.querySelector('input[name="subjectbox"]').setAttribute('dir', 'ltr');
                    subjBody.value = `${subject}`;
                    let event = new Event('input', { bubbles: true });
                    subjBody.dispatchEvent(event);
                    clicked = false;
                } catch (error) {
                    console.error("Error fetching email:", error);
                    messageBody.innerHTML = `<p>Error: Could not generate email.</p>`;
                    clicked = false;
                }
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

const getEmailResponse = async (userText) => {
    

    const prefix = "Write an email following these requirements, make the subject small. use <br> to end a line. Also just write the email and say nothing else(start the subject line with '[subject-for-email]:' and the email with '[the-email]:' and try to sound human): ";
    const prompt = userText;

    const promptText = `${prefix} ${prompt}`;
    
    try {
        answer = await response(promptText);
    } 
    catch (error) {
        console.log("Error: ", error);
    }

    return answer;

}

const response = async (promptText) => {
    const API_KEY = 'API_KEY';
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent`;
    try {
        const response = await fetch(`${API_URL}?key=${API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [
                            {
                                text: promptText
                            }
                        ]
                    }
                ],
                generationConfig: {
                    maxOutputTokens: 1000
                }
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error(`HTTP error! status: ${response.status} - ${response.statusText}`);
            console.error('Error details:', errorData);
            throw new Error('API request failed');
        }

        const data = await response.json();
        // Adjust the structure checking based on the actual response
        if (data.candidates && data.candidates.length > 0 && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts.length > 0) {
            return data.candidates[0].content.parts[0].text;
        } else {
            console.error('Unexpected API response structure:', data);
            return 'Error: Unexpected API response structure.';
        }
    } catch (error) {
        console.error('An error occurred:', error);
        return 'Error: Unable to retrieve response.';
    }
};

const extractEmailDetails = (text) => {
    // Regular expression to match the content after [subject-for-email]:
    const subjectMatch = text.match(/\[subject-for-email\]:\s*([\s\S]*?)(?=\[the-email\])/);
    // Regular expression to match the content after [the-email]:
    const emailContentMatch = text.match(/\[the-email\]:\s*([\s\S]*)/);

    // Extract the matched subject and email content, or set empty strings if not found
    const subject = subjectMatch ? subjectMatch[1].trim() : '';
    const emailContent = emailContentMatch ? emailContentMatch[1].trim() : '';

    return { subject, emailContent };
};
