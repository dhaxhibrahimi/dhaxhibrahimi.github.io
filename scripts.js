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

document.addEventListener('DOMContentLoaded', function () {
  var dropdowns = document.querySelectorAll('.item-name');

  dropdowns.forEach(function (dropdown) {
    var dropdownContent = dropdown.querySelector('.item-dropdown');

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

document.addEventListener('DOMContentLoaded', function () {
    // Simulate a delay to show the splash screen for a certain period
    setTimeout(function () {
        var splashScreen = document.getElementById('splash-screen');
        var websiteContent = document.getElementById('website-content');

        // Remove the splash screen
        splashScreen.style.display = 'none';

        // Show the content
        websiteContent.classList.add('loaded');
    }, 3000); // Adjust the delay time (in milliseconds) as needed
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
  var menuItems = document.querySelectorAll('.menu-item');

  menuItems.forEach(function (menuItem) {
      menuItem.addEventListener('click', function () {
          // Toggle a class to open/close the dropdown
          this.classList.toggle('dropdown-open');

          // Close other dropdowns
          menuItems.forEach(function (otherMenuItem) {
              if (otherMenuItem !== menuItem) {
                  otherMenuItem.classList.remove('dropdown-open');
              }
          });
      });
  });
});