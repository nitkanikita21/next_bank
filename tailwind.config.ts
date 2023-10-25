import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
    content: ["./src/**/*.tsx"],
    theme: {
        extend: {
            fontFamily: {
                sans: ["var(--font-sans)", ...fontFamily.sans],
            },
        },
    },
    daisyui: {
        themes: ["synthwave", "dark", "night"],
    },
    plugins: [
        require('@tailwindcss/typography'),
        require("daisyui")
    ],
} satisfies Config;
