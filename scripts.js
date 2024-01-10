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

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then((registration) => {
      console.log('Service Worker registered with scope:', registration.scope);
    })
    .catch((error) => {
      console.error('Service Worker registration failed:', error);
    });
}

// update-handler.js

// Function to notify the user about the update
function notifyUserAboutUpdate() {
  // Display a notification or UI element informing the user about the update
  // ...

  // Example: Ask the user to reload the page
  const reloadConfirmation = confirm('A new version is available. Reload to use the latest version?');
  if (reloadConfirmation) {
    // Send a message to the service worker to skip waiting and take control of pages
    navigator.serviceWorker.controller.postMessage({
      type: 'SKIP_WAITING_CONFIRMATION'
    });
    // Optionally, you can handle the page reload in your application logic
    location.reload(true);
  }
}

// Example usage to notify the user about the update
notifyUserAboutUpdate();
