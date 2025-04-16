window.addEventListener("load", function() {
  // Update year
  let currentYear = new Date().getFullYear();
  document.getElementById("year").textContent = currentYear;

  // Voting (only one vote allowed per session)
  var voteCast = false;
  var voteButtons = document.querySelectorAll(".vote-button");

  for (var i = 0; i < voteButtons.length; i++) {
    (function() {
      var button = voteButtons[i];
      var look = button.getAttribute("data-look");
      var countDisplay = document.getElementById("count-" + look);
      var currentCount = parseInt(localStorage.getItem(look + "Votes")) || 0;
      countDisplay.textContent = "Votes: " + currentCount;

      button.addEventListener("click", function() {
        if (!voteCast) {
          currentCount++;
          localStorage.setItem(look + "Votes", currentCount);
          countDisplay.textContent = "Votes: " + currentCount;
          voteCast = true;
        } else {
          // Show the vote popup if already voted
          var votePopup = document.getElementById("vote-popup");
          var votePopupText = document.getElementById("vote-popup-text");
          votePopupText.textContent = "You are only allowed to vote once.";
          votePopup.classList.remove("hidden");
        }
      });
    })();
  }

  // Vote popup close functionality
  let voteCloseBtn = document.getElementById("vote-close-popup");
  if (voteCloseBtn) {
    voteCloseBtn.addEventListener("click", function() {
      let votePopup = document.getElementById("vote-popup");
      votePopup.classList.add("hidden");
    });
  }

  // Fact popup
  var factButtons = document.querySelectorAll(".fact-button");
  var popup = document.getElementById("fact-popup");
  var popupText = document.getElementById("popup-text");
  var closeBtn = document.getElementById("close-popup");

  for (var j = 0; j < factButtons.length; j++) {
    (function() {
      var btn = factButtons[j];
      btn.addEventListener("click", function() {
        var fact = btn.getAttribute("data-fact");
        popupText.textContent = fact;
        popup.classList.remove("hidden");
      });
    })();
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", function() {
      popup.classList.add("hidden");
    });
  }

  // Dark mode persistence
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
  }

  // Dark mode toggle
  var themeToggleButton = document.querySelector(".theme-toggle");
  if (themeToggleButton) {
    themeToggleButton.addEventListener("click", function() {
      document.body.classList.toggle("dark-mode");
      if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
      } else {
        localStorage.setItem("theme", "light");
      }
    });
  }
});


