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

  function addSkill(skill, index) {
    setTimeout(() => {
      const addSkillButton = Array.from(
        document.querySelectorAll("button.ed-btn-link")
      ).find((button) => button.textContent.includes("Add Skill"));
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

  skillsArray.forEach((skill, index) => {
    addSkill(skill, index);
  });

  // Handle Interests fields
  const interestsArray = data.interests
    .split(")")
    .map((interest) => interest.replace("(", "").trim())
    .filter((interest) => interest);

  function addInterest(interest, index) {
    setTimeout(() => {
      const addInterestButton = Array.from(
        document.querySelectorAll("button.ed-btn-link")
      ).find((button) => button.textContent.includes("Add Interest"));
      if (addInterestButton) {
        addInterestButton.click();
      }
      setTimeout(() => {
        const interestInputFields = document.querySelectorAll(
          'input[placeholder="Enter a Interest"]'
        );
        const newInterestField =
          interestInputFields[interestInputFields.length - 1];
        if (newInterestField) {
          setValueAndTriggerEvents(newInterestField, interest);
        }
      }, 500); // Delay to ensure new input field appears
    }, 1000 * index); // Stagger delay for each interest
  }

  interestsArray.forEach((interest, index) => {
    addInterest(interest, index);
  });
  // Handle Projects fields
  const projectsArray = data.projects
    .split("]")
    .map((project) => project.replace("[", "").trim())
    .filter((project) => project);

  function addProject(project, index) {
    const [titlePart, linkPart, descPart] = project
      .split(")(")
      .map((part) => part.replace("(", "").replace(")", "").trim());
    const title = titlePart;
    const link = linkPart;
    const description = descPart;

    setTimeout(() => {
      const addProjectButton = Array.from(
        document.querySelectorAll("button.ed-btn-link")
      ).find((button) => button.textContent.includes("Add Project"));
      if (addProjectButton) {
        addProjectButton.click();
      }
      setTimeout(() => {
        const projectTitleFields = document.querySelectorAll(
          'input[placeholder="ex. Resume Builder"]'
        );
        const newProjectTitleField =
          projectTitleFields[projectTitleFields.length - 1];
        const projectLinkFields = document.querySelectorAll(
          'input[placeholder="project direct link"]'
        );
        const newProjectLinkField =
          projectLinkFields[projectLinkFields.length - 1];
        const projectDescFields = document.querySelectorAll(
          "textarea.summary-use"
        );
        const newProjectDescField =
          projectDescFields[projectDescFields.length - 1];

        if (
          newProjectTitleField &&
          newProjectLinkField &&
          newProjectDescField
        ) {
          setValueAndTriggerEvents(newProjectTitleField, title);
          setValueAndTriggerEvents(newProjectLinkField, link);
          setValueAndTriggerEvents(newProjectDescField, description);
        }
      }, 500); // Delay to ensure new input fields appear
    }, 1000 * index); // Stagger delay for each project
  }

  projectsArray.forEach((project, index) => {
    addProject(project, index);
  });

  // Handle Education fields
  const educationArray = data.educations
    .split("]")
    .map((edu) => edu.replace("[", "").trim())
    .filter((edu) => edu);

  function addEducation(edu, index) {
    const [schoolPart, degreePart, percentagePart, startYearPart, endYearPart] =
      edu
        .split(")(")
        .map((part) => part.replace("(", "").replace(")", "").trim());
    const school = schoolPart;
    const degree = degreePart;
    const percentage = percentagePart;
    const startYear = startYearPart;
    const endYear = endYearPart;

    setTimeout(() => {
      const addEducationButton = Array.from(
        document.querySelectorAll("button.ed-btn-link")
      ).find((button) => button.textContent.includes("Add Education"));
      if (addEducationButton) {
        addEducationButton.click();
      } else {
        console.log("education button not finded");
      }
      setTimeout(() => {
        const schoolFields = document.querySelectorAll(
          'input[placeholder="ex. L.D. College of Engineering"]'
        );
        const newSchoolField = schoolFields[schoolFields.length - 1];
        const degreeFields = document.querySelectorAll(
          'input[placeholder="Bachlor\'s in Information Technology / Higher Secondary Eduaction"]'
        );
        const newDegreeField = degreeFields[degreeFields.length - 1];
        const startYearFields = document.querySelectorAll(
          'input[placeholder="ex. 2020"]'
        );
        const newStartYearField = startYearFields[startYearFields.length - 1];
        const endYearFields = document.querySelectorAll(
          'input[placeholder="ex. 2024 or pursuing"]'
        );
        const newEndYearField = endYearFields[endYearFields.length - 1];
        const percentageFields = document.querySelectorAll(
          'input[placeholder="ex. 86.90 (CPI-0.5)*10"]'
        );
        const newPercentageField =
          percentageFields[percentageFields.length - 1];
        if (
          newSchoolField &&
          newDegreeField &&
          newStartYearField &&
          newEndYearField &&
          newPercentageField
        ) {
          setValueAndTriggerEvents(newSchoolField, school);
          setValueAndTriggerEvents(newDegreeField, degree);
          setValueAndTriggerEvents(newPercentageField, percentage);
          setValueAndTriggerEvents(newStartYearField, startYear);
          setValueAndTriggerEvents(newEndYearField, endYear);
        }
      }, 500); // Delay to ensure new input fields appear
    }, 1000 * index); // Stagger delay for each education entry
  }

  educationArray.forEach((edu, index) => {
    addEducation(edu, index);
  });

  // Handle Skills fields
  const hobbyArray = data.hobbies
    .split(")")
    .map((hobby) => hobby.replace("(", "").trim())
    .filter((hobby) => hobby);

  function addHobby(hobby, index) {
    setTimeout(() => {
      const addHobbyButton = Array.from(
        document.querySelectorAll("button.ed-btn-link")
      ).find((button) => button.textContent.includes("Add a Hobby"));
      if (addHobbyButton) {
        addHobbyButton.click();
      }
      setTimeout(() => {
        const hobbyInputFields = document.querySelectorAll(
          'input[placeholder="Enter Hobbies"]'
        );
        const newHobbyField = hobbyInputFields[hobbyInputFields.length - 1];
        if (newHobbyField) {
          setValueAndTriggerEvents(newHobbyField, hobby);
        }
      }, 500); // Delay to ensure new input field appears
    }, 1000 * index); // Stagger delay for each skill
  }

  hobbyArray.forEach((hobby, index) => {
    addHobby(hobby, index);
  });

  // Handle Skills fields
  const achivementArray = data.achivements
    .split(")")
    .map((achivement) => achivement.replace("(", "").trim())
    .filter((achivement) => achivement);

  function addAchivement(achivement, index) {
    setTimeout(() => {
      const addAchivementButton = Array.from(
        document.querySelectorAll("button.ed-btn-link")
      ).find((button) => button.textContent.includes("Add a Achievement"));
      if (addAchivementButton) {
        addAchivementButton.click();
      }
      setTimeout(() => {
        const achivementInputFields = document.querySelectorAll(
          'input[placeholder="Enter Achievement"]'
        );
        const newAchivementField =
          achivementInputFields[achivementInputFields.length - 1];
        if (newAchivementField) {
          setValueAndTriggerEvents(newAchivementField, achivement);
        }
      }, 500); // Delay to ensure new input field appears
    }, 1000 * index); // Stagger delay for each skill
  }

  achivementArray.forEach((achivement, index) => {
    addAchivement(achivement, index);
  });
}
