export function getTemplate({
  redirectPath,
  withError,
}: {
  redirectPath: string;
  withError: boolean;
}): string {
  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>work (password protected) | afonso jorge ramos</title>
      <meta name="description" content="This page is password protected. Please contact me for access." />
      <link rel="shortcut icon" href="https://afonsojramos.me/favicon.ico" />

      <script src="https://cdn.tailwindcss.com"></script>
      <script>
        tailwind.config = {
          darkMode: "class",
          theme: {
            extend: {
              fontFamily: {
                sans: ["Inter Tight", "ui-sans-serif", "system-ui", "sans-serif"],
              },
              colors: {
                stone: {
                  100: "#f5f5f4",
                  800: "#292524",
                  900: "#1c1917",
                },
              },
            },
          },
        };
      </script>

      <style>
        body {
          font-family: "Inter Tight", ui-sans-serif, system-ui, sans-serif;
        }
        .animate {
          opacity: 0;
          transform: translateY(12px);
          transition: all 0.7s ease-out;
        }
        .animate.show {
          opacity: 1;
          transform: translateY(0);
        }
      </style>

      <script>
        // Theme detection - matches main site logic
        function preloadTheme() {
          const userTheme = localStorage.theme;
          
          if (userTheme === "light" || userTheme === "dark") {
            toggleTheme(userTheme === "dark");
          } else {
            toggleTheme(window.matchMedia("(prefers-color-scheme: dark)").matches);
          }
        }

        function toggleTheme(dark) {
          if (dark) {
            document.documentElement.classList.add("dark");
          } else {
            document.documentElement.classList.remove("dark");
          }
        }

        // Apply theme immediately to prevent flash
        preloadTheme();
      </script>
    </head>

    <body
      class="bg-stone-100 dark:bg-stone-900 text-black/50 dark:text-white/75 font-sans antialiased flex flex-col min-h-screen"
    >
      <header
        class="print:hidden fixed top-0 left-0 right-0 z-50 py-5 bg-stone-100/75 dark:bg-stone-900/0 backdrop-blur-md saturate-200"
      >
        <div class="mx-auto max-w-2xl px-5 print:p-0">
          <div class="flex flex-wrap gap-y-2 justify-between">
            <a
              href="/"
              class="font-semibold text-black dark:text-white hover:text-black/75 dark:hover:text-white/75 transition-colors"
            >
              afonso jorge ramos
            </a>
            <nav class="flex gap-1">
              <a
                href="/blog"
                class="text-black/50 dark:text-white/75 hover:text-black dark:hover:text-white transition-colors"
                >blog</a
              >
              <span>/</span>
              <a
                href="/work"
                class="text-black/50 dark:text-white/75 hover:text-black dark:hover:text-white transition-colors"
                >work</a
              >
              <span>/</span>
              <a
                href="/music"
                class="text-black/50 dark:text-white/75 hover:text-black dark:hover:text-white transition-colors"
              >
                music
              </a>
            </nav>
          </div>
        </div>
      </header>

      <main class="flex-1 py-32">
        <div class="mx-auto max-w-xl px-5">
          <div class="animate space-y-6">
            <div class="space-y-1">
              <h1 class="text-2xl font-semibold text-black dark:text-white">
                Password
              </h1>
              <h2 class="text-black/75 dark:text-white/75">
                Please enter your password for this page.
              </h2>
              <h3 class="text-black/75 dark:text-white/75">
                If you don't have the password, feel free to contact me.
              </h3>
            </div>

            ${withError ? `<p class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 text-red-800 dark:text-red-200 text-sm">Invalid password</p>` : ""}

            <form method="post" action="/cfp_login" class="space-y-4">
              <input type="hidden" name="redirect" value="${redirectPath}" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                aria-label="Password"
                autocomplete="current-password"
                required
                autofocus
                class="w-full px-4 py-3 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-black dark:text-white placeholder-stone-400 dark:placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-stone-300 dark:focus:ring-stone-600 transition-colors"
              />
              <button
                type="submit"
                class="w-full px-4 py-3 bg-black dark:bg-white text-white dark:text-black font-medium rounded-lg hover:bg-stone-800 dark:hover:bg-stone-100 transition-colors duration-300 ease-in-out"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </main>

      <script>
        // Add animation on load
        window.addEventListener("load", function () {
          const animateElement = document.querySelector(".animate");
          if (animateElement) {
            animateElement.classList.add("show");
          }
        });

        // Listen for system theme changes (only if using system theme)
        window
          .matchMedia("(prefers-color-scheme: dark)")
          .addEventListener("change", (e) => {
            if (!localStorage.theme || localStorage.theme === "system") {
              toggleTheme(e.matches);
            }
          });
      </script>
    </body>
  </html>
  `;
}
