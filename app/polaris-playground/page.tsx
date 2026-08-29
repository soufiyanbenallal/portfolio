import { polarisDocComponentsData } from "./data/polaris-docs.data";
import { PolarisOverviewCardPart } from "./components/polaris-overview-card.part";

export default function PolarisOverviewPage() {
  const actionComponents = polarisDocComponentsData.filter(
    (c) => c.category === "actions",
  );
  const feedbackComponents = polarisDocComponentsData.filter(
    (c) => c.category === "feedback",
  );
  const formComponents = polarisDocComponentsData.filter(
    (c) => c.category === "forms",
  );
  const layoutComponents = polarisDocComponentsData.filter(
    (c) => c.category === "layout",
  );

  
  return (
    <div className="mx-auto max-w-7xl space-y-12 pb-16">
      {/* ── Section: Actions (Image 1) ── */}
      <section className="space-y-4 pt-12">
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-gray-900 tracking-tight sm:text-2xl">
            Actions
          </h2>
          <p className="text-xs text-gray-500">
            Action components let users trigger events, perform tasks, and navigate through the interface.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {actionComponents.map((component) => (
            <PolarisOverviewCardPart key={component.slug} component={component} />
          ))}
        </div>
      </section>

      {/* ── Section: Feedback and status indicators (Image 1) ── */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-gray-900 tracking-tight sm:text-2xl">
            Feedback and status indicators
          </h2>
          <p className="text-xs text-gray-500">
            Feedback and status indicators display information about the status of resources and actions.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {feedbackComponents.map((component) => (
            <PolarisOverviewCardPart key={component.slug} component={component} />
          ))}
        </div>
      </section>

      {/* ── Section: Forms ── */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-gray-900 tracking-tight sm:text-2xl">
            Forms
          </h2>
          <p className="text-xs text-gray-500">
            Form components let users enter, edit, and select data in various formats.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {formComponents.map((component) => (
            <PolarisOverviewCardPart key={component.slug} component={component} />
          ))}
        </div>
      </section>

      {/* ── Section: Layout and structure ── */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-gray-900 tracking-tight sm:text-2xl">
            Layout and structure
          </h2>
          <p className="text-xs text-gray-500">
            Layout components organize content, control spacing, and create structured views.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {layoutComponents.map((component) => (
            <PolarisOverviewCardPart key={component.slug} component={component} />
          ))}
        </div>
      </section>
    </div>
  );
}
