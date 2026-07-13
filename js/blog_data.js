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
    date: "Jul 2026",
    read: "8 min",
    tags: ["DSA", "Algorithms"],
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

  subnetting: {
    title: "Subnetting Made Simple",
    date: "Jun 2026",
    read: "7 min",
    tags: ["Networking", "CCNA"],
    intro: `Subnetting is one of the first networking skills every engineer should
      master. Although it can look intimidating at first, it becomes much easier
      once you understand binary and CIDR notation.`,

    sections: [
      {
        heading: "Why subnet?",
        body: `Subnetting divides large networks into smaller logical segments.
        This improves security, reduces broadcast traffic, and makes IP address
        allocation much more efficient.`
      },
      {
        heading: "CIDR notation",
        body: `CIDR uses prefixes such as /24 or /27 to indicate how many bits
        belong to the network portion of an IP address. The remaining bits are
        used for host addresses.`
      },
      {
        heading: "Example",
        body: `192.168.1.0/24 contains 256 addresses. Splitting it into four /26
        networks creates four smaller subnets, each containing 64 addresses.`
      }
    ],

    outro: `Subnetting becomes much easier with practice. Once you're comfortable
    with binary calculations, finding network IDs, broadcast addresses, and valid
    host ranges becomes second nature.`
  },

  'packet-sniffing': {
    title: "How Packet Sniffing Works",
    date: "May 2026",
    read: "6 min",
    tags: ["Cybersecurity", "Networking"],
    intro: `Every packet travelling across a network tells a story. Packet sniffing
      allows engineers to inspect that traffic for troubleshooting, performance
      analysis, and security investigations.`,

    sections: [
      {
        heading: "What is packet sniffing?",
        body: `Packet sniffing is the process of capturing network traffic for
        analysis. Tools such as Wireshark allow engineers to inspect packet
        headers, protocols, timing, and payload information.`
      },
      {
        heading: "Why security teams use it",
        body: `Network analysts can detect malware communications, suspicious
        DNS requests, brute-force attacks, and unusual traffic patterns by
        examining captured packets.`
      },
      {
        heading: "Important protocols",
        body: `Understanding Ethernet, ARP, IP, ICMP, TCP, UDP, DNS, HTTP,
        HTTPS, and TLS makes packet analysis significantly easier.`
      }
    ],

    outro: `Packet analysis is one of the most valuable practical skills in
    cybersecurity because it reveals exactly what devices are communicating
    across the network.`
  },

  'array-address-calculation': {
    title: "Understanding Array Address Calculation in C",
    date: "July 2026",
    read: "8 min",
    tags: ["C Programming", "Memory Management", "Data Structures"],

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
  }
};

// Controls listing order + prev/next navigation.
window.blogPostOrder = [
  "dijkstra-algorithm",
  "subnetting",
  "packet-sniffing",
  "array-address-calculation",
];