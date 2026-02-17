import { cookies } from "next/headers";
import ThemeToggle from "@/components/ThemeToggle";

export default async function Home() {
  const cookieStore = await cookies();
  const themeCookie = cookieStore.get("theme")?.value;
  const initialTheme =
    themeCookie === "dark" || themeCookie === "light" ? themeCookie : "light"; // fallback
  return (
    <main>
      <ThemeToggle initialTheme={initialTheme} />
    </main>
  );
}
