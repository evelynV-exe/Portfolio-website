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
  "baby-heap-overflow": {
    title: "Baby Heap Overflow — pwn, 250pts",
    intro: "A guided walk through a classic tcache poisoning bug in a menu-driven \
            heap challenge, from spotting the off-by-one to landing a shell.",
    date: "Jul 14, 2026",
    read: "9 min",
    tags: ["pwn", "heap", "ctf"],
    category: "pwn",
    difficulty: "medium",
    platform: "DownUnderCTF",
    points: 250,
    publishedAt: "2026-07-14",
    sections: [
      {
        heading: "Recon",
        body: "The binary is a menu-driven allocator: add, edit, delete, view. \
               Checking protections first — partial RELRO, no canary, PIE on, \
               NX on. No canary plus a heap bug is usually the fast path to a shell.",
        code: "checksec ./baby_heap\n[*] '/ctf/baby_heap'\n    Arch:     amd64-64-little\n    RELRO:    Partial RELRO\n    Stack:    No canary found\n    NX:       NX enabled\n    PIE:      PIE enabled",
        lang: "bash"
      },
      {
        heading: "Finding the bug",
        body: "The edit function trusts a user-supplied size field without \
               re-checking it against the original allocation size, letting us \
               write one byte past the end of a chunk and corrupt the next \
               chunk's size field.",
        code: "void edit(int idx, char *buf, size_t len) {\n    // BUG: len is never checked against chunk_size[idx]\n    memcpy(chunks[idx], buf, len);\n}",
        lang: "c"
      },
      {
        heading: "Exploit plan",
        body: "Corrupt the size field of a freed chunk to merge it with its \
               neighbor, then leverage the resulting overlapping chunk to leak a \
               heap pointer and defeat ASLR before poisoning tcache to get an \
               arbitrary write."
      },
      {
        heading: "Getting the flag",
        body: "With an arbitrary write primitive, overwriting a GOT entry with \
               the address of system and shaping a chunk's contents into \
               \"/bin/sh\" is enough to pop a shell.",
        code: "python3 exploit.py\n[+] Leaked heap base: 0x55a3c1b0e000\n[+] Overwrote free@got with system\n$ cat flag.txt\nDUCTF{h34p_g0lf_1s_4lw4ys_w0rth_1t}",
        lang: "bash"
      }
    ],
    outro: "Off-by-one heap bugs punch well above their weight. Worth building a \
            small tcache-poisoning template you can reuse across challenges \
            instead of re-deriving the primitive every time."
  },

};

window.writeupOrder = [
  "baby-heap-overflow",
];