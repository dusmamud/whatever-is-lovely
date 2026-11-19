// MOCK DATA — demo placeholders for the client presentation.
// NOTHING here is real yet. Replace every value with real details
// before launch: team names, email, phone, social handles and couple
// stories are all invented for the demo. Social links below are
// plausible mock handles (whateverislovely on each platform) —
// they are NOT verified real accounts; confirm before launch.
export const site = {
  name: 'Whatever is Lovely',
  tagline: 'Unique Wedding Planning + Coordination in Kansas City',
  url: 'https://whatever-is-lovely.pages.dev',
  description:
    'Whatever is Lovely is a Kansas City wedding planning + coordination studio — personalized planning for couples livin\u2019 it up in KCMO since 2016.',
  year: 2026,
  bookingYear: 2027,
  est: 'Est. 2016',
};

export const contact = {
  email: 'hello@whateverislovely.com',
  phoneDisplay: '(816) 555-0148',
  phoneHref: 'tel:+18165550148',
  hours: 'Mon–Fri, 9am–5pm CT · Saturdays by appointment',
  location: 'Kansas City, MO',
};

export const socials = [
  { label: 'Instagram', href: 'https://instagram.com/whateverislovely' },
  { label: 'Pinterest', href: 'https://pinterest.com/whateverislovely' },
  { label: 'Facebook', href: 'https://facebook.com/whateverislovely' },
  { label: 'TikTok', href: 'https://tiktok.com/@whateverislovely' },
];

export const stats = [
  { value: 320, suffix: '+', label: 'Weddings planned', sub: 'across Kansas City' },
  { value: 10, suffix: '', label: 'Years of love', sub: 'planning since 2016' },
  { value: 98, suffix: '%', label: 'Happy couples', sub: 'who would recommend us' },
  { value: 45, suffix: '+', label: 'Venue partners', sub: 'in the KC metro' },
];

export const services = [
  {
    slug: 'full-service-planning',
    num: '01',
    title: 'Full Service Planning',
    short: 'Every detail, start to finish — design, vendors, budget and the big day itself.',
    price: 'From $6,500',
    points: ['Design + styling direction', 'Vendor sourcing & management', 'Budget tracking & timelines', 'Full wedding-day direction'],
  },
  {
    slug: 'partial-planning',
    num: '02',
    title: 'Partial Planning',
    short: 'You have the vision — we bring the plan, the vendors and the calm.',
    price: 'From $3,200',
    points: ['Planning check-ins & guidance', 'Vendor recommendations', 'Design refinement', 'Month-of coordination included'],
  },
  {
    slug: 'day-of-coordination',
    num: '03',
    title: 'Day-Of Coordination',
    short: 'You planned it all — we make sure it actually happens, beautifully.',
    price: 'From $1,850',
    points: ['Final vendor confirmations', 'Detailed wedding-day timeline', 'Rehearsal direction', 'On-site coordination, start to finish'],
  },
];

export const serviceDetails: Record<string, { intro: string; includes: string[]; timeline: string; bestFor: string }> = {
  'full-service-planning': {
    intro: 'Our most loved package. From the first "we\u2019re engaged!" to the last dance, we plan every detail with you — design, vendors, budget, logistics — so you can actually enjoy being engaged.',
    includes: ['Unlimited planning meetings & email support', 'Custom design board + styling direction', 'Venue + vendor sourcing, tours and bookings', 'Budget creation and tracking', 'RSVP + guest-list management help', 'Full wedding-day direction with our team'],
    timeline: '9–14 months before the wedding',
    bestFor: 'Couples who want an expert beside them for every decision',
  },
  'partial-planning': {
    intro: 'You have done some of the planning and you love it — you just want a professional in your corner to keep everything on track and fill the gaps.',
    includes: ['Planning check-ins every month', 'Vendor recommendations from our trusted list', 'Design + floor-plan refinement', 'Budget and timeline reviews', 'Month-of coordination with rehearsal direction'],
    timeline: '4–8 months before the wedding',
    bestFor: 'Couples who have booked their venue and a few vendors already',
  },
  'day-of-coordination': {
    intro: 'You planned a beautiful wedding. Our job is to make sure the day itself runs like the dream you imagined — every vendor, every cue, every moment, handled.',
    includes: ['Two planning meetings before the day', 'Vendor confirmations + final timeline', 'Rehearsal direction', 'On-site coordination from setup to send-off', 'Emergency kit, always packed'],
    timeline: '6–8 weeks before the wedding',
    bestFor: 'Couples who planned it all and want to be guests at their own wedding',
  },
};

export const processSteps = [
  { num: '01', title: 'Say Hello', weeks: 'First', short: 'A free consultation — coffee, cake, and your love story.', detail: 'We meet (in person or on video) to hear your story, your vision and your worries. No pressure, no sales pitch — just a conversation about what your wedding could feel like.' },
  { num: '02', title: 'Dream + Design', weeks: 'Months 9–6', short: 'Moodboards, venues and vendors that fit you — not a template.', detail: 'Together we build a design direction and a vendor team that fits your style and budget. Every recommendation comes from planners who have actually worked with these vendors.' },
  { num: '03', title: 'Plan the Details', weeks: 'Months 6–1', short: 'Timelines, floor plans, RSVPs and all the little things.', detail: 'We handle the logistics — timelines, layouts, confirmations, rentals — and check in with you at every step so nothing slips through the cracks.' },
  { num: '04', title: 'Celebrate', weeks: 'The big day', short: 'You get married. We make sure everything else happens.', detail: 'On the day, our team runs the show behind the scenes. You stay present, your families relax, and your wedding unfolds exactly as planned — usually better.' },
];

export const weddings = [
  { slug: 'emma-james-garden', title: 'Emma & James', venue: 'The Garden at Loose Park', season: 'Spring 2026', category: 'Garden', img: '/images/garden-couple-1200.jpg', summary: 'A spring garden wedding under a floral arch, with blush roses and golden-hour portraits.', date: '18 Apr 2026', serviceUsed: 'Full Service Planning', story: 'Emma and James met volunteering at a community garden, so an outdoor ceremony under a floral arch felt like the only right choice. We built the day around blush roses, family-style long tables and a golden-hour portrait session in the park. When a spring shower threatened the ceremony, our team moved the arch under the pavilion in twenty minutes — and the rain cleared just as Emma walked down the aisle.', vendorCredits: ['Loose Park Garden Team (venue)', 'Bloom & Stem KC (florals)', 'Golden Hour Photo Co. (photography)', 'Harvest Table Catering (catering)', 'Sweet Crumb Bakery (cake)'] },
  { slug: 'sophia-liam-river', title: 'Sophia & Liam', venue: 'The River Market Hall', season: 'Summer 2025', category: 'Classic', img: '/images/couple-exit-1200.jpg', summary: 'A joyful confetti exit and a candlelit reception in the heart of the River Market.', date: '21 Jun 2025', serviceUsed: 'Full Service Planning', story: 'Sophia and Liam wanted a big, joyful party in the middle of the city — and the River Market Hall delivered. We planned a candlelit dinner for 180, a live band, and a confetti exit that had the whole street cheering. Their favorite moment was the surprise: Liam had arranged for Sophia\u2019s grandmother\u2019s favorite song to open the first dance.', vendorCredits: ['River Market Hall (venue)', 'Candlelight & Co. (lighting)', 'Golden Hour Photo Co. (photography)', 'Harvest Table Catering (catering)', 'The KC String Quartet (music)'] },
  { slug: 'ava-noah-barn', title: 'Ava & Noah', venue: 'The Barn at Timber Ridge', season: 'Fall 2025', category: 'Rustic', img: '/images/lights-reception-1200.jpg', summary: 'String lights, warm wood and a dance floor that stayed full until midnight.', date: '11 Oct 2025', serviceUsed: 'Partial Planning', story: 'Ava and Noah had already booked their barn when they called us — they needed someone to turn a beautiful venue into a full wedding. We designed the string-light canopy, the warm wood tablescapes and a timeline that kept the dance floor full until midnight. Their dog, Biscuit, was ring bearer, and yes, he nailed it.', vendorCredits: ['Timber Ridge Barn (venue)', 'Bloom & Stem KC (florals)', 'Prairie Lens Photography (photography)', 'Smoke & Oak BBQ (catering)', 'Sweet Crumb Bakery (cake)'] },
  { slug: 'mia-ethan-downtown', title: 'Mia & Ethan', venue: 'The Downtown Loft', season: 'Winter 2025', category: 'Modern', img: '/images/table-setting-1200.jpg', summary: 'A modern loft celebration — gold, cream and candlelight, with a cake table to remember.', date: '13 Dec 2025', serviceUsed: 'Day-Of Coordination', story: 'Mia and Ethan planned every detail themselves and asked us to run the day. The loft looked stunning — gold, cream and candlelight — but the real test came at 4pm, when the florist\u2019s delivery ran an hour late. Our team rebuilt the ceremony arch from the reception florals, and no guest ever knew. The cake table, though, needed no rescue: it was the most photographed spot of the night.', vendorCredits: ['The Downtown Loft (venue)', 'Modern Bloom Studio (florals)', 'City Lights Photography (photography)', 'Harvest Table Catering (catering)', 'Sugar & Spice Cakes (cake)'] },
  { slug: 'isabella-lucas-estate', title: 'Isabella & Lucas', venue: 'The Rosewood Estate', season: 'Spring 2025', category: 'Garden', img: '/images/couple-portrait-2-1200.jpg', summary: 'An estate wedding with a lace gown, a wooden backdrop and the sweetest first look.', date: '3 May 2025', serviceUsed: 'Full Service Planning', story: 'Isabella and Lucas dreamed of a romantic estate wedding, and Rosewood gave them the backdrop — manicured lawns, a wooden ceremony arch and a first look under the old oak tree that made everyone cry. We planned a garden ceremony, a long dinner under the stars and a sparkler send-off. Isabella still says the first look was the best five minutes of her life.', vendorCredits: ['Rosewood Estate (venue)', 'Bloom & Stem KC (florals)', 'Golden Hour Photo Co. (photography)', 'Harvest Table Catering (catering)', 'Sweet Crumb Bakery (cake)'] },
  { slug: 'harper-owen-vineyard', title: 'Harper & Owen', venue: 'The Vineyard at KC', season: 'Fall 2024', category: 'Rustic', img: '/images/cake-table-1200.jpg', summary: 'A vineyard celebration with a flower-topped cake and a long family-style dinner.', date: '28 Sep 2024', serviceUsed: 'Partial Planning', story: 'Harper and Owen chose the vineyard for its long golden light and its long tables — they wanted one big family dinner, not a ballroom. We planned a ceremony between the vines, a family-style feast with local wine, and a flower-topped cake that looked almost too pretty to cut. Almost. Their toast, under the string lights, ran twenty minutes long and nobody minded a bit.', vendorCredits: ['The Vineyard at KC (venue)', 'Wildflower & Vine (florals)', 'Prairie Lens Photography (photography)', 'Harvest Table Catering (catering)', 'Sugar & Spice Cakes (cake)'] },
];

export const team = [
  { name: 'Grace Whitfield', role: 'Founder & Lead Planner', img: '/images/planner-grace-800.jpg', bio: 'Planning Kansas City weddings since 2016. Grace believes every couple deserves a day that feels unmistakably theirs.' },
  { name: 'Hannah Brooks', role: 'Senior Wedding Planner', img: '/images/planner-hannah-800.jpg', bio: 'The calm in every storm. Hannah runs timelines, vendors and rehearsals like a symphony — usually with a smile.' },
  { name: 'Ella Thompson', role: 'Design & Styling Lead', img: '/images/planner-ella-800.jpg', bio: 'Ella turns moodboards into real rooms — florals, tablescapes and the little details guests photograph all night.' },
];

export const testimonials = [
  { quote: 'Grace and her team made our wedding feel effortless. We actually got to enjoy our own day — every detail was handled before we even thought to ask.', name: 'Emma & James', detail: 'Married Spring 2026 · Loose Park', img: '/images/garden-couple-800.jpg' },
  { quote: 'We came in overwhelmed and left with a plan, a team and a wedding that looked exactly like us. Worth every penny — twice over.', name: 'Sophia & Liam', detail: 'Married Summer 2025 · River Market', img: '/images/couple-exit-800.jpg' },
  { quote: 'The day-of coordination was flawless. Our families kept asking who was running the show — it felt like magic, but it was just a very good plan.', name: 'Ava & Noah', detail: 'Married Fall 2025 · Timber Ridge', img: '/images/lights-reception-800.jpg' },
  { quote: 'From the first call to the last dance, they treated our wedding like it was the only one. Because to them, it was.', name: 'Mia & Ethan', detail: 'Married Winter 2025 · Downtown Loft', img: '/images/table-setting-800.jpg' },
];

export const blogPosts = [
  {
    slug: 'wedding-day-timeline-that-works',
    seoTitle: 'The Wedding-Day Timeline That Actually Works — Whatever is Lovely Blog',
    title: 'The Wedding-Day Timeline That Actually Works',
    category: 'Planning Tips',
    tags: ['timeline', 'wedding day', 'planning'],
    author: 'Ella Thompson',
    authorRole: 'Design & Styling Lead',
    date: '2026-11-18',
    readingTime: '5 min read',
    excerpt: 'A wedding day without a timeline is just a very expensive hope. Here is the schedule we build for every couple — and why the gaps matter as much as the events.',
    img: '/images/reception-candles-1200.jpg',
    body: [
      'Every wedding we plan runs on a timeline, and the best ones look effortless precisely because the timeline exists. The goal is not to schedule every minute of joy. It is to make sure the unglamorous things — vendor arrivals, family photos, the first dance — happen without anyone having to think about them.',
      'Start from the end and work backwards. If dinner is at 6pm, speeches end around 7:30, and the party winds down at 10, then family photos need to be done by 4:30, the ceremony ends by 4, and hair and makeup must finish by 2. Working backwards is the only way the morning stays calm: every start time is decided by the thing that has to happen after it.',
      'Then build in buffers — generous ones. Hair runs long, a button pops, a bridesmaid cannot find her shoes. We add fifteen minutes between every major block, and we never schedule photos back-to-back with the ceremony. Those buffers are invisible when everything goes right, and they are the reason the day survives when it does not.',
      'One rule we never break: the couple eats. It sounds obvious, but without a timeline that says so, the couple is the last to sit down and the first to be pulled away. We put a fifteen-minute break for the two of you right after the ceremony — no photos, no guests, just dinner and a breath. Every couple tells us afterwards it was their favorite part of the day.',
      'Finally, give the timeline to one person — your coordinator — and let everyone else enjoy the day. Vendors get their own version with arrival times and contact numbers; the wedding party gets a simple version with where to be and when. When one person holds the clock, nobody else has to watch it.',
    ],
  },
  {
    slug: 'what-to-ask-your-wedding-photographer',
    seoTitle: 'What to Ask Your Wedding Photographer Before You Book — Whatever is Lovely Blog',
    title: 'What to Ask Your Wedding Photographer Before You Book',
    category: 'Vendors',
    tags: ['photography', 'vendors', 'questions to ask'],
    author: 'Hannah Brooks',
    authorRole: 'Senior Wedding Planner',
    date: '2026-11-15',
    readingTime: '6 min read',
    excerpt: 'Your photos are the one thing that outlasts the day itself. These are the questions that separate a great photographer from a pretty portfolio.',
    img: '/images/couple-sunset-1200.jpg',
    body: [
      'Your flowers will wilt, the cake will be eaten, and the dress will go back in its box. Your photographs are the part of the wedding that lasts — which is why choosing a photographer deserves more than falling in love with an Instagram feed.',
      'First, look at a full wedding, not a highlight reel. Every photographer has twenty perfect frames; the question is whether the other eight hundred hold up. Ask to see one complete gallery from a wedding like yours — same season, similar light, similar guest count. You are hiring consistency, not a best-of album.',
      'Then ask about the unglamorous logistics. How many hours are included, and what does overtime cost? Is there a second photographer, and when does that matter? How long until you see a sneak peek, and when is the full gallery delivered? What happens if your photographer is ill on the day — is there a backup, in writing?',
      'Ask how they work with a timeline, too. A good photographer builds the portrait list with you in advance — family groupings, who must be in which photo — so family portraits take twenty minutes instead of an hour. And ask whether they have shot at your venue before: knowing where the sun sets and which corner has the best light is worth more than any lens.',
      'Finally, trust the feeling. You will spend more of your wedding day with your photographer than with almost anyone else, including each other. If the first meeting feels easy and unforced, that is real information — the camera loves couples who are relaxed, and relaxed couples are made, not found.',
    ],
  },
  {
    slug: 'kansas-city-wedding-venues',
    seoTitle: 'Our Favorite Kansas City Wedding Venues — Whatever is Lovely Blog',
    title: 'Our Favorite Kansas City Wedding Venues (and How to Choose Yours)',
    category: 'Planning Tips',
    tags: ['venues', 'Kansas City', 'planning'],
    author: 'Grace Whitfield',
    authorRole: 'Founder & Lead Planner',
    date: '2026-11-08',
    readingTime: '6 min read',
    excerpt: 'Garden, barn, loft or estate — Kansas City has a venue for every kind of love story. Here is how we help couples find the one that fits.',
    img: '/images/garden-couple-1200.jpg',
    body: [
      'Choosing a venue is the first big decision most couples make, and it shapes almost everything after it — the guest count, the style, the budget, even the time of day. Kansas City is lucky: within an hour of downtown you can get married in a garden, a historic barn, a modern loft, a vineyard or a grand estate. The trick is not finding a beautiful venue. It is finding the one that fits your wedding.',
      'Start with the feeling, not the photos. Close your eyes and picture the day: are you outside under string lights, or inside a candlelit room? Is it a big party with 200 of your favorite people, or an intimate dinner with 60? The venue has to hold that feeling — and the guest count — comfortably. A room that is too big feels empty; a garden that is too small feels crowded. Ask every venue for its comfortable capacity, not its maximum.',
      'Then ask the practical questions. What is included — tables, chairs, linens, a getting-ready suite? Is there a rain plan, and does it cost extra? What time does the music have to stop? Can your caterer work in their kitchen? The prettiest venue in the city is the wrong venue if its rules fight your plans.',
      'Budget is part of the decision, honestly. Venue and catering together usually take the biggest share of a wedding budget, so knowing the full cost — rental, minimums, service fees, overtime — before you fall in love matters. We always ask venues for an all-in estimate, not just the rental number on the website.',
      'Our advice: visit your top three in person, at the same time of day as your wedding would be. Light changes everything. A garden at golden hour and the same garden at noon are two different places. Bring your planner if you have one — we notice the things couples miss, like where the sun sets, how loud the road is, and whether the dance floor fits your band.',
      'If you are still deciding, start with our three favorites for different styles: a garden venue for spring and fall, a loft for a modern winter celebration, and a barn for a relaxed summer party. And remember — the venue is the stage, not the show. The show is the two of you, and the right venue is simply the one that lets that shine.',
    ],
  },
  {
    slug: 'day-of-coordination-worth-it',
    seoTitle: 'Is Day-Of Coordination Worth It? — Whatever is Lovely Blog',
    title: 'Is Day-Of Coordination Worth It? An Honest Answer',
    category: 'Planning Tips',
    tags: ['day-of coordination', 'planning', 'wedding day'],
    author: 'Hannah Brooks',
    authorRole: 'Senior Wedding Planner',
    date: '2026-10-28',
    readingTime: '5 min read',
    excerpt: 'You planned everything yourself — so do you still need a coordinator? Here is what actually happens on a wedding day without one.',
    img: '/images/couple-exit-1200.jpg',
    body: [
      'It is the question we hear most from couples who planned their own wedding: we did all the work, so do we really need someone on the day? The honest answer is that day-of coordination is not about planning. It is about being present — and on your wedding day, you cannot be both the guest of honor and the person running the show.',
      'Here is what a coordinator actually does on the day. We confirm every vendor arrival, set up the ceremony and reception spaces, cue the processional, manage the timeline, handle the surprises (a missing boutonniere, a late DJ, a sudden rain shower), and make sure you eat, drink and actually enjoy the party you planned.',
      'Without one, those jobs fall to someone you love — usually a bridesmaid, a parent, or you. And they cannot do them well while also being in the photos, giving a toast and dancing. The most common thing couples tell us after the wedding is not that something went wrong. It is that they wish they had been more present.',
      'Cost is a fair question. Day-of coordination is our most affordable package, and for most couples it is a small share of the total wedding budget — far less than the flowers, and it protects everything else you spent on. Think of it as insurance for the experience, not just the logistics.',
      'If your budget only stretches to one professional, make it this one. A beautiful wedding you did not get to enjoy is not a beautiful wedding. Hire the person whose job is to worry, so yours is to celebrate.',
      'One practical note: book early. Good coordinators take a limited number of weddings per weekend, and spring and fall Saturdays in Kansas City fill up a year ahead. If your date is set, a quick call costs nothing — and it tells you whether your day needs a coordinator, or whether you are genuinely all set.',
    ],
  },
  {
    slug: 'wedding-budget-kansas-city',
    seoTitle: 'How Much Does a Kansas City Wedding Cost? — Whatever is Lovely Blog',
    title: 'How Much Does a Kansas City Wedding Cost in 2026?',
    category: 'Budget',
    tags: ['budget', 'Kansas City', 'costs'],
    author: 'Grace Whitfield',
    authorRole: 'Founder & Lead Planner',
    date: '2026-10-12',
    readingTime: '6 min read',
    excerpt: 'Real numbers for a Kansas City wedding — what couples actually spend, where the money goes, and how to plan a budget you can keep.',
    img: '/images/table-setting-1200.jpg',
    body: [
      'The first question every engaged couple asks is also the hardest to answer: how much will this cost? The honest answer is that it depends — but Kansas City is kinder to wedding budgets than most big cities, and a clear budget makes every other decision easier.',
      'A typical Kansas City wedding for 100–150 guests lands somewhere between $25,000 and $45,000 all in. The biggest pieces are venue and catering, which together often take half the budget, followed by photography, florals, music and attire. Planning itself — our full-service package starts at $6,500 — is a smaller line that protects all the bigger ones.',
      'Where couples overspend is rarely the big things. It is the small ones, added one at a time: an extra hour of open bar, upgraded linens, a second photographer, a late-night snack. Each is small; together they can add thousands. That is why we build the budget first, before any vendor is booked, and track it against every quote.',
      'A few Kansas City specifics help. Peak Saturdays in May, June, September and October cost the most; a Friday or Sunday can save real money. Garden venues are lovely in spring and fall but need a rain plan — budget for the tent, not just hope for sun. And local vendors, booked early, are almost always better value than flying a team in.',
      'Our rule for couples: decide the three things that matter most to you — the food, the photos, the party — and spend generously there. Everything else can be simple, and simple done well still looks beautiful. A wedding is not a contest of line items. It is a day your guests remember because it felt like you.',
      'If you want a starting point, bring us your guest count and your top three priorities, and we will build a realistic budget in our first meeting — free, no obligation. Knowing the numbers early is the kindest thing you can do for your engagement.',
    ],
  },
];

export const faqs = [
  { q: 'How far in advance should we book?', a: 'For full-service planning, 9–14 months is ideal, and spring and fall Saturdays in Kansas City often book a year ahead. Day-of coordination can usually be booked 6–8 weeks out — but reach out as soon as your date is set and we will tell you honestly what is available.' },
  { q: 'How much does wedding planning cost?', a: 'Full service planning starts at $6,500, partial planning at $3,200, and day-of coordination at $1,850. Every quote is fixed in writing before we start — no hidden charges later.' },
  { q: 'Do you only plan weddings in Kansas City?', a: 'Kansas City is home, and most of our weddings are in the KC metro. We also travel for destination weddings in Missouri, Kansas and beyond — ask us about travel pricing.' },
  { q: 'Can you help if we already booked our venue?', a: 'Absolutely. Partial planning and day-of coordination are made for couples who have started already. We pick up wherever you are and carry it from there.' },
  { q: 'Will we still make the decisions?', a: 'Yes — always. We present options, handle logistics and give honest advice, but every choice is yours. It is your wedding; we just make it happen beautifully.' },
  { q: 'What happens on the wedding day itself?', a: 'Our team arrives early, sets up, confirms vendors, runs the timeline and handles anything unexpected. You get married, eat, dance and enjoy — we take care of the rest.' },
];

// --- NEW EXPORTS (v2) — consumed by the weddings / vendors / gallery /
// pricing / reviews pages. All mock data: vendor names, neighbourhoods
// and review platforms are invented for the demo. Review `platform`
// values ('The Knot', 'Google', 'WeddingWire') are mock labels only —
// do NOT render platform logos or claim these reviews were posted there.

export const vendors = [
  { name: 'The Garden at Loose Park', category: 'Venue', neighbourhood: 'Waldo', blurb: 'A blooming garden venue with a floral arch and golden-hour lawns — our most-requested spring setting.', img: '/images/garden-couple-1200.jpg' },
  { name: 'Bloom & Stem KC', category: 'Florist', neighbourhood: 'Crossroads', blurb: 'Seasonal, garden-style florals — loose bouquets, ceremony arches and tablescapes that smell as good as they look.', img: '/images/bride-detail-1200.jpg' },
  { name: 'Golden Hour Photo Co.', category: 'Photographer', neighbourhood: 'River Market', blurb: 'Warm, honest photography with a gift for golden hour. The team behind most of the portraits on this site.', img: '/images/couple-portrait-2-1200.jpg' },
  { name: 'Harvest Table Catering', category: 'Caterer', neighbourhood: 'Westport', blurb: 'Family-style feasts from local farms — the long-table dinners our couples talk about for years.', img: '/images/table-setting-1200.jpg' },
  { name: 'Sweet Crumb Bakery', category: 'Bakery', neighbourhood: 'Brookside', blurb: 'Flower-topped cakes and dessert tables, baked to order and delivered with a steady hand.', img: '/images/cake-table-1200.jpg' },
  { name: 'The KC String Quartet', category: 'Music', neighbourhood: 'Downtown', blurb: 'Strings for the ceremony, jazz for the cocktails — elegant without ever feeling stiff.', img: '/images/lights-reception-1200.jpg' },
  { name: 'The Downtown Loft', category: 'Venue', neighbourhood: 'Downtown', blurb: 'A modern loft with exposed brick and big windows — candlelight looks incredible here in winter.', img: '/images/table-setting-1200.jpg' },
  { name: 'Prairie Lens Photography', category: 'Photographer', neighbourhood: 'Overland Park', blurb: 'Documentary-style coverage for barn and vineyard weddings — unposed, warm and full of laughter.', img: '/images/couple-exit-1200.jpg' },
  { name: 'Smoke & Oak BBQ', category: 'Caterer', neighbourhood: 'Westport', blurb: 'Kansas City barbecue done right — slow-smoked, generous, and always the first thing guests mention.', img: '/images/lights-reception-1200.jpg' },
  { name: 'Modern Bloom Studio', category: 'Florist', neighbourhood: 'Crossroads', blurb: 'Sculptural, modern arrangements in gold and cream — the studio behind our downtown loft weddings.', img: '/images/oval-cake-cutting-1200.jpg' },
  { name: 'Sugar & Spice Cakes', category: 'Bakery', neighbourhood: 'Waldo', blurb: 'Classic tiered cakes with a modern finish, plus late-night cookie bars for the dance floor.', img: '/images/cake-table-1200.jpg' },
  { name: 'City Lights Photography', category: 'Photographer', neighbourhood: 'Downtown', blurb: 'Editorial portraits and fast, joyful reception coverage — great for couples who hate posing.', img: '/images/hero-couple-1200.jpg' },
];

export const galleryItems = [
  { img: '/images/garden-couple-1200.jpg', alt: 'Bride and groom under a floral arch in a garden', style: 'garden', venue: 'The Garden at Loose Park', season: 'Spring' },
  { img: '/images/couple-exit-1200.jpg', alt: 'Newlyweds leaving the ceremony under a shower of confetti', style: 'classic', venue: 'The River Market Hall', season: 'Summer' },
  { img: '/images/lights-reception-1200.jpg', alt: 'Reception barn glowing under string lights', style: 'rustic', venue: 'The Barn at Timber Ridge', season: 'Fall' },
  { img: '/images/table-setting-1200.jpg', alt: 'Gold and cream table setting with candles in a downtown loft', style: 'modern', venue: 'The Downtown Loft', season: 'Winter' },
  { img: '/images/couple-portrait-2-1200.jpg', alt: 'Couple sharing a first look in front of a wooden backdrop', style: 'garden', venue: 'The Rosewood Estate', season: 'Spring' },
  { img: '/images/cake-table-1200.jpg', alt: 'Wedding cake topped with fresh flowers on a dessert table', style: 'rustic', venue: 'The Vineyard at KC', season: 'Fall' },
  { img: '/images/oval-cake-cutting-1200.jpg', alt: 'Couple cutting their cake together', style: 'classic', venue: 'The Rosewood Estate', season: 'Spring' },
  { img: '/images/bride-detail-1200.jpg', alt: 'Close-up of a bride holding her bouquet', style: 'garden', venue: 'The Garden at Loose Park', season: 'Spring' },
  { img: '/images/hero-couple-1200.jpg', alt: 'Newlyweds at golden hour in a Kansas City garden', style: 'modern', venue: 'The Garden at Loose Park', season: 'Summer' },
  { img: '/images/garden-couple-1200.jpg', alt: 'Bride and groom walking through the garden after the ceremony', style: 'classic', venue: 'The Garden at Loose Park', season: 'Spring' },
  { img: '/images/couple-exit-1200.jpg', alt: 'Guests cheering as the couple exits the hall', style: 'modern', venue: 'The River Market Hall', season: 'Summer' },
  { img: '/images/lights-reception-1200.jpg', alt: 'Dance floor under warm string lights at dusk', style: 'rustic', venue: 'The Barn at Timber Ridge', season: 'Fall' },
];

export const pricingPackages = [
  {
    slug: 'full-service-planning',
    title: 'Full Service Planning',
    price: 'From $6,500',
    bestFor: 'Couples who want an expert beside them for every decision, from engagement to last dance.',
    includes: ['Unlimited planning meetings & email support', 'Custom design board + styling direction', 'Venue + vendor sourcing, tours and bookings', 'Budget creation and tracking', 'RSVP + guest-list management help', 'Full wedding-day direction with our team'],
    notIncluded: ['Venue rental and catering costs', 'Vendor fees (photography, florals, music, etc.)', 'Travel outside the KC metro'],
    addOns: [
      { name: 'Rehearsal dinner planning', price: '$450' },
      { name: 'Extra planner on the wedding day', price: '$600' },
      { name: 'Honeymoon send-off styling', price: '$250' },
    ],
  },
  {
    slug: 'partial-planning',
    title: 'Partial Planning',
    price: 'From $3,200',
    bestFor: 'Couples who have booked their venue and a few vendors already and want a professional to fill the gaps.',
    includes: ['Planning check-ins every month', 'Vendor recommendations from our trusted list', 'Design + floor-plan refinement', 'Budget and timeline reviews', 'Month-of coordination with rehearsal direction'],
    notIncluded: ['Full vendor sourcing and bookings', 'RSVP + guest-list management', 'Wedding-day direction beyond the coordination team'],
    addOns: [
      { name: 'Design board + styling direction', price: '$500' },
      { name: 'Vendor tour accompaniment', price: '$300' },
      { name: 'Extra planning meeting', price: '$150' },
    ],
  },
  {
    slug: 'day-of-coordination',
    title: 'Day-Of Coordination',
    price: 'From $1,850',
    bestFor: 'Couples who planned it all and want to be guests at their own wedding.',
    includes: ['Two planning meetings before the day', 'Vendor confirmations + final timeline', 'Rehearsal direction', 'On-site coordination from setup to send-off', 'Emergency kit, always packed'],
    notIncluded: ['Planning meetings beyond the two included', 'Vendor sourcing or bookings', 'Design or styling direction'],
    addOns: [
      { name: 'Extra coordinator on the day', price: '$400' },
      { name: 'Rehearsal dinner direction', price: '$300' },
      { name: 'Next-day brunch setup', price: '$250' },
    ],
  },
];

export const reviews = [
  { name: 'Emma & James', weddingDate: '18 Apr 2026', venue: 'The Garden at Loose Park', rating: 5, quote: 'Grace and her team made our wedding feel effortless. We actually got to enjoy our own day — every detail was handled before we even thought to ask.', platform: 'The Knot' },
  { name: 'Sophia & Liam', weddingDate: '21 Jun 2025', venue: 'The River Market Hall', rating: 5, quote: 'We came in overwhelmed and left with a plan, a team and a wedding that looked exactly like us. Worth every penny — twice over.', platform: 'Google' },
  { name: 'Ava & Noah', weddingDate: '11 Oct 2025', venue: 'The Barn at Timber Ridge', rating: 5, quote: 'The day-of coordination was flawless. Our families kept asking who was running the show — it felt like magic, but it was just a very good plan.', platform: 'WeddingWire' },
  { name: 'Mia & Ethan', weddingDate: '13 Dec 2025', venue: 'The Downtown Loft', rating: 5, quote: 'From the first call to the last dance, they treated our wedding like it was the only one. Because to them, it was.', platform: 'Google' },
  { name: 'Isabella & Lucas', weddingDate: '3 May 2025', venue: 'The Rosewood Estate', rating: 5, quote: 'The first look under the old oak tree was the best five minutes of my life, and it happened because Grace planned it down to the light.', platform: 'The Knot' },
  { name: 'Harper & Owen', weddingDate: '28 Sep 2024', venue: 'The Vineyard at KC', rating: 5, quote: 'One long family dinner under string lights, exactly as we dreamed it. Our guests still talk about that night.', platform: 'WeddingWire' },
  { name: 'Chloe & Ben', weddingDate: '7 Jun 2025', venue: 'The Garden at Loose Park', rating: 5, quote: 'Hannah kept us calm through a rain scare and a late florist. We never felt a thing — the day just flowed.', platform: 'Google' },
];
