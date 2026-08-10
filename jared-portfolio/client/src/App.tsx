import { ThemeProvider } from "@/contexts/ThemeContext";
import Home from "@/pages/Home";

export default function App() {
  return (
    <ThemeProvider>
      <Home />
    </ThemeProvider>
  );
}
