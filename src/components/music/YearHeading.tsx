import { type Component, createSignal, For, Show } from "solid-js";
import { Portal } from "solid-js/web";
import { Button } from "~/components/ui/Button";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/Popover";
import type { Year } from "~/types/content";

interface YearHeadingProps {
  currentYear: string;
  allYears: Year[];
  description?: string;
}

const YearHeading: Component<YearHeadingProps> = (props) => {
  const [isOpen, setIsOpen] = createSignal(false);

  const handleYearClick = (year: string) => {
    setIsOpen(false);

    const targetSection = document.getElementById(year);
    if (targetSection) {
      window.scrollTo({
        top: targetSection.offsetTop + window.innerHeight / 10,
        behavior: "smooth",
      });
      window.history.pushState(null, "", `#${year}`);
    }
  };

  const getCenterAnchorRect = () => {
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    return {
      x: viewport.width / 2,
      y: (viewport.height / 10) * 1.5,
    };
  };

  return (
    <div class="flex flex-col gap-4 pb-4">
      {/* Desktop */}
      <h2 class="hidden lg:block text-black font-bold text-2xl dark:text-white">
        {props.currentYear}
      </h2>

      {/* Mobile */}
      <div class="block lg:hidden">
        <Portal>
          <div
            class={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 ${
              isOpen() ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          />
        </Portal>

        <Popover
          open={isOpen()}
          onOpenChange={setIsOpen}
          getAnchorRect={getCenterAnchorRect}
          placement="bottom"
          gutter={0}
          shift={0}
        >
          <PopoverTrigger class="text-left">
            <h2 class="text-black font-bold text-2xl dark:text-white flex items-center gap-2">
              {props.currentYear}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class={`h-5 w-5 transition-transform duration-200 ${isOpen() ? "rotate-180" : ""}`}
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-label="Open year selector"
              >
                <title>Open year selector</title>
                <path
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </h2>
          </PopoverTrigger>
          <PopoverContent class="w-[90vw] max-w-md p-6 max-h-[70vh] overflow-y-auto z-50">
            <div class="mb-4">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Select Year</h3>
            </div>
            <div class="grid grid-cols-3 gap-2">
              <For each={props.allYears}>
                {(year) => (
                  <Button
                    onClick={() => handleYearClick(year.year)}
                    variant={year.year === props.currentYear ? "default" : "outline"}
                    size="sm"
                    class="h-auto py-3"
                  >
                    {year.year}
                  </Button>
                )}
              </For>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <Show when={props.description}>
        <h3 class="text-lg text-gray-700 dark:text-gray-300">{props.description}</h3>
      </Show>
    </div>
  );
};

export default YearHeading;
