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
