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
  }
};

// Controls listing order + prev/next navigation.
window.blogPostOrder = [
  "dijkstra-algorithm",
  "subnetting",
  "packet-sniffing"
];