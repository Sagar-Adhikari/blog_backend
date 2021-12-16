export function getRandomString(): string {
  return Math.random().toString(36).substring(7);
}

export function fixPrivateKey(key: string): string {
  /**
   * For some reason, upon retrieval of a string from an .env file,
   * every single slash is converted to double slash
   *
   * Hence, converting:
   * double slashes (\\n)
   * to
   * single slashes (\n)
   */
  return key.replace(/\\n/g, '\n');
}
