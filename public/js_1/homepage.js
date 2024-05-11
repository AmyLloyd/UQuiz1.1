document.addEventListener('DOMContentLoaded', () => {
  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

  // Add a click event on each of them
  $navbarBurgers.forEach(el => {
    el.addEventListener('click', () => {
      // Get the target from the "data-target" attribute
      const target = el.dataset.target;
      const $target = document.getElementById(target);

      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      el.classList.toggle('is-active');
      $target.classList.toggle('is-active');
    });
  });

  // Function to navigate to a specific page
  const navigateTo = (page) => {
    window.location.href = page;
  };

  document.querySelector('#home').addEventListener('click', () => navigateTo('/'));
  document.querySelector('#play').addEventListener('click', () => navigateTo('/quiz'));
  document.querySelector('#quiz-select').addEventListener('click', () => navigateTo('/quiz-selection'));
  document.querySelector('#account').addEventListener('click', () => navigateTo('/account'));
});
