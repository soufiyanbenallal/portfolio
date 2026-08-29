import {
  polarisNavSectionsData,
  polarisDocComponentsData,
} from "./data/polaris-docs.data";
import { PolarisOverviewCardPart } from "./components/polaris-overview-card.part";

export default function PolarisOverviewPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-12 pb-16 pt-4">
      {polarisNavSectionsData.map((section) => {
        const components = section.items
          .map((item) =>
            polarisDocComponentsData.find((c) => c.slug === item.slug)
          )
          .filter(Boolean) as typeof polarisDocComponentsData;

        if (components.length === 0) return null;

        return (
          <section key={section.id} className="space-y-4">
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-gray-900 tracking-tight sm:text-2xl">
                {section.label}
              </h2>
              {section.description && (
                <p className="text-xs text-gray-500">{section.description}</p>
              )}
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {components.map((component) => (
                <PolarisOverviewCardPart
                  key={component.slug}
                  component={component}
                />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
