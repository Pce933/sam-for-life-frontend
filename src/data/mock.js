// Mocked content data for SAM for Life website

export const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/programme", label: "Programme" },
  { to: "/stories", label: "Stories" },
  { to: "/get-involved", label: "Get Involved" },
  { to: "/news", label: "News" },
  { to: "/contact", label: "Contact" },
];

export const impactStats = [
  {
    value: "1 in 5",
    text: "young people with special needs finds paid employment without specialist support",
  },
  {
    value: "3\u00d7",
    text: "more likely our graduates are to gain meaningful work experience",
  },
  {
    value: "100%",
    text: "of families report improved confidence and independence",
  },
];

export const programmeSteps = [
  {
    key: "skills-for-life",
    eyebrow: "The foundation",
    title: "Skills for Life",
    desc: "Practical workshops for young people aged 14\u201325 covering communication, digital literacy, money management, CV writing and emotional resilience.",
    icon: "graduation",
    image: "https://images.unsplash.com/photo-1768096043738-0675e58ddbdd?crop=entropy&cs=srgb&fm=jpg&q=85&w=900",
    bullets: [
      "Communication & social confidence",
      "Digital literacy (email, basic computing, social media safety)",
      "Money management & independence",
      "CV writing & interview preparation",
      "Emotional resilience & self-advocacy",
    ],
  },
  {
    key: "work-pathways",
    eyebrow: "Theory meets reality",
    title: "Work Pathways",
    desc: "Supported work placements tailored to each young person's strengths. A dedicated job coach accompanies every placement.",
    icon: "briefcase",
    image: "https://images.unsplash.com/photo-1771054244002-4445dc1da2eb?crop=entropy&cs=srgb&fm=jpg&q=85&w=900",
    bullets: [],
  },
  {
    key: "employer-partners",
    eyebrow: "Inclusive hiring, smart business",
    title: "Employer Partners",
    desc: "We match you with the right young person, prepare your team, and stay close while the placement settles. You simply open the door.",
    icon: "building",
    image: "https://images.unsplash.com/photo-1593113565214-80afcb4dd192?crop=entropy&cs=srgb&fm=jpg&q=85&w=900",
    bullets: [
      "Higher team morale and retention",
      "Improved customer relations and brand reputation",
      "Fresh perspectives that drive innovation",
      "Hands-on CSR with measurable, human outcomes",
    ],
  },
];

export const stories = [
  {
    key: "aisha",
    name: "Aisha",
    age: 19,
    role: "barista trainee at a local caf\u00e9",
    quote: "Before SAM, I thought a job wasn't for someone like me. Now I make coffees for the whole street \u2014 and they all know my name.",
    image: "https://images.unsplash.com/photo-1768096043738-0675e58ddbdd?crop=entropy&cs=srgb&fm=jpg&q=85&w=800",
    teller: "Aisha's mum, Naomi",
    bodyTemplate: "Aisha came to SAM for Life at 17 with a autism spectrum diagnosis and very little confidence. Today, Aisha works as a barista trainee at a local caf\u00e9, and is one of the brightest stars in our community.",
  },
  {
    key: "daniel",
    name: "Daniel",
    age: 22,
    role: "warehouse assistant with a national retailer",
    quote: "I love work. I love my mates. I love payday. I am proud of me.",
    image: "https://images.unsplash.com/photo-1771054244002-4445dc1da2eb?crop=entropy&cs=srgb&fm=jpg&q=85&w=800",
    teller: "Daniel's dad, Marcus",
    bodyTemplate: "Daniel came to SAM for Life at 20 with a Down syndrome diagnosis and very little confidence. Today, Daniel works as a warehouse assistant with a national retailer, and is one of the brightest stars in our community.",
  },
  {
    key: "priya",
    name: "Priya",
    age: 17,
    role: "digital marketing apprentice",
    quote: "My coach told me my brain works differently \u2014 not less. That sentence changed my life.",
    image: "https://images.unsplash.com/photo-1593113565214-80afcb4dd192?crop=entropy&cs=srgb&fm=jpg&q=85&w=800",
    teller: "Priya's foster carer, Eleanor",
    bodyTemplate: "Priya came to SAM for Life at 15 with a learning difference diagnosis and very little confidence. Today, Priya works as a digital marketing apprentice, and is one of the brightest stars in our community.",
  },
];

export const values = [
  { title: "Dignity First", desc: "We see the person, not the diagnosis. Every interaction starts with respect." },
  { title: "Possibility Thinking", desc: "We focus on what young people can do \u2014 and build everything from there." },
  { title: "Partnership", desc: "We work alongside families, schools, and employers as one team." },
  { title: "Accountability", desc: "We measure our impact in real outcomes \u2014 and share it openly." },
];

export const team = [
  { initials: "SO", name: "Samira Okafor", role: "Founder & CEO", bio: "A former SEND coordinator who saw too many young people fall through the cracks after school." },
  { initials: "JW", name: "James Whitfield", role: "Programme Director", bio: "Twenty years in supported employment. Believes ordinary jobs change extraordinary lives." },
  { initials: "DLH", name: "Dr Lara Henderson", role: "Trustee, Clinical Lead", bio: "Educational psychologist with a focus on neurodiversity and transition." },
  { initials: "TA", name: "Tunde Adeleke", role: "Trustee, Employer Network", bio: "Former HR director championing inclusive hiring across UK retail and hospitality." },
];

export const newsItems = [
  {
    date: "1 February 2026",
    tag: "ANNOUNCEMENT",
    title: "SAM for Life officially launches",
    desc: "After two years of pilot work, we are opening our doors to families and employer partners across the UK.",
  },
  {
    date: "18 January 2026",
    tag: "PARTNERSHIP",
    title: "New partnership with The Daily Brew caf\u00e9 chain",
    desc: "Twelve new barista placement opportunities open this spring across London and Manchester.",
  },
  {
    date: "12 December 2025",
    tag: "RESEARCH",
    title: "Research report: the cost of exclusion",
    desc: "Our first impact paper explores the lifelong economic and human cost of leaving young people behind.",
  },
];

export const involvementCards = [
  { key: "donate", icon: "heart", title: "Donate", desc: "\u00a325 funds one workshop. \u00a375 a month of coaching. \u00a3300 supports a full placement.", to: "/get-involved/donate" },
  { key: "volunteer", icon: "users", title: "Volunteer", desc: "Mentor a young person, run a workshop, or coach in-placement. Apply online.", to: "/get-involved/volunteer" },
  { key: "partnership", icon: "handshake", title: "Corporate Partnership", desc: "Host placements, run team volunteering days, and co-fundraise with us.", to: "/get-involved/partnership" },
  { key: "fundraise", icon: "trophy", title: "Fundraise", desc: "Run, bake, cycle or shave \u2014 your effort funds a young person's first job.", to: "/get-involved/fundraise" },
];

export const fundraiseIdeas = [
  { icon: "footprints", title: "Sponsored walk or run", desc: "Pull on your trainers and rally your friends. We'll send sponsorship forms and a SAM t-shirt." },
  { icon: "cake", title: "Bake sale or coffee morning", desc: "A morning of cake, conversation, and quiet impact. Workplace-friendly and family-friendly." },
  { icon: "bike", title: "Cycle, swim or shave!", desc: "Big challenge, big difference. We'll help with social posts and a donation page." },
  { icon: "sparkles", title: "Celebrate in lieu of gifts", desc: "Birthdays, weddings, milestones \u2014 ask loved ones to give in your name." },
];

export const donationTiers = [
  { amount: "\u00a325", label: "Funds one Skills for Life workshop session" },
  { amount: "\u00a375", label: "Sponsors one month of job coaching" },
  { amount: "\u00a3300", label: "Supports a complete work placement journey" },
];

export const heroImage = "https://images.unsplash.com/photo-1709127347878-bd27e64d1e3e?crop=entropy&cs=srgb&fm=jpg&q=85&w=1000";
