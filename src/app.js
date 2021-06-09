///Entrada de pagina

const tl = gsap.timeline({defaults: {ease: 'power1.out'}});

tl.to('.text', {y: '0%', duration: 1, stagger: 0.25});
tl.to('.slider', {y: '-100%', duration: 1.5, delay: 0.5});
tl.to('.intro', {y: '-100%', duration: 1}, '-=1');
tl.fromTo('header', {opacity: 0}, {opacity: 1, duration: 1});
tl.fromTo('nav', {opacity: 0}, {opacity: 1, duration: 1.3});
tl.fromTo('.big-text', {opacity: 0}, {opacity: 1, duration: 1.2}, '-=1');

//Control de menu vs secciones

const secciones = document.querySelectorAll('section');
const marcador = document.querySelector('.marcador');
const gradients = [
	'linear-gradient(to right top, #cef104, #ffee00',
	'linear-gradient(to right top, #f46b45, #eea849',
	'linear-gradient(to right top, #f4ae45, #f5c680',
	'linear-gradient(to right top, #e3f445, #bdcc39',
	'linear-gradient(to right top, #4bf445, #2c8d28',
];

const options = {
	threshold: 0.7,
};

let seccActual = new IntersectionObserver(navCheck, options);

function navCheck(entries) {
	entries.forEach((entry) => {
		const className = entry.target.className;
		const activarAncla = document.querySelector(`[data-page=${className}]`);
		const gradientIndex = entry.target.getAttribute('data-index');
		const coords = activarAncla.getBoundingClientRect();
		const direccion = {
			height: coords.height / 4,
			width: coords.width,
			top: coords.top / -4,
			left: coords.left,
		};
		if (entry.isIntersecting) {
			marcador.style.setProperty('left', `${direccion.left}px`);
			marcador.style.setProperty('top', `${direccion.top}px`);
			marcador.style.setProperty('width', `${direccion.width}px`);
			marcador.style.setProperty('height', `${direccion.height}px`);
		}
	});
}

secciones.forEach((seccion) => {
	seccActual.observe(seccion);
});
