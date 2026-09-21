/**
 * Thrown deliberately, with a message that is always safe to show the
 * (already-authenticated) admin/content-editor who triggered it — e.g.
 * "Not authenticated.", "Campaign not found.", a role-requirement message.
 *
 * Anything else caught in a server action (a raw DB driver error, an
 * unexpected exception) is NOT an instance of this and must not have its
 * `.message` sent to the client — see toActionErrorMessage below.
 */
export class UserFacingError extends Error {}

const GENERIC_ACTION_ERROR = "Something went wrong. Please try again.";

/**
 * Converts a caught error into a message safe to return from a server
 * action. Deliberate, user-facing errors (UserFacingError, and Zod's
 * validation errors, which only ever describe the input the caller just
 * submitted) pass through as-is; anything else — a raw database error, a
 * network failure, some other unexpected exception — is logged in full
 * server-side and replaced with a generic message, so internal details
 * (schema, constraint names, connection info) never reach the browser.
 */
export function toActionErrorMessage(err: unknown, context: string): string {
  if (err instanceof UserFacingError) return err.message;
  if (err instanceof Error && err.name === "ZodError") return err.message;
  console.error(`${context} failed`, err);
  return GENERIC_ACTION_ERROR;
}
