const requestButton = document.querySelector('.header__request');
const overlay = document.querySelector('.overlay');
const overlayForm = overlay.querySelector('.overlay__form');
const overlayCloseButton = overlay.querySelector('.overlay__close');
const overlayNameField = overlay.querySelector('input[name="username-field"]');

function onCloseOverlay () {
  overlay.classList.add('overlay--hidden');

  overlay.removeEventListener('click', onCloseOverlay);
  document.removeEventListener('keydown', onEscapeKeyDown);
  overlayForm.removeEventListener('submit', onSubmitOverlay);
  window.removeEventListener('click', onWindowClick);
};

function onEscapeKeyDown (evt) {
  if (evt.code === "Escape") {
    evt.preventDefault();
    onCloseOverlay();
  }
}

function onSubmitOverlay (evt) {
  evt.preventDefault();
  onCloseOverlay();
  overlayForm.reset();
}

function onWindowClick (evt) {
  if (!evt.target.closest('.overlay__contact') && evt.target.closest('.overlay')) {
    evt.preventDefault();
    onCloseOverlay();
  }
}

requestButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  overlay.classList.remove('overlay--hidden');
  overlayNameField.focus();

  overlayCloseButton.addEventListener('click', onCloseOverlay);
  document.addEventListener('keydown', onEscapeKeyDown);
  overlayForm.addEventListener('submit', onSubmitOverlay);
  window.addEventListener('click', onWindowClick)
});

const promoGetButton = document.querySelector('.promo__get');
const feedbackSection = document.querySelector('.feedback');
const feedbackForm = feedbackSection.querySelector('.feedback__form');

promoGetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  const feedbackPosition = feedbackSection.getBoundingClientRect().top;

  window.scrollBy({
    top: feedbackPosition,
    behavior: "smooth"
  });
});

const aboutDescriptionContainer = document.querySelector('.about__description-data');
const descriptionShowButton = document.querySelector('.about__description-show');
aboutDescriptionContainer.classList.remove('about__description-data--visible');
descriptionShowButton.style.display = "block";

descriptionShowButton.addEventListener('click', () => {
  aboutDescriptionContainer.classList.toggle('about__description-data--visible');

  if (aboutDescriptionContainer.classList.contains('about__description-data--visible')) {
    descriptionShowButton.textContent = "Свернуть";
    return;
  }

  descriptionShowButton.textContent = "Подробнее";
});

const siteSectionTitle = document.querySelector('.site-sections__title');
const addressTitle = document.querySelector('.address__title');
const siteSectionList = document.querySelector('.site-sections__list');
const addressList = document.querySelector('.address__list');

siteSectionTitle.classList.remove('site-sections__title--clicked');
addressTitle.classList.remove('address__title--clicked');
siteSectionList.classList.remove('site-sections__list--expanded');
addressList.classList.remove('address__list--expanded');

siteSectionTitle.addEventListener('click', () => {
  siteSectionTitle.classList.toggle('site-sections__title--clicked');
  siteSectionList.classList.toggle('site-sections__list--expanded');

  if (siteSectionTitle.classList.contains('site-sections__title--clicked')) {
    addressTitle.classList.remove('address__title--clicked');
    addressList.classList.remove('address__list--expanded');
  }
});

addressTitle.addEventListener('click', () => {
  addressTitle.classList.toggle('address__title--clicked');
  addressList.classList.toggle('address__list--expanded');

  if (addressTitle.classList.contains('address__title--clicked')) {
    siteSectionTitle.classList.remove('site-sections__title--clicked');
    siteSectionList.classList.remove('site-sections__list--expanded');
  }
});

const feedbackTelephoneField = feedbackForm.querySelector('input[name="phone-number"]');
const overlayTelephoneField = overlay.querySelector('input[name="phone-number-field"]');

class telephoneMask {
  _number = '';
  _inputValue = '';

  constructor(telephoneInput) {
    this._input = telephoneInput;
  }

  set = () => {
    this._input.addEventListener('input', (evt) => {
      const value = evt.target.value;

      console.log(evt.target.getSelectionRange)

      if (value === '+7' && this._inputValue === '+7(') {
        this._input.value = '';
        this._inputValue = '';
        return;
      }

      this._setNewNumber(value);

      switch (this._number.length) {
        case 0:
        case 1:
        case 2:
        case 3:
          this._input.value = "+7(" + this._number;
          break;
        case 4:
        case 5:
        case 6:
          this._input.value = `+7(${this._number.slice(0, 3)})${this._number.slice(3, 6)}`;
          break;
        case 7:
        case 8:
          this._input.value = `+7(${this._number.slice(0, 3)})${this._number.slice(3, 6)}-${this._number.slice(6, 8)}`;
          break;
        case 9:
        case 10:
          this._input.value = `+7(${this._number.slice(0, 3)})${this._number.slice(3, 6)}-${this._number.slice(6, 8)}-${this._number.slice(8, 10)}`;
          break;
      }

      this._inputValue = this._input.value;
    });
  };

  _setNewNumber = (value) => {
    if (value.indexOf('+7') > -1) {
      value = value.slice(2);
    }

    this._number = value.split('').filter((char) => parseInt(char)).join('').slice(0, 10);
  };
};

const overlayTelephoneMask = new telephoneMask(overlayTelephoneField);
overlayTelephoneMask.set();
const feedbackTelephoneMask = new telephoneMask(feedbackTelephoneField);
feedbackTelephoneMask.set();

if (window.localStorage) {
  const elements = document.querySelectorAll('[name]:not([type="password"])');

  for (let element of elements) {
    const name = element.getAttribute('name');
    element.value = localStorage.getItem(name) || element.value;

    element.onkeyup = function() {
      localStorage.setItem(name, element.value);
    };
  }
}
