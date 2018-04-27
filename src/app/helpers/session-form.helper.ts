   /**
   * Gets the current rating values for a mentor rating
   *
   * @param {values} - rating value object for mentor
   *
   * @return {Object} - rating values
   */
export function mentorSessionFormHelper(values) {
  return {
    availability: (values) ? values.availability : '',
    reliability: (values) ? values.reliability : '',
    knowledge: (values) ? values.knowledge : '',
    teaching: (values) ? values.teaching : '',
    usefulness: (values) ? values.usefulness : '',
  }
}

  /**
   * Gets the corrent rating values for a mentee rating
   *
   * @param {values} - rating value object for mentee
   *
   * @return {Object} - rating values
   */
export function menteeSessionFormHelper(values) {
  return {
    attentiveness: (values) ? values.attentiveness : '',
    ownership: (values) ? values.ownership : '',
    punctuality: (values) ? values.punctuality : '',
    assignmentQuality: (values) ? values.assignmentQuality : '',
    assignmentTimeliness: (values) ? values.assignmentTimeliness : '',
  }
}


  /**
   * Gets the rating values of a single session
   *
   * @param {values} - rating values object
   * @param {userIsMentor} - verifies if the user is mentor
   *
   * @return {Object} - rating values
   */
export function getRatingValues(values, userIsMentor) {
  if (userIsMentor) {
    return menteeSessionFormHelper(values);
  }
  return mentorSessionFormHelper(values);
}
