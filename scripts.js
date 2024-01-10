document.addEventListener('DOMContentLoaded', function () {
  var dropdowns = document.querySelectorAll('.dropdown');

  dropdowns.forEach(function (dropdown) {
    var dropdownContent = dropdown.querySelector('.dropdown-content');

    dropdown.addEventListener('click', function () {
      dropdownContent.style.display = (dropdownContent.style.display === 'block') ? 'none' : 'block';
    });

    dropdownContent.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function (event) {
        event.preventDefault();

        var targetMenuCategoryID = link.getAttribute('href').substring(1);
        console.log('Target Menu Category ID:', targetMenuCategoryID);

        var targetMenuCategory = document.getElementById(targetMenuCategoryID);
        console.log('Target Menu Category Element:', targetMenuCategory);

        var headerHeight = document.querySelector('header').offsetHeight;
        console.log('Header Height:', headerHeight);

        if (targetMenuCategory) {
          window.scrollTo({
            top: targetMenuCategory.offsetTop - headerHeight,
            behavior: 'smooth'
          });
        }

        if (window.innerWidth <= 768) {
          dropdownContent.style.display = 'none';
        }
      });
    });

    window.addEventListener('click', function (event) {
      if (!dropdown.contains(event.target) && window.innerWidth <= 768) {
        dropdownContent.style.display = 'none';
      }
    });

    dropdownContent.addEventListener('click', function (event) {
      event.stopPropagation();
    });
  });
});

var xhr = new XMLHttpRequest();
xhr.open('GET', 'menu.html', true);

xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status < 300) {
        document.getElementById('menu-container').innerHTML = xhr.responseText;
    } else {
        console.error('Error fetching menu.html:', xhr.statusText);
    }
};

xhr.onerror = function () {
    console.error('Network error while fetching menu.html');
};

xhr.send();

let deferredPrompt;

window.addEventListener('beforeinstallprompt', (event) => {
    // Prevent the default behavior
    event.preventDefault();

    // Stash the event so it can be triggered later
    deferredPrompt = event;

    // Show the install button
    document.getElementById('installButton').removeAttribute('hidden');
});

// Handle button click to install the app
document.getElementById('installButton').addEventListener('click', () => {
    // Show the installation prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult) => {
        // Check if the user accepted the prompt
        if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the install prompt');
        } else {
            console.log('User dismissed the install prompt');
        }

        // Clear the deferred prompt variable
        deferredPrompt = null;

        // Hide the install button
        document.getElementById('installButton').setAttribute('hidden', '');
    });
});

// Handle appinstalled event
window.addEventListener('appinstalled', (event) => {
    console.log('App installed successfully');
    // Additional logic can be added here if needed
});