const nav = document.querySelector('nav');

let preScrollTop = 0;

window.addEventListener('scroll',() => {
  let nextScrollTop = window.scrollY || window.pageYOffset;
	if (preScrollTop < nextScrollTop) {
      nav.classList.add('clear-up');
    }
	else {
      nav.classList.remove('clear-up');
    }
	preScrollTop = nextScrollTop;
});