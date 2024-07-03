// document.getElementById("resume-form").addEventListener("submit", (e) => {
//   e.preventDefault();
//   const resumeData = {
//     name: document.getElementById("name").value,
//     email: document.getElementById("email").value,
//     mobile: document.getElementById("mobile").value,
//     linkedin_name: document.getElementById("linkedin_name").value,
//     linkediun_link: document.getElementById("linkedin_link").value,
//     github_name: document.getElementById("github_name").value,
//     github_link: document.getElementById("github_link").value,
//     about: document.getElementById("about").value,
//   };
//   chrome.storage.sync.set({ resumeData }, () => {
//     console.log(resumeData);
//   });
// });

// 2nd try

// document.addEventListener("DOMContentLoaded", function () {
//   // Populate the form with saved data if available
//   chrome.storage.local.get(["resumeData"], function (result) {
//     if (result.resumeData) {
//       // document.getElementById('profile_path').value = result.resumeData.profile_path || '';
//       document.getElementById("name").value = result.resumeData.name || "";
//       document.getElementById("email").value = result.resumeData.email || "";
//       document.getElementById("mobile").value = result.resumeData.mobile || "";
//       //   document.getElementById("linkedin_name").value =
//       //     result.resumeData.linkedin_name || "";
//       //   document.getElementById("linkedin_link").value =
//       //     result.resumeData.linkedin_link || "";
//       //   document.getElementById("github_name").value =
//       //     result.resumeData.github_name || "";
//       //   document.getElementById("github_link").value =
//       //     result.resumeData.github_link || "";
//       //   document.getElementById("about").value = result.resumeData.about || "";
//       // Populate other fields as needed
//     }
//   });

//   // Handle form submission
//   document
//     .getElementById("resumeForm")
//     .addEventListener("submit", function (e) {
//       e.preventDefault();

//       var resumeData = {
//         // profile_path: document.getElementById('profile_path').value,
//         name: document.getElementById("name").value,
//         email: document.getElementById("email").value,
//         mobile: document.getElementById("mobile").value,
//         // linkedin_name: document.getElementById("linkedin_name")?.value,
//         // linkedin_link: document.getElementById("linkedin_link")?.value,
//         // github_name: document.getElementById("github_name")?.value,
//         // github_link: document.getElementById("github_link")?.value,
//         // about: document.getElementById("about")?.value,
//         // Collect other fields as needed
//       };

//       // Save the data in local storage
//       chrome.storage.local.set({ resumeData: resumeData }, function () {
//         console.log("Resume data is saved.");

//         // Send the data to the content script
//         chrome.tabs.query(
//           { active: true, currentWindow: true },
//           function (tabs) {
//             chrome.tabs.sendMessage(tabs[0].id, {
//               action: "fill_resume_data",
//               data: resumeData,
//             });
//           }
//         );
//       });
//     });

//   // Handle "Fill with Stored Data" button click
//   document
//     .getElementById("fillStoredData")
//     .addEventListener("click", function () {
//       chrome.storage.local.get(["resumeData"], function (result) {
//         if (result.resumeData) {
//           // Send the data to the content script to fill the form
//           chrome.tabs.query(
//             { active: true, currentWindow: true },
//             function (tabs) {
//               chrome.tabs.sendMessage(tabs[0].id, {
//                 action: "fill_resume_data",
//                 data: result.resumeData,
//               });
//             }
//           );
//         } else {
//           console.log("No stored resume data found.");
//         }
//       });
//     });
// });

// 3rd try

document.addEventListener("DOMContentLoaded", function () {
  // Populate the form with saved data if available
  chrome.storage.local.get(["resumeData"], function (result) {
    if (result.resumeData) {
      document.getElementById("name").value = result.resumeData.name || "";
      document.getElementById("email").value = result.resumeData.email || "";
      document.getElementById("mobile").value = result.resumeData.mobile || "";
      document.getElementById("linkedinName").value =
        result.resumeData.linkedinName || "";
      document.getElementById("linkedinLink").value =
        result.resumeData.linkedinLink || "";
      document.getElementById("githubName").value =
        result.resumeData.githubName || "";
      document.getElementById("githubLink").value =
        result.resumeData.githubLink || "";
      document.getElementById("about").value = result.resumeData.about || "";
    }
  });

  // Handle form submission
  document
    .getElementById("resumeForm")
    .addEventListener("submit", function (e) {
      e.preventDefault();

      var resumeData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        mobile: document.getElementById("mobile").value,
        linkedinName: document.getElementById("linkedinName").value,
        linkedinLink: document.getElementById("linkedinLink").value,
        githubName: document.getElementById("githubName").value,
        githubLink: document.getElementById("githubLink").value,
        about: document.getElementById("about").value,
      };

      // Save the data in local storage
      chrome.storage.local.set({ resumeData: resumeData }, function () {
        console.log("Resume data is saved.");

        // Send the data to the content script with target identifier
        chrome.tabs.query(
          { active: true, currentWindow: true },
          function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {
              action: "fill_resume_data",
              data: resumeData,
              target: "contentScript",
            });
          }
        );
      });
    });

  // Handle "Fill with Stored Data" button click
  document
    .getElementById("fillStoredData")
    .addEventListener("click", function () {
      chrome.storage.local.get(["resumeData"], function (result) {
        if (result.resumeData) {
          // Send the data to the content script to fill the form
          chrome.tabs.query(
            { active: true, currentWindow: true },
            function (tabs) {
              chrome.tabs.sendMessage(tabs[0].id, {
                action: "fill_resume_data",
                data: result.resumeData,
                target: "contentScript",
              });
            }
          );
        } else {
          console.log("No stored resume data found.");
        }
      });
    });
});
