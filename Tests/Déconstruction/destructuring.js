document.addEventListener("DOMContentLoaded", function (event) {
  user = {
    profile: "admin",
    password: "mKYLSKnR#mQz6rYTPnjahAj5!4yH",
  };

  displayUserProfile(user);
  displayUserProfileDestructuring(user);
});

function displayUserProfile(u) {
  console.log("Sans déstructuration");
  console.log(u.profile);
}

function displayUserProfileDestructuring({ profile }) {
  console.log("Avec déstructuration");
  console.log(profile);
}
