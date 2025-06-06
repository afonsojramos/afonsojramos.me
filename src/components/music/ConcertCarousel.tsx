import Autoplay from "embla-carousel-autoplay";
import { type Component, For, Show } from "solid-js";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/Carousel";
import type { Concert } from "~/types/content";

interface ConcertCarouselProps {
  concerts?: (Concert & { optimizedImage?: string; width?: number; height?: number })[];
}

const ConcertCarousel: Component<ConcertCarouselProps> = (props) => {
  return (
    <Carousel plugins={[Autoplay({ delay: 5000 })]} opts={{ loop: true }}>
      <CarouselContent parentClass="rounded-lg">
        <For each={props.concerts}>
          {(concert) => (
            <CarouselItem>
              <div class="relative w-full group cursor-grab">
                <img
                  src={concert.optimizedImage || concert.image}
                  alt={concert.title}
                  class="w-full object-cover aspect-21/9"
                  width={960}
                  height={540}
                />
                <div class="absolute inset-0 bg-black/30 dark:bg-black/50 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 flex items-end">
                  <div class="p-4 w-full">
                    <h3 class="text-lg font-bold mb-1 text-white">{concert.title}</h3>
                    <p class="text-sm text-gray-200">{concert.location}</p>
                  </div>
                </div>
              </div>
            </CarouselItem>
          )}
        </For>
      </CarouselContent>
      <CarouselPrevious
        class="hidden md:block absolute top-1/2 -translate-y-1/2 left-4 hover:bg-transparent cursor-pointer"
        variant="ghost"
        size="icon"
      />
      <CarouselNext
        class="hidden md:block absolute top-1/2 -translate-y-1/2 right-4 hover:bg-transparent cursor-pointer"
        variant="ghost"
        size="icon"
      />
    </Carousel>
  );
};

export default ConcertCarousel;
