// Hamburger menu
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
        const isOpen = navLinks.classList.toggle('is-open');
        navToggle.setAttribute('aria-expanded', isOpen);
        navToggle.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
    });
    // Cierra el menú al hacer click en cualquier enlace
    navLinks.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
            navLinks.classList.remove('is-open');
            navToggle.setAttribute('aria-expanded', 'false');
            navToggle.setAttribute('aria-label', 'Abrir menú');
        });
    });
}

// Formulario de contacto — envío via fetch a Formspree (sin redirección de página)
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        // El form lleva novalidate para controlar nosotros el momento del aviso,
        // pero los campos required siguen declarados en el HTML. checkValidity()
        // los evalua y reportValidity() muestra el mensaje nativo del navegador.
        // Sin esto un envio vacio llegaba a Formspree y mostraba "Mensaje enviado".
        if (!contactForm.checkValidity()) {
            contactForm.reportValidity();
            return;
        }

        const submitBtn = contactForm.querySelector('.form-submit');
        const successMsg = document.getElementById('form-success');
        const errorMsg = document.getElementById('form-error');

        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Enviando... <i class="fas fa-spinner fa-spin"></i>';
        successMsg.style.display = 'none';
        errorMsg.style.display = 'none';

        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: new FormData(contactForm),
                headers: { Accept: 'application/json' },
            });

            if (response.ok) {
                contactForm.reset();
                successMsg.style.display = 'flex';
                submitBtn.style.display = 'none';
            } else {
                throw new Error('Error ' + response.status);
            }
        } catch {
            errorMsg.style.display = 'flex';
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'Enviar consulta &nbsp;<i class="fas fa-arrow-right"></i>';
        }
    });
}

// Inicialización de Swiper para el slider de logos de clientes.
// Los 16 logos son la prueba social del sitio: si el CDN de Swiper no carga,
// no pueden desaparecer. La clase .no-swiper los deja como rejilla estatica.
const clientLogoSliderEl = document.querySelector('.client-logo-slider');
if (clientLogoSliderEl) {
    if (typeof Swiper === 'undefined') {
        clientLogoSliderEl.classList.add('no-swiper');
    } else {
        new Swiper(clientLogoSliderEl, {
            loop: true,
            autoplay: {
                delay: 2000,
                disableOnInteraction: false,
            },
            slidesPerView: 2,
            spaceBetween: 20,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                640: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                },
                768: {
                    slidesPerView: 4,
                    spaceBetween: 40,
                },
                1024: {
                    slidesPerView: 5,
                    spaceBetween: 50,
                },
            }
        });
    }
}