/**
 * @interface Session
 * Blueprint for the session object
 */
export interface Session {
  date?: number,
  start_time?: string,
  end_time?: string,
  request_id?: number,
  user_id?: string
}

/**
 * @interface SessionDetails
 * Blueprint for the sessiondetails object
 */
export interface SessionDetails {
  totalSessions?: number,
  totalSessionsLogged?: number,
  totalSessionsPending?: number,
  totalSessionsUnlogged?: number
}