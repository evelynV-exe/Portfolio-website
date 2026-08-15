// blog-data.js
// Technical blog posts for portfolio
//
// Each entry in `sections` is: { heading, body, code?, lang? }
//   heading  string — section heading
//   body     string — paragraph text (rendered below the heading)
//   code     string — optional code/pseudocode snippet. If present, it renders
//                      as a bordered, monospace block (with a copy button)
//                      right after the paragraph. Use \n for line breaks.
//   lang     string — optional label shown above the snippet, e.g. "python",
//                      "pseudocode", "bash". Defaults to "code" if omitted.

window.blogPosts = {
  'dijkstra-algorithm': {
    title: "Understanding Dijkstra's Algorithm",
    date: "7 July 2026",
    publishedAt: "2026-07-07",
    read: "8 min",
    tags: ["Algorithms"],
    intro: `Dijkstra's Algorithm is one of the most important shortest-path algorithms
      in computer science. In this article I explain how it works, why a priority queue
      makes it efficient, and where it is used in real-world systems.`,

    sections: [
      {
        heading: "What problem does it solve?",
        body: `Given a weighted graph with non-negative edge weights, Dijkstra's
        Algorithm finds the shortest distance from one starting node to every
        other node. It is widely used in GPS navigation, routing protocols,
        network optimization, and game AI.`
      },
      {
        heading: "How the algorithm works",
        body: `The algorithm repeatedly selects the unexplored node with the
        smallest known distance, relaxes all outgoing edges, and updates
        neighboring distances whenever a shorter path is found. A min-heap
        (priority queue) reduces the time complexity to O((V + E) log V).`,
        lang: "pseudocode",
        code: `dist[source] = 0, all others = Infinity
pq = min-heap seeded with (0, source)

while pq is not empty:
    (d, u) = pq.pop_min()
    if d > dist[u]: continue        // stale entry, skip

    for each edge (u, v, weight) in graph[u]:
        if dist[u] + weight < dist[v]:
            dist[v] = dist[u] + weight
            pq.push((dist[v], v))

return dist   // shortest distance from source to every node`
      },
      {
        heading: "Applications",
        body: `• GPS navigation systems
        • Network routing
        • Robotics path planning
        • Packet forwarding
        • AI pathfinding in games`
      }
    ],

    outro: `Understanding Dijkstra's Algorithm builds a strong foundation for more
    advanced graph algorithms such as A*, Bellman-Ford, and Floyd-Warshall.`
  },
  'array-address-calculation': {
    title: "Understanding Array Address Calculation in C",
    date: "13 July 2026",
    publishedAt: "2026-07-13",
    read: "8 min",
    tags: ["Data Structures"],

    intro: `Arrays in C are stored as a continuous block of memory, meaning every
      element's address is calculated relative to the array's base address.
      Although accessing elements with expressions like A[i], A[i][j], or
      A[i][j][k] appears simple, the compiler determines their locations using
      pointer arithmetic and offset calculations. This article explores how 1D,
      2D, and 3D arrays are represented in memory and how their addresses are
      calculated manually.`,

    sections: [
      {
        heading: "Memory Layout of Arrays",
        body: `Arrays in C are stored in contiguous memory, meaning every element
        is placed one after another without any gaps. The address of the first
        element is called the base address, and every subsequent element is
        accessed by adding an offset to this base. Since an int typically occupies
        4 bytes, advancing one element moves the pointer forward by 4 bytes.
        Understanding this layout is fundamental to pointer arithmetic and manual
        address calculation.`
      },
      {
        heading: "One-Dimensional (1D) Arrays",
        body: `A one-dimensional array consists of a single sequence of elements
        stored continuously in memory. The program dynamically allocates memory
        using malloc(), then calculates an element's address using the formula:
        Base Address + (index − lower bound). The difference between the computed
        pointer and the base pointer represents the element offset, while the byte
        offset is obtained by multiplying the offset by sizeof(int).`
      },

      {
        heading: "Two-Dimensional (2D) Arrays",
        body: `Although a two-dimensional array appears as rows and columns, C
        stores it as one continuous block using row-major order. This means every
        row is stored completely before the next row begins. To locate an element,
        the program first skips the required number of rows and then moves across
        the columns. The address formula combines both row and column offsets to
        produce the final memory location.`
      },

      {
        heading: "Three-Dimensional (3D) Arrays",
        body: `A three-dimensional array extends the same concept by introducing
        planes. In row-major order, complete planes are stored sequentially,
        followed by rows within each plane and finally individual columns. The
        program calculates the address by skipping the required number of planes,
        rows, and columns before adding the resulting offset to the base address.`
      },

      {
        heading: "Alternative Storage Order",
        body: `The project also demonstrates an alternative mapping where the
        storage order is Column → Row → Plane instead of the conventional
        Plane → Row → Column. Changing the order modifies the address calculation
        formula and results in a different physical arrangement of the same logical
        array. This illustrates that multidimensional arrays can be linearized in
        different ways depending on the chosen memory layout.`
      },

      {
        heading: "Understanding Offsets",
        body: `Two types of offsets are displayed throughout the program. The
        element offset indicates how many integer positions the pointer has moved
        from the base address, while the byte offset represents the actual number
        of bytes between the two addresses. Casting pointers to char* allows the
        program to calculate precise byte differences regardless of the data type.`
      },

      {
        heading: "Complete Code Walkthrough",
        body: `The program begins by dynamically allocating memory for 1D, 2D,
        and 3D arrays using malloc(). It then stores sample values, calculates
        their addresses using pointer arithmetic, and prints the base address,
        computed pointer, element offset, byte offset, and stored value. This
        provides a practical demonstration of how array indexing is translated
        into memory addresses at the hardware level.`,
        lang: "Array.c",
        codeFile: "code/array.c"
      },
    ],

    outro: `Understanding how arrays are mapped into memory is an essential skill
    for C programmers. By learning how base addresses, offsets, and pointer
    arithmetic work together, developers gain a deeper understanding of memory
    management, data structures, and the low-level mechanisms that make array
    indexing both efficient and predictable.`
  },
  'my-experience-with-ctf-events': {
    title: "My experience on CTF-Beginning & CTF-Advanced round @RMUTL!",
    date: "20 July 2026",
    publishedAt: "2026-07-20",
    read: "6 min",
    tags: ["Life Experience"],
    intro: `Well hi again. Evelyn is back from today's Advanced CTF round at my own university! It was really fun. The events were ROAD-TO-CTF Beginning and ROAD-TO-CTF Advanced. I haven’t been practicing the CTF that much nowadays since I’m too busy with the upcoming competition next month. `,
    sections: [
      {
        body: `On Saturday, ROAD-TO-CTF began. I genuinely think it’s really easy for the theories part but when it’s time for CTF.. Oh my god. How hard it can be for the problem. I was stuck at the Cryptography, the difficulty of GOD! It was the cow programming language. I was screaming inside that I faced this before and can’t remember how to solve it but eventually I solved it and got the flag. I was able to solve just 9 out of 11 questions which I would consider not bad for two hours of the competition.`,
      },
      {
        body: `Saturday is all about the basics of the OSINT, using fluff to find hidden directory, XSS script and basic blue team of network analysis that’s all. Nothing intense. But the CTF was the hardest part of the day. I would consider it to be difficult like other websites like picoCTF.`,
      },
      {
        body: `And comes on Sunday. The real details of each attack. I learned a lot from yesterday. The details of how to survey the website and how to use tools like nmap to find vulnerabilities of the website. There are few attacks I can remember like path traversal to find the hidden files, remote file recursion, brute force the username and password, sql injection, using sqlmap to find the data in the tables, stored and reflected XXS, and restricted file uploads. The CTF part was kinda easy to medium difficulty not like on Saturday. In my opinion, I just struggled a bit with the sqlmap, which it’s a tool that I don't use that often.`,
      },
      {
        body: `Everything I got from these two events is of course the knowledge about cybersecurity basic stuff and then the prize I got for winning both events. I genuinely think that these events are really good and I got the opportunity to go for the bootcamp in next month.`,
      }
    ],
    outro: `Lastly, I want to say that I really appearciate the organizers of these events. I really had fun and learned a lot from these two events. I hope that there will be more events like this in the future. Thank you for reading my experience on CTF-Beginning & CTF-Advanced round @RMUTL! See you at Bootcamp!!`,
  },
};

// Controls listing order + prev/next navigation.
window.blogPostOrder = [
  "dijkstra-algorithm",
  "array-address-calculation",
  "my-experience-with-ctf-events"
];