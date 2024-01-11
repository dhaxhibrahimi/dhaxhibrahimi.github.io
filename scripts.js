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

// Simulate loading time
document.addEventListener('DOMContentLoaded', function () {
  // Simulate a delay to show the splash screen for a certain period
  setTimeout(function () {
      var splashScreen = document.getElementById('splash-screen');
      var websiteContent = document.getElementById('website-content');

      // Remove the splash screen
      splashScreen.style.display = 'none';

      // Show the content
      websiteContent.classList.add('loaded');
  }, 1900); // Adjust the delay time (in milliseconds) as needed
});

function fetchAndInsertProducts() {
  fetch('menu.html')
      .then(response => response.text())
      .then(data => {
          document.getElementById('menu-container').innerHTML = data;
      })
      .catch(error => console.error('Error fetching products.html:', error));
}

document.addEventListener('DOMContentLoaded', function () {
  // Call the function when the DOM is ready
  fetchAndInsertProducts();

  // ... rest of your code
});

document.addEventListener('DOMContentLoaded', function () {
  // Check for service worker updates only in standalone mode
  if ('serviceWorker' in navigator && window.matchMedia('(display-mode: standalone)').matches) {
      navigator.serviceWorker.register('/sw.js').then(registration => {
          registration.addEventListener('updatefound', () => {
              const newWorker = registration.installing;

              newWorker.addEventListener('statechange', () => {
                  if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                      // A new service worker version is installed
                      showUpdateNotification();
                      hideUpdateOverlay();
                  }
              });
          });
      });
  }

  // Function to show the update notification and disable interactions
  function showUpdateNotification() {
      const updatePopup = document.getElementById('update-popup');
      updatePopup.style.display = 'block';

      // Show the overlay
      const updateOverlay = document.getElementById('update-overlay');
      updateOverlay.style.display = 'flex';
      updateOverlay.classList.add('active');

      const reloadButton = document.getElementById('reload-button');
      reloadButton.addEventListener('click', function () {
          // Reload the page
          window.location.reload();
      });
  }

  // Function to hide the overlay after the update is complete
  function hideUpdateOverlay() {
      const updateOverlay = document.getElementById('update-overlay');
      updateOverlay.style.display = 'none';
      updateOverlay.classList.remove('active');
  }
});
