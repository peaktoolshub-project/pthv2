import { Metadata } from "next";
import { notFound } from "next/navigation";
import { TOOLS, SLUG_MAP, getRelatedTools } from "@/lib/tools";
import Script from "next/script";
import CalculatorWidget from "@/components/CalculatorWidget";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://peaktoolshub.com";

interface Props {
  params: { slug: string };
}

// Generate all static paths at build time
export async function generateStaticParams() {
  return TOOLS.map(tool => ({ slug: tool.slug }));
}

// Generate per-page metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tool = SLUG_MAP[params.slug];
  if (!tool) return {};

  const title = `${tool.name} — Free Online Calculator`;
  const description = tool.longDesc.slice(0, 160);
  const url = `${SITE_URL}/tools/${tool.slug}`;

  return {
    title,
    description,
    keywords: tool.keywords,
    alternates: { canonical: url },
    openGraph: {
      title, description, url, type: "website",
      images: [{ url: `/og/${tool.id}.png`, width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

// Tool page component — renders calculator + full SEO content
export default function ToolPage({ params }: Props) {
  const tool = SLUG_MAP[params.slug];
  if (!tool) notFound();

  const related = getRelatedTools(tool.id, 4);
  const url = `${SITE_URL}/tools/${tool.slug}`;

  // JSON-LD Structured Data
  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: tool.name,
    url,
    description: tool.longDesc,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: tool.keywords.join(", "),
  };

  const faqSchema = tool.faq.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: tool.faq.map(f => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  } : null;

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `How to use the ${tool.name}`,
    description: `Step-by-step guide to using the ${tool.name} on Peak Tools Hub`,
    step: [
      { "@type": "HowToStep", name: "Enter your values", text: "Fill in the required input fields with your data." },
      { "@type": "HowToStep", name: "View instant results", text: "Results are calculated automatically as you type — no button required." },
      { "@type": "HowToStep", name: "Share or save", text: "Copy your results or share the tool URL with others." },
    ],
  };

  return (
    <>
      <Script id="schema-webapp" type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      {faqSchema && <Script id="schema-faq" type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}
      <Script id="schema-howto" type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />

      {/* Breadcrumb structured data */}
      <Script id="schema-breadcrumb" type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
            { "@type": "ListItem", position: 2, name: tool.category, item: `${SITE_URL}/category/${tool.category}` },
            { "@type": "ListItem", position: 3, name: tool.name, item: url },
          ],
        })
      }} />

      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="text-sm text-gray-500 mb-6">
          <a href="/" className="hover:text-white transition-colors">Home</a>
          <span className="mx-2">/</span>
          <a href={`/category/${tool.category}`} className="hover:text-white transition-colors capitalize">{tool.category}</a>
          <span className="mx-2">/</span>
          <span className="text-white">{tool.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6">
          {/* Calculator column */}
          <div>
            <header className="mb-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-4xl" role="img" aria-label={tool.name}>{tool.icon}</span>
                <div>
                  <h1 className="text-2xl font-display font-bold text-white">{tool.name}</h1>
                  <p className="text-gray-400 text-sm mt-1">{tool.desc}</p>
                </div>
              </div>
            </header>

            {/* Calculator widget — client component, loads tool by id */}
            <div className="bg-surface-elevated border border-white/8 rounded-2xl p-6" id="calculator-widget">
              <CalculatorWidget toolId={tool.id} />
            </div>

            {/* SEO content below fold */}
            <article className="mt-8 prose prose-invert prose-sm max-w-none">
              <h2>About the {tool.name}</h2>
              <p>{tool.longDesc}</p>

              {tool.faq.length > 0 && (
                <>
                  <h2>Frequently Asked Questions</h2>
                  {tool.faq.map((f, i) => (
                    <div key={i} className="mt-4">
                      <h3 className="font-semibold text-white">{f.q}</h3>
                      <p className="text-gray-300">{f.a}</p>
                    </div>
                  ))}
                </>
              )}
            </article>
          </div>

          {/* Sidebar */}
          <aside>
            <div className="bg-surface-elevated border border-white/8 rounded-2xl p-5 mb-4">
              <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Related Tools</h2>
              <div className="space-y-1">
                {related.map(r => (
                  <a key={r.id} href={`/tools/${r.slug}`}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors group">
                    <span className="text-xl">{r.icon}</span>
                    <div>
                      <div className="text-sm font-semibold text-white group-hover:text-green-400 transition-colors">{r.name}</div>
                      <div className="text-xs text-gray-500">{r.desc}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Affiliate placeholder (non-intrusive) */}
            <div className="bg-surface-elevated border border-white/5 rounded-2xl p-5">
              <div className="text-xs text-gray-600 uppercase tracking-widest mb-3">Compare Products</div>
              <div className="text-xs text-gray-500">
                Looking for the best {tool.category} products? Compare rates on RinggitPlus →
              </div>
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}

// ISR: revalidate tool pages every 24 hours
export const revalidate = 86400;
