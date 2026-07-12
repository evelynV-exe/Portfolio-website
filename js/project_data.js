/*
  Project data — shared between index.html (terminal + featured project grid)
  and projects.html (full list) and project-post.html (full project page).
*/

window.projectPosts = {
  portfolio: {
    title: "Terminal Portfolio",
    date: "2026",
    tags: ["HTML", "CSS", "JavaScript"],
    image: "terminal.png",
    short: "A terminal-inspired personal portfolio showcasing my projects, blogs, education, and technical journey.",
    description:
      "A fully responsive personal portfolio designed around a Linux terminal aesthetic. The site includes an interactive terminal, project showcase, blog system, education timeline, and animated interface.\n\n" +
      "The project focuses on clean frontend architecture using vanilla HTML, CSS, and JavaScript without external frameworks. Features include terminal commands, dark/light mode, smooth animations, responsive layouts, and reusable data files for blogs and projects.",
    github: "",
    featured: true
  },

  f1stats: {
    title: "Formula 1 Statistics Dashboard",
    date: "2026",
    tags: ["Next.js", "React", "Python", "FastF1", "Tailwind CSS"],
    image: "",
    short: "Interactive Formula 1 statistics platform with historical data, championship standings, race schedules, and live season information.",
    description:
      "A modern Formula 1 statistics website built with Next.js and React. Historical race results are generated using Python and the FastF1 library before being converted into JSON for fast client-side rendering.\n\n" +
      "The dashboard includes season selection, championship standings, race calendars, constructors, drivers, and live season status. The project emphasizes performance, clean UI design, and efficient static data generation.",
    github: "",
    featured: true
  },

  stockpredict: {
    title: "Stock Market Prediction using Machine Learning",
    date: "2026",
    tags: ["Python", "Pandas", "Scikit-learn", "XGBoost", "Machine Learning"],
    image: "img/stock.png",
    short: "Machine learning project comparing multiple algorithms to predict daily stock price direction.",
    description:
      "A machine learning project that predicts whether Apple's stock price will increase or decrease on the following trading day. Historical market data is collected with yfinance before undergoing extensive feature engineering.\n\n" +
      "The project compares Logistic Regression, Random Forest, and XGBoost models while evaluating their predictive accuracy. Technical indicators such as RSI, MACD, moving averages, volatility, lag features, and volume statistics are used to improve model performance.",
    github: "https://github.com/evelynV-exe/machine-learning-algorithms",
    featured: true
  },

  networkmonitor: {
    title: "Network Monitor Dashboard",
    date: "2026",
    tags: ["Python", "psutil", "Threading", "Networking"],
    image: "",
    short: "Real-time desktop network monitoring application displaying bandwidth usage, system information, and public IP.",
    description:
      "A Python-based monitoring dashboard that continuously tracks network upload/download speeds, system statistics, and connectivity information.\n\n" +
      "The application utilizes psutil for system metrics, multithreading for responsive updates, and external APIs to retrieve public network information. The project serves as an introduction to network monitoring and systems programming.",
    github: "",
    featured: true
  },

  musicplayer: {
    title: "Music Player & Lyrics Platform",
    date: "2026",
    tags: ["React", "Express.js", "PostgreSQL", "Node.js"],
    image: "img/music.png",
    short: "Full-stack music player with synchronized lyrics, playlist management, and PostgreSQL backend.",
    description:
      "A full-stack web music player built with React and Express.js. Songs and synchronized LRC lyric files are managed through a PostgreSQL database while the backend exposes REST APIs for music retrieval.\n\n" +
      "The project supports metadata extraction, playlist organization, synchronized lyrics, and efficient media serving, providing experience with both frontend development and backend API design.",
    github: "",
    featured: true
  },

  flashcards: {
    title: "Language Learning Flashcards",
    date: "2026",
    tags: ["React", "JavaScript", "React Router"],
    image: "img/study01.png",
    short: "Flashcard application for language learning with timers, deck management, and local progress tracking.",
    description:
      "A React application designed to help users study vocabulary using customizable flashcard decks. The application includes deck organization, study timers, progress tracking, and persistent local storage.\n\n" +
      "The project emphasizes component-based architecture, routing with React Router, and creating an intuitive study experience.",
    github: "",
    featured: false
  },
  mp3downloader: {
    title: "YouTube MP3 Downloader",
    date: "2026",
    tags: ["Python", "yt-dlp", "FFmpeg", "SyncedLyrics"],
    image: "img/mp3.png",
    short: "Python-based YouTube audio downloader with automatic MP3 conversion, batch downloads, and synchronized lyrics generation.",
    description:
      "A command-line application built in Python that downloads audio from YouTube and converts it into high-quality MP3 files using yt-dlp and FFmpeg. The tool is designed for reliability, supporting both individual URLs and batch downloads through a text file.\n\n" +
      "After downloading, the application automatically searches for synchronized song lyrics using SyncedLyrics and saves them as standard .lrc files for use with compatible music players. The downloader also includes configurable audio bitrate, retry mechanisms for failed downloads, comprehensive error handling, and clean terminal output for an improved user experience.",
    github: "https://github.com/evelynV-exe/MP3-download",
    featured: true
  },
};

window.projectPostOrder = [
  "portfolio",
  "f1stats",
  "stockpredict",
  "networkmonitor",
  "musicplayer",
  "flashcards",
  "mp3downloader"
];