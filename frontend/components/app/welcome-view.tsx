import { motion } from 'motion/react';
import {
  ArrowRight,
  Cookie,
  Crown,
  Fire,
  Hamburger,
  Popcorn,
  Tag,
} from '@phosphor-icons/react/dist/ssr';
import { FlameButton } from '@/components/ui/flame-button';

interface WelcomeViewProps {
  onStart: () => void;
}

export function WelcomeView({ onStart }: WelcomeViewProps) {
  const offers = [
    {
      title: 'Zinger Box Deal',
      desc: 'Zinger Burger, Fries & Drink',
      price: '$5.99',
      image: '/offers/zinger-box.png', // Use the generated image
      gradient: 'from-orange-500 to-red-600',
    },
    {
      title: 'Family Feast',
      desc: '12pc Chicken & 3 Large Sides',
      price: '$19.99',
      image: '/offers/family-feast.png', // Generated image
      gradient: 'from-red-600 to-red-800',
    },
    {
      title: 'Tuesday Special',
      desc: 'Popcorn Chicken & Hot Wings',
      price: '$9.99',
      image: '/offers/tuesday-special.png', // Generated image
      gradient: 'from-yellow-500 to-orange-600',
    },
  ];

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-white font-sans text-black selection:bg-[#F40027]/30">
      {/* Dynamic Background Elements - KFC Theme */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="animate-float absolute top-[-20%] left-[-10%] h-[800px] w-[800px] rounded-full bg-gradient-to-br from-[#F40027]/10 to-transparent blur-[120px]" />
        <div className="animate-float-delayed absolute right-[-10%] bottom-[-20%] h-[800px] w-[800px] rounded-full bg-gradient-to-tl from-[#F40027]/10 to-transparent blur-[100px]" />
        <div className="animate-pulse-ring absolute top-[40%] left-[30%] h-[400px] w-[400px] rounded-full bg-[#F40027]/5 blur-[80px]" />
      </div>

      {/* Floating Food Emojis */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden opacity-20">
        <div className="animate-float absolute top-[10%] left-[10%] text-6xl">🍗</div>
        <div className="animate-float-delayed absolute top-[20%] right-[15%] text-5xl">🍟</div>
        <div className="animate-float absolute bottom-[15%] left-[20%] text-7xl">🥤</div>
        <div className="animate-float-delayed absolute right-[10%] bottom-[25%] text-6xl">🌽</div>
        <div className="animate-float absolute top-[50%] left-[5%] text-4xl">🍪</div>
        <div className="animate-float-delayed absolute top-[40%] right-[5%] text-5xl">🔥</div>
      </div>

      <div className="relative z-10 flex flex-grow flex-col items-center justify-start px-6 py-20 text-center">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mb-16 flex flex-col items-center"
        >
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#F40027]/30 bg-[#F40027]/5 px-5 py-2 shadow-sm backdrop-blur-xl">
            <Fire weight="fill" className="h-4 w-4 text-[#F40027]" />
            <span className="text-xs font-bold tracking-widest text-[#F40027] uppercase">
              Finger Lickin&apos; Good Since 1952
            </span>
          </div>

          {/* Logo Image */}
          <div className="mb-8 h-32 w-auto md:h-40">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://upload.wikimedia.org/wikipedia/en/b/bf/KFC_logo.svg"
              alt="KFC Logo"
              className="h-full w-full object-contain drop-shadow-lg"
            />
          </div>

          <h1 className="mb-6 text-5xl font-extrabold tracking-tight text-black drop-shadow-sm md:text-7xl">
            Kentucky Fried <br />
            <span className="animate-gradient bg-300% bg-gradient-to-r from-[#F40027] via-[#ff4d6d] to-[#F40027] bg-clip-text text-transparent">
              Chicken
            </span>
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed font-bold text-black/70 md:text-xl">
            The original fried chicken.
            <br />
            <span className="font-extrabold text-[#F40027]">
              It&apos;s Finger Lickin&apos; Good.
            </span>
          </p>

          {/* CTA Button - KFC Red */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <FlameButton onClick={onStart} />
          </motion.div>
        </motion.div>

        {/* Exclusive Offers Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20 w-full max-w-6xl"
        >
          <div className="mb-10 flex items-center justify-center gap-3">
            <Tag className="h-8 w-8 text-[#F40027]" weight="fill" />
            <h2 className="text-3xl font-bold text-black md:text-4xl">Exclusive Offers</h2>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {offers.map((offer, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative overflow-hidden rounded-3xl bg-white shadow-xl transition-all duration-300 hover:shadow-2xl"
              >
                {/* Image / Placeholder Area */}
                <div
                  className={`relative h-64 w-full overflow-hidden bg-gradient-to-br ${offer.gradient}`}
                >
                  {offer.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={offer.image}
                      alt={offer.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-white/20">
                      <Fire className="h-32 w-32" weight="duotone" />
                    </div>
                  )}

                  {/* Price Tag */}
                  <div className="absolute top-4 right-4 rounded-full bg-white px-4 py-2 text-lg font-bold text-[#F40027] shadow-lg">
                    {offer.price}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 text-left">
                  <h3 className="mb-2 text-2xl font-bold text-black transition-colors group-hover:text-[#F40027]">
                    {offer.title}
                  </h3>
                  <p className="font-medium text-black/60">{offer.desc}</p>
                  <button
                    onClick={onStart}
                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-black py-3 font-bold text-white transition-colors hover:bg-[#F40027]"
                  >
                    Order Now <ArrowRight weight="bold" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Feature Cards - Glassmorphism */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mb-16 grid w-full max-w-5xl grid-cols-1 gap-6 md:grid-cols-3"
        >
          {[
            {
              icon: Hamburger, // Using Hamburger as generic food icon, could be replaced if 'Chicken' icon existed
              title: 'Original Recipe',
              desc: '11 herbs and spices, hand-breaded daily.',
              gradient: 'from-[#F40027]/10 to-transparent',
              iconColor: 'text-[#F40027]',
            },
            {
              icon: Crown, // Keeping Crown for "King" of chicken or similar
              title: 'Big Buckets',
              desc: 'Share the love with our family sized buckets.',
              gradient: 'from-[#F40027]/10 to-transparent',
              iconColor: 'text-[#F40027]',
            },
            {
              icon: Fire,
              title: 'Freshly Prepared',
              desc: 'Real chicken, prepared fresh in store.',
              gradient: 'from-[#F40027]/10 to-transparent',
              iconColor: 'text-[#F40027]',
            },
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -8 }}
              className="group relative flex flex-col items-center rounded-3xl border border-black/5 bg-white/60 p-8 shadow-lg backdrop-blur-md transition-all duration-300 hover:border-[#F40027]/30 hover:shadow-[#F40027]/10"
            >
              <div
                className={`absolute inset-0 rounded-3xl bg-gradient-to-b ${feature.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
              />

              <div className="relative z-10 mb-6 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5">
                <feature.icon className={`h-8 w-8 ${feature.iconColor}`} />
              </div>
              <h3 className="relative z-10 mb-3 text-xl font-bold text-black">{feature.title}</h3>
              <p className="relative z-10 text-sm font-medium text-black/60">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="relative z-10 mt-auto mb-8 flex flex-col items-center gap-2"
      >
        <div className="h-px w-12 bg-gradient-to-r from-transparent via-black/10 to-transparent" />
        <span className="text-[10px] font-medium tracking-[0.2em] text-black/30 uppercase">
          Powered by LiveKit & Gemini
        </span>
      </motion.div>
    </div>
  );
}
