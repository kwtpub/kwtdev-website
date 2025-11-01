import AppHero from '../landing/components/sections/AppHero';
import FAQ from '../landing/components/sections/FAQ';
import Features from '../landing/components/sections/Features';
import Reviews from '../landing/components/sections/Reviews';
import Screenshots from '../landing/components/sections/Screenshots';
import Lightbox from '../landing/components/ui/Lightbox';
import { siteConfig } from '../landing/config';

function Landing() {
	const { title, description, screenshots, features, faqs, storeLinks, logo, reviews } = siteConfig;

	return (
		<main className="min-h-screen max-w-5xl mx-auto px-4 py-8">
			<AppHero title={title} description={description} storeLinks={storeLinks} logo={logo} />
			<div className="mb-16">
				<Screenshots images={screenshots} />
			</div>
			<Features items={features} />
			<Reviews items={reviews} />
			<FAQ items={faqs} />
			<Lightbox images={screenshots} />
		</main>
	);
}

export default Landing;

