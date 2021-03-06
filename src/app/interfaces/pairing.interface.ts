/**
 * @interface Pairing
 * Blueprint for the pairing object
 */
export interface Pairing {
  start_time: Date,
  end_time: Date,
  days: string[],
  timezone: string
}
