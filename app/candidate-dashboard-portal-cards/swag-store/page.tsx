"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSwagStore } from "./layout";

const cringeProducts = [
  {
    id: 1,
    name: "Company Fanny Pack",
    description: "It's a bag you wear on your waist. Very cool in 1995.",
    image: "/memes/fanny-pack.png",
  },
  {
    id: 2,
    name: "Office Blanket",
    description: "A blanket with sleeves. For when the office is cold.",
    image: "/memes/blanket.png",
  },
  {
    id: 3,
    name: "Fidget Spinner",
    description: "It spins. Remember 2017? Yeah, that was fun.",
    image: "/memes/fidget-spinner.png",
  },
  {
    id: 4,
    name: "Pet Rock",
    description:
      "Gary says you need to <b>EXCAVATE</b> good ideas from rocks. OK Gary.",
    image: "/memes/rock.png",
  },
  {
    id: 5,
    name: "GRIND Socks",
    description: "Tube socks. They say GRIND on them. Very professional.",
    image: "/memes/socks.png",
  },
  {
    id: 6,
    name: "Desk Zen Garden",
    description: "A tiny sandbox with a rake. Plugs into USB for some reason.",
    image: "/memes/garden.png",
  },
  {
    id: 7,
    name: "Big Headphones",
    description:
      "Gary wears these to <b>TEXTED</b> people instead of talking. From 2 feet away.",
    image: "/memes/headphones.png",
  },
  {
    id: 8,
    name: "Velour Tracksuit",
    description: "Soft and fuzzy. Perfect for video calls from bed.",
    image: "/memes/tracksuit.png",
  },
  {
    id: 9,
    name: "Company Scarf",
    description: "5 feet long. Very itchy. Shows team spirit though.",
    image: "/memes/scarf.png",
  },
  {
    id: 10,
    name: "Square Mug",
    description: "It's a mug. Very hard to drink from. Innovative!",
    image: "/memes/mug.png",
  },
  {
    id: 11,
    name: "Bumper Sticker",
    description: "authentic.",
    image: "/memes/stickers.png",
  },
  {
    id: 12,
    name: "Branded Water Bottle",
    description: "It's tap water in a plastic bottle with our logo. Amazing.",
    image: "/memes/bottle.png",
  },
  {
    id: 13,
    name: "Inflatable Cube",
    description: "3 foot cube with our logo. Think outside the box. Get it?",
    image: "/memes/cube.png",
  },
  {
    id: 14,
    name: "CEO Nameplate",
    description: "Says 'CEO in Training'. For your desk. Very serious.",
    image: "/memes/nameplate.png",
  },
  {
    id: 15,
    name: "Trail Mix",
    description:
      "Gary says this is <b>HEALTHIER</b> than lunch. It's 4 peanuts and 2 M&Ms.",
    image: "/memes/food.png",
  },
];

export default function CringeSwagStore() {
  const { isUnlocked } = useSwagStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const [clickedWasteLinks, setClickedWasteLinks] = useState<number>(0);
  const [showMessage, setShowMessage] = useState(false);

  // Load click count from localStorage on mount
  useEffect(() => {
    const savedCount = localStorage.getItem("wasteLinksClicked");
    if (savedCount) {
      const count = parseInt(savedCount, 10);
      setClickedWasteLinks(count);
    }
  }, []);

  // Save click count to localStorage whenever it changes
  useEffect(() => {
    if (clickedWasteLinks > 0) {
      localStorage.setItem("wasteLinksClicked", clickedWasteLinks.toString());
    }
  }, [clickedWasteLinks]);

  useEffect(() => {
    let _showButton = false;

    Object.defineProperty(window, "showButton", {
      get: () => _showButton,
      set: (value) => {
        _showButton = value;
        if (value === true) {
          setIsButtonVisible(true);
        }
      },
      configurable: true,
    });

    return () => {
      delete (window as any).showButton;
    };
  }, []);

  const wasteLinks = [
    "https://en.wikipedia.org/wiki/Potato",
    "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "https://en.wikipedia.org/wiki/List_of_lists_of_lists",
    "https://www.google.com/search?q=why+do+cats+knock+things+over",
    "https://www.youtube.com/watch?v=gSXm0f0HYpc",
    "https://www.google.com/search?q=how+to+breathe+manually",
    "https://en.wikipedia.org/wiki/Toilet_paper_orientation",
    "https://www.youtube.com/watch?v=_VuJA-VQRcY",
    "https://www.google.com/search?q=do+penguins+have+knees",
    "https://en.wikipedia.org/wiki/Banana_equivalent_dose",
    "https://www.google.com/search?q=why+is+the+sky+blue",
    "https://www.youtube.com/watch?v=NGuXbpNbhCE",
    "https://en.wikipedia.org/wiki/List_of_fictional_colors",
    "https://www.google.com/search?q=can+you+eat+clouds",
  ];

  const handleProductClick = (productId: number) => {
    if (!isUnlocked) return;

    // Product 6 (Desk Zen Garden) is the correct one
    if (productId === 6) {
      if (clickedWasteLinks >= 3) {
        // Set a flag that user is ready to checkout
        localStorage.setItem("readyToCheckout", "true");
        window.location.href =
          "/candidate-dashboard-portal-cards/swag-store/confirm_synergy_v2_final";
      } else {
        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 3000);
      }
    } else {
      const randomLink =
        wasteLinks[Math.floor(Math.random() * wasteLinks.length)];
      window.open(randomLink, "_blank");
      setClickedWasteLinks((prev) => {
        const newCount = prev + 1;
        return newCount;
      });
    }
  };

  return (
    <>
      {showMessage && (
        <div className="fixed top-10 left-1/2 transform -translate-x-1/2 z-50 bg-red-600 text-white font-bold py-4 px-8 rounded-lg shadow-2xl border-4 border-yellow-300 animate-bounce">
          <p className="text-xl">
            🚫 NOT YET! Click {3 - clickedWasteLinks} more item
            {3 - clickedWasteLinks !== 1 ? "s" : ""} first! 🚫
          </p>
        </div>
      )}

      <div className="bg-lime-200 min-h-screen p-4 font-['Comic_Sans_MS',_cursive] text-black">
        <header className="text-center mb-6 p-4 bg-yellow-200 rounded-lg shadow-md border-4 border-dashed border-red-500">
          <h1 className="text-6xl font-extrabold text-purple-800 mb-2 animate-pulse">
            COMPANY SWAG STORE!!!
          </h1>
          <p className="text-lg text-blue-700 font-bold">
            Buy Our Stuff! It's Cool! We Promise!
          </p>
          {isUnlocked && clickedWasteLinks > 0 && (
            <div className="mt-4 bg-green-300 border-2 border-green-600 rounded p-2">
              <p className="text-sm font-bold text-green-800">
                🎯 Progress: {clickedWasteLinks}/3 items explored!
                {clickedWasteLinks >= 3
                  ? " ✅ You can now buy the Desk Zen Garden!"
                  : ""}
              </p>
            </div>
          )}
        </header>

        <div className="w-full bg-blue-400 border-y-4 border-blue-800 overflow-hidden my-6">
          <div className="animate-marquee whitespace-nowrap py-1">
            <span
              className={`text-2xl font-bold mx-8 ${
                isUnlocked ? "text-green-300" : "text-yellow-300"
              }`}
            >
              {isUnlocked
                ? "*** STORE OPEN!! *** BUY NOW!! *** WOW!! ***"
                : "*** EVERYTHING SOLD OUT!! *** TOO POPULAR!! *** SORRY!! ***"}
            </span>
            <span
              className={`text-2xl font-bold mx-8 ${
                isUnlocked ? "text-green-300" : "text-yellow-300"
              }`}
            >
              {isUnlocked
                ? "*** STORE OPEN!! *** BUY NOW!! *** WOW!! ***"
                : "*** EVERYTHING SOLD OUT!! *** TOO POPULAR!! *** SORRY!! ***"}
            </span>
          </div>
          <style jsx global>{`
            @keyframes marquee {
              0% {
                transform: translateX(0%);
              }
              100% {
                transform: translateX(-50%);
              }
            }
            .animate-marquee {
              animation: marquee 15s linear infinite;
              display: inline-block;
            }
          `}</style>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {cringeProducts.map((product, index) => (
            <div
              key={product.id}
              className={`bg-white rounded-lg shadow-lg border-2 transform transition-all duration-300 ${
                product.id === 6 && clickedWasteLinks >= 3 && isUnlocked
                  ? "border-green-500 border-4 ring-4 ring-green-300 animate-pulse"
                  : "border-purple-400"
              } ${
                !isUnlocked
                  ? `hover:scale-105 hover:rotate-${
                      index % 2 === 0 ? "2" : "-2"
                    }`
                  : ""
              } flex flex-col`}
            >
              <div className="relative">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={200}
                  height={200}
                  className={`w-full h-auto object-contain aspect-video transition-opacity duration-300 ${
                    !isUnlocked ? "opacity-50" : "opacity-100"
                  }`}
                  unoptimized
                />
              </div>

              <div className="p-3 flex-grow flex flex-col">
                <h2 className="text-xl font-bold text-purple-900">
                  {product.name}
                </h2>
                <p
                  className="text-gray-700 italic text-sm my-2 flex-grow"
                  dangerouslySetInnerHTML={{
                    __html: `"${product.description}"`,
                  }}
                />
                {isUnlocked ? (
                  <button
                    onClick={() => handleProductClick(product.id)}
                    className={`w-full text-center font-bold py-2 px-4 rounded-lg text-lg cursor-pointer transition-all ${
                      product.id === 6 && clickedWasteLinks >= 3
                        ? "bg-gradient-to-r from-green-400 to-green-600 text-white animate-pulse hover:from-green-500 hover:to-green-700"
                        : "bg-green-500 text-white hover:bg-green-600 animate-pulse"
                    }`}
                  >
                    {product.id === 6 && clickedWasteLinks >= 3
                      ? "✅ CHECKOUT NOW! ✅"
                      : "BUY NOW!!"}
                  </button>
                ) : (
                  <div className="text-xs mt-2 pt-2 border-t border-gray-200">
                    <strong className="text-red-600">Status:</strong> SOLD OUT
                    <br />
                    <strong className="text-blue-600">Restock:</strong> Never
                    <br />
                    <strong className="text-gray-500">Price:</strong>{" "}
                    <span className="line-through">$99.99</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <footer className="text-center mt-10 text-sm text-gray-600">
          <p>This page is optimized for Netscape Navigator 4.0.</p>
          <p>
            Copyright 1999 - {new Date().getFullYear()}. All Rights Reserved.
            (Do not steal our code)
          </p>

          <p
            className="font-bold text-lg mt-2 animate-bounce"
            title="Gary's Work Order: 'This page is glitched. The secret stash **button** isn't set to **show**! A real hustler would .. Set it'"
          >
            🚧 Page Under Construction 🚧
          </p>
        </footer>
      </div>

      <button
        onClick={() => setIsModalOpen(true)}
        className={`fixed bottom-10 right-10 p-4 bg-red-600 text-white font-['Comic_Sans_MS',_cursive]
                    font-bold text-2xl rounded-full shadow-lg border-4 border-yellow-300
                    animate-pulse transition-all duration-500 transform
                    ${
                      isButtonVisible
                        ? "opacity-100 z-50 scale-100"
                        : "opacity-0 -z-10 scale-0"
                    }`}
      >
        GARY'S STASH
      </button>

      <HuntModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}

function HuntModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { unlockStore } = useSwagStore();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const validCodes = [
    "prune.decide.comedy",
    "brings.plodding.lofts",
    "loops.tigers.states",
    "nightcap.gourmet.complain",
    "pointer.variously.postage",
    "shampoos.lyrics.kebab",
    "juror.jetliner.crackled",
    "secretly.hurray.whistling",
    "agreement.drivers.toned",
    "rental.tests.confetti",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const normalizedCode = code.toLowerCase().replace(/[\/ ]/g, "").trim();

    if (validCodes.includes(normalizedCode)) {
      unlockStore();
      onClose();
    } else {
      setError("WRONG CODE! Try again!");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 font-['Comic_Sans_MS',_cursive]">
      <div className="bg-yellow-200 p-8 rounded-lg shadow-2xl border-4 border-dashed border-red-500 w-full max-w-md">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-black text-3xl font-bold"
        >
          &times;
        </button>
        <h2 className="text-3xl font-extrabold text-purple-800 mb-4">
          GARY'S SECRET STASH!
        </h2>
        <p className="text-gray-700 mb-4">
          Gary from accounting locked the store! He says you need one of the 11
          secret codes to unlock it. Find the codes hidden around the site!
        </p>
        <p className="text-sm text-blue-700 mb-4">
          <b>HINT:</b> Gary left 3 clue words hidden in the item view page!
        </p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="code" className="block text-gray-700 font-bold mb-2">
            Enter the 3-Word Site Code (e.g. word.word.word):
          </label>
          <input
            type="text"
            id="code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full p-2 border-2 border-purple-400 rounded-lg"
            placeholder="///word.word.word"
          />
          {error && <p className="text-red-600 font-bold mt-2">{error}</p>}

          <button
            type="submit"
            className="w-full bg-green-500 text-white font-bold py-3 px-6 rounded-lg text-lg hover:bg-green-600 transition-all mt-4 animate-pulse"
          >
            UNLOCK STORE!
          </button>
        </form>
      </div>
    </div>
  );
}
