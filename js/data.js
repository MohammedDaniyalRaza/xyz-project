(function () {
  "use strict";

  // Mock data (academic project). All pages read from this single source to avoid duplication.
  var products = [
    {
      id: "jrnl-classic",
      category: "journals",
      name: "Classic Journal",
      price: 899,
      summary: "Minimal lined pages, smooth writing feel, and a clean hard-cover finish.",
      description:
        "A premium everyday journal built for notes, study planning and personal writing. The layout is clean, the binding is durable, and the pages are optimized for neat, consistent writing.",
      image: "Assets/journal home.jpg",
      doc: "docs/journal-classic-features.doc",
      tags: ["lined", "hardcover", "minimal"]
    },
    {
      id: "jrnl-planner",
      category: "journals",
      name: "Weekly Planner Journal",
      price: 1099,
      summary: "Weekly blocks with focus areas for goals, habits and priorities.",
      description:
        "Designed for structured productivity. Use weekly sections to plan tasks, track habits, and keep your goals visible—all in a modern, minimal format.",
      image: "Assets/planner.jpg",
      doc: "docs/journal-weekly-planner-features.doc",
      tags: ["weekly", "planner"]
    },
    {
      id: "jrnl-compact",
      category: "journals",
      name: "Compact Notes Journal",
      price: 699,
      summary: "Portable, elegant, and perfect for quick meetings and daily notes.",
      description:
        "A compact journal for people on the move. Lightweight with a premium feel—ideal for meetings, quick ideas, and short daily reflections.",
      image: "Assets/img1.jpg",
      doc: "docs/journal-compact-features.doc",
      tags: ["compact", "notes"]
    },
    {
      id: "cal-wall",
      category: "calendars",
      name: "Wall Calendar",
      price: 799,
      summary: "Bold monthly view with spacious date boxes and a clean grid layout.",
      description:
        "A large-format wall calendar with a modern grid. Great for home and office spaces where you need a clear overview of the month at a glance.",
      image: "Assets/calendar home.jfif",
      doc: "docs/calendar-wall-features.doc",
      tags: ["monthly", "wall"]
    },
    {
      id: "cal-desk",
      category: "calendars",
      name: "Desk Calendar",
      price: 649,
      summary: "Compact stand-up calendar for desks, counters and reception areas.",
      description:
        "A premium desk calendar with a sturdy stand and easy-to-read monthly pages. Ideal for workspaces and reception desks.",
      image: "Assets/calendar home.jfif",
      doc: "docs/calendar-desk-features.doc",
      tags: ["desk", "monthly"]
    },
    {
      id: "cal-pocket",
      category: "calendars",
      name: "Pocket Calendar",
      price: 399,
      summary: "Slim and practical—carry key dates with you anywhere.",
      description:
        "A slim pocket calendar made for quick date checks and compact planning. Clean typography and a modern layout keep it easy to use.",
      image: "Assets/calendar home.jfif",
      doc: "docs/calendar-pocket-features.doc",
      tags: ["pocket", "portable"]
    },
    {
      id: "diary-daily",
      category: "diaries",
      name: "Daily Diary",
      price: 1199,
      summary: "Daily writing space with a premium cover for long-term use.",
      description:
        "A daily diary with generous space for writing. Perfect for personal journaling, study logs, or daily planning with a premium look.",
      image: "Assets/diary home.jfif",
      doc: "docs/diary-daily-features.doc",
      tags: ["daily", "premium"]
    },
    {
      id: "diary-dated",
      category: "diaries",
      name: "Dated Diary",
      price: 999,
      summary: "Dated pages with a minimal layout that keeps your schedule clear.",
      description:
        "A dated diary for consistent planning. The layout is minimal with clear structure—ideal for students and professionals.",
      image: "Assets/diary home 2.png",
      doc: "docs/diary-dated-features.doc",
      tags: ["dated", "planning"]
    },
    {
      id: "diary-travel",
      category: "diaries",
      name: "Travel Diary",
      price: 899,
      summary: "A refined diary for memories, journeys, and meaningful moments.",
      description:
        "Capture travel memories in a premium-format diary. The design supports short entries, highlights, and quick reflections for each day.",
      image: "Assets/diary home.jfif",
      doc: "docs/diary-travel-features.doc",
      tags: ["travel", "memories"]
    }
  ];

  var blogs = [
    {
      id: "paper-quality-guide",
      title: "Choosing Paper Quality for Journals",
      date: "2026-01-01",
      excerpt: "A simple guide to paper weight, texture, and ink performance for everyday writing.",
      content:
        "Premium stationery starts with paper. In this article we cover paper weight, texture, bleed-through, and what to look for when choosing journals for study and work."
    },
    {
      id: "planning-systems",
      title: "3 Planning Systems That Actually Work",
      date: "2026-01-03",
      excerpt: "Minimal systems for students and professionals: weekly planning, time-blocking, and checklists.",
      content:
        "Planning works when it is simple. We cover three lightweight systems you can use with diaries and journals to stay consistent without feeling overwhelmed."
    }
  ];

  function findProduct(id) {
    for (var i = 0; i < products.length; i++) {
      if (products[i].id === id) return products[i];
    }
    return null;
  }

  function findBlog(id) {
    for (var i = 0; i < blogs.length; i++) {
      if (blogs[i].id === id) return blogs[i];
    }
    return null;
  }

  window.RasaGridData = {
    products: products,
    blogs: blogs,
    findProduct: findProduct,
    findBlog: findBlog
  };
})();
