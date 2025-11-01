import { memo } from "react";
import { FaApple, FaGooglePlay } from "react-icons/fa";

const AppHero = ({ title, description, storeLinks, logo }) => (
	<div className="mb-16 flex flex-col items-center md:items-start md:flex-row gap-8">
		<div className="flex-shrink-0 md:self-center">
			<div className="rounded-2xl border border-gray-200/50 dark:border-white/10 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-white/[0.02] dark:to-white/[0.05] p-6 w-[192px] h-[192px] flex items-center justify-center shadow-sm">
				<img src={logo.src} alt="App Icon" className="h-40 w-40 rounded-2xl object-cover" />
			</div>
		</div>

		<div className="flex flex-1 flex-col justify-between text-center md:text-left">
			<div>
				<h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">{title}</h1>
				<p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-6 max-w-2xl mx-auto md:mx-0">{description}</p>
			</div>

			<div className="flex flex-wrap gap-4 justify-center md:justify-start">
				<StoreButton store="apple" href={storeLinks.apple} label="Download on the" storeName="App Store" />
				<StoreButton store="google" href={storeLinks.google} label="Get it on" storeName="Google Play" />
			</div>
		</div>
	</div>
);

const StoreButton = memo(({ store, href, label, storeName }) => {
	const Icon = store === "apple" ? FaApple : FaGooglePlay;

	return (
		<a
			href={href}
			target="_blank"
			rel="noopener noreferrer"
			className="group flex items-center gap-3 rounded-xl border border-gray-300 dark:border-white/10 bg-white dark:bg-white/[0.04] px-5 py-3 transition-all duration-300 hover:bg-gray-50 dark:hover:bg-white/[0.08] hover:border-gray-400 dark:hover:border-white/20 shadow-sm"
		>
			<div className="flex items-center justify-center w-7 h-7">
				<Icon className={`text-gray-600 dark:text-gray-300 transition-transform duration-300 group-hover:scale-110 group-hover:text-gray-800 dark:group-hover:text-white ${store === "apple" ? "w-[22px] h-[22px]" : "w-5 h-5"}`} />
			</div>
			<span className="text-left">
				<div className="text-[11px] font-medium text-gray-500 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">{label}</div>
				<div className="text-[13px] font-semibold tracking-wide text-gray-900 dark:text-white/90 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">{storeName}</div>
			</span>
		</a>
	);
});

StoreButton.displayName = "StoreButton";

export default memo(AppHero);

