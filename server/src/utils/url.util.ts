import axios from "axios";

export default async function urlExists(url: string): Promise<boolean> {
  const { status } = await axios.head(url);
  return new RegExp(/2[02][0-8]/).test(status.toString());
}
