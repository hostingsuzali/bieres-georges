"use client";

import { motion } from "framer-motion";

import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { collections } from "@/lib/data";
import { EASE, inViewOnce } from "@/lib/motion";

const cardVariants = {
  rest: { y: 0 },
  hover: { y: -8 },
};

const leftBeerVariants = {
  rest: { rotate: 0, opacity: 0, scale: 0.88 },
  hover: { rotate: -20, opacity: 1, scale: 0.94 },
};

const mainBeerVariants = {
  rest: { y: 0, scale: 1 },
  hover: { y: -8, scale: 1.06 },
};

const rightBeerVariants = {
  rest: { rotate: 0, opacity: 0, scale: 0.88 },
  hover: { rotate: 20, opacity: 1, scale: 0.94 },
};

export function BeerCollectionsSection() {
  return (
    <section id="collections" className="section-padding overflow-hidden bg-cream px-4">
      <div className="container-page">
        <div className="mx-auto max-w-3xl text-center">
          <Badge tone="orange" dot={false}>
            Nos Collections
          </Badge>

          <AnimatedHeading
            as="h2"
            text="À chaque envie,"
            className="font-display mt-7 text-4xl font-bold leading-[0.95] tracking-tight text-green sm:text-5xl lg:text-7xl"
          />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={inViewOnce}
            transition={{ duration: 0.7, ease: EASE }}
            className="font-serif mt-1 text-3xl italic text-orange sm:text-4xl lg:text-6xl"
          >
            sa collection.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inViewOnce}
          transition={{ duration: 0.8, delay: 0.18, ease: EASE }}
          className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 md:mt-14 xl:grid-cols-4"
        >
          {collections.map((collection) => (
            <CollectionCard key={collection.name} {...collection} />
          ))}
        </motion.div>

        <motion.a
          href="#collections"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inViewOnce}
          transition={{ duration: 0.7, delay: 0.35, ease: EASE }}
          className="group eyebrow mx-auto mt-12 flex w-fit items-center gap-3 text-orange"
        >
          <span className="border-b-2 border-dashed border-orange/60 pb-1.5">
            Explorer les collections
          </span>
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            <Icon name="arrowRight" size={16} />
          </span>
        </motion.a>
      </div>
    </section>
  );
}

type CardProps = (typeof collections)[number];

function CollectionCard({
  name,
  description,
  mainBeer,
  companionBeers,
}: CardProps) {
  return (
    <motion.article
      tabIndex={0}
      initial="rest"
      animate="rest"
      whileHover="hover"
      whileFocus="hover"
      variants={cardVariants}
      transition={{ duration: 0.45, ease: EASE }}
      className="tag-shape group relative flex min-h-[26rem] cursor-pointer flex-col overflow-hidden bg-cream-dark p-6 text-green outline-none transition-colors duration-500 hover:bg-orange hover:text-cream focus-visible:bg-orange focus-visible:text-cream sm:p-7 md:min-h-[38rem]"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-80 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-35 group-focus-visible:opacity-35"
        style={{
          backgroundImage: "url(/assets/backgrounds/brewery-etching.png)",
        }}
      />

      <div className="relative z-20 shrink-0">
        <h3 className="font-display text-3xl font-bold uppercase leading-[0.95]">
          {name}
        </h3>
        <p className="mt-4 text-sm leading-relaxed text-dark-text/70 transition-colors duration-500 group-hover:text-cream/85 group-focus-visible:text-cream/85">
          {description}
        </p>
      </div>

      <div className="relative z-10 mt-auto h-44 shrink-0 md:h-72">
        <BeerImage
          src={companionBeers[0]}
          alt=""
          variants={leftBeerVariants}
          className="absolute bottom-0 left-1/2 z-0 h-[118%] -translate-x-1/2"
        />
        <BeerImage
          src={mainBeer}
          alt={`Bière de la collection ${name}`}
          variants={mainBeerVariants}
          className="absolute bottom-0 left-1/2 z-20 h-[132%] -translate-x-1/2"
        />
        <BeerImage
          src={companionBeers[1]}
          alt=""
          variants={rightBeerVariants}
          className="absolute bottom-0 left-1/2 z-10 h-[118%] -translate-x-1/2"
        />
      </div>
    </motion.article>
  );
}

type BeerImageProps = {
  src: string;
  alt: string;
  variants: typeof leftBeerVariants | typeof mainBeerVariants;
  className: string;
};

function BeerImage({ src, alt, variants, className }: BeerImageProps) {
  return (
    <div className={`pointer-events-none ${className}`}>
      <motion.div
        variants={variants}
        transition={{ duration: 0.5, ease: EASE }}
        style={{ transformOrigin: "50% 100%" }}
        className="h-full"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          draggable={false}
          className="h-full w-auto max-w-none object-contain object-bottom drop-shadow-xl"
        />
      </motion.div>
    </div>
  );
}
