export const PHONE = '+8801713490067';
// Public address of the site: used for canonical links, social previews and the sitemap.
export const SITE_URL = 'https://clothingtrimsintl.com';
export const WHATSAPP = PHONE.replace('+', '');
export const EMAIL = 'shahriar@clothingtrimsintl.com';

export const NAV = [
  { to: '/collection', label: 'Collection' },
  { to: '/partners', label: 'Partners' },
  { to: '/about', label: 'About' },
];

export const ADDRESSES = [
  {
    name: 'Head office',
    lines: ['House 44, Road 07, Sector 11,', 'Uttara, Dhaka‑1230'],
    map: 'House 44, Road 07, Sector 11, Uttara, Dhaka 1230',
  },
  {
    name: 'Factory',
    lines: ['Holding No. 1327, Masterpara, Uzampur,', 'Uttarkhan, Dhaka‑1230'],
    map: 'Holding No. 1327, Masterpara, Uzampur, Uttarkhan, Dhaka 1230',
  },
];

export const TRIMS = [
  'Lace', 'Thermal Print', 'Barcode Sticker', 'Poly Sticker', 'Carton Sticker', 'Sewing Thread',
  'Jacquard Elastic', 'Normal Elastic', 'Narrow Fabrics', 'Draw String', 'Twill Tape', 'Woven Waist Belt',
];

export const RANGE_TAGS = [
  'All kinds of lace', 'Thermal print', 'Barcode sticker', 'Poly sticker', 'Carton sticker', 'Sewing thread',
  'Jacquard elastic', 'Normal elastic', 'Narrow fabrics', 'Draw string', 'Twill tape', 'Woven waist belt',
];

export const VM = [
  ['01', 'Our vision', 'To be the go-to brand for versatile, affordable accessories that enhance any outfit.'],
  ['02', 'Our mission', 'To create high-quality, timeless pieces that blend fashion with function.'],
];

export const VALUES = [
  {
    title: 'Quality First',
    text: 'Every trim inspected to the exacting standards of the global fashion industry.',
    icon: <><circle cx="24" cy="19" r="10" /><path d="M18.5 27.5 15 43l9-5 9 5-3.5-15.5" /><path d="m20 19 3 3 5-6" /></>,
  },
  {
    title: 'Reliability',
    text: 'Timely delivery and consistent supply you can plan your production around.',
    icon: <><path d="M24 5 8 11v11c0 10 7 17 16 21 9-4 16-11 16-21V11L24 5Z" /><path d="m17 24 5 5 9-10" /></>,
  },
  {
    title: 'Sustainability',
    text: 'Responsible sourcing and manufacturing partners, with efforts recognised by our buyers.',
    icon: <><path d="M40 8C20 8 9 18 9 31c0 3 1 6 3 8 13 1 28-7 28-31Z" /><path d="M9 43c4-11 11-19 21-25" /></>,
  },
  {
    title: 'Customer Focus',
    text: 'Long-standing relationships built on listening first and responding fast.',
    icon: <><circle cx="24" cy="24" r="18" /><circle cx="24" cy="24" r="10" /><circle cx="24" cy="24" r="2.5" /></>,
  },
  {
    title: 'Integrity',
    text: 'Honest pricing, clear communication and promises we keep.',
    icon: <><path d="M15 8h18l7 10-16 22L8 18l7-10Z" /><path d="M8 18h32M19 18l5 22 5-22M24 8l-5 10M24 8l5 10" /></>,
  },
];

// Product names are taken from the catalogue sheets in public/assets/g-*.jpg.
export const CATEGORIES = [
  {
    title: 'Sewing Thread', slug: 'thread', alt: 'Sewing thread',
    intro: 'Strong, colour-matched thread for every stage of garment making.',
    desc: 'From everyday spun polyester on cones to fine embroidery skeins and filament thread, we supply the full spectrum of sewing threads in a wide colour range, matched to your fabrics.',
    variants: ['Spun Polyester DTM Sewing Thread', 'Cotton Thread', 'Embroidery Thread', 'Filament Thread', 'Spun Polyester Thread', 'Polyester Filament Thread'],
  },
  {
    title: 'Twill Tape', slug: 'twill', alt: 'Twill tape',
    intro: 'Woven tapes for binding, strapping and finishing.',
    desc: 'A broad range of woven tapes in cotton, nylon and heavy-duty constructions, from fine twill and herringbone to gross grain and loop tape, in plain and striped colourways.',
    variants: ['Twill Tape', 'Herringbone Tape', 'Gross Grain Tape', 'Loop Tape', 'Woven Tape', 'Woven Elastic', 'Nylon Plain Twill Tape', 'Cotton Twill Tape', 'Heavy Twill Tape'],
  },
  {
    title: 'Elastic Band', slug: 'elastic', alt: 'Elastic band',
    intro: 'Comfort, stretch and recovery, from plain to jacquard.',
    desc: 'Elastics for waistbands, cuffs and trims: plain cotton and woven elastics, multi-colour and jacquard designs, button-hole, piping and drawstring elastics, plus logo and water-proof options.',
    variants: ['Cotton Elastic', 'Multi Colour Elastic', 'Button Hole Elastic', 'Piping Elastic', 'Lago Elastic', 'Jacquard Elastic', 'Woven Elastic', 'Drawstring Elastic', 'Water proof Elastic'],
  },
  {
    title: 'Drawstring & Drawcord', slug: 'drawcord', alt: 'Drawcord', dialogTitle: 'Drawstring and Drawcord',
    intro: 'Cords and drawstrings finished with the detail your design needs.',
    desc: 'Drawcords for hoodies, trousers and sportswear in flat, round and elastic constructions, available with a choice of tips and end finishes, in solid and multi-colour options.',
    variants: ['Drawstring Drawcord', 'Bunji Cord', 'Beni Cord', 'Drawstring Cord', 'Roop', 'Elastic Cord', 'Round Elastic Drawcord', 'Polyester Cord Rope', 'Hoodie Drawstring Cord'],
  },
  {
    title: 'Printed Items', slug: 'printed', alt: 'Printed items',
    intro: 'Hang tags, stickers and boards that carry your brand.',
    desc: 'Printed trims that present and protect the finished garment: hang tags, size and barcode stickers, poly and carton stickers, and the boards used to pack and display shirts.',
    variants: ['Hang Tag', 'Sticker', 'Barcode', 'Poly Sticker', 'Carton Sticker', 'Back Board', 'Packaging Board', 'Neck Board'],
  },
  {
    title: 'Buttons', slug: 'button', alt: 'Buttons',
    intro: 'The small detail that finishes a garment.',
    desc: 'Buttons in plastic, pearl, metal and natural wood, plus logo buttons and colourful designs, for shirts, outerwear, denim and fashion pieces.',
    variants: ['Chalk Button', 'Plastic Button', 'Pearl Button', 'Metal Button', 'Logo Button', 'Natural Wood Button', 'Colourful Button', 'Colour Round Button'],
  },
  {
    title: 'Labels', slug: 'label', alt: 'Labels',
    intro: 'Woven, printed and premium labels with your identity on them.',
    desc: 'Labels for branding, care and sizing: woven and silk back labels, premium and luxury finishes, price tag and barcode labels, and clothing and brand labels made to your artwork.',
    variants: ['Clothing Label', 'Woven Label', 'Price Tag Label', 'Premium Label', 'Silk Back Label', 'Luxury Label', 'Fiber Silk Label', 'Brand Label', 'Barcode Label'],
  },
  {
    title: 'Cartons', slug: 'carton', alt: 'Cartons',
    intro: 'Corrugated cartons to move your goods safely.',
    desc: 'Export and shipping cartons in a range of shapes and strengths, from cube and flat boxes to long, tall, heavy duty and side-loading styles.',
    variants: ['Cube Boxes', 'Flat Boxes', 'Long Boxes', 'Heavy Duty Boxes', 'Multi-depth Boxes', "Printer's Boxes", 'Tall Boxes', 'Side Loading Boxes'],
  },
  {
    title: 'Others', slug: 'others', alt: 'Other trims',
    intro: 'Everything else your order needs, from one supplier.',
    desc: 'The remaining trims and packing materials that complete an order: zippers, clips, adhesive and carton tapes, and general garment trimmings and accessories.',
    variants: ['Gum Tape', 'Scotch Tape', 'Zipper', 'M Clip', 'Shirt Clip', 'Carton Tape', 'Garment Trims', 'Trimming & Accessories'],
  },
].map(c => ({
  dialogTitle: c.title,
  ...c,
  thumb: `/assets/cat-${c.slug}.webp`,
  gallery: `/assets/g-${c.slug}.webp`,
}));

export const BRANDS = ['C&A', 'G-Star Raw', 'Aldi', 'Primark', 'Inditex', 'Scanwear', 'Tesco', 'Carrefour'];

export const STEPS = [
  ['01', 'Share your requirement', 'Tell us the trims you need, with quantities, specifications and artwork.'],
  ['02', 'Samples & approval', 'We prepare samples for your review so you approve before production starts.'],
  ['03', 'Production', 'Your trims are produced to the approved sample, with quality checks along the way.'],
  ['04', 'On-time delivery', 'Goods are delivered on schedule so your production line is never kept waiting.'],
];
