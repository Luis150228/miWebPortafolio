///Entrada de pagina

const tl = gsap.timeline({defaults: {ease: 'power1.out'}});

tl.to('.text', {y: '0%', duration: 1, stagger: 0.25});
tl.to('.slider', {y: '-100%', duration: 1.5, delay: 0.5});
tl.to('.intro', {y: '-100%', duration: 1}, '-=1');
tl.fromTo('header', {opacity: 0}, {opacity: 1, duration: 1});
tl.fromTo('nav', {opacity: 0}, {opacity: 1, duration: 1.3});
// tl.fromTo('.big-text', {opacity: 0}, {opacity: 1, duration: 1.2}, '-=1');

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
		// console.log(className);
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

///Control de CARDS

const card = document.querySelector('.card');
const control = document.querySelector('.control');

const titulo = document.querySelector('.title_card');
const sneaker = document.querySelector('#img1');
const info = document.querySelector('.info h3');

control.addEventListener('mousemove', (e) => {
	// console.log(e.pageX, e.pageY);
	let xAxis = ((window.innerWidth / 2 - e.pageX) / 28) * -1;
	let yAxis = ((window.innerWidth / 2 - e.pageY) / 50) * -1;

	card.style = 'backdrop-filter: blur(5px)';
	card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
});

///Animacion de Salida de mouse
control.addEventListener('mouseenter', (e) => {
	card.style.transition = 'none';
	//Contenido up
	sneaker.style.transform = 'translateZ(210px)';
	titulo.style.transform = 'translateZ(190px)';
	info.style.transform = 'translateZ(80px)';
});

///Animacion de Entrada de mouse
control.addEventListener('mouseleave', (e) => {
	card.style.transition = 'all 0.5s ease';
	card.style.transform = `rotateY(0deg) rotateX(0deg)`;
	//Contenido Down
	titulo.style.transform = 'translateZ(0px)';
	sneaker.style.transform = 'translateZ(0px)';
	info.style.transform = 'translateZ(0px)';
});
