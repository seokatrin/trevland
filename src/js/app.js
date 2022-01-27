import { activeBurger } from './modules/burger.js';
import { activateSlider } from './modules/slider.js';
import { handleOnSubmit } from './modules/form.js';

document.addEventListener("DOMContentLoaded", () => {
  activeBurger()
  activateSlider()
  handleOnSubmit()
  
})

