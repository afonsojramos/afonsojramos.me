import type { Component } from "solid-js";
import { createSignal, onMount, Show } from "solid-js";

interface LoginFormProps {
  redirectPath: string;
}

export const LoginForm: Component<LoginFormProps> = (props) => {
  const [password, setPassword] = createSignal("");
  const [error, setError] = createSignal(false);
  const [loading, setLoading] = createSignal(false);
  let inputRef: HTMLInputElement | undefined;
  let errorRef: HTMLParagraphElement | undefined;

  onMount(() => {
    // Auto-focus the input on mount
    inputRef?.focus();
  });

  const handleSubmit = async (e: Event) => {
    e.preventDefault();

    if (!password().trim()) {
      setError(true);
      shakeInput();
      return;
    }

    setLoading(true);
    setError(false);

    try {
      const formData = new FormData();
      formData.append("password", password());
      formData.append("redirect", props.redirectPath);

      const response = await fetch("/cfp_login", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Success - redirect to the target page
        window.location.href = data.redirect || props.redirectPath;
      } else {
        // Error - show error message and shake
        setError(true);
        setPassword("");
        shakeInput();
        setLoading(false);
      }
    } catch (err) {
      setError(true);
      setPassword("");
      shakeInput();
      setLoading(false);
    }
  };

  const shakeInput = () => {
    if (inputRef) {
      inputRef.classList.add("shake");
      setTimeout(() => {
        inputRef?.classList.remove("shake");
        inputRef?.focus();
        inputRef?.select();
      }, 400);
    }
  };

  return (
    <>
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-8px); }
          20%, 40%, 60%, 80% { transform: translateX(8px); }
        }

        @keyframes fade-in-down {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .shake {
          animation: shake 0.4s ease-in-out;
        }

        .error-message {
          animation: fade-in-down 0.3s ease-out;
        }
      `}</style>

      <form onSubmit={handleSubmit} class="w-full flex flex-col gap-4">
        <input
          ref={inputRef}
          type="password"
          name="password"
          placeholder="Password"
          autocomplete="current-password"
          required
          value={password()}
          onInput={(e) => {
            setPassword(e.currentTarget.value);
            if (error()) setError(false);
          }}
          aria-label="Password"
          aria-describedby={error() ? "password-error" : undefined}
          aria-invalid={error()}
          disabled={loading()}
          class="w-full px-4 py-3 rounded-lg border border-black/15 dark:border-white/20 bg-white dark:bg-stone-800 text-black dark:text-white placeholder-black/40 dark:placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20 transition-colors disabled:opacity-50"
        />

        <Show when={error()}>
          <div class="error-message">
            <p
              ref={errorRef}
              id="password-error"
              class="text-sm text-red-600 dark:text-red-400"
              role="alert"
            >
              Wrong password. Please try again.
            </p>
            <div class="sr-only" aria-live="polite">
              Login failed: wrong password entered
            </div>
          </div>
        </Show>

        <button
          type="submit"
          disabled={loading()}
          class="w-full px-4 py-3 rounded-lg bg-black dark:bg-white text-white dark:text-black font-medium hover:bg-black/90 dark:hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <Show
            when={!loading()}
            fallback={
              <span class="flex items-center gap-2">
                <svg
                  class="animate-spin h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  role="img"
                  aria-label="loading"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  />
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Checking...
              </span>
            }
          >
            Login
          </Show>
        </button>
      </form>
    </>
  );
};
