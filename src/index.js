import { DOMController } from './domController.js'

function theDomHasLoaded(e) {

	DOMController.init();
}

document.addEventListener("DOMContentLoaded",theDomHasLoaded,false);


