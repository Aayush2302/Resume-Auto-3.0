chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === "fill_resume_data") {
    fillResumeData(message.data);
  }
});

function fillResumeData(data) {
  // Utility function to set value and trigger events
  function setValueAndTriggerEvents(element, value) {
    if (element) {
      element.value = value;
      element.dispatchEvent(new Event("input", { bubbles: true }));
      element.dispatchEvent(new Event("change", { bubbles: true }));
      element.dispatchEvent(new Event("blur", { bubbles: true }));
    }
  }

  // Set basic information fields
  setValueAndTriggerEvents(
    document.querySelector('input[placeholder="Name"]'),
    data.name
  );
  setValueAndTriggerEvents(
    document.querySelector('input[placeholder="Email"]'),
    data.email
  );
  setValueAndTriggerEvents(
    document.querySelector('input[placeholder="Phone no"]'),
    data.mobile
  );
  setValueAndTriggerEvents(
    document.querySelector('input[placeholder="Linkedin Name"]'),
    data.linkedinName
  );
  setValueAndTriggerEvents(
    document.querySelector('input[placeholder="Linkedin link"]'),
    data.linkedinLink
  );
  setValueAndTriggerEvents(
    document.querySelector('input[placeholder="GitHub Name"]'),
    data.githubName
  );
  setValueAndTriggerEvents(
    document.querySelector('input[placeholder="GitHub link"]'),
    data.githubLink
  );
  setValueAndTriggerEvents(
    document.querySelector('textarea[name="summary"].summary-use'),
    data.about
  );

  // Handle Skills fields
  const skillsArray = data.skills
    .split(")")
    .map((skill) => skill.replace("(", "").trim())
    .filter((skill) => skill);

  // Function to add and set a skill
  function addSkill(skill, index) {
    setTimeout(() => {
      const addSkillButton = document.querySelector("button.ed-btn-link");
      if (addSkillButton) {
        addSkillButton.click();
      }
      setTimeout(() => {
        const skillInputFields = document.querySelectorAll(
          'input[placeholder="Enter a skill"]'
        );
        const newSkillField = skillInputFields[skillInputFields.length - 1];
        if (newSkillField) {
          setValueAndTriggerEvents(newSkillField, skill);
        }
      }, 500); // Delay to ensure new input field appears
    }, 1000 * index); // Stagger delay for each skill
  }

  // Add each skill
  skillsArray.forEach((skill, index) => {
    addSkill(skill, index);
  });
}
