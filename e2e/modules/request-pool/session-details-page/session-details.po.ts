import { by, element, ElementFinder, ElementArrayFinder } from 'protractor';

export class SessionPage {

    /**
    * Gets pool of all matched request
    *
    * @return {ElementFinder}
    */
  getPool(): ElementFinder {
    return element(by.css('.pool-table .pool-body'));
  }

    /**
     * Gets a single request from the logged requests array
     *
     * @param {number} index
     * @return {ElementFinder}
     */
  getSingleRequest(index): ElementFinder {
    return this.getPool().all(by.css('#request-in-progress')).get(index);
  }

    /**
     * Gets the log session button
     *
     * @param {any} attribute
     * @returns {ElementFinder}
     */
  getSessionButton(attribute): ElementFinder {
    return element.all(by.css(`.request-schedule-wrapper .card ${attribute}`)).get(0)
  }

  /**
   * Get the attribute of an element
   *
   * @param {any} attribute
   * @returns {ElementFinder}
   */
  getElementAttribute(attribute): ElementFinder {
    return element(by.css(attribute));
  }

   /**
   * Get the attribute of an element by its tag name
   *
   * @param {any} tagName
   * @returns {ElementFinder}
   */
  getElementByTagName(tagName): ElementFinder {
    return element(by.tagName(tagName));
  }

  /**
   * Get the star ratings component
   *
   * @returns {ElementArrayFinder}
   */
  getStarArray(): ElementArrayFinder {
    return element.all(by.tagName('star-rating-comp'));
  }

    /**
    * Get the star ratings component
    *
    * returns {any}
    */
  getStarRatings(): any {
    this.getStarArray().map((element) => {
      return element.click();
    });
  }

    /**
    * Returns the DOM element with id close-button
    *
    * @returns {ElementFinder}
    */
  getAlertClose(): ElementFinder {
    return element(by.id('close-button'));
  }

}
