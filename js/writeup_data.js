// js/writeup_data.js
// Same shape/contract as js/blog_data.js so writeups.html and writeup-post.html
// can reuse identical rendering logic:
//   window.writeups        -> { slug: postObject, ... }
//   window.writeupOrder    -> [ slug, slug, ... ]  (canonical prev/next order)
//
// Each write-up object supports everything a blog post does (title, intro,
// date, read, tags, sections, outro, publishedAt) PLUS CTF-specific fields:
//   category    - "web" | "pwn" | "crypto" | "reversing" | "forensics" | "misc" | "osint"
//   difficulty  - "easy" | "medium" | "hard" | "insane"
//   platform    - e.g. "HackTheBox", "picoCTF", "TryHackMe", "DownUnderCTF"
//   points      - challenge point value (number, optional)
//
// Sections work exactly like blog posts: each section can have `heading`,
// `body`, and optionally `code` + `lang` (or `codeFile` to fetch a snippet
// from disk) to render a terminal-style code block.

window.writeups = {
  "basic-mod1": {
    title: "basic-mod1 — cryptography, medium",
    intro: "A simple modular arithmetic cipher where each number is reduced \
            modulo 37 and mapped to a custom character set to recover the flag.",
    date: "Jul 21, 2026",
    read: "4 min",
    tags: ["cryptography", "modular arithmetic", "ctf"],
    category: "cryptography",
    difficulty: "medium",
    platform: "picoCTF",
    points: 100,
    publishedAt: "2026-07-21",
    sections: [
      {
        heading: "Problem",
        body: "Take each number mod 41 and find the modular inverse for the result. \
                Then map to the following character set: 1-26 are the alphabet, \
                27-36 are the decimal digits, and 37 is an underscore. Wrap your decrypted \
                message in the picoCTF flag format (i.e. picoCTF{decrypted_message})"
      },
      {
        heading: "Analyzing the message",
        body: "The message is a sequence of numbers. Since each number must be reduced \
              modulo 37, the first step is to read the values and convert them into \
              indexes ranging from 0 to 36.",
        code: "165 248 94 346 299 73 198 221 313 137 205 87 336 110 186 69 223 213 216 216 177 138",
        lang: "text"
      },
      {
        heading: "Character mapping",
        body: "The character set contains 37 characters. The index of each character \
              corresponds directly to the result of the modulo operation.",
        code: "SET = \"ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_\"\n\n// 0  -> A\n// 1  -> B\n// ...\n// 25 -> Z\n// 26 -> 0\n// ...\n// 35 -> 9\n// 36 -> _",
        lang: "python"
      },
      {
        heading: "Decryption script",
        body: "I wrote a small Python script that reads each number, calculates its \
              remainder modulo 37, and uses the result as an index into the character set.",
        code: "SET = \"ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_\"\n\nwith open(\"message.txt\", \"r\") as f:\n    content = f.read().split()\n\narr = [int(n) % 37 for n in content]\nstring = \"\".join(SET[v] for v in arr)\n\nprint(f\"picoCTF{{{string}}}\")",
        lang: "python"
      },
      {
        heading: "Getting the flag",
        body: "After applying the modulo operation and mapping each result to the \
              corresponding character, the decrypted message was:",
        code: "picoCTF{R0UND_N_R0UND_B6B25531}",
        lang: "text"
      }
    ],
    outro: "This challenge demonstrates how modular arithmetic can be used as a simple \
            character encoding scheme. Once the character set and modulo value were \
            provided, the solution was simply a matter of converting each number into \
            an index and reconstructing the message."
  },
  "basic-mod2": {
    title: "basic-mod2 — cryptography, medium",
    intro: "A modular arithmetic challenge that uses modular inverses to decode \
            a sequence of numbers into a custom character set and recover the flag.",
    date: "Jul 21, 2026",
    read: "5 min",
    tags: ["cryptography", "modular arithmetic", "modular inverse", "ctf"],
    category: "cryptography",
    difficulty: "medium",
    platform: "picoCTF",
    points: 100,
    publishedAt: "2026-07-21",
    sections: [
      {
        heading: "Problem",
        body: "The challenge provides a sequence of numbers and a decryption scheme. \
              Each number must first be used to calculate its modular inverse modulo 41. \
              The resulting values are then mapped to a character set where values 1 \
              through 26 represent uppercase letters, values 27 through 36 represent \
              decimal digits, and 37 represents an underscore. The final message is \
              wrapped in the picoCTF flag format."
      },
      {
        heading: "Analyzing the message",
        body: "The message consists of a sequence of numbers. Since the challenge \
              specifies modular inverses modulo 41, each number can be processed using \
              the modular inverse operation.",
        code: "268 413 438 313 426 337 272 188 392 338 77 332 139 113 92 239 247 120 419 72 295 190 131",
        lang: "text"
      },
      {
        heading: "Character mapping",
        body: "The character set uses one-based indexing. Values 1 through 26 map to \
              uppercase letters, values 27 through 36 map to digits, and value 37 \
              maps to an underscore.",
        code: "SET = \"ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_\"\n\n// 1  -> A\n// 2  -> B\n// ...\n// 26 -> Z\n// 27 -> 0\n// ...\n// 36 -> 9\n// 37 -> _",
        lang: "python"
      },
      {
        heading: "Calculating the modular inverse",
        body: "The modular inverse of each number is calculated modulo 41. Python's \
              pow() function supports modular inverses when the exponent is -1, so \
              pow(n, -1, 41) returns the value x such that (n * x) % 41 == 1.",
        code: "arr = [pow(int(n), -1, 41) for n in content]",
        lang: "python"
      },
      {
        heading: "Decryption script",
        body: "After calculating the modular inverse, each result is converted to a \
              zero-based index using (n - 1) % 37. This allows the one-based mapping \
              from the challenge to be used with Python's zero-based string indexing.",
        code: "SET = \"ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_\"\n\nwith open(\"message.txt\", \"r\") as f:\n    content = f.read().split()\n\narr = [pow(int(n), -1, 41) for n in content]\n\ndecode = ''.join(SET[(n - 1) % 37] for n in arr)\n\nprint(f\"picoCTF{{{decode}}}\")",
        lang: "python"
      },
      {
        heading: "Modular inverse results",
        body: "After calculating the modular inverse of every number modulo 41, the \
              resulting values were:",
        code: "[28, 14, 22, 30, 18, 32, 30, 12, 25, 37, 8, 31, 18, 4, 37, 35, 1, 27, 32, 4, 36, 30, 36]",
        lang: "text"
      },
      {
        heading: "Getting the flag",
        body: "The inverse values were then mapped to the custom character set using \
              one-based indexing. The resulting decrypted message was:",
        code: "picoCTF{1NV3R53LY_H4RD_8A05D939}",
        lang: "text"
      }
    ],
    outro: "This challenge demonstrates modular inverses as a cryptographic decoding \
            technique. The key detail is the difference between one-based character \
            mapping and Python's zero-based string indexing, which is handled by \
            subtracting one from each inverse before indexing the character set."
  },

};

window.writeupOrder = [
  "basic-mod1",
  "basic-mod2",
];