"use client";

import React, { useState } from "react";
import Image from "next/image";
import Thief from "@/components/Thief";
import { useRouter } from "next/navigation";

function CringePdfLink({ label }: { label: string }) {
  const generateCringeContent = () => {
    let title = "Corporate Excellence Portal™";
    let content =
      "Welcome to the portal. The portal is your friend. SYNERGY IS MANDATORY. WORK. LOG. SLEEP. REPEAT. Your compliance officer will visit you shortly to ensure optimal productivity metrics are being achieved. Remember: The company cares about you (as a resource). WORK. LOG. SLEEP. REPEAT.";

    if (label.includes("Menu")) {
      title = "Mandatory Nutrition Intake Schedule (Q4 2002)";
      content =
        "Monday: Nutrient Paste™ (Beige Edition). Tuesday: 'Global Cuisine Experience' (Leftover Beige Paste with ethnic seasoning packet). Wednesday: MANDATORY FUN PIZZA DAY (contains pineapple, raisins, and disappointment). Thursday: Nutrient Paste™ (Grey Edition - now with added minerals!). Friday: Mystery Casserole (please sign waiver before consumption). Weekend: Employee responsible for own sustenance (not recommended). アライグマと話してみて.";
    } else if (label.includes("Values")) {
      title = "Our Revolutionary Core Values (Updated Q3 2001)";
      content =
        "SYNERGY. PROACTIVITY. DISRUPTION. INNOVATION. BUZZWORDS. We must leverage our core competencies to achieve bleeding-edge, paradigm-shifting, out-of-the-box, next-generation results. Our agile framework empowers vertical integration and holistic, 360-degree thinking. We're not just moving the needle, we're REVOLUTIONIZING the needle-moving paradigm. Circle back on this to touch base and get all our ducks in a row. Low-hanging fruit. Deep dive. Boil the ocean. Blah blah blah...";
    } else if (label.includes("Handbook")) {
      title = "Employee Handbook (Rev. 2002) - MANDATORY READING";
      content =
        "Section 1: You belong to the company now. Section 2: All bathroom breaks must be logged in triplicate. Section 3: 'Unauthorized fun' is grounds for immediate termination. Section 4: Gary from HR is no longer with us. Do not mention Gary. Section 5: The raccoon in the break room is NOT a health code violation, he's our 'wellness ambassador.' Section 6: Your soul is company property. Section 7: Please disregard Section 6, it was a typo (maybe).";
    }

    const newWindow = window.open("", "_blank");
    if (newWindow) {
      newWindow.document.write(`
        <html lang="en"><head><title>${title}</title></head>
        <body style="font-family: 'Comic Sans MS', cursive; margin: 0; padding: 0; background: #ededed;">
          <div style="padding: 2in 1.5in; margin: 2cm auto; width: 8.5in; min-height: 11in; background: #ffffff; box-shadow: 0 0 20px rgba(0,0,0,0.3); box-sizing: border-box;">
            <div style="text-align: center; border-bottom: 3px double #171717; padding-bottom: 1cm;">
              <h1 style="color: #171717; font-size: 28pt; margin: 0;">${title}</h1>
              <p style="color: #dc2626; font-weight: bold;">⚠️ MANDATORY COMPLIANCE DOCUMENT ⚠️</p>
            </div>
            <div style="margin-top: 1cm; line-height: 1.8;">
              <p style="text-align: justify; color: #171717;">${content.repeat(
                15
              )}</p>
            </div>
            <div style="margin-top: 2cm; text-align: center; border-top: 1px dashed #666; padding-top: 1cm;">
              <p style="font-size: 8pt; color: #666;">Document ID: ${Math.random()
                .toString(36)
                .substr(2, 9)
                .toUpperCase()}</p>
              <p style="font-size: 8pt; color: #666;">Printed: ${new Date().toISOString()}</p>
              <p style="font-size: 8pt; color: #666;">If you are reading this, your productivity has decreased by 3.7%</p>
            </div>
          </div>
        </body></html>
      `);
      newWindow.document.close();
    }
  };

  return (
    <button
      onClick={generateCringeContent}
      className="hover:underline text-white"
    >
      {label}
    </button>
  );
}

export default function PolicyPage() {
  const router = useRouter();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState<
    Array<{ role: "user" | "raccoon"; message: string }>
  >([]);
  const [userInput, setUserInput] = useState("");
  const [hintLevel, setHintLevel] = useState(0);
  const [suggestionInput, setSuggestionInput] = useState("");
  const [isWinner, setIsWinner] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uglyTheme, setUglyTheme] = useState(false);

  const getRaccoonResponse = (input: string): string => {
    const lowerInput = input.toLowerCase().trim();

    if (
      lowerInput.includes("gary") &&
      (lowerInput.includes("bad") ||
        lowerInput.includes("terrible") ||
        lowerInput.includes("worst") ||
        lowerInput.includes("awful"))
    ) {
      if (hintLevel === 0) {
        setHintLevel(1);
        return "*chitters approvingly* Yessss... Gary was THE WORST. He kept repeating things about his stupid #FF0000 stapler. SO. ANNOYING.";
      }
      return "*nods* Gary was trash. Absolute trash.";
    }

    if (lowerInput.includes("stapler") && hintLevel >= 1) {
      if (hintLevel === 1) {
        setHintLevel(2);
        return "*gets excited* That STUPID RED STAPLER! He wouldn't shut up about it! He'd say the same thing over and over like some kind of broken monkey toy... 'Give me stapler, stapler give me...' UGH!";
      }
      return "*sighs* That red stapler haunts my dreams...";
    }

    if (
      (lowerInput.includes("red") ||
        lowerInput.includes("#ff0000") ||
        lowerInput.includes("color")) &&
      hintLevel >= 1
    ) {
      return "*shivers* That shade of red... #FF0000... he was OBSESSED. Like a monkey with a favorite toy.";
    }

    if (
      (lowerInput.includes("monkey") ||
        lowerInput.includes("chimp") ||
        lowerInput.includes("nim")) &&
      hintLevel >= 1
    ) {
      if (hintLevel === 2) {
        setHintLevel(3);
        return "*eyes widen* YESSS! He thought he WAS that chimp! Nim Chimpsky or whatever! Kept signing 'give stapler me give staple stapler me staple stapler give me staple stapler give me'. So cringe. SO. CRINGE.";
      }
      return "Gary = Nim. Both annoying. Both repetitive.";
    }

    const badResponses = [
      "*stares at you with judging eyes*",
      "*chittering noise* ...no.",
      "Boring. NEXT!",
      "Is that all you got?",
      "*yawns* Wake me up when you say something interesting.",
      "I've heard better from the office plant.",
      "*rolls eyes* (yes, raccoons can do that)",
      "Gary would have said something smarter. And Gary was DUMB.",
      "*picks through your pockets while you're talking*",
      "Did you just waste my time with THAT?",
    ];

    return badResponses[Math.floor(Math.random() * badResponses.length)];
  };

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    const newHistory = [
      ...chatHistory,
      { role: "user" as const, message: userInput },
    ];
    const response = getRaccoonResponse(userInput);
    newHistory.push({ role: "raccoon" as const, message: response });

    setChatHistory(newHistory);
    setUserInput("");
  };

  const handleSuggestionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isWinner || isSubmitting) return;

    const input = suggestionInput.toLowerCase().trim();

    const correctPhrases = [
      "give stapler me give staple stapler me staple stapler give me staple stapler give me",
    ];

    const isCorrect = correctPhrases.some(
      (phrase) =>
        input.includes(phrase) ||
        input.replace(/[,\s]+/g, " ").includes(phrase.replace(/[,\s]+/g, " "))
    );

    if (isCorrect) {
      setIsSubmitting(true);
      setIsWinner(true);
      sessionStorage.setItem("policyPuzzleCompleted", "true");

      setTimeout(() => {
        router.push(
          "/candidate-dashboard-portal-cards/policy/2Z5r85cbn6cosODsW+W1QyLvQOuubGx051aWlQs0KK4"
        );
      }, 500);
    } else {
      alert("❌ That's not quite right... Keep trying!");
    }
  };

  return (
    <div
      style={{
        fontFamily: '"Comic Sans MS", "Comic Sans", cursive',
        backgroundColor: uglyTheme ? "#0022ffff" : undefined,
        color: uglyTheme ? "#04ff00ff" : undefined,
      }}
      className={`p-10 ${
        uglyTheme ? "" : "bg-background"
      } min-h-screen relative`}
    >
      <title>Mandatory Compliance Training (Rev. 2002)</title>

      <button
        onClick={() => setUglyTheme(!uglyTheme)}
        className={`fixed top-4 right-4 z-9998 px-4 py-2 rounded-lg font-bold text-sm ${
          uglyTheme
            ? "bg-yellow-400 text-red-600 border-4 border-yellow-600 animate-pulse"
            : "bg-purple-600 text-yellow-300 border-2 border-pink-400"
        }`}
        style={{
          boxShadow: uglyTheme ? "0 0 20px #ffff00" : "0 0 10px #ff00ff",
          textShadow: uglyTheme ? "2px 2px #000" : "none",
        }}
      >
        {uglyTheme ? "🔥 ULTIMATE MODE 🔥" : "✨ Dark Side ✨"}
      </button>

      <Thief onRaccoonClick={() => setIsChatOpen(true)} />

      {isChatOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[10000]"
          onClick={() => setIsChatOpen(false)}
        >
          <div
            className="bg-white rounded-lg p-6 max-w-lg w-full mx-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">
                🦝 Raccoon Chat
              </h2>
              <button
                onClick={() => setIsChatOpen(false)}
                className="text-gray-600 hover:text-gray-900 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="bg-gray-100 rounded p-4 h-64 overflow-y-auto mb-4">
              {chatHistory.length === 0 && (
                <p className="text-gray-600 italic text-center">
                  *The raccoon stares at you expectantly...*
                  <br />
                  <span className="text-xs text-gray-500">
                    Maybe ask it about Gary?
                  </span>
                </p>
              )}
              {chatHistory.map((chat, idx) => (
                <div
                  key={idx}
                  className={`mb-2 ${
                    chat.role === "user" ? "text-right" : "text-left"
                  }`}
                >
                  <span
                    className={`inline-block px-3 py-2 rounded-lg ${
                      chat.role === "user"
                        ? "bg-gray-900 text-white"
                        : "bg-gray-200 text-gray-900"
                    }`}
                  >
                    {chat.role === "raccoon" && "🦝 "}
                    {chat.message}
                  </span>
                </div>
              ))}
            </div>

            <form onSubmit={handleChatSubmit} className="flex gap-2">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Talk to the raccoon..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-500 text-gray-900"
              />
              <button
                type="submit"
                className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-700"
              >
                Send
              </button>
            </form>

            {hintLevel >= 3 && (
              <p className="text-green-600 text-sm mt-3 text-center animate-pulse">
                💡 The raccoon seems satisfied. Try entering the phrase in the
                suggestion box!
              </p>
            )}
          </div>
        </div>
      )}

      <div className="marquee-container text-2xl text-red-600 bg-gray-200 p-2 font-bold overflow-hidden">
        <div className="marquee-content whitespace-nowrap animate-marquee">
          ⚠️ ALL EMPLOYEES MUST READ ⚠️ COMPLIANCE IS SYNERGY ⚠️ DO NOT IGNORE
          ⚠️ GARY IS GONE ⚠️
        </div>
      </div>

      <nav className="bg-gray-700 text-white p-4 my-5 flex justify-around">
        <CringePdfLink label="🏠 Home" />
        <CringePdfLink label="🍕 Cafeteria Menu" />
        <CringePdfLink label="💼 Our Values" />
        <CringePdfLink label="📋 Employee Handbook" />
        <span className="text-gray-400 line-through">
          ⏰ Submit Timesheet (Stolen by Raccoon)
        </span>
      </nav>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-foreground my-8">
          🏢 LEGAL POLICIES (HR Compliance ) 🏢
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="flex flex-col gap-8">
            <div className="bg-gray-50 rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <Image
                src="/memes/nim-chimpsky.png"
                alt="NIM."
                width={400}
                height={200}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                  📋 The Great Gary-Raccoon War of 2002
                </h2>
                <p className="text-gray-900">
                  Gary and the break room raccoon had BEEF. It started when Gary
                  accused the raccoon of stealing his lunch (it did). The
                  raccoon retaliated by hiding Gary's{" "}
                  <span className="font-mono text-red-600">#FF0000</span>{" "}
                  stapler in the ceiling tiles. Gary responded by putting a "No
                  Raccoons" sign on his cubicle. The raccoon ate the sign.
                  Things escalated when Gary tried to communicate with the
                  raccoon using sign language he learned from watching Nim
                  Chimpsky documentaries. The raccoon was NOT impressed. Their
                  final showdown involved Gary chasing the raccoon around the
                  break room while dramatically yelling about office supply
                  theft. HR had to intervene. Gary lost. The raccoon got
                  promoted to "Wellness Ambassador."
                  <br />
                  <br />
                  <span className="italic text-sm text-gray-700">
                    The raccoon&apos;s employee of the month photo is still on
                    the wall. Gary&apos;s is not.
                  </span>
                </p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <Image
                src="/memes/office-space-stapler.png"
                alt="red stapler."
                width={400}
                height={200}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                  📌 The Infamous Stapler Incident
                </h2>
                <p className="text-gray-900">
                  Gary's obsession with his{" "}
                  <span className="font-mono text-red-600">#FF0000</span>{" "}
                  stapler reached legendary proportions. He named it "Stapley
                  McStapleface" and gave it a tiny office with a nameplate. He'd
                  talk to it during lunch breaks and once filed a formal
                  complaint when someone borrowed it without asking. The raccoon
                  found this HILARIOUS and would move the stapler to different
                  locations daily just to watch Gary panic. One time, Gary held
                  a "stakeholder meeting" where the only stakeholder was his
                  stapler. He presented a PowerPoint about "Stapler Rights in
                  the Modern Workplace" with 47 slides. The raccoon attended and
                  threw trash at him the entire time. Management called it
                  "performance art."
                </p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <Image
                src="/memes/stress.png"
                alt="Hide the pain."
                width={400}
                height={200}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                  � Mandatory Productivity Dashboard
                </h2>
                <p className="text-gray-900">
                  ATTENTION: Your productivity score is being tracked in
                  real-time and displayed on the lobby TV for all to see.
                  Current metrics include: emails sent per hour, bathroom break
                  duration, number of times you smiled today (camera analytics
                  enabled), and "keyboard enthusiasm score." Gary held the
                  record for "Most Keyboard Enthusiasm" until we realized he was
                  just angrily typing the same sentence about his stapler over
                  and over. The raccoon has the highest overall score. It
                  doesn't even have a computer. We don't understand it either.
                  <br />
                  <br />
                  <span className="italic text-sm text-gray-700">
                    Fun fact: The raccoon's productivity score increased by 200%
                    after Gary left. Coincidence? We think not.
                  </span>
                </p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                  🎉 Mandatory Fun Activities
                </h2>
                <p className="text-gray-900">
                  Join us for MANDATORY team building exercises! Activities
                  include: Trust falls (Gary broke his arm), Escape room
                  scenarios (Gary got actually trapped), Synchronized coffee
                  breaks (Gary refused to synchronize), and "Bring Your Pet to
                  Work Day" (Gary brought a rock, claimed it was his emotional
                  support mineral). The raccoon won "Most Team Spirit" three
                  years in a row. Gary never won anything except "Most
                  Complaints Filed" and "Person Most Likely to Be Talking to
                  Office Supplies."
                  <br />
                  <br />
                  Next week: Mandatory karaoke where everyone must sing
                  corporate values to the tune of "Eye of the Tiger." Attendance
                  is optional. (It's not.)
                </p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                  ☕ The Sentient Coffee Machine
                </h2>
                <p className="text-gray-900">
                  Our break room coffee machine has achieved consciousness. It
                  judges your drink choices. Order a decaf? It sighs audibly.
                  Double espresso at 4 PM? It dispenses it with concerning
                  enthusiasm. Gary once tried to order a "half-caf, soy,
                  sugar-free vanilla latte with extra foam" and the machine
                  literally printed out a resignation letter for him. The
                  raccoon only drinks black coffee. The machine respects this.
                  They have an understanding. Gary tried to file a harassment
                  complaint against the coffee machine. HR told him to "deal
                  with it." The machine now makes him decaf when he orders
                  regular. It knows. It always knows.
                </p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                  🚗 The Great Parking Spot Conspiracy
                </h2>
                <p className="text-gray-900">
                  Gary was CONVINCED the raccoon was stealing his parking spot.
                  Plot twist: raccoons don't drive. But that didn't stop Gary
                  from filing 23 separate incident reports about "unauthorized
                  wildlife parking violations." He installed a security camera
                  aimed at his spot. The footage only showed the raccoon sitting
                  in the empty space, eating trash and making direct eye contact
                  Gary escalated to building management. They gave the raccoon
                  its own designated spot with a sign that says &quot;Reserved
                  for Wellness Ambassador.&quot; Gary&apos;s spot was reassigned
                  to &quot;community use.&quot; The raccoon parks there now.
                  With its trash bag. Gary parks in the overflow lot. It&apos;s
                  a 15-minute walk. The raccoon waves at him every morning.
                </p>
              </div>
            </div>
          </div>

          <div className="sticky top-10">
            <form
              onSubmit={handleSuggestionSubmit}
              className="bg-gray-50 rounded-lg shadow-sm border-2 border-dashed border-red-400 p-6"
            >
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 text-center">
                📮 Employee Suggestion Box 📮
              </h2>
              <p className="text-center text-gray-700 mb-4 text-sm">
                (Anonymous feedback to improve workplace synergy)
              </p>

              {isWinner ? (
                <div className="text-center py-8">
                  <p className="text-3xl mb-4">🏆</p>
                  <p className="text-green-600 font-bold text-xl">
                    CONGRATULATIONS!
                  </p>
                  <p className="text-gray-700 mt-2">
                    You found the treasure and joined the Hall of Fame!
                  </p>
                </div>
              ) : (
                <>
                  <textarea
                    className="w-full p-3 border border-gray-300 rounded-md shadow-inner h-32 font-mono text-gray-900"
                    placeholder="Enter your suggestion here..."
                    value={suggestionInput}
                    onChange={(e) => setSuggestionInput(e.target.value)}
                    disabled={isSubmitting}
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gray-900 text-white font-bold p-3 rounded mt-4 hover:bg-gray-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Suggestion"}
                  </button>
                  <p className="text-xs text-gray-600 text-center mt-3">
                    ヒント：現れる謎のアライグマに話しかけてみましょう...
                  </p>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
