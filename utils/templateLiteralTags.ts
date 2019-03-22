export const mongoConnectionString = (strs: TemplateStringsArray, user: string, password: string, uri: string) =>
  `mongodb://${encodeURIComponent(user)}:${encodeURIComponent(password)}@${uri}`;
