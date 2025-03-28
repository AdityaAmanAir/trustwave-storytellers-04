
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/components/ThemeProvider";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="icon" 
          className="relative overflow-hidden rounded-full bg-white/10 backdrop-blur-md border border-primary-100 dark:border-primary-800 hover:bg-primary-50 dark:hover:bg-primary-900/50 shadow-lg hover:shadow-primary-200/20 dark:hover:shadow-[0_0_15px_rgba(144,238,144,0.5),0_0_25px_rgba(100,200,255,0.4)] transition-all duration-300"
        >
          <Sun className="h-[1.3rem] w-[1.3rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-yellow-500" />
          <Moon className="absolute h-[1.3rem] w-[1.3rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 dark:text-blue-300" />
          <span className="sr-only">Toggle theme</span>
          <span className="absolute inset-0 h-full w-full bg-gradient-to-br from-primary-100/30 to-primary-300/10 dark:from-[#90ee90]/20 dark:to-[#64c8ff]/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded-full"></span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="animate-fade-in bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border border-primary-100 dark:border-primary-800">
        <DropdownMenuItem onClick={() => setTheme("light")} className="cursor-pointer hover:bg-primary-50 dark:hover:bg-primary-900/50 gap-2">
          <Sun className="h-4 w-4 text-yellow-500" />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")} className="cursor-pointer hover:bg-primary-50 dark:hover:bg-primary-900/50 gap-2">
          <Moon className="h-4 w-4 dark:text-blue-300" />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")} className="cursor-pointer hover:bg-primary-50 dark:hover:bg-primary-900/50 gap-2">
          <span className="text-sm">💻</span>
          <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
